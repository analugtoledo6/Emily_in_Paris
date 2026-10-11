# Atelier Lumiere

Aplicacao full-stack inspirada no universo de moda, comunicacao e vida parisiense de *Emily in Paris*. A identidade, os textos e as campanhas sao originais e foram criados para esta atividade.

## O que a aplicacao faz

- apresenta um quadro de campanhas ficticias;
- recebe produto, direcao criativa e publico em um formulario;
- envia as escolhas a `POST /api/briefs`;
- valida os dados e gera conceito, chamada, paleta e hashtags no backend;
- exibe o estado real da API em `GET /api/status`;
- oferece central de ajuda pesquisavel e dicas contextuais;
- disponibiliza `GET /health` para a hospedagem.

## Tecnologias

- React e Vite na interface;
- Node.js e Express no backend;
- testes com `node:test`;
- Railway como plataforma de implantacao indicada.

## Executar localmente

Use Node.js 20 ou 22.

```bash
npm ci
npm run build
npm start
```

A aplicacao abre em `http://localhost:3000`. Para desenvolvimento com recarga automatica, rode `npm run dev:api` e `npm run dev:web` em terminais separados.

## Validacao

```bash
npm test
npm run build
```

## Implantar na Railway

1. Publique esta pasta em um repositorio proprio do GitHub.
2. Na Railway, crie um projeto e escolha **Deploy from GitHub repo**.
3. Selecione o repositorio e inicie o deploy.
4. O arquivo `railway.json` informa os comandos de build, start e o health check.
5. Aguarde a conclusao e abra **Settings**.
6. Em **Networking**, selecione **Generate Domain**.
7. Abra o endereco gerado e teste a criacao de um briefing.

O plano gratuito possui credito mensal limitado, e contas novas podem receber um teste com creditos. Consulte o painel para confirmar o saldo e as exigencias de verificacao da conta.

Tutorial utilizado: [Deploy an Express App](https://docs.railway.com/guides/express).

## Estrutura principal

```text
server.mjs                    servidor Express e gerador de briefings
src/App.jsx                   pagina e quadro de campanhas
src/components               formulario e central de ajuda
src/styles.css                identidade visual responsiva
test/server.test.mjs          testes do backend
railway.json                  configuracao de deploy
docs                          relatorio e arquitetura
```

## Observacao de uso

Projeto conceitual e educacional inspirado em temas da serie, sem vinculo oficial com Netflix ou os detentores da obra.
