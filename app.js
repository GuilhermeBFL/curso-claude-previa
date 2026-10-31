import { CURSO, GLOSSARIO } from './dados/curriculo.js';
import { AULAS } from './dados/aulas.js';
import { VIDEOS } from './dados/videos.js';

const app = document.getElementById('app');
const PROG_CHAVE = 'curso.progresso.v1';
const guardado = (() => { try { return JSON.parse(localStorage.getItem(PROG_CHAVE)) || {}; } catch { return {}; } })();
const estado = { feitas: guardado.feitas || {}, ultima: guardado.ultima || '3-1', notas: guardado.notas || {}, tempos: guardado.tempos || {}, paradas: guardado.paradas ?? false, formato: guardado.formato || 'auto', tema: guardado.tema || 'dia', revisao: guardado.revisao || {} };
const salvar = () => { try { localStorage.setItem(PROG_CHAVE, JSON.stringify(estado)); } catch { /* navegação privada */ } };
document.documentElement.dataset.tema = estado.tema;

const todasAulas = CURSO.flatMap(m => m.aulas.map(([id, t, s]) => ({ id, t, pronta: s === 'pronta', m })));
const aulaPorId = id => todasAulas.find(a => a.id === id);
const prontas = todasAulas.filter(a => a.pronta);
const pct = () => Math.round((prontas.filter(a => estado.feitas[a.id]).length / prontas.length) * 100);

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let idNota = 0;
function inline(txt) {
  let s = esc(txt);
  s = s.replace(/\{\{([\w-]+)(?:\|([^}]+))?\}\}/g, (_, k, rot) => {
    const g = GLOSSARIO[k];
    if (!g) return rot || k;
    const i = `n${++idNota}`;
    return `<input class="termo-t" type="checkbox" id="${i}" aria-label="Ver o que é ${esc(g[0])}"><label class="termo" for="${i}">${rot || g[0]}</label><span class="nota-m"><strong>${esc(g[0])}.</strong> ${esc(g[1])}</span>`;
  });
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return s;
}
function embaralhar(lista, texto) {
  let h = 7;
  for (const ch of texto) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const min = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const ICONE = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z"/></svg>',
  pausa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z"/></svg>',
  cheia: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5v2H6v3zm11-5h5v5h-2V6h-3zM4 15h2v3h3v2H4zm14 0h2v5h-5v-2h3z"/></svg>',
  girar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h6a2 2 0 0 1 2 2v5h-2V5H7v14h3v2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 11h6a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z"/></svg>',
  menos: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V1.5L7 6.5l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg>',
  mapa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2zm6 0v12l6 2V7z"/></svg>',
  aulas: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z"/></svg>',
  busca: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 3a7 7 0 1 1-4.3 12.5L3.4 20 2 18.6l4.5-2.3A7 7 0 0 1 10 3zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/></svg>',
  tutor: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/></svg>',
  video: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h13a1 1 0 0 1 1 1v3l4-3v10l-4-3v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/></svg>'
};

function barraTopo(rota) {
  return `<header class="topo">
    ${rota.startsWith('/aula') ? `<button class="botao-topo abrir-rail-btn" style="${matchMedia('(max-width:960px)').matches ? '' : 'display:none'}" aria-label="Abrir lista de aulas">${ICONE.aulas.replace('<svg', '<svg width="18" height="18" fill="currentColor"')}</button>` : ''}
    <a class="marca" href="#/">Do zero ao agente</a>
    <nav aria-label="Principal">
      <a href="#/" ${rota === '/' ? 'aria-current="page"' : ''}>Mapa</a>
      <a href="#/videos" ${rota === '/videos' ? 'aria-current="page"' : ''}>Vídeos</a>
      <a href="#/glossario" ${rota === '/glossario' ? 'aria-current="page"' : ''}>Glossário</a>
      <a href="#/como-funciona" ${rota === '/como-funciona' ? 'aria-current="page"' : ''}>Como funciona</a>
    </nav>
    <span class="espaco"></span>
    <button class="botao-topo so-pc" data-acao="busca">Buscar <kbd>Ctrl K</kbd></button>
    <button class="botao-topo so-pc" data-acao="tutor">Perguntar ao tutor</button>
    <button class="botao-topo" data-acao="tema" aria-label="Trocar entre leitura clara e leitura escura">${estado.tema === 'dia' ? 'Noite' : 'Dia'}</button>
    <div class="anel" style="--p:${pct()}" role="img" aria-label="${pct()}% das aulas desta prévia concluídas"><span>${pct()}%</span></div>
  </header>`;
}
function barraCelular(rota) {
  return `<nav class="barra-celular" aria-label="Navegação no celular">
    <a href="#/" ${rota === '/' ? 'aria-current="page"' : ''}>${ICONE.mapa}Mapa</a>
    <a href="#/videos" ${rota === '/videos' ? 'aria-current="page"' : ''}>${ICONE.video}Vídeos</a>
    <button data-acao="busca">${ICONE.busca}Buscar</button>
    <button data-acao="tutor">${ICONE.tutor}Tutor</button>
  </nav>`;
}

/* ---------- Início ---------- */
function telaInicio() {
  const u = aulaPorId(estado.ultima) || prontas[0];
  const modAtual = u.m.n;
  const portas = CURSO.map(m => {
    const prontasM = m.aulas.filter(a => a[2] === 'pronta');
    const feita = prontasM.length > 0 && prontasM.every(a => estado.feitas[a[0]]);
    return `<div class="porta" data-mod="${m.n}" data-aberta="false">
      <button class="folha ${feita ? 'feita' : ''}" aria-expanded="false" aria-controls="d${m.n}"><span class="num">${m.n}</span><span class="rot">${esc(m.t)}</span></button>
      <div class="dentro" id="d${m.n}">
        <div class="dentro-txt"><h2>${m.n}. ${esc(m.t)}</h2><p>${esc(m.d)}</p></div>
        <ol class="aulas-lista">${m.aulas.map(([id, t, s]) => s === 'pronta'
          ? `<li class="${estado.feitas[id] ? 'feita' : ''}"><a href="#/aula/${id}"><span class="id">${id.replace('-', '.')}</span><span>${esc(t)}</span><span class="tem">Pronta nesta prévia</span></a></li>`
          : `<li><span class="em-breve"><span class="id">${id.replace('-', '.')}</span><span>${esc(t)}</span></span></li>`).join('')}</ol>
      </div>
    </div>`;
  }).join('');
  return `${barraTopo('/')}<main class="inicio" id="conteudo">
    <section class="cabeca">
      <div><h1>Do zero ao agente</h1><p>Programação e tudo o que dá para fazer com o Claude, para quem nunca leu uma linha de código. São 18 portas: cada uma abre com texto, vídeo e prática.</p></div>
      <div><a class="continuar" href="#/aula/${u.id}"><small>Continue de onde parou</small><strong>${esc(u.t)}</strong></a>
      <button class="revisao-botao" data-acao="revisao">Revisão de hoje${perguntasDeRevisao().length ? `: ${perguntasDeRevisao().length}` : ''}</button></div>
    </section>
    <section class="portas" aria-label="Módulos do curso">${portas}</section>
  </main>${barraCelular('/')}`;
}
function ligarInicio() {
  const u = aulaPorId(estado.ultima) || prontas[0];
  const portas = [...document.querySelectorAll('.porta')];
  const abrir = (p, focar) => {
    for (const o of portas) {
      const a = o === p;
      o.dataset.aberta = a;
      o.querySelector('.folha').setAttribute('aria-expanded', a);
    }
    if (focar) p.querySelector('.aulas-lista a, .aulas-lista .em-breve')?.scrollIntoView({ block: 'nearest' });
  };
  portas.forEach(p => {
    p.querySelector('.folha').addEventListener('click', () => {
      const celular = matchMedia('(max-width:960px)').matches;
      if (celular && p.dataset.aberta === 'true') { p.dataset.aberta = 'false'; p.querySelector('.folha').setAttribute('aria-expanded', 'false'); return; }
      abrir(p, celular);
    });
  });
  // Momento único de movimento: a porta do módulo onde você parou se abre sozinha.
  const alvo = portas[u.m.n];
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!matchMedia('(max-width:960px)').matches) setTimeout(() => abrir(alvo), reduz ? 0 : 500);
}

/* ---------- Player adaptativo ---------- */
function formatoIdeal() {
  if (estado.formato !== 'auto') return estado.formato;
  return matchMedia('(max-width:960px) and (orientation: portrait)').matches ? '9x16' : '16x9';
}
function htmlPlayer(v) {
  return `<div class="player" data-formato="16x9" data-tocando="false" tabindex="0" aria-label="Vídeo: ${esc(v.titulo)}">
    <video playsinline preload="metadata" aria-label="${esc(v.titulo)}"></video>
    <button class="play-grande" aria-label="Tocar vídeo">${ICONE.play}</button>
    <div class="controles">
      <div class="barra" role="slider" aria-label="Posição do vídeo" aria-valuemin="0" aria-valuemax="${Math.round(v.duracao)}" aria-valuenow="0" tabindex="0">
        <div class="barra-fundo"><div class="barra-feito"></div>${v.capitulos.slice(1).map(c => `<span class="barra-marca" style="left:${(c.t / v.duracao) * 100}%"></span>`).join('')}<div class="barra-cab"></div></div>
      </div>
      <button class="c-play" aria-label="Tocar">${ICONE.play}</button>
      <button class="c-volta" aria-label="Voltar 10 segundos">${ICONE.menos}</button>
      <span class="tempo-txt">0:00 / ${min(v.duracao)}</span>
      <div class="direita">
        <select class="c-vel" aria-label="Velocidade"><option value="0.85">0,85x</option><option value="1" selected>1x</option><option value="1.25">1,25x</option><option value="1.5">1,5x</option></select>
        <button class="c-formato" aria-label="Trocar formato do vídeo" title="Horizontal ou vertical">${ICONE.girar}</button>
        <button class="c-cheia" aria-label="Tela cheia">${ICONE.cheia}</button>
      </div>
    </div>
  </div>`;
}
function ligarPlayer(raiz, v, aoFim) {
  const pl = raiz.querySelector('.player');
  const vid = pl.querySelector('video');
  const btnPlay = pl.querySelector('.c-play');
  const barra = pl.querySelector('.barra');
  const feito = pl.querySelector('.barra-feito');
  const cab = pl.querySelector('.barra-cab');
  const tempoTxt = pl.querySelector('.tempo-txt');
  const lista = raiz.querySelector('.lista-cap');
  let fmt = null;
  let perguntou = false;
  function trocar(novo, manter = true) {
    if (novo === fmt) return;
    const t = manter ? vid.currentTime || estado.tempos[v.id] || 0 : 0;
    const tocava = !vid.paused;
    fmt = novo;
    pl.dataset.formato = novo;
    vid.poster = `midia/${v.id}_${novo}.jpg`;
    vid.src = `midia/${v.id}_${novo}_v1.mp4`;
    vid.width = novo === '9x16' ? 1080 : 1920;
    vid.height = novo === '9x16' ? 1920 : 1080;
    vid.addEventListener('loadedmetadata', () => {
      if (t > 1 && t < v.duracao - 2) vid.currentTime = t;
      if (tocava) vid.play().catch(() => {});
    }, { once: true });
    vid.load();
    aviso();
  }
  function aviso() {
    pl.querySelector('.aviso-virar')?.remove();
    if (matchMedia('(max-width:960px)').matches && fmt === '9x16' && estado.formato === 'auto') {
      const a = document.createElement('div');
      a.className = 'aviso-virar';
      a.textContent = 'Vire o celular para ver na horizontal';
      pl.append(a);
      setTimeout(() => a.remove(), 3500);
    }
  }
  const atualizar = () => {
    const d = vid.duration || v.duracao;
    const p = (vid.currentTime / d) * 100 || 0;
    feito.style.width = `${p}%`;
    cab.style.left = `${p}%`;
    tempoTxt.textContent = `${min(vid.currentTime)} / ${min(d)}`;
    barra.setAttribute('aria-valuenow', Math.round(vid.currentTime));
    if (lista) {
      let at = 0;
      v.capitulos.forEach((c, i) => { if (vid.currentTime >= c.t) at = i; });
      lista.querySelectorAll('button[data-t]').forEach((b, i) => b.setAttribute('aria-current', i === at));
    }
    if (vid.currentTime > 2) { estado.tempos[v.id] = Math.floor(vid.currentTime); }
    // Parar no fim do capítulo, se a opção estiver ligada
    if (estado.paradas && !vid.paused) {
      for (const c of v.capitulos.slice(1)) {
        if (vid.currentTime >= c.t - 0.15 && vid.currentTime < c.t + 0.1 && pl.dataset.parou !== String(c.t)) {
          pl.dataset.parou = c.t;
          vid.pause();
        }
      }
    }
    // Pergunta antes do último capítulo
    if (v.pergunta && !perguntou && vid.currentTime >= v.pergunta.t) {
      perguntou = true;
      fazerPergunta();
    }
  };
  function fazerPergunta() {
    vid.pause();
    const q = v.pergunta;
    const caixa = document.createElement('div');
    caixa.className = 'pausa-pergunta';
    caixa.innerHTML = `<div><h3>${esc(q.p)}</h3>${q.o.map((o, i) => `<button data-i="${i}">${esc(o)}</button>`).join('')}<p class="res" hidden></p><button class="seguir">Continuar o vídeo</button></div>`;
    pl.append(caixa);
    const res = caixa.querySelector('.res');
    caixa.querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => {
      const certo = +b.dataset.i === q.c;
      res.hidden = false;
      res.textContent = (certo ? 'Isso. ' : 'Ainda não. ') + q.e;
    }));
    caixa.querySelector('.seguir').addEventListener('click', () => { caixa.remove(); vid.play(); });
    caixa.querySelector('[data-i]').focus();
  }
  const alternar = () => (vid.paused ? vid.play() : vid.pause());
  pl.querySelector('.play-grande').addEventListener('click', alternar);
  btnPlay.addEventListener('click', alternar);
  vid.addEventListener('click', alternar);
  vid.addEventListener('play', () => { pl.dataset.tocando = 'true'; btnPlay.innerHTML = ICONE.pausa; btnPlay.setAttribute('aria-label', 'Pausar'); });
  vid.addEventListener('pause', () => { pl.dataset.tocando = 'false'; btnPlay.innerHTML = ICONE.play; btnPlay.setAttribute('aria-label', 'Tocar'); salvar(); });
  vid.addEventListener('timeupdate', atualizar);
  vid.addEventListener('ended', () => { delete estado.tempos[v.id]; salvar(); aoFim && aoFim(); });
  vid.addEventListener('error', () => {
    const e = document.createElement('div');
    e.className = 'aviso-virar';
    e.textContent = 'O vídeo não abriu. Confira a internet e toque de novo.';
    pl.append(e);
  });
  pl.querySelector('.c-volta').addEventListener('click', () => { vid.currentTime = Math.max(0, vid.currentTime - 10); });
  pl.querySelector('.c-vel').addEventListener('change', e => { vid.playbackRate = +e.target.value; });
  pl.querySelector('.c-formato').addEventListener('click', () => {
    estado.formato = fmt === '16x9' ? '9x16' : '16x9';
    salvar();
    trocar(estado.formato);
  });
  pl.querySelector('.c-cheia').addEventListener('click', async () => {
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (pl.requestFullscreen) {
      try {
        await pl.requestFullscreen();
        if (screen.orientation?.lock) await screen.orientation.lock(fmt === '16x9' ? 'landscape' : 'portrait').catch(() => {});
      } catch { vid.webkitEnterFullscreen?.(); }
    } else vid.webkitEnterFullscreen?.();
  });
  const irPara = cx => {
    const r = barra.getBoundingClientRect();
    vid.currentTime = Math.max(0, Math.min(1, (cx - r.left) / r.width)) * (vid.duration || v.duracao);
    atualizar();
  };
  barra.addEventListener('pointerdown', e => { barra.setPointerCapture(e.pointerId); irPara(e.clientX); barra.onpointermove = m => irPara(m.clientX); });
  barra.addEventListener('pointerup', () => { barra.onpointermove = null; });
  barra.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { vid.currentTime += 5; e.preventDefault(); }
    if (e.key === 'ArrowLeft') { vid.currentTime -= 5; e.preventDefault(); }
  });
  pl.addEventListener('keydown', e => {
    if (e.target.closest('select, button, .barra')) return;
    if (e.code === 'Space') { e.preventDefault(); alternar(); }
    if (e.key === 'ArrowRight') vid.currentTime += 5;
    if (e.key === 'ArrowLeft') vid.currentTime -= 5;
  });
  let ocioso;
  const acorda = () => { pl.dataset.ocioso = 'false'; clearTimeout(ocioso); ocioso = setTimeout(() => { pl.dataset.ocioso = 'true'; }, 2600); };
  pl.addEventListener('pointermove', acorda);
  pl.addEventListener('pointerdown', acorda);
  pl.addEventListener('keydown', acorda);
  lista?.querySelectorAll('button[data-t]').forEach(b => b.addEventListener('click', () => {
    vid.currentTime = +b.dataset.t;
    pl.dataset.parou = b.dataset.t;
    vid.play();
    pl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }));
  raiz.querySelector('.op-paradas')?.addEventListener('change', e => { estado.paradas = e.target.checked; salvar(); });
  const tr = raiz.querySelector('.transcricao-botao');
  // Muda o arquivo quando o celular gira, sem perder o ponto do vídeo.
  const mq = matchMedia('(orientation: portrait)');
  const aoGirar = () => { if (estado.formato === 'auto') trocar(formatoIdeal()); };
  mq.addEventListener('change', aoGirar);
  addEventListener('resize', aoGirar);
  limpezas.push(() => { mq.removeEventListener('change', aoGirar); removeEventListener('resize', aoGirar); vid.pause(); salvar(); });
  trocar(formatoIdeal(), true);
  acorda();
  return { pl, vid };
}
function blocoCapitulos(v) {
  return `<aside class="lista-cap"><h3>Capítulos</h3>${v.capitulos.map(c => `<button data-t="${c.t}"><span class="t">${min(c.t)}</span><span>${esc(c.titulo)}</span></button>`).join('')}
    <div class="opcoes-video"><label><input type="checkbox" class="op-paradas" ${estado.paradas ? 'checked' : ''}> Parar no fim de cada capítulo</label></div>
  </aside>`;
}
function transcricao(v) {
  return `<details class="caixa" style="margin-top:0"><summary style="cursor:pointer;font-weight:700">Ler a transcrição do vídeo</summary><div style="margin-top:10px;font-size:.96rem">${v.falas.map(f => `<p style="margin:0 0 8px">${f.q ? `<strong>${esc(f.q)}:</strong> ` : ''}${esc(f.t)}</p>`).join('')}</div></details>`;
}

/* ---------- Aula ---------- */
function blocoHTML(b, i, aula) {
  const [tipo, d] = b;
  switch (tipo) {
    case 'h2': return `<h2 id="s${i}">${esc(d)}</h2>`;
    case 'p': return `<p>${inline(d)}</p>`;
    case 'quebra': return `<aside class="quebra"><strong>Onde a analogia quebra</strong>${inline(d)}</aside>`;
    case 'nota': return `<aside class="nota-aviso">${inline(d)}</aside>`;
    case 'lista': return `<ol class="regras">${d.map(x => `<li>${inline(x)}</li>`).join('')}</ol>`;
    case 'fluxo': return `<ol class="fluxo">${d.map(([q, t]) => `<li><strong>${esc(q)}</strong><span>${inline(t)}</span></li>`).join('')}</ol>`;
    case 'prever': return `<section class="caixa prever"><h3>Preveja antes de ver</h3><p>${inline(d.pergunta)}</p>${codigoHTML(d.codigo, false)}<button class="botao mostrar">Mostrar a resposta</button><div class="resposta" hidden>${inline(d.resposta)}${d.vivo ? `<div class="vivo" data-orig="${esc(d.codigo)}"><pre class="codigo vivo-cod"><code style="background:none;padding:0;font-size:1em">${esc(d.codigo)}</code></pre><iframe title="Resultado do código" sandbox></iframe></div><p style="margin:10px 0 6px;font-weight:700">Agora toque para mudar o código e veja o resultado:</p><div class="vivo-bts">${d.vivo.map(([r, c]) => `<button class="botao leve" data-cod="${esc(c)}">${esc(r)}</button>`).join('')}</div>` : ''}</div></section>`;
    case 'tabela': return `<div class="tab-rola"><table class="tab"><thead><tr>${d.colunas.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${d.linhas.map(l => `<tr>${l.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'pergunta': return `<section class="caixa pergunta" data-c="${d.c}"><h3>${esc(d.titulo || 'Pare e responda')}</h3><p>${inline(d.p)}</p>${embaralhar(d.o.map(([t, e], k) => ({ t, e, k })), d.p).map(o => `<button class="opcao" data-k="${o.k}" data-e="${esc(o.e)}">${inline(o.t)}</button>`).join('')}<div class="explica" aria-live="polite"></div></section>`;
    case 'erros': return `<div class="erros">${d.map(([a, c]) => `<div><strong>${inline(a)}</strong>${inline(c)}</div>`).join('')}</div>`;
    case 'parsons': return `<section class="caixa parsons" data-certo="${esc(JSON.stringify(d.linhas))}" data-notas="${esc(JSON.stringify(d.notas || []))}"><h3>Coloque na ordem</h3><p>${inline(d.p)}</p><div class="linhas"></div><button class="botao cheio conferir" style="margin-top:8px">Conferir a ordem</button><p class="explica" aria-live="polite"></p></section>`;
    case 'lembrar': return `<section class="caixa lembrar"><h3>Tente lembrar</h3><p>${inline(d.p)}</p><p style="font-size:.95rem;color:var(--texto-2)">Pense na resposta, sem olhar para cima. Você não precisa escrever nada.</p><button class="botao mostrar">Ver a resposta</button><div class="resposta" hidden><strong>Resposta.</strong> ${inline(d.r)}<div class="lembrou"><span>E aí, você lembrou?</span><button class="botao leve" data-dias="7" data-lembrou="Boa. Esta pergunta volta na sua revisão daqui a 7 dias.">Lembrei</button><button class="botao leve" data-dias="3" data-lembrou="Certo. Esta pergunta volta na sua revisão daqui a 3 dias.">Mais ou menos</button><button class="botao leve" data-dias="1" data-lembrou="Sem problema. Esta pergunta volta na sua revisão amanhã.">Não lembrei</button></div><p class="lembrou-res" aria-live="polite"></p></div></section>`;
    case 'lab': return `<section class="caixa lab" id="s${i}"><h3>Laboratório: ${esc(d.titulo)}</h3><p class="onde">${esc(d.lugar)}, ${esc(d.tempo)}</p>${d.link ? `<a class="botao" href="${esc(d.link[1])}" target="_blank" rel="noopener">${esc(d.link[0])}</a>` : ''}${d.antes ? `<p>${inline(d.antes)}</p>` : ''}<ol>${d.passos.map(([t, cod, espera], k) => `<li><label><input type="checkbox" data-lab="${i}-${k}"><span>${inline(t)}</span></label>${cod ? codigoHTML(cod, true) : ''}${espera ? `<p class="espera"><strong>O que deve acontecer:</strong> ${inline(espera)}</p>` : ''}</li>`).join('')}</ol>${d.errado ? `<p class="espera"><strong>Se der errado:</strong> ${inline(d.errado)}</p>` : ''}</section>`;
    case 'quebrado': return `<section class="caixa quebrado"><h3>${esc(d.titulo)}</h3><p>${inline(d.texto)}</p>${codigoHTML(d.codigo, false)}<p style="font-size:.95rem">Dica: ${inline(d.dica)}</p><button class="botao mostrar">Ver a causa</button><div class="resposta" hidden>${inline(d.resposta)}</div></section>`;
    case 'fontes': return `<section class="fontes" id="s${i}"><h2>Fontes desta aula</h2><p style="margin:0 0 6px;color:var(--texto-2)">Conferidas em 31/10/2026.</p><ul>${d.map(([t, u, n]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a><small>${esc(n)}</small></li>`).join('')}</ul></section>`;
    default: return '';
  }
}
function codigoHTML(c, copia = true) {
  return `<pre class="codigo">${copia ? '<button class="copiar">Copiar</button>' : ''}<code style="background:none;padding:0;font-size:1em">${esc(c)}</code></pre>`;
}
function mostraHTML(nv, codigo) {
  nv.querySelector('.vivo-cod code').textContent = codigo;
  nv.querySelector('iframe').srcdoc = `<!doctype html><meta charset=utf-8><body style="font-family:system-ui;padding:8px">${codigo}`;
}
function telaAula(id) {
  const info = aulaPorId(id);
  const aula = AULAS[id];
  if (!info || !aula) return telaEmBreve(info);
  estado.ultima = id;
  salvar();
  const v = VIDEOS[aula.video];
  const titulos = aula.blocos.map((b, i) => (b[0] === 'h2' ? [i, b[1]] : b[0] === 'lab' ? [i, 'Laboratório'] : b[0] === 'fontes' ? [i, 'Fontes'] : null)).filter(Boolean);
  const m = info.m;
  const pos = prontas.findIndex(a => a.id === id);
  const ant = prontas[pos - 1], prox = prontas[pos + 1];
  return `${barraTopo('/aula')}
  <div class="aula-grade">
    <aside class="rail" aria-label="Aulas do módulo">
      <a class="volta" href="#/">Voltar ao mapa</a>
      <h2>${m.n}. ${esc(m.t)}</h2>
      <ol>${m.aulas.map(([i2, t, s]) => {
        const nesta = i2 === id;
        const corpo = s === 'pronta' ? `<a href="#/aula/${i2}" ${nesta ? 'aria-current="page"' : ''}><span class="ponto ${estado.feitas[i2] ? 'feita' : ''}"></span><span>${esc(t)}</span></a>` : `<span><span class="ponto"></span><span>${esc(t)}</span></span>`;
        const sub = nesta ? `<nav class="nesta" aria-label="Nesta aula">${titulos.map(([k, tt]) => `<a href="#s${k}" data-ancora="s${k}">${esc(tt)}</a>`).join('')}</nav>` : '';
        return `<li>${corpo}${sub}</li>`;
      }).join('')}</ol>
    </aside>
    <main id="conteudo" style="min-width:0">
      <section class="palco-video" aria-label="Vídeo da aula">
        <div class="player-grade">${htmlPlayer(v)}${blocoCapitulos(v)}</div><button class="ler-aula">Ler a aula: ${esc(info.t)}</button>
      </section>
      <article class="folha-texto">
        <div class="coluna">
          <div class="miga"><a href="#/">Mapa</a>, módulo ${m.n}, aula ${id.split('-')[1]}</div>
          <h1>${esc(info.t)}</h1>
          <div class="meta-aula"><span>${aula.tempo} minutos com a prática</span><button class="botao leve pular-aula" style="min-height:36px;padding:0 12px">Já sei, quero pular</button></div>
          <p class="abertura">${inline(aula.abertura)}</p>
          ${aula.blocos.map((b, i) => (b[0] === 'fontes' ? '' : blocoHTML(b, i, aula))).join('')}
          ${aula.fixar ? blocoHTML(['pergunta', { titulo: 'Para fechar', p: 'Qual frase resume melhor esta aula?', o: aula.fixar.o, c: aula.fixar.c }], 'fim', aula) : ''}
          ${transcricao(v)}
          ${aula.blocos.map((b, i) => (b[0] === 'fontes' ? blocoHTML(b, i, aula) : '')).join('')}
          <div class="concluir"><span>${estado.feitas[id] ? 'Aula concluída.' : 'Terminou a prática?'}</span><button class="botao cheio marca-feita">${estado.feitas[id] ? 'Desmarcar aula' : 'Marcar como concluída'}</button></div>
          <div class="navega">${ant ? `<a class="botao" href="#/aula/${ant.id}">Aula anterior: ${esc(ant.t)}</a>` : '<span></span>'}${prox ? `<a class="botao cheio" href="#/aula/${prox.id}">Próxima: ${esc(prox.t)}</a>` : ''}</div>
        </div>
      </article>
    </main>
  </div>${barraCelular('/aula')}`;
}
function telaEmBreve(info) {
  return `${barraTopo('/')}<main class="pagina" id="conteudo"><h1>${info ? esc(info.t) : 'Aula não encontrada'}</h1><p>Esta aula entra na versão final. Nesta prévia, seis aulas estão prontas.</p><a class="botao-topo" href="#/">Voltar ao mapa</a></main>${barraCelular('/')}`;
}
function ligarAula(id) {
  const aula = AULAS[id];
  if (!aula) return;
  const raiz = document.getElementById('conteudo');
  const v = VIDEOS[aula.video];
  ligarPlayer(raiz, v);
  raiz.addEventListener('click', e => {
    const copiar = e.target.closest('.copiar');
    if (copiar) {
      const txt = copiar.parentElement.querySelector('code').textContent;
      navigator.clipboard?.writeText(txt);
      copiar.textContent = 'Copiado';
      setTimeout(() => { copiar.textContent = 'Copiar'; }, 1600);
    }
    const mostrar = e.target.closest('.mostrar');
    if (mostrar) {
      const caixa = mostrar.closest('.caixa');
      const res = caixa.querySelector('.resposta');
      res.hidden = !res.hidden;
      const nv = caixa.querySelector('.vivo');
      if (nv && !res.hidden) {
        mostraHTML(nv, nv.dataset.orig);
      }
    }
    const bCod = e.target.closest('[data-cod]');
    if (bCod) mostraHTML(bCod.closest('.resposta').querySelector('.vivo'), bCod.dataset.cod);
    const lembrou = e.target.closest('[data-lembrou]');
    if (lembrou) {
      const cx = lembrou.closest('.resposta');
      cx.querySelectorAll('[data-lembrou]').forEach(b => b.classList.toggle('cheio', b === lembrou));
      cx.querySelector('.lembrou-res').textContent = lembrou.dataset.lembrou;
      const bloco = aula.blocos.find(q => q[0] === 'lembrar');
      if (bloco) { estado.revisao[id + ':lembrar'] = { p: bloco[1].p, r: bloco[1].r, quando: Date.now() + +lembrou.dataset.dias * 864e5 }; salvar(); }
    }
    const op = e.target.closest('.opcao');
    if (op) {
      const caixa = op.closest('.pergunta');
      const certo = +op.dataset.k === +caixa.dataset.c;
      caixa.querySelectorAll('.opcao').forEach(o => o.classList.remove('certa', 'errada'));
      op.classList.add(certo ? 'certa' : 'errada');
      const ex = caixa.querySelector('.explica');
      ex.className = `explica ${certo ? 'certa' : 'errada'}`;
      ex.innerHTML = `<strong>${certo ? 'Certo.' : 'Ainda não.'}</strong>${op.dataset.e}`;
    }
  });
  // Exercício de ordenar: funciona com toque, sem arrastar.
  raiz.querySelectorAll('.parsons').forEach(p => {
    const certo = JSON.parse(p.dataset.certo);
    const notas = JSON.parse(p.dataset.notas);
    let ordem = certo.map((_, i) => i);
    let sem = certo.length * 7 + 3;
    const emb = a => { for (let i = a.length - 1; i > 0; i--) { sem = (sem * 31 + 7) % 101; const j = sem % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    emb(ordem);
    if (ordem.every((x, i) => x === i)) ordem.reverse();
    const pareceCod = /git |=|\(/.test(certo[0]);
    const lin = p.querySelector('.linhas');
    let conferido = false;
    const desenha = () => {
      lin.innerHTML = ordem.map((k, i) => `<div class="parsons-linha ${pareceCod ? '' : 'texto'} ${conferido ? (k === i ? 'ok' : 'no') : ''}"><span class="txt">${esc(certo[k])}${conferido && k === i && notas[k] ? `<span class="nota">${esc(notas[k])}</span>` : ''}</span><button data-m="-1" data-i="${i}" aria-label="Subir esta linha" ${i === 0 ? 'disabled' : ''}>▲</button><button data-m="1" data-i="${i}" aria-label="Descer esta linha" ${i === ordem.length - 1 ? 'disabled' : ''}>▼</button></div>`).join('');
    };
    desenha();
    lin.addEventListener('click', e => {
      const b = e.target.closest('button[data-m]');
      if (!b) return;
      const i = +b.dataset.i, m = +b.dataset.m;
      [ordem[i], ordem[i + m]] = [ordem[i + m], ordem[i]];
      conferido = false;
      desenha();
      lin.querySelectorAll('button[data-m]')[Math.max(0, (i + m) * 2 + (m > 0 ? 1 : 0))]?.focus();
    });
    p.querySelector('.conferir').addEventListener('click', () => {
      conferido = true;
      desenha();
      const ok = ordem.every((k, i) => k === i);
      const ex = p.querySelector('.explica');
      ex.className = `explica ${ok ? 'certa' : 'errada'}`;
      ex.innerHTML = ok ? '<strong>Certo.</strong>Essa é a ordem. Leia as notas em cada linha.' : '<strong>Ainda não.</strong>As linhas verdes estão no lugar. Mude as outras e confira de novo.';
    });
  });
  raiz.querySelectorAll('input[data-lab]').forEach(c => {
    const k = `${id}:${c.dataset.lab}`;
    c.checked = !!estado.notas['lab' + k];
    c.addEventListener('change', () => { estado.notas['lab' + k] = c.checked; salvar(); });
  });
  raiz.querySelector('.marca-feita').addEventListener('click', () => {
    if (estado.feitas[id]) delete estado.feitas[id]; else estado.feitas[id] = Date.now();
    salvar();
    render();
  });
  raiz.querySelector('.pular-aula').addEventListener('click', () => abrirProva(id));
  raiz.querySelector('.ler-aula').addEventListener('click', () => raiz.querySelector('.folha-texto').scrollIntoView());
  // Marcador da seção atual no menu lateral
  const ancoras = [...document.querySelectorAll('.nesta a')];
  if (ancoras.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(ents => {
      for (const en of ents) if (en.isIntersecting) {
        ancoras.forEach(a => a.classList.toggle('ativa', a.dataset.ancora === en.target.id));
      }
    }, { rootMargin: '-20% 0px -70% 0px' });
    raiz.querySelectorAll('.coluna [id^="s"]').forEach(h => obs.observe(h));
    limpezas.push(() => obs.disconnect());
  }
  ancoras.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById(a.dataset.ancora)?.scrollIntoView();
    document.querySelector('.rail')?.classList.remove('aberta');
  }));
  document.querySelector('.abrir-rail-btn')?.addEventListener('click', () => document.querySelector('.rail').classList.toggle('aberta'));
}

/* ---------- Provas e revisão ---------- */
function abrirModal(html, aoAbrir) {
  const veu = document.createElement('div');
  veu.className = 'veu';
  veu.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
  const fechar = () => { veu.remove(); removeEventListener('keydown', esc2); ultimoFoco?.focus?.(); };
  const esc2 = e => { if (e.key === 'Escape') fechar(); };
  const ultimoFoco = document.activeElement;
  veu.addEventListener('click', e => { if (e.target === veu || e.target.closest('[data-fechar]')) fechar(); });
  addEventListener('keydown', esc2);
  document.body.append(veu);
  aoAbrir?.(veu, fechar);
  return fechar;
}
function perguntasHTML(lista) {
  return lista.map((q, i) => `<section data-q="${i}" style="margin:12px 0"><p style="margin:0 0 4px;font-weight:700">${esc(q.p)}</p>${embaralhar(q.o.map((t, k) => ({ t, k })), q.p).map(o => `<button class="opcao" data-k="${o.k}">${esc(o.t)}</button>`).join('')}<p class="explica" aria-live="polite"></p></section>`).join('');
}
function responderEm(s, q, aoResponder) {
  s.addEventListener('click', e => {
    const b = e.target.closest('.opcao');
    if (!b || s.dataset.feita) return;
    s.dataset.feita = '1';
    const ok = +b.dataset.k === q.c;
    b.classList.add(ok ? 'certa' : 'errada');
    s.querySelector(`.opcao[data-k="${q.c}"]`).classList.add('certa');
    const ex = s.querySelector('.explica');
    ex.className = `explica ${ok ? 'certa' : 'errada'}`;
    ex.innerHTML = `<strong>${ok ? 'Certo.' : 'Ainda não.'}</strong>${q.e ? esc(q.e) : ''}`;
    aoResponder?.(ok);
  });
}
function abrirProva(id) {
  const lista = AULAS[id].prova;
  abrirModal(`<h2>Mostre que já sabe</h2><p>Uma tentativa em cada pergunta. Acertando as duas, a aula conta como concluída.</p>${perguntasHTML(lista)}<p class="res" aria-live="polite"></p><button class="botao" data-fechar>Voltar para a aula</button>`, veu => {
    let certas = 0, feitas = 0;
    veu.querySelectorAll('section[data-q]').forEach(s => responderEm(s, lista[+s.dataset.q], ok => {
      feitas++;
      if (ok) certas++;
      if (feitas === lista.length) {
        const res = veu.querySelector('.res');
        if (certas === lista.length) {
          estado.feitas[id] = Date.now();
          salvar();
          res.innerHTML = '<strong>Pode pular.</strong> A aula ficou marcada como concluída.';
        } else res.innerHTML = '<strong>Vale ver a aula.</strong> Assim você fecha o que faltou.';
      }
    }));
  });
}
function perguntasDeRevisao() {
  const hoje = Date.now();
  return Object.entries(estado.revisao).filter(([, r]) => r.quando <= hoje);
}
function abrirRevisao() {
  const devidas = perguntasDeRevisao();
  if (devidas.length) {
    abrirModal(`<h2>Revisão de hoje</h2><p>Pense na resposta antes de tocar. Lembrar sem olhar fixa melhor que reler.</p>${devidas.map(([k, r]) => `<section class="caixa" data-chave="${esc(k)}"><p style="margin:0 0 8px;font-weight:700">${esc(r.p)}</p><button class="botao mostrar-rev">Ver a resposta</button><div class="resposta" hidden>${esc(r.r)}<div class="lembrou"><button class="botao leve" data-rev="7">Lembrei</button><button class="botao leve" data-rev="3">Mais ou menos</button><button class="botao leve" data-rev="1">Não lembrei</button></div></div></section>`).join('')}<button class="botao" data-fechar>Fechar</button>`, veu => {
      veu.addEventListener('click', e => {
        const m = e.target.closest('.mostrar-rev');
        if (m) m.nextElementSibling.hidden = false;
        const b = e.target.closest('[data-rev]');
        if (b) {
          const cx = b.closest('[data-chave]');
          estado.revisao[cx.dataset.chave].quando = Date.now() + +b.dataset.rev * 864e5;
          salvar();
          cx.remove();
        }
      });
    });
    return;
  }
  const lista = [AULAS['3-1'].prova[0], AULAS['11-1'].prova[1]];
  abrirModal(`<h2>Revisão de hoje</h2><p>Nada vencendo hoje. Estas duas são um exemplo de como a revisão funciona: as perguntas que você marcar em "Tente lembrar" voltam aqui nos dias seguintes.</p>${perguntasHTML(lista)}<button class="botao" data-fechar>Fechar</button>`, veu => {
    veu.querySelectorAll('section[data-q]').forEach(s => responderEm(s, lista[+s.dataset.q]));
  });
}
function abrirBusca() {
  const itens = [
    ...todasAulas.map(a => ({ t: a.t, s: a.pronta ? `Módulo ${a.m.n}: ${a.m.t}` : `Módulo ${a.m.n}: entra na versão final`, h: `#/aula/${a.id}` })),
    ...Object.values(GLOSSARIO).map(([t, d]) => ({ t, s: d, h: '#/glossario' }))
  ];
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  abrirModal(`<h2>Buscar</h2><input class="busca-campo" type="search" placeholder="Digite: commit, chave, skill..." aria-label="Buscar no curso"><ul class="busca-res"></ul>`, (veu, fechar) => {
    const ca = veu.querySelector('input'), ul = veu.querySelector('ul');
    const lista = () => {
      const q = norm(ca.value.trim());
      const r = (q ? itens.filter(i => norm(i.t + ' ' + i.s).includes(q)) : prontas.map(a => ({ t: a.t, s: `Módulo ${a.m.n}: ${a.m.t}`, h: `#/aula/${a.id}` }))).slice(0, 8);
      ul.innerHTML = r.length ? r.map(i => `<li><a href="${i.h}">${esc(i.t)}<small>${esc(i.s)}</small></a></li>`).join('') : `<li style="padding:10px 11px">Nada encontrado para "${esc(ca.value)}". Tente outra palavra.</li>`;
    };
    ca.addEventListener('input', lista);
    ul.addEventListener('click', e => { if (e.target.closest('a')) fechar(); });
    lista();
    ca.focus();
  });
}
function alternarTutor() {
  const ja = document.querySelector('.tutor');
  if (ja) { ja.remove(); return; }
  const m = location.hash.match(/aula\/([\w-]+)/);
  const aula = m ? AULAS[m[1]] : null;
  const info = m ? aulaPorId(m[1]) : null;
  const sug = aula ? aula.tutor : [['O que eu estudo primeiro?', 'Comece pela porta 0, mesmo que pareça fácil. Abra o mapa e me diga qual termo daquela lista você nunca ouviu.'], ['Quanto tempo leva?', 'Com 3 a 7 horas por semana, de 4 a 6 meses. Quantas horas você quer reservar nesta semana?']];
  const el = document.createElement('aside');
  el.className = 'tutor';
  el.setAttribute('aria-label', 'Tutor do curso');
  el.innerHTML = `<header><h2>Tutor<small>Demonstração: respostas prontas, sem IA ainda</small></h2><button class="fecha" aria-label="Fechar tutor">×</button></header>
    <div class="msgs" aria-live="polite"><div class="msg bot">${info ? `Estou com a aula "${esc(info.t)}" aberta. Em vez de dar a resposta pronta, vou te guiar por partes.` : 'Oi. Abra uma aula e eu respondo com base nela.'}</div></div>
    <div class="sugestoes">${sug.map(([p], i) => `<button data-i="${i}">${esc(p)}</button>`).join('')}</div>
    <form><input type="text" placeholder="Escreva sua dúvida" aria-label="Sua dúvida" maxlength="400"><button>Enviar</button></form>`;
  document.body.append(el);
  const msgs = el.querySelector('.msgs');
  const addMsg = (t, q) => { const d = document.createElement('div'); d.className = `msg ${q}`; d.textContent = t; msgs.append(d); msgs.scrollTop = msgs.scrollHeight; };
  el.querySelector('.fecha').addEventListener('click', () => el.remove());
  el.querySelector('.sugestoes').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    const [p, r] = sug[+b.dataset.i];
    addMsg(p, 'eu');
    setTimeout(() => addMsg(r, 'bot'), 300);
    b.remove();
  });
  el.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const inp = el.querySelector('input');
    if (!inp.value.trim()) return;
    addMsg(inp.value.trim(), 'eu');
    inp.value = '';
    setTimeout(() => addMsg('Nesta prévia, eu só respondo às perguntas sugeridas. Na versão final, respondo com o Claude, usando a aula aberta como base.', 'bot'), 300);
  });
}

/* ---------- Outras telas ---------- */
function cartaoVideo(id, aulaId) {
  const v = VIDEOS[id];
  return `<a class="cartao-video" href="#/aula/${aulaId}"><span class="capa"><img src="midia/${id}_16x9.jpg" alt="" loading="lazy" width="640" height="360"><span class="dur">${min(v.duracao)}</span></span><strong>${esc(v.titulo)}</strong><small>Aula ${aulaId.replace('-', '.')}</small></a>`;
}
function telaVideos() {
  const longos = [['c1-agente', '12-1'], ['c2-git', '3-1'], ['c3-skill-mcp', '8-1']];
  const curtos = [['s1-html-word-pdf', '0-3'], ['s2-chave-api', '11-1'], ['s3-biblioteca', '4-1']];
  return `${barraTopo('/videos')}<main class="pagina" id="conteudo"><h1>Vídeos desta prévia</h1>
    <p>A voz é provisória: a versão final usa o ElevenLabs. Todo vídeo existe em horizontal e vertical. O site escolhe sozinho, e troca se você girar o celular.</p>
    <section class="grupo-videos"><h2>Conversas</h2><p>Para conceitos difíceis. Bonecos conversando, câmera trocando de pessoa e imagens saltando na tela.</p><div class="grade-videos">${longos.map(([a, b]) => cartaoVideo(a, b)).join('')}</div></section>
    <section class="grupo-videos"><h2>Explicações curtas</h2><p>Para uma ideia só, em menos de um minuto.</p><div class="grade-videos">${curtos.map(([a, b]) => cartaoVideo(a, b)).join('')}</div></section>
  </main>${barraCelular('/videos')}`;
}
function telaGlossario() {
  const itens = Object.values(GLOSSARIO).sort((a, b) => a[0].localeCompare(b[0], 'pt'));
  return `${barraTopo('/glossario')}<main class="pagina" id="conteudo"><h1>Glossário</h1><p>Toda palavra técnica do curso, com o sentido que ela tem aqui.</p>
    <input class="gloss-busca" type="search" placeholder="Filtrar palavras" aria-label="Filtrar o glossário">
    <dl class="gloss">${itens.map(([t, d]) => `<div data-b="${esc((t + ' ' + d).toLowerCase())}"><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>
  </main>${barraCelular('/glossario')}`;
}
function telaComoFunciona() {
  const itens = [
    ['Texto e vídeo, sempre juntos', 'O vídeo ajuda a entender. O texto é onde está a matéria inteira. Nenhum substitui o outro.'],
    ['Dois tipos de vídeo', 'Conversas de 2 a 10 minutos para o que é difícil. Explicações curtas, de até 2 minutos, para um detalhe.'],
    ['No PC e no celular', 'No PC, o vídeo é horizontal. No celular, é vertical, e vira horizontal se você girar o aparelho, sem perder o ponto.'],
    ['Preveja antes de ver', 'Todo código começa com uma pergunta. A resposta só aparece depois que você tentou.'],
    ['Nada de escrever', 'Todos os exercícios são de assinalar, ordenar ou tocar. Funciona no PC e no celular.'],
    ['Palavras na margem', 'No PC, o termo técnico aparece explicado na margem do texto. No celular, abre ao toque.'],
    ['Tentar lembrar', 'No fim da aula, você pensa na resposta, toca para ver e marca se lembrou. Nada de escrever. As perguntas voltam nos dias seguintes, conforme o que você marcou.'],
    ['Prática no seu PC', 'Cada aula termina com algo real no Claude Code. Alguns laboratórios já vêm quebrados, para você achar o erro.'],
    ['Pular só com prova', 'Já sabe? Acerte duas perguntas, de primeira, e a aula conta como concluída.'],
    ['Tutor na própria aula', 'Ele responde com base na aula aberta e guia por partes. Nesta prévia, as respostas ainda são prontas.'],
    ['Progresso guardado', 'Fica salvo em cada aparelho. Sincronizar entre PC e celular vira exercício seu no módulo 15.'],
    ['Abre sem internet', 'As aulas que você já abriu continuam disponíveis. Os vídeos precisam de conexão.']
  ];
  return `${barraTopo('/como-funciona')}<main class="pagina" id="conteudo"><h1>Como este curso funciona</h1><p>Esta é uma prévia para decidir o formato. Seis aulas estão prontas, e as outras aparecem no mapa com o título previsto.</p>
    <div class="sobre-grade">${itens.map(([a, b]) => `<section><h2>${esc(a)}</h2><p>${esc(b)}</p></section>`).join('')}</div>
    <p style="margin-top:34px"><a class="botao-topo" href="#/aula/3-1" style="text-decoration:none">Abrir a aula de Git</a></p>
  </main>${barraCelular('/como-funciona')}`;
}

/* ---------- Roteador ---------- */
const limpezas = [];
function render() {
  while (limpezas.length) limpezas.pop()();
  document.querySelector('.tutor')?.remove();
  idNota = 0;
  const h = location.hash.replace(/^#/, '') || '/';
  const m = h.match(/^\/aula\/([\w-]+)/);
  document.body.dataset.rota = m ? 'aula' : 'outra';
  if (m) {
    app.innerHTML = telaAula(m[1]);
    ligarAula(m[1]);
    scrollTo(0, 0);
    document.title = `${aulaPorId(m[1])?.t || 'Aula'}: Do zero ao agente`;
  } else if (h === '/videos') {
    app.innerHTML = telaVideos();
    document.title = 'Vídeos: Do zero ao agente';
    scrollTo(0, 0);
  } else if (h === '/glossario') {
    app.innerHTML = telaGlossario();
    document.title = 'Glossário: Do zero ao agente';
    const inp = document.querySelector('.gloss-busca');
    inp.addEventListener('input', () => {
      const q = inp.value.toLowerCase();
      document.querySelectorAll('.gloss > div').forEach(d => { d.hidden = !d.dataset.b.includes(q); });
    });
    scrollTo(0, 0);
  } else if (h === '/como-funciona') {
    app.innerHTML = telaComoFunciona();
    document.title = 'Como funciona: Do zero ao agente';
    scrollTo(0, 0);
  } else {
    app.innerHTML = telaInicio();
    ligarInicio();
    document.title = 'Do zero ao agente';
    scrollTo(0, 0);
  }
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-acao]');
  if (!b) return;
  const a = b.dataset.acao;
  if (a === 'busca') abrirBusca();
  if (a === 'tutor') alternarTutor();
  if (a === 'revisao') abrirRevisao();
  if (a === 'tema') {
    estado.tema = estado.tema === 'dia' ? 'noite' : 'dia';
    document.documentElement.dataset.tema = estado.tema;
    b.textContent = estado.tema === 'dia' ? 'Noite' : 'Dia';
    salvar();
  }
});
addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); abrirBusca(); }
});
addEventListener('hashchange', render);
render();
window.__estado = estado;

if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
