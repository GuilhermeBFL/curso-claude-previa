/* Partes comuns às amostras de aparência: barra de cima, painel do módulo, aula de exemplo e troca de tema.
   Cada tema só desenha o mapa e define as cores nas variáveis --k-*. Não depende de módulos, então abre com dois cliques. */
(function () {
  const TEMAS = [
    ['1-sistema-solar', 'Sistema solar'],
    ['2-celula', 'Célula'],
    ['3-robo-planta', 'Planta do robô'],
    ['4-mapa-pixel', 'Mapa de videogame'],
    ['5-oceano', 'Mergulho no oceano'],
    ['6-metro', 'Mapa do metrô'],
    ['7-terminal', 'Terminal antigo'],
    ['8-cardapio', 'Cardápio']
  ];
  const ATUAL = 3; // Nesta amostra, você está no módulo 3.
  const CSS = `
  :root { --k-topo-fundo:#111; --k-topo-texto:#fff; --k-acento:#e0a55a; --k-acento-texto:#111; --k-painel-fundo:#fff; --k-painel-texto:#111; --k-linha:#ccc; --k-titulo:Georgia,serif; --k-texto:system-ui,sans-serif; --k-raio:12px; --k-leitura-fundo:#fff; --k-leitura-texto:#1a1a1a; --k-leitura-caixa:#f1f1f1; --k-leitura-fundo-noite:#15151a; --k-leitura-texto-noite:#eee; --k-leitura-caixa-noite:#23232b; --k-topo-h:58px; }
  html[data-leitura="noite"] { --k-leitura-fundo:var(--k-leitura-fundo-noite); --k-leitura-texto:var(--k-leitura-texto-noite); --k-leitura-caixa:var(--k-leitura-caixa-noite); }
  .k-topo { position:fixed; z-index:50; top:0; left:0; right:0; height:var(--k-topo-h); display:flex; align-items:center; gap:14px; padding:0 18px; background:var(--k-topo-fundo); color:var(--k-topo-texto); font-family:var(--k-texto); font-size:15px; line-height:1.2; }
  .k-marca { font-family:var(--k-titulo); font-weight:700; font-size:18px; white-space:nowrap; color:inherit; text-decoration:none; }
  .k-nav { display:flex; gap:2px; }
  .k-nav button, .k-bt { font:inherit; color:inherit; background:transparent; border:0; min-height:40px; padding:0 11px; border-radius:var(--k-raio); cursor:pointer; white-space:nowrap; }
  .k-nav button:hover, .k-bt:hover { background:color-mix(in srgb, currentColor 14%, transparent); }
  .k-nav button[aria-current="page"] { box-shadow:inset 0 -2px 0 var(--k-acento); border-radius:var(--k-raio) var(--k-raio) 0 0; }
  .k-esp { flex:1; }
  .k-bt.borda { border:1px solid color-mix(in srgb, currentColor 35%, transparent); }
  :focus-visible { outline:3px solid var(--k-acento); outline-offset:2px; }
  .k-troca { position:fixed; z-index:40; left:50%; bottom:14px; transform:translateX(-50%); display:flex; align-items:center; gap:4px; background:#000d; color:#fff; font:500 14px/1.2 system-ui,sans-serif; padding:4px; border-radius:30px; backdrop-filter:blur(6px); box-shadow:0 6px 24px #0006; white-space:nowrap; }
  .k-troca a { display:grid; place-items:center; min-width:40px; height:40px; color:#fff; text-decoration:none; border-radius:30px; }
  .k-troca a:hover { background:#fff3; }
  .k-troca span { padding:0 6px; }
  .k-veu { position:fixed; inset:0; z-index:55; background:#0007; opacity:0; pointer-events:none; transition:opacity .25s; }
  .k-veu.on { opacity:1; pointer-events:auto; }
  .k-painel { position:fixed; z-index:60; top:0; right:0; bottom:0; width:min(460px,100%); background:var(--k-painel-fundo); color:var(--k-painel-texto); font-family:var(--k-texto); transform:translateX(102%); transition:transform .32s cubic-bezier(.3,.8,.25,1); display:flex; flex-direction:column; box-shadow:-20px 0 60px #0006; visibility:hidden; }
  .k-painel.on { transform:none; visibility:visible; }
  .k-painel header { display:flex; align-items:flex-start; justify-content:space-between; gap:10px; padding:20px 22px 10px; }
  .k-painel h2 { font-family:var(--k-titulo); font-size:27px; line-height:1.15; margin:0; }
  .k-painel p { margin:0; padding:0 22px 12px; line-height:1.55; font-size:16px; opacity:.86; }
  .k-fecha { font:inherit; font-size:24px; line-height:1; color:inherit; background:transparent; border:0; min-width:44px; min-height:44px; border-radius:var(--k-raio); cursor:pointer; flex:none; }
  .k-fecha:hover { background:color-mix(in srgb, currentColor 12%, transparent); }
  .k-aulas { list-style:none; margin:0; padding:0 12px 80px; overflow:auto; flex:1; }
  .k-aulas button { display:flex; gap:12px; width:100%; text-align:left; padding:11px 10px; font:inherit; font-size:16px; line-height:1.35; color:inherit; background:transparent; border:0; border-bottom:1px solid var(--k-linha); cursor:pointer; }
  .k-aulas button:hover { background:color-mix(in srgb, var(--k-acento) 18%, transparent); }
  .k-aulas .id { flex:0 0 40px; opacity:.6; font-variant-numeric:tabular-nums; font-size:14px; padding-top:1px; }
  .k-aula { position:fixed; z-index:70; inset:0; overflow:auto; background:var(--k-leitura-fundo); color:var(--k-leitura-texto); font-family:var(--k-texto); font-size:18px; line-height:1.7; display:none; }
  .k-aula.on { display:block; }
  .k-aula-barra { position:sticky; top:0; z-index:2; display:flex; align-items:center; gap:10px; padding:8px 14px; background:var(--k-topo-fundo); color:var(--k-topo-texto); font-size:15px; }
  .k-aula-barra strong { font-family:var(--k-titulo); font-size:17px; }
  .k-aula-corpo { max-width:1120px; margin:0 auto; padding:0 20px 110px; display:grid; grid-template-columns:minmax(0,720px) 300px; gap:0 40px; }
  .k-aula-corpo > * { grid-column:1; }
  .k-video { grid-column:1 / -1; aspect-ratio:16/9; max-height:56vh; width:100%; margin:18px auto 22px; background:#000; border-radius:var(--k-raio); display:grid; place-items:center; color:#fff; position:relative; overflow:hidden; }
  .k-video::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--k-acento) 45%, #000), #000 72%); }
  .k-video span { position:relative; display:grid; place-items:center; width:78px; height:78px; border-radius:50%; background:var(--k-acento); color:var(--k-acento-texto); font-size:30px; }
  .k-video small { position:absolute; left:14px; bottom:10px; font-size:14px; }
  .k-aula h1 { font-family:var(--k-titulo); font-size:clamp(32px,5vw,50px); line-height:1.12; margin:6px 0 12px; }
  .k-aula h2 { font-family:var(--k-titulo); font-size:clamp(23px,3vw,29px); line-height:1.2; margin:32px 0 8px; }
  .k-aula p { margin:0 0 14px; }
  .k-termo { border-bottom:2px dotted var(--k-acento); font-weight:600; }
  .k-nota { grid-column:2; align-self:start; font-size:14.5px; line-height:1.45; padding-left:11px; border-left:3px solid var(--k-acento); opacity:.9; margin-top:6px; }
  .k-caixa { background:var(--k-leitura-caixa); border-radius:var(--k-raio); padding:16px 18px; margin:18px 0; }
  .k-caixa h3 { font-family:var(--k-titulo); margin:0 0 6px; font-size:20px; }
  .k-op { display:block; width:100%; text-align:left; font:inherit; font-size:16px; color:inherit; background:var(--k-leitura-fundo); border:1.5px solid color-mix(in srgb, currentColor 25%, transparent); border-radius:var(--k-raio); padding:10px 13px; margin:7px 0; cursor:pointer; line-height:1.4; }
  .k-op:hover { border-color:var(--k-acento); }
  .k-op.certa { border-color:#2f9e5b; box-shadow:inset 4px 0 0 #2f9e5b; }
  .k-op.errada { border-color:#d9483b; box-shadow:inset 4px 0 0 #d9483b; }
  .k-fb { font-size:15.5px; margin:6px 0 0; }
  .k-aviso { position:fixed; z-index:80; left:50%; bottom:72px; transform:translateX(-50%); background:#000; color:#fff; font:500 14px/1.35 system-ui,sans-serif; padding:9px 15px; border-radius:10px; max-width:88vw; text-align:center; }
  @media (max-width:980px) {
    :root { --k-topo-h:52px; }
    .k-nav, .k-bt.so-pc { display:none; }
    .k-topo { gap:8px; padding:0 12px; }
    .k-painel { top:auto; left:0; right:0; width:100%; height:78%; border-radius:18px 18px 0 0; transform:translateY(102%); box-shadow:0 -20px 60px #0006; }
    .k-aula-corpo { display:block; }
    .k-nota { margin:0 0 14px; }
    .k-video { margin:0 -20px 18px; width:calc(100% + 40px); border-radius:0; }
    .k-troca { bottom:calc(10px + env(safe-area-inset-bottom)); font-size:13px; }
  }
  @media (prefers-reduced-motion: reduce) { .k-painel, .k-veu { transition:none; } }
  `;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let painel, veu, aula, focoAntes;

  function aviso(txt) {
    document.querySelector('.k-aviso')?.remove();
    const a = document.createElement('div');
    a.className = 'k-aviso';
    a.setAttribute('role', 'status');
    a.textContent = txt;
    document.body.append(a);
    setTimeout(() => a.remove(), 2600);
  }

  function modulo(n) { return window.CURSO[n]; }
  function estado(n) { return n < ATUAL ? 'feito' : n === ATUAL ? 'atual' : 'futuro'; }

  function abrirModulo(n) {
    const m = modulo(n);
    if (!m) return;
    focoAntes = document.activeElement;
    painel.innerHTML = `<header><h2>${m.n}. ${esc(m.t)}</h2><button class="k-fecha" aria-label="Fechar">×</button></header><p>${esc(m.d)}</p><ol class="k-aulas">${m.aulas.map(([id, t]) => `<li><button data-id="${id}" data-t="${esc(t)}"><span class="id">${id.replace('-', '.')}</span><span>${esc(t)}</span></button></li>`).join('')}</ol>`;
    painel.classList.add('on');
    veu.classList.add('on');
    painel.querySelector('.k-fecha').focus();
    document.dispatchEvent(new CustomEvent('k-modulo', { detail: n }));
  }
  function fecharModulo() {
    if (!painel.classList.contains('on')) return;
    painel.classList.remove('on');
    veu.classList.remove('on');
    focoAntes?.focus?.();
    document.dispatchEvent(new CustomEvent('k-fechar'));
  }
  function abrirAula(id, titulo) {
    aula.innerHTML = `<div class="k-aula-barra"><button class="k-bt borda k-volta">Voltar</button><strong>${esc(titulo)}</strong><span class="k-esp"></span><button class="k-bt borda k-tema">Noite</button></div>
    <div class="k-aula-corpo">
      <div class="k-video" role="img" aria-label="Lugar do vídeo"><span>▶</span><small>O vídeo da aula fica aqui, horizontal no PC e vertical no celular</small></div>
      <h1>${esc(titulo)}</h1>
      <p style="font-size:1.14em">Amostra de leitura: aqui você vê como o texto, as notas e os exercícios ficam neste tema. O conteúdo de verdade continua sendo o da prévia.</p>
      <h2>Para que serve</h2>
      <p>O <span class="k-termo">Git</span> guarda o histórico de uma pasta. Em vez de vinte arquivos com nomes parecidos, você tem uma pasta só, e pode voltar a qualquer versão antiga.</p>
      <aside class="k-nota"><strong>Git.</strong> Programa que guarda o histórico de uma pasta. Funciona sem internet.</aside>
      <section class="k-caixa"><h3>Pare e responda</h3><p>Você fez um commit. O trabalho já está no GitHub?</p>
        <button class="k-op" data-ok="0">Sim, o commit já envia</button>
        <button class="k-op" data-ok="1">Não, ainda falta o push</button>
        <p class="k-fb" aria-live="polite"></p></section>
      <section class="k-caixa"><h3>Tente lembrar</h3><p>Sem olhar para cima: qual é a diferença entre commit e push? Pense, e toque para ver.</p>
        <button class="k-op k-ver">Ver a resposta</button>
        <div class="k-res" hidden><p>Commit tira a foto no seu computador. Push envia para o GitHub.</p><button class="k-op" data-lem="1">Lembrei</button><button class="k-op" data-lem="0">Não lembrei, repetir amanhã</button></div></section>
    </div>`;
    aula.classList.add('on');
    aula.scrollTop = 0;
    aula.querySelector('.k-volta').focus();
    atualizarTema();
  }
  function atualizarTema() {
    const b = aula.querySelector('.k-tema');
    if (b) b.textContent = document.documentElement.dataset.leitura === 'noite' ? 'Dia' : 'Noite';
  }

  function iniciar({ id, topo = true } = {}) {
    const st = document.createElement('style');
    st.textContent = CSS;
    document.head.prepend(st);
    if (topo) {
      const t = document.createElement('header');
      t.className = 'k-topo';
      t.innerHTML = `<a class="k-marca" href="./">Do zero ao agente</a><nav class="k-nav" aria-label="Principal"><button aria-current="page">Mapa</button><button data-av>Vídeos</button><button data-av>Glossário</button><button data-av>Como funciona</button></nav><span class="k-esp"></span><button class="k-bt borda so-pc" data-av>Buscar</button><button class="k-bt borda so-pc" data-av>Perguntar ao tutor</button><button class="k-bt borda k-tema-topo">Noite</button>`;
      document.body.prepend(t);
    }
    painel = document.createElement('aside');
    painel.className = 'k-painel';
    painel.setAttribute('aria-label', 'Aulas do módulo');
    veu = document.createElement('div');
    veu.className = 'k-veu';
    aula = document.createElement('article');
    aula.className = 'k-aula';
    document.body.append(veu, painel, aula);
    const i = TEMAS.findIndex(q => q[0] === id);
    const ant = TEMAS[(i + TEMAS.length - 1) % TEMAS.length], prox = TEMAS[(i + 1) % TEMAS.length];
    const tr = document.createElement('nav');
    tr.className = 'k-troca';
    tr.setAttribute('aria-label', 'Trocar de tema');
    tr.innerHTML = `<a href="${ant[0]}.html" aria-label="Tema anterior: ${ant[1]}">◀</a><span>${i + 1} de ${TEMAS.length}: ${TEMAS[i]?.[1] || ''}</span><a href="${prox[0]}.html" aria-label="Próximo tema: ${prox[1]}">▶</a><a href="./" aria-label="Ver todos os temas" style="padding:0 10px;font-size:13px">Todos</a>`;
    document.body.append(tr);

    veu.addEventListener('click', fecharModulo);
    document.addEventListener('click', e => {
      if (e.target.closest('.k-fecha')) fecharModulo();
      const b = e.target.closest('.k-aulas button');
      if (b) abrirAula(b.dataset.id, b.dataset.t);
      if (e.target.closest('.k-volta')) aula.classList.remove('on');
      if (e.target.closest('[data-av]')) aviso('Nesta amostra, só muda a aparência do mapa. As outras páginas seguem o mesmo tema.');
      if (e.target.closest('.k-tema, .k-tema-topo')) {
        const h = document.documentElement;
        h.dataset.leitura = h.dataset.leitura === 'noite' ? 'dia' : 'noite';
        atualizarTema();
        const tt = document.querySelector('.k-tema-topo');
        if (tt) tt.textContent = h.dataset.leitura === 'noite' ? 'Dia' : 'Noite';
        document.dispatchEvent(new CustomEvent('k-noite', { detail: h.dataset.leitura === 'noite' }));
      }
      const op = e.target.closest('.k-op[data-ok]');
      if (op) {
        const cx = op.closest('.k-caixa');
        cx.querySelectorAll('.k-op').forEach(o => o.classList.remove('certa', 'errada'));
        const ok = op.dataset.ok === '1';
        op.classList.add(ok ? 'certa' : 'errada');
        cx.querySelector('.k-fb').textContent = ok ? 'Certo. Commit fica no computador; o push manda para o GitHub.' : 'Ainda não. O commit fica no seu computador.';
      }
      if (e.target.closest('.k-ver')) e.target.closest('.k-caixa').querySelector('.k-res').hidden = false;
      const lem = e.target.closest('[data-lem]');
      if (lem) aviso(lem.dataset.lem === '1' ? 'Boa. Esta pergunta volta em 7 dias.' : 'Sem problema. Esta pergunta volta amanhã.');
    });
    addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (aula.classList.contains('on')) aula.classList.remove('on');
      else fecharModulo();
    });
  }

  window.Kit = { iniciar, abrirModulo, fecharModulo, abrirAula, estado, modulo, aviso, ATUAL, TEMAS, continuar: () => abrirAula('3-1', 'Git e GitHub, do zero') };
})();
