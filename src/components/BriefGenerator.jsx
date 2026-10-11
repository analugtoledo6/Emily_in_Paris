import { useState } from 'react'

const initialForm = {
  product: '',
  mood: 'romantique',
  audience: 'explorers',
}

function BriefGenerator() {
  const [form, setForm] = useState(initialForm)
  const [brief, setBrief] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function generateBrief(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/briefs', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Nao foi possivel criar o briefing.')
      setBrief(payload)
    } catch (requestError) {
      setBrief(null)
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="atelier-section" id="atelier">
      <div className="atelier-intro">
        <p className="eyebrow light">Briefing dynamique</p>
        <h2>Monte uma ideia em tres escolhas.</h2>
        <p>O formulario envia dados ao servidor. O backend valida as escolhas e devolve conceito, paleta, chamada e hashtags.</p>
        <div className="context-tip" role="note">
          <span title="Ajuda contextual">i</span>
          <p>Comece com algo concreto, como “cafe artesanal”, “perfume floral” ou “galeria independente”.</p>
        </div>
      </div>

      <form className="brief-form" onSubmit={generateBrief}>
        <label>
          <span>1 · Produto ou experiencia</span>
          <input
            name="product"
            value={form.product}
            onChange={updateField}
            placeholder="Ex.: confeitaria de bairro"
            minLength="3"
            maxLength="60"
            required
          />
        </label>

        <div className="field-row">
          <label>
            <span>2 · Direcao criativa</span>
            <select name="mood" value={form.mood} onChange={updateField}>
              <option value="romantique">Romantique</option>
              <option value="audacieux">Audacieux</option>
              <option value="chic">Chic minimaliste</option>
            </select>
          </label>
          <label>
            <span>3 · Publico</span>
            <select name="audience" value={form.audience} onChange={updateField}>
              <option value="explorers">Exploradores urbanos</option>
              <option value="creators">Criadores digitais</option>
              <option value="locals">Moradores do bairro</option>
            </select>
          </label>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button light-button" disabled={loading}>
          {loading ? 'O servidor esta criando...' : 'Gerar briefing no servidor'}
        </button>
      </form>

      <div className={`brief-result ${brief ? 'visible' : ''}`} aria-live="polite">
        {brief ? (
          <>
            <div className="result-topline"><span>Briefing gerado</span><code>{brief.id}</code></div>
            <h3>{brief.title}</h3>
            <p className="concept">{brief.concept}</p>
            <p><strong>Ativacao:</strong> {brief.action}</p>
            <div className="palette" aria-label="Paleta sugerida">
              {brief.palette.map((color, index) => <span key={color} className={`swatch swatch-${index}`}>{color}</span>)}
            </div>
            <p className="hashtags">{brief.hashtags.join(' ')}</p>
          </>
        ) : (
          <div className="result-placeholder">
            <span>AL</span>
            <p>Seu briefing aparecera aqui depois que o backend responder.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default BriefGenerator
