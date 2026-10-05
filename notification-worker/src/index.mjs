function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': origin,
      'Content-Type': 'application/json; charset=utf-8',
      'Vary': 'Origin',
    },
  })
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin')
    if (!origin || origin !== env.ALLOWED_ORIGIN) {
      return new Response('Origin not allowed', { status: 403 })
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin',
        },
      })
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, origin)
    }
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) {
      return jsonResponse({ error: 'Expected JSON request' }, 415, origin)
    }

    const { success } = await env.NOTIFICATION_LIMITER.limit({
      key: request.headers.get('CF-Connecting-IP') ?? 'unknown',
    })
    if (!success) {
      return jsonResponse({ error: 'Too many notifications' }, 429, origin)
    }

    const rawBody = await request.text()
    if (rawBody.length > 1024) {
      return jsonResponse({ error: 'Request too large' }, 413, origin)
    }

    let payload
    try {
      payload = JSON.parse(rawBody)
    } catch {
      return jsonResponse({ error: 'Invalid JSON' }, 400, origin)
    }

    const { letterNumber, letterTitle } = payload ?? {}
    if (
      !Number.isInteger(letterNumber)
      || letterNumber < 1
      || letterNumber > 30
      || typeof letterTitle !== 'string'
      || letterTitle.trim().length === 0
      || letterTitle.length > 120
    ) {
      return jsonResponse({ error: 'Invalid letter details' }, 400, origin)
    }
    if (!env.RESEND_API_KEY || !env.NOTIFICATION_EMAIL || !env.FROM_EMAIL) {
      return jsonResponse({ error: 'E-mail service is not configured' }, 503, origin)
    }

    const title = letterTitle.replace(/[\r\n\t]/g, ' ').trim()
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: env.NOTIFICATION_EMAIL,
        subject: `Elle a lu la lettre ${letterNumber}/30`,
        text: `Elle vient de terminer la lettre ${letterNumber}/30 : « ${title} », puis a cliqué sur « Lettre suivante ».`,
      }),
    })

    if (!emailResponse.ok) {
      console.error('Resend e-mail request failed with status', emailResponse.status)
      return jsonResponse({ error: 'E-mail could not be sent' }, 502, origin)
    }

    return jsonResponse({ ok: true }, 200, origin)
  },
}
