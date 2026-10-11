import express from 'express'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, 'dist')

/**
 * Fragmentos combinados pelo servidor. A separacao por estilo permite gerar
 * resultados diferentes sem depender de uma API externa ou de uma chave paga.
 */
const moodLibrary = {
  romantique: {
    headline: 'Paris guarda um segredo em cada esquina',
    palette: ['Rosa cha', 'Bordeaux', 'Champagne'],
    action: 'Convide o publico a compartilhar uma pequena historia inesquecivel.',
  },
  audacieux: {
    headline: 'O comum ficou do lado de fora do metro',
    palette: ['Vermelho editorial', 'Azul eletrico', 'Marfim'],
    action: 'Lance um desafio visual curto com uma frase provocadora.',
  },
  chic: {
    headline: 'Menos ruido. Mais assinatura.',
    palette: ['Preto tinta', 'Creme', 'Dourado fosco'],
    action: 'Apresente poucos detalhes e valorize textura, origem e acabamento.',
  },
}

const audienceAngles = {
  explorers: 'pessoas que transformam uma tarde livre em uma descoberta',
  creators: 'criadores que procuram uma ideia com identidade visual forte',
  locals: 'moradores que valorizam lugares de bairro e boas recomendacoes',
}

export const app = express()

app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/status', (_request, response) => {
  response.json({
    online: true,
    service: 'Atelier Lumiere API',
    serverTime: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  })
})

/**
 * Recebe escolhas da interface, valida os dados e monta um briefing no backend.
 * Isso torna a implantacao dinamica e facil de demonstrar no relatorio.
 */
app.post('/api/briefs', (request, response) => {
  const product = String(request.body?.product || '').trim()
  const mood = String(request.body?.mood || '')
  const audience = String(request.body?.audience || '')

  if (product.length < 3 || product.length > 60) {
    return response.status(400).json({ error: 'Informe um produto entre 3 e 60 caracteres.' })
  }

  if (!moodLibrary[mood] || !audienceAngles[audience]) {
    return response.status(400).json({ error: 'Estilo ou publico invalido.' })
  }

  const selectedMood = moodLibrary[mood]
  const slug = product
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '')

  return response.status(201).json({
    id: `brief-${Date.now()}`,
    title: selectedMood.headline,
    concept: `${product} para ${audienceAngles[audience]}.`,
    action: selectedMood.action,
    palette: selectedMood.palette,
    hashtags: [`#${slug || 'ParisAtelier'}`, '#ParisComIdeias', '#AtelierLumiere'],
    createdAt: new Date().toISOString(),
  })
})

app.use(express.static(distPath, { extensions: ['html'] }))

app.use((request, response) => {
  if (request.path.startsWith('/api/')) {
    return response.status(404).json({ error: 'Endpoint nao encontrado.' })
  }
  return response.sendFile(path.join(distPath, 'index.html'))
})

const isMainModule = process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href

if (isMainModule) {
  const port = Number(process.env.PORT) || 3000
  app.listen(port, '0.0.0.0', () => {
    console.log(`Atelier Lumiere ativo na porta ${port}.`)
  })
}
