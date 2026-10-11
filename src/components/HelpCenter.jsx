import { useMemo, useState } from 'react'

const helpItems = [
  {
    question: 'Como gerar uma campanha?',
    terms: 'campanha briefing formulario gerar',
    answer: ['Informe um produto ou experiencia.', 'Escolha a direcao criativa e o publico.', 'Selecione “Gerar briefing no servidor”.'],
  },
  {
    question: 'Como sei que o backend esta funcionando?',
    terms: 'backend api servidor online status',
    answer: ['Localize a faixa “Backend da experiencia”.', 'Selecione “Atualizar estado da API”.', 'Confira o nome do servico e o tempo de atividade.'],
  },
  {
    question: 'Por que apareceu um erro no produto?',
    terms: 'erro produto caracteres validacao',
    answer: ['Use entre 3 e 60 caracteres.', 'Evite enviar um campo vazio.', 'Tente novamente; a validacao acontece no servidor.'],
  },
  {
    question: 'O endereco publico da Railway nao abriu.',
    terms: 'railway dominio endereco deploy creditos',
    answer: ['Confirme se o deploy terminou com sucesso.', 'Abra Settings e use Generate Domain.', 'Confira os creditos do plano e consulte /health.'],
  },
]

function HelpCenter() {
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    const value = search.trim().toLocaleLowerCase('pt-BR')
    if (!value) return helpItems
    return helpItems.filter((item) => `${item.question} ${item.terms}`.toLocaleLowerCase('pt-BR').includes(value))
  }, [search])

  return (
    <section className="help-section" id="ajuda">
      <div className="help-title">
        <div><p className="eyebrow">Aide & documentation</p><h2>Antes de perguntar, encontre.</h2></div>
        <p>A central segue a heuristica de ajuda: busca facil, respostas curtas e passos que podem ser executados imediatamente.</p>
      </div>

      <label className="search-box">
        <span>Buscar uma resposta</span>
        <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Ex.: backend, briefing ou erro" />
      </label>

      <div className="help-grid">
        {filteredItems.length ? filteredItems.map((item, index) => (
          <details key={item.question} open={!search && index === 0}>
            <summary>{item.question}</summary>
            <ol>{item.answer.map((step) => <li key={step}>{step}</li>)}</ol>
          </details>
        )) : <p className="no-results" role="status">Nenhuma resposta encontrada. Tente “backend” ou “briefing”.</p>}
      </div>
    </section>
  )
}

export default HelpCenter
