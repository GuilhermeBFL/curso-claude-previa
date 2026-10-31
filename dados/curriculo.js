// Mapa do curso. "pronta" marca as aulas já escritas nesta prévia.
export const CURSO = [
  { n: 0, t: 'Do zero absoluto', d: 'Arquivo, pasta, internet e os formatos do dia a dia. Sem isso, o resto fica nebuloso.', aulas: [
    ['0-1', 'Arquivo, pasta e caminho'], ['0-2', 'Extensão: o sobrenome do arquivo'], ['0-3', 'HTML, Word e PDF: qual usar', 'pronta'], ['0-4', 'Excel, CSV e Markdown'], ['0-5', 'Navegador, site e app'], ['0-6', 'Internet, servidor e domínio'], ['0-7', 'Nuvem: o computador dos outros'], ['0-8', 'Localhost e site publicado'], ['0-9', 'Wireframe, mock e protótipo']
  ] },
  { n: 1, t: 'Vocabulário', d: 'As palavras que aparecem em todo lugar, com o sentido que elas têm aqui.', aulas: [
    ['1-1', 'O mapa: modelo, app, API e agente'], ['1-2', 'Token e contexto'], ['1-3', 'API, SDK e CLI'], ['1-4', 'Frontend, backend e banco de dados'], ['1-5', 'Skill, MCP, hook, plugin e subagente'], ['1-6', 'Como usar o glossário']
  ] },
  { n: 2, t: 'Programação essencial', d: 'Primeiro você aprende a ler código, linha por linha. Só depois escreve.', aulas: [
    ['2-1', 'O que é programar'], ['2-2', 'Terminal sem medo'], ['2-3', 'Lendo código: variável'], ['2-4', 'Lendo código: condição'], ['2-5', 'Lendo código: repetição'], ['2-6', 'Lendo código: função'], ['2-7', 'Lista, dicionário e JSON'], ['2-8', 'Como ler uma mensagem de erro'], ['2-9', 'HTTP: pedido e resposta'], ['2-10', 'JavaScript, só para ler'], ['2-11', 'Seu primeiro programa']
  ] },
  { n: 3, t: 'Git, GitHub e VS Code', d: 'O histórico do seu projeto, a cópia na internet e o editor onde tudo acontece.', aulas: [
    ['3-1', 'Git e GitHub, do zero', 'pronta'], ['3-2', 'Primeiro repositório, pelo navegador'], ['3-3', 'Commit na prática'], ['3-4', 'Branch e merge'], ['3-5', 'Pull request'], ['3-6', 'O .gitignore e a regra de ouro'], ['3-7', 'VS Code: o mínimo'], ['3-8', 'Terminal, VS Code, app, web ou celular?']
  ] },
  { n: 4, t: 'Bibliotecas', d: 'Código pronto de outras pessoas: como escolher, instalar e não cair em golpe.', aulas: [
    ['4-1', 'Como escolher uma biblioteca', 'pronta'], ['4-2', 'Instalar: pip, uv, npm e versões'], ['4-3', 'Fichas de Python'], ['4-4', 'Fichas de JavaScript'], ['4-5', 'Fichas de dados e automação'], ['4-6', 'Frameworks de agentes']
  ] },
  { n: 5, t: 'Como a IA funciona', d: 'O suficiente para prever quando ela acerta, quando erra e quanto custa.', aulas: [
    ['5-1', 'O que é um modelo'], ['5-2', 'Por que a IA inventa coisas'], ['5-3', 'O contexto enche: e aí?'], ['5-4', 'Comparando modelos'], ['5-5', 'Tokens na ponta do lápis']
  ] },
  { n: 6, t: 'Prompts e contexto', d: 'Como pedir bem, como dar o contexto certo e como exigir prova de que funcionou.', aulas: [
    ['6-1', 'Anatomia de um bom pedido'], ['6-2', 'Antes e depois: pedidos reais'], ['6-3', 'Exemplos e formato de saída'], ['6-4', 'Plano antes do código'], ['6-5', 'Exigir verificação'], ['6-6', 'Quando começar outra conversa'], ['6-7', 'Usar IA para aprender, não só para delegar']
  ] },
  { n: 7, t: 'Claude Code completo', d: 'Tudo o que a ferramenta faz, do primeiro comando às tarefas agendadas.', aulas: [
    ['7-1', 'Instalação e primeira sessão'], ['7-2', 'Comandos de barra'], ['7-3', 'Modo de planejamento e modo automático'], ['7-4', 'Permissões'], ['7-5', 'CLAUDE.md e memória'], ['7-6', 'Hooks'], ['7-7', 'Plugins e mods'], ['7-8', 'Subagentes e equipes de agentes'], ['7-9', 'Worktrees'], ['7-10', 'Rodar sem interface: claude -p'], ['7-11', 'Tarefas agendadas e workflows'], ['7-12', 'Remote Control, celular, web e desktop'], ['7-13', 'VS Code, Chrome e uso do computador'], ['7-14', 'Entendendo os limites do plano']
  ] },
  { n: 8, t: 'Skills', d: 'Ensine o Claude a fazer as coisas do seu jeito, uma vez só.', aulas: [
    ['8-1', 'Skill x MCP: qual é a diferença', 'pronta'], ['8-2', 'Anatomia de uma skill'], ['8-3', 'Sua primeira skill'], ['8-4', 'A skill que não dispara'], ['8-5', 'As melhores, e onde achar'], ['8-6', 'Avaliar antes de instalar']
  ] },
  { n: 9, t: 'MCP', d: 'O cabo que liga a IA à sua agenda, ao seu e-mail e aos seus sistemas.', aulas: [
    ['9-1', 'Como funciona: cliente, servidor e ferramentas'], ['9-2', 'Local, remoto e login'], ['9-3', 'Principais servidores'], ['9-4', 'Problemas comuns'], ['9-5', 'Criando o seu MCP']
  ] },
  { n: 10, t: 'APIs e chaves', d: 'Assinatura ou pagar por uso? Como chamar uma IA de dentro do seu programa.', aulas: [
    ['10-1', 'Assinatura x API'], ['10-2', 'Console e sua primeira chave'], ['10-3', 'Arquivo .env e variável de ambiente'], ['10-4', 'Sua primeira chamada à API'], ['10-5', 'Pagar menos: cache, lote e modelo certo'], ['10-6', 'Ferramentas e streaming'], ['10-7', 'OpenAI, Gemini, OpenRouter e ElevenLabs'], ['10-8', 'Créditos mensais do plano Max']
  ] },
  { n: 11, t: 'Segurança', d: 'O que protege sua conta, seu cartão e os dados de quem confia em você.', aulas: [
    ['11-1', 'Como proteger sua chave de API', 'pronta'], ['11-2', 'Como as chaves são roubadas'], ['11-3', 'Vazou: plano de emergência'], ['11-4', 'Prompt injection'], ['11-5', 'MCPs, skills e pacotes maliciosos'], ['11-6', 'Menor privilégio e aprovação humana'], ['11-7', 'Contas: dois fatores e senhas'], ['11-8', 'LGPD básica'], ['11-9', 'Auditoria do seu próprio PC']
  ] },
  { n: 12, t: 'Agentes', d: 'O que é um agente de verdade e como ele trabalha sozinho sem sair do trilho.', aulas: [
    ['12-1', 'Agente pessoal: quem faz o quê', 'pronta'], ['12-2', 'O ciclo: pensar, agir, conferir'], ['12-3', 'Ferramentas: como a IA age'], ['12-4', 'Memória: o que guardar'], ['12-5', 'RAG e embeddings'], ['12-6', 'Agent SDK e Managed Agents'], ['12-7', 'Modelos no seu PC'], ['12-8', 'Como testar um agente']
  ] },
  { n: 13, t: 'Várias IAs juntas', d: 'Claude, Codex e outros dividindo o trabalho, e quando isso só gasta dinheiro.', aulas: [
    ['13-1', 'Quando vale e quando não vale'], ['13-2', 'Claude + Codex pelo terminal'], ['13-3', 'Planejador, programador e revisor'], ['13-4', 'Vários agentes em paralelo'], ['13-5', 'Skills que criam agentes']
  ] },
  { n: 14, t: 'Mundo real', d: 'Telegram, e-mail, agenda, Obsidian e WhatsApp, com os riscos de cada caminho.', aulas: [
    ['14-1', 'Webhook: o aviso que chega sozinho'], ['14-2', 'Telegram'], ['14-3', 'E-mail com Outlook'], ['14-4', 'Agenda e Obsidian'], ['14-5', 'WhatsApp: caminhos e riscos'], ['14-6', 'n8n e automações']
  ] },
  { n: 15, t: 'Apps do zero ao ar', d: 'Da ideia ao link funcionando, com banco de dados e login.', aulas: [
    ['15-1', 'Da ideia ao wireframe'], ['15-2', 'Frontend'], ['15-3', 'Backend e funções'], ['15-4', 'Banco de dados com Supabase'], ['15-5', 'Login'], ['15-6', 'Publicar: Vercel e domínio'], ['15-7', 'Erros depois de publicar'], ['15-8', 'Sincronizar o progresso deste curso']
  ] },
  { n: 16, t: 'Qualidade', d: 'Testes, depuração de propósito e como render mais no seu plano.', aulas: [
    ['16-1', 'Testes automáticos'], ['16-2', 'Depurar de propósito'], ['16-3', 'Avaliar a resposta da IA'], ['16-4', 'Logs: saber o que aconteceu'], ['16-5', 'Quando bater no limite']
  ] },
  { n: 17, t: 'Projeto final', d: 'Seu assistente pessoal, construído peça por peça ao longo do curso.', aulas: [
    ['17-1', 'O plano do assistente'], ['17-2', 'Telegram + Claude'], ['17-3', 'Agenda e e-mail'], ['17-4', 'Obsidian e memória'], ['17-5', 'Uma área do seu trabalho'], ['17-6', 'Aprovação humana'], ['17-7', 'No ar, o dia inteiro']
  ] }
];

export const GLOSSARIO = {
  agente: ['Agente', 'Programa em que a IA recebe um objetivo e decide os passos até terminar, usando ferramentas.'],
  api: ['API', 'A porta de entrada para um programa usar outro. Com a API do Claude, seu programa conversa com o modelo.'],
  'chave-api': ['Chave de API', 'A senha que identifica quem paga pelo uso de uma API. Quem tem a chave gasta em seu nome.'],
  backend: ['Backend', 'A parte do sistema que roda no servidor, longe dos olhos de quem visita.'],
  branch: ['Branch', 'Um caminho paralelo do projeto, para testar uma ideia sem mexer na versão que funciona.'],
  cli: ['CLI', 'Programa que você usa digitando comandos no terminal. O Claude Code e o Git têm CLI.'],
  commit: ['Commit', 'Uma foto do projeto inteiro em um momento, com uma frase dizendo o que mudou.'],
  contexto: ['Contexto', 'Tudo o que a IA tem à mão naquele momento: a conversa, os arquivos lidos, as instruções.'],
  env: ['Arquivo .env', 'Arquivo de texto onde ficam as chaves e senhas de um projeto. Fica fora do Git.'],
  extensao: ['Extensão', 'O final do nome do arquivo, como .pdf ou .py. Diz ao computador que programa deve abrir.'],
  frontend: ['Frontend', 'A parte do sistema que aparece para quem usa: telas, botões e textos.'],
  git: ['Git', 'Programa que guarda o histórico de uma pasta. Fica no seu computador e funciona sem internet.'],
  github: ['GitHub', 'Site que guarda uma cópia do seu projeto com Git e permite trabalhar com outras pessoas.'],
  gitignore: ['.gitignore', 'Lista de arquivos que o Git não deve acompanhar, como o .env.'],
  historico: ['Histórico', 'A sequência de todos os commits de um projeto. Dá para voltar a qualquer um deles.'],
  html: ['HTML', 'A linguagem das páginas da internet. Marca o que é título, parágrafo, botão e assim por diante.'],
  json: ['JSON', 'Um jeito de escrever dados em texto, com nomes e valores. É como programas trocam informação.'],
  localhost: ['Localhost', 'Um site rodando só no seu computador. Some quando o programa fecha e ninguém mais acessa.'],
  markdown: ['Markdown', 'Texto simples com marcações leves, como # para título. O Obsidian e o CLAUDE.md usam.'],
  mcp: ['MCP', 'Model Context Protocol: um padrão para ligar uma IA a ferramentas e dados de fora, como uma tomada.'],
  merge: ['Merge', 'Juntar uma branch de volta ao caminho principal.'],
  modelo: ['Modelo', 'O cérebro da IA, como o Sonnet ou o Opus. O app é só a janela por onde você fala com ele.'],
  pacote: ['Pacote', 'Uma biblioteca publicada para qualquer um instalar, em sites como PyPI e npm.'],
  prompt: ['Prompt', 'O pedido que você escreve para a IA.'],
  pull: ['Pull', 'Trazer para o seu computador o que está no GitHub.'],
  push: ['Push', 'Mandar os seus commits do computador para o GitHub.'],
  repositorio: ['Repositório', 'Uma pasta de projeto acompanhada pelo Git, com todo o histórico dentro.'],
  sdk: ['SDK', 'Um kit de código pronto para usar um serviço sem escrever tudo do zero.'],
  servidor: ['Servidor', 'Um computador ligado o tempo todo que responde a pedidos. Um servidor MCP é um programa desse tipo.'],
  skill: ['Skill', 'Um manual de instruções que o Claude abre quando a tarefa pede. Ensina o seu jeito de fazer.'],
  terminal: ['Terminal', 'Janela onde você conversa com o computador digitando comandos.'],
  token: ['Token', 'Pedacinho de texto que a IA lê e escreve. É a unidade de contagem de contexto e de custo.'],
  variavel: ['Variável de ambiente', 'Um valor guardado pelo sistema, fora do código, que o programa consulta pelo nome.'],
  biblioteca: ['Biblioteca', 'Código pronto que alguém já escreveu e testou, e que você usa no seu projeto.'],
  wireframe: ['Wireframe', 'O rascunho de uma tela, só com caixas, sem cor nem acabamento.']
};
