# Relatorio de Implantacao em Nuvem

## Atelier Lumiere

**Estudante:** [PREENCHER]

**Data:** [PREENCHER]

## Objetivo

Implantar uma aplicacao full-stack inspirada em *Emily in Paris*. A interface organiza campanhas e envia escolhas para um backend Node.js, que valida os dados e gera um briefing de comunicacao com conceito, paleta, ativacao e hashtags.

## Comparacao das plataformas

| Criterio | Railway | Render | Google Cloud Run |
| --- | --- | --- | --- |
| Execucao de backend | Deteccao de Node, Docker e Railpack | Node, Python, Docker e outros | Conteiner ou implantacao pelo codigo-fonte |
| Inicio gratuito | Plano Free e teste inicial com creditos | Web Service Free | Franquia gratuita por uso |
| Forma de deploy | GitHub, CLI ou imagem | Repositorio Git ou imagem | Console ou CLI `gcloud` |
| URL publica | Dominio gerado nas configuracoes | Subdominio `onrender.com` | Subdominio `run.app` |
| Limitacao relevante | Credito mensal e verificacao da conta | Suspende apos inatividade | Configuracao de projeto, cobranca e permissoes |
| Complexidade para iniciante | Baixa | Baixa | Media a alta |

## Escolha da plataforma

Escolhi a Railway por dois criterios. Primeiro, o Railpack reconhece automaticamente um projeto Node.js e o arquivo `railway.json` registra build, inicializacao e health check. Segundo, a plataforma permite implantar diretamente do GitHub e gerar o dominio publico no mesmo projeto. O limite de creditos e adequado para uma demonstracao academica curta.

## Tutorial e aplicacao

Tutorial seguido: [Deploy an Express App](https://docs.railway.com/guides/express)

Aplicacao: Atelier Lumiere

## Passos executados

1. Criei uma interface React com quadro de campanhas, agenda, formulario e central de ajuda.
2. Implementei o servidor Express e os endpoints `/api/status`, `/api/briefs` e `/health`.
3. Adicionei validacao de entrada e limite de tamanho para o corpo JSON.
4. Configurei o servidor para usar a variavel `PORT` e o host `0.0.0.0`.
5. Executei testes do health check, da geracao e da rejeicao de dados invalidos.
6. Publiquei o projeto em um repositorio Git.
7. Criei um projeto Railway e escolhi Deploy from GitHub repo.
8. Aguardei o build e gerei um dominio em Settings e Networking.
9. Abri a URL publica e gerei um briefing para comprovar a execucao do backend.

O tutorial precisou de um ajuste: o projeto compila o React antes de iniciar o Express. O arquivo `railway.json` usa `npm ci && npm run build` e inicia o servico com `npm start`.

## Resultado

**URL publica:** [INSERIR URL DA RAILWAY]

A aplicacao respondeu na URL publica. O formulario enviou uma requisicao POST e exibiu um briefing com identificador e horario gerados no servidor.

## Capturas obrigatorias

**Figura 1 Painel da Railway com implantacao concluida**

[INSERIR CAPTURA DO DEPLOY E DESTACAR O STATUS DE SUCESSO]

**Figura 2 Aplicacao na URL publica**

[INSERIR CAPTURA DO BRIEFING GERADO E DESTACAR A URL]

## Ajuda e documentacao

A central de ajuda permite pesquisar por tarefa, usa perguntas frequentes e apresenta passos concretos. O formulario inclui uma dica junto ao campo de produto, oferecendo ajuda no contexto antes que um erro aconteca.

## Referencias

- Railway. [Deploy an Express App](https://docs.railway.com/guides/express).
- Railway. [Free Trial](https://docs.railway.com/pricing/free-trial).
- Render. [Deploy for Free](https://render.com/docs/free).
- Google Cloud. [Build and deploy a Node.js web app to Cloud Run](https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service).
- Nielsen Norman Group. [Help and Documentation](https://www.nngroup.com/articles/help-and-documentation/).
