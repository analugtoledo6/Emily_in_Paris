import { useEffect, useState } from 'react'
import BriefGenerator from './components/BriefGenerator.jsx'
import HelpCenter from './components/HelpCenter.jsx'

const campaigns = [
  { client: 'Maison Lavande', title: 'Perfume de fim de tarde', status: 'Em criacao', channel: 'Reels + stories', color: 'lavender' },
  { client: 'Cafe Marais', title: 'Seu croissant, sua historia', status: 'Aprovada', channel: 'UGC + mapa', color: 'gold' },
  { client: 'Galerie Neuf', title: 'Arte para quem passa', status: 'Pesquisa', channel: 'Poster + social', color: 'blue' },
]

const cityNotes = [
  ['08:30', 'Cafe sem pressa', 'Observe cores, embalagens e conversas antes de abrir o notebook.'],
  ['11:00', 'Reuniao criativa', 'Leve uma ideia clara e uma alternativa que ninguem esperava.'],
  ['15:30', 'Caminhada de referencias', 'Fotografe tipografia, vitrines e pequenos gestos da cidade.'],
]

function App() {
  const [status, setStatus] = useState(null)
  const [statusError, setStatusError] = useState('')

  async function loadStatus() {
    setStatusError('')
    try {
      const response = await fetch('/api/status')
      if (!response.ok) throw new Error('API indisponivel')
      setStatus(await response.json())
    } catch {
      setStatusError('A API ainda nao respondeu. Inicie o backend com npm run dev:api.')
    }
  }

  useEffect(() => {
    loadStatus()
  }, [])

  return (
    <div className="paris-app">
      <header className="hero" id="inicio">
        <nav className="top-nav" aria-label="Navegacao principal">
          <a className="brand" href="#inicio" aria-label="Atelier Lumiere - inicio">
            <span>AL</span>
            <div><strong>Atelier Lumiere</strong><small>Paris · strategie sociale</small></div>
          </a>
          <div className="nav-links">
            <a href="#campanhas">Campanhas</a>
            <a href="#atelier">Atelier</a>
            <a href="#agenda">Agenda</a>
            <a href="#ajuda">Ajuda</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Ideias com sotaque parisiense</p>
            <h1>Uma campanha.<br /><em>Milhares de olhares.</em></h1>
            <p>Um atelier digital para transformar produtos em historias sociais elegantes, coloridas e impossiveis de ignorar.</p>
            <div className="hero-actions">
              <a className="button primary" href="#atelier">Criar um briefing</a>
              <a className="text-link" href="#campanhas">Ver o quadro criativo <span>↘</span></a>
            </div>
          </div>

          <div className="hero-art" aria-label="Composicao grafica inspirada em um postal de Paris">
            <div className="postcard">
              <span className="stamp">PAR<br />11</span>
              <p>BONJOUR</p>
              <strong>PARIS</strong>
              <small>ideias · estilo · estrategia</small>
            </div>
            <div className="phone-card">
              <span className="social-dot">●</span>
              <p>@atelier.lumiere</p>
              <div className="mini-eiffel" aria-hidden="true">A</div>
              <strong>la vie est une campagne</strong>
              <div className="mini-stats"><span>♡ 2.408</span><span>↗ partager</span></div>
            </div>
            <div className="ribbon">nouvelle idee</div>
          </div>
        </div>
      </header>

      <main>
        <section className="campaign-section" id="campanhas">
          <header className="section-heading">
            <div><p className="eyebrow">Tableau de projets</p><h2>Campanhas no atelier</h2></div>
            <p>Projetos ficticios que mostram como conceito, canal e etapa podem ser organizados com clareza.</p>
          </header>
          <div className="campaign-grid">
            {campaigns.map((campaign, index) => (
              <article className={`campaign-card ${campaign.color}`} key={campaign.title}>
                <span className="campaign-number">0{index + 1}</span>
                <p>{campaign.client}</p>
                <h3>{campaign.title}</h3>
                <dl>
                  <div><dt>Status</dt><dd>{campaign.status}</dd></div>
                  <div><dt>Canal</dt><dd>{campaign.channel}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <BriefGenerator />

        <section className="agenda-section" id="agenda">
          <div className="agenda-copy">
            <p className="eyebrow">Une journee a Paris</p>
            <h2>A cidade tambem participa do briefing.</h2>
            <p>Uma pequena agenda de observacao para buscar referencias antes de criar.</p>
          </div>
          <div className="agenda-list">
            {cityNotes.map(([time, title, text]) => (
              <article key={time}>
                <time>{time}</time>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="server-strip" aria-label="Estado do backend">
          <div>
            <span className={status ? 'status-light online' : 'status-light'} aria-hidden="true" />
            <p>Backend da experiencia</p>
            <strong>{status ? `${status.service} · ${status.uptimeSeconds}s ativa` : 'Aguardando resposta'}</strong>
          </div>
          {statusError && <p role="alert">{statusError}</p>}
          <button onClick={loadStatus} title="Consulta GET /api/status no servidor Node.">Atualizar estado da API</button>
        </section>

        <HelpCenter />
      </main>

      <footer className="footer">
        <div><span>AL</span><strong>Atelier Lumiere</strong></div>
        <p>Projeto educacional inspirado no universo de moda e comunicacao de Emily in Paris.</p>
        <a href="#inicio">Voltar ao inicio ↑</a>
      </footer>
    </div>
  )
}

export default App
