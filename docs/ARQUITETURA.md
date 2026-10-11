# Arquitetura do Atelier Lumiere

## Fluxo da criacao de briefing

1. A usuaria informa um produto, uma direcao criativa e um publico.
2. O React envia JSON para `POST /api/briefs`.
3. O Express valida tamanho do produto e valores permitidos.
4. O backend combina textos, paleta e hashtags e registra o horario.
5. A interface renderiza o resultado sem recarregar a pagina.

## Endpoints

| Metodo | Rota | Finalidade |
| --- | --- | --- |
| GET | `/health` | Confirma que o processo esta ativo |
| GET | `/api/status` | Retorna nome, horario e tempo de atividade da API |
| POST | `/api/briefs` | Valida as escolhas e gera um briefing |

## Decisoes de projeto

- O backend gera o conteudo localmente, sem chaves ou servicos pagos.
- O servidor limita JSON a 32 KB e valida os campos recebidos.
- O frontend e o backend compartilham um unico servico para reduzir a configuracao.
- O `railway.json` explicita build, start, health check e politica de reinicio.
- A central de ajuda oferece busca e passos concretos, conforme a heuristica estudada.

## Diferencas em relacao ao outro projeto

Esta aplicacao usa uma linguagem editorial, nao possui login demonstrativo e envia dados por POST para produzir um objeto novo. O Portal de Scranton prioriza consulta de estado e mensagens por GET. Assim, tema, fluxo, interface e operacao do backend sao distintos.
