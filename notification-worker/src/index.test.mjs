import assert from 'node:assert/strict'
import test from 'node:test'
import worker from './index.mjs'

const origin = 'https://blindvrong.github.io'
const env = {
  ALLOWED_ORIGIN: origin,
  NOTIFICATION_LIMITER: { limit: async () => ({ success: true }) },
  WEB3FORMS_ACCESS_KEY: 'test-key',
}

function postRequest(body, requestOrigin = origin) {
  return new Request('https://alerts.example.workers.dev/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: requestOrigin,
      'CF-Connecting-IP': '203.0.113.1',
    },
    body: JSON.stringify(body),
  })
}

test('sends an alert through Web3Forms with the letter details', async () => {
  const originalFetch = globalThis.fetch
  let emailRequest
  globalThis.fetch = async (url, init) => {
    emailRequest = { url, init }
    return Response.json({ success: true })
  }

  try {
    const response = await worker.fetch(
      postRequest({ letterNumber: 3, letterTitle: 'Ton sourire' }),
      env,
    )

    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { ok: true })
    assert.equal(emailRequest.url, 'https://api.web3forms.com/submit')
    assert.deepEqual(JSON.parse(emailRequest.init.body), {
      access_key: env.WEB3FORMS_ACCESS_KEY,
      from_name: 'Monamoureuse',
      subject: 'Elle a lu la lettre 3/100',
      message: 'Elle vient de terminer la lettre 3/100 : « Ton sourire », puis a cliqué sur « Lettre suivante ».',
    })
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('accepts a notification for the hundredth letter', async () => {
  const originalFetch = globalThis.fetch
  let emailRequest
  globalThis.fetch = async (url, init) => {
    emailRequest = { url, init }
    return Response.json({ success: true })
  }

  try {
    const response = await worker.fetch(
      postRequest({ letterNumber: 100, letterTitle: 'La dernière lettre' }),
      env,
    )

    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { ok: true })
    assert.equal(
      JSON.parse(emailRequest.init.body).subject,
      'Elle a lu la lettre 100/100',
    )
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('logs Web3Forms rejection details without exposing an e-mail address', async () => {
  const originalFetch = globalThis.fetch
  const originalConsoleError = console.error
  let loggedDetails
  globalThis.fetch = async () => Response.json(
    { success: false, message: 'Access key for owner@example.com is invalid' },
    { status: 400 },
  )
  console.error = (...details) => {
    loggedDetails = details.join(' ')
  }

  try {
    const response = await worker.fetch(
      postRequest({ letterNumber: 1, letterTitle: 'Test' }),
      env,
    )

    assert.equal(response.status, 502)
    assert.match(loggedDetails, /Access key for \[redacted email\] is invalid/)
    assert.doesNotMatch(loggedDetails, /owner@example\.com/)
  } finally {
    globalThis.fetch = originalFetch
    console.error = originalConsoleError
  }
})

test('rejects requests from other origins', async () => {
  const response = await worker.fetch(
    postRequest({ letterNumber: 3, letterTitle: 'Ton sourire' }, 'https://example.com'),
    env,
  )

  assert.equal(response.status, 403)
})

test('rejects malformed letter details without sending an e-mail', async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => {
    throw new Error('The email provider must not be called for invalid input')
  }

  try {
    const response = await worker.fetch(
      postRequest({ letterNumber: 101, letterTitle: 'Out of range' }),
      env,
    )

    assert.equal(response.status, 400)
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('rejects requests when the rate limit is exceeded', async () => {
  const limitedEnv = {
    ...env,
    NOTIFICATION_LIMITER: { limit: async () => ({ success: false }) },
  }
  const response = await worker.fetch(
    postRequest({ letterNumber: 3, letterTitle: 'Ton sourire' }),
    limitedEnv,
  )

  assert.equal(response.status, 429)
})
