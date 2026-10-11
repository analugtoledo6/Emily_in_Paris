import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { app } from '../server.mjs'

let server
let baseUrl

before(async () => {
  server = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => server.once('listening', resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(() => server.close())

test('health check confirma que a aplicacao esta ativa', async () => {
  const response = await fetch(`${baseUrl}/health`)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { status: 'ok' })
})

test('API gera um briefing validado no servidor', async () => {
  const response = await fetch(`${baseUrl}/api/briefs`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ product: 'Cafe de bairro', mood: 'chic', audience: 'locals' }),
  })
  const payload = await response.json()

  assert.equal(response.status, 201)
  assert.match(payload.id, /^brief-/)
  assert.equal(payload.palette.length, 3)
  assert.match(payload.concept, /Cafe de bairro/)
})

test('API rejeita briefing incompleto', async () => {
  const response = await fetch(`${baseUrl}/api/briefs`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ product: 'x', mood: 'chic', audience: 'locals' }),
  })

  assert.equal(response.status, 400)
})
