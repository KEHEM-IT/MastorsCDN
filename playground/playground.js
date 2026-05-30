// ─── Snippet Library ──────────────────────────────────────────────────────────
const SNIPPETS = {

welcome: {
html: `<div class="card">
  <div class="icon">◆</div>
  <h1>CSS 2027 Playground</h1>
  <p>Write HTML and CSS in the editors.<br>The preview updates in real time.</p>
  <div class="badges">
    <span class="badge blue">Container Queries</span>
    <span class="badge purple">@property</span>
    <span class="badge green">:has()</span>
    <span class="badge pink">Scroll-Driven</span>
    <span class="badge amber">color-mix()</span>
  </div>
  <p class="hint">← Select a snippet above to explore</p>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: #060b16;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem;
}
.card {
  background: #0f1a2e;
  border: 1px solid #1b2b45;
  border-radius: 18px;
  padding: 2.5rem 2rem;
  max-width: 440px; width: 100%;
  text-align: center;
  box-shadow: 0 24px 64px rgba(0,0,0,.55),
              0 0 0 1px rgba(91,141,238,.08);
}
.icon {
  font-size: 2.2rem; margin-bottom: 1.1rem;
  background: linear-gradient(135deg, #5b8dee, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
h1 {
  font-size: 1.65rem; font-weight: 800;
  color: #e8edf5; margin-bottom: .7rem;
  letter-spacing: -.03em;
}
p {
  color: #7d9ab8; font-size: .9rem;
  line-height: 1.75; margin-bottom: 1.5rem;
}
.badges {
  display: flex; flex-wrap: wrap;
  gap: .45rem; justify-content: center;
  margin-bottom: 1.75rem;
}
.badge {
  font-size: .7rem; font-weight: 700;
  padding: .22rem .72rem; border-radius: 99px;
}
.badge.blue   { background:rgba(91,141,238,.14); color:#5b8dee; border:1px solid rgba(91,141,238,.28); }
.badge.purple { background:rgba(139,92,246,.14); color:#a78bfa; border:1px solid rgba(139,92,246,.28); }
.badge.green  { background:rgba(34,211,165,.12); color:#22d3a5; border:1px solid rgba(34,211,165,.25); }
.badge.pink   { background:rgba(244,114,182,.12); color:#f472b6; border:1px solid rgba(244,114,182,.25); }
.badge.amber  { background:rgba(246,165,42,.12); color:#f6a52a; border:1px solid rgba(246,165,42,.25); }
.hint {
  font-size: .76rem; color: #3d566e;
  margin-bottom: 0; font-style: italic;
}`,
js: ``
},

container: {
html: `<div class="page">
  <h2>Container Query Card</h2>
  <p>Resize the browser — the card adapts to its container, not the viewport.</p>
  <div class="wrapper">
    <div class="card">
      <div class="card-img"></div>
      <div class="card-body">
        <h3>Adaptive Layout</h3>
        <p>When wide: side-by-side. When narrow: stacked. Zero media queries on the card itself.</p>
        <a class="btn">Read More</a>
      </div>
    </div>
  </div>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh; color: #e8edf5;
}
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: .4rem; letter-spacing: -.02em; }
p { color: #7d9ab8; font-size: .84rem; line-height: 1.7; }
.wrapper {
  container-type: inline-size;
  container-name: card-cq;
  max-width: 680px; margin: 1.5rem auto 0;
}
.card {
  background: #0f1a2e;
  border: 1px solid #1b2b45;
  border-radius: 14px; overflow: hidden;
}
@container card-cq (min-width: 420px) {
  .card { display: flex; }
  .card-img { width: 160px; flex-shrink: 0; }
  .card-body { padding: 1.75rem; }
}
@container card-cq (max-width: 419px) {
  .card-img { width: 100%; height: 120px; }
  .card-body { padding: 1.2rem; }
}
.card-img {
  background: linear-gradient(135deg, #5b8dee, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem; color: white;
}
.card-img::after { content: '◆'; }
h3 { font-size: 1rem; font-weight: 700; margin-bottom: .5rem; color: #e8edf5; }
.card-body p { margin-bottom: 1rem; }
.btn {
  display: inline-block; background: #5b8dee; color: white;
  font-size: .78rem; font-weight: 600;
  padding: .4rem 1rem; border-radius: 7px; text-decoration: none;
}`,
js: ``
},

colormix: {
html: `<div class="demo">
  <h2>CSS Color Level 5</h2>
  <section>
    <h3>color-mix() — 20% steps</h3>
    <div class="row" id="mix"></div>
  </section>
  <section>
    <h3>OKLCH hue rotation (0–300°)</h3>
    <div class="row" id="hue"></div>
  </section>
  <section>
    <h3>Relative color syntax</h3>
    <div class="rel-row">
      <div class="rel" style="background:oklch(50% .22 264)">Base<br><small>oklch(50% .22 264)</small></div>
      <div class="rel" style="background:oklch(70% .22 264);color:#0a1a2e">+Light<br><small>calc(l+.2)</small></div>
      <div class="rel" style="background:oklch(30% .22 264)">+Dark<br><small>calc(l-.2)</small></div>
      <div class="rel" style="background:oklch(50% .32 264)">+Chrome<br><small>calc(c+.1)</small></div>
    </div>
  </section>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 580px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -.02em; }
section {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 12px; padding: 1.2rem; margin-bottom: 1rem;
}
h3 {
  font-size: .72rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .08em; color: #4a6080; margin-bottom: .85rem;
}
.row { display: flex; gap: .5rem; flex-wrap: wrap; }
.swatch {
  width: 40px; height: 40px; border-radius: 8px;
  cursor: default; transition: transform .2s;
}
.swatch:hover { transform: scale(1.2); }
.rel-row { display: flex; gap: .65rem; flex-wrap: wrap; }
.rel {
  flex: 1; min-width: 100px; padding: .9rem .75rem;
  border-radius: 10px; font-size: .75rem; font-weight: 600;
  text-align: center; line-height: 1.5; color: white;
}
small { font-size: .62rem; opacity: .75; font-family: 'DM Mono', monospace; display:block; }`,
js: `const mixRow = document.getElementById('mix');
for(let p=100;p>=5;p-=13){
  const d=document.createElement('div');
  d.className='swatch';
  d.style.background='color-mix(in oklch,#5b8dee '+p+'%,white)';
  d.title=p+'%';
  mixRow.appendChild(d);
}
const hueRow = document.getElementById('hue');
for(let h=0;h<=300;h+=43){
  const d=document.createElement('div');
  d.className='swatch';
  d.style.background='oklch(60% .22 '+h+')';
  d.title='H:'+h;
  hueRow.appendChild(d);
}`
},

nesting: {
html: `<div class="app">
  <nav class="nav">
    <a href="javascript:void(0)" class="active">Home</a>
    <a href="javascript:void(0)">Docs</a>
    <a href="javascript:void(0)">Examples</a>
    <a href="javascript:void(0)">Playground</a>
    <a href="javascript:void(0)">About</a>
  </nav>
  <div class="cards">
    <article class="card">
      <h2>Native CSS Nesting</h2>
      <p>Nest rules inside parents — same syntax as SASS, now native CSS. No build step needed.</p>
      <footer><span class="tag">CSS 2027</span><button>Learn more</button></footer>
    </article>
    <article class="card card--featured">
      <h2>Featured Article</h2>
      <p>This card uses <code>.card--featured</code> modifier — all styled with nested rules.</p>
      <footer><span class="tag">Featured</span><button>Read →</button></footer>
    </article>
  </div>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.app { max-width: 600px; margin: 0 auto; }
.nav {
  display: flex; gap: .4rem; flex-wrap: wrap;
  background: #0f1a2e; padding: .55rem .75rem;
  border-radius: 10px; border: 1px solid #1b2b45;
  margin-bottom: 1.25rem;

  & a {
    color: #7d9ab8; text-decoration: none;
    font-size: .82rem; padding: .28rem .65rem;
    border-radius: 6px; transition: all .2s;

    &:hover { color: #e8edf5; background: rgba(91,141,238,.1); }
    &.active { color: #5b8dee; background: rgba(91,141,238,.14); font-weight: 600; }
  }
}
.cards {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;

  @media (max-width: 480px) { grid-template-columns: 1fr; }
}
.card {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 12px; padding: 1.25rem;
  transition: border-color .2s;

  &:hover { border-color: #243348; }

  & h2 { font-size: .98rem; font-weight: 700; color: #e8edf5; margin-bottom: .45rem; }
  & p  { font-size: .79rem; color: #7d9ab8; line-height: 1.6; margin-bottom: 1rem; }
  & code {
    font-family: 'DM Mono', monospace; font-size: .76rem;
    color: #5b8dee; background: rgba(91,141,238,.1);
    padding: .1rem .3rem; border-radius: 4px;
  }
  & footer { display: flex; align-items: center; justify-content: space-between; }
  & .tag {
    font-size: .67rem; font-weight: 700;
    background: rgba(91,141,238,.12); color: #5b8dee;
    border: 1px solid rgba(91,141,238,.25); padding: .18rem .6rem; border-radius: 99px;
  }
  & button {
    background: none; border: 1px solid #1b2b45; color: #7d9ab8;
    font-size: .75rem; padding: .28rem .7rem; border-radius: 6px;
    cursor: pointer; font-family: inherit; transition: all .2s;
    &:hover { border-color: #5b8dee; color: #5b8dee; }
  }

  &.card--featured {
    border-color: rgba(91,141,238,.35);
    background: linear-gradient(145deg, #0f1a2e, #131f38);
    & .tag { background: rgba(139,92,246,.14); color: #a78bfa; border-color: rgba(139,92,246,.28); }
  }
}`,
js: ``
},

has: {
html: `<div class="demo">
  <h2>:has() — Parent Selector</h2>
  <ul class="todo">
    <li><input type="checkbox"> Build container query component</li>
    <li><input type="checkbox"> Test @scope feature</li>
    <li><input type="checkbox"> Write scroll-driven animation</li>
    <li><input type="checkbox"> Explore oklch() colors</li>
    <li><input type="checkbox"> Deploy to production</li>
  </ul>
  <div class="grid">
    <div class="card"><h3>Text Only</h3><p>No image — plain layout.</p></div>
    <div class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect width='200' height='100' fill='%231b2b45'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%235b8dee' font-size='14' font-family='sans-serif'%3E◆%3C/text%3E%3C/svg%3E" alt="demo">
      <h3>Has Image</h3>
      <p>:has(img) changes this layout.</p>
    </div>
  </div>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 540px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: 1.25rem; letter-spacing: -.02em; }
.todo {
  list-style: none; background: #0f1a2e;
  border: 1px solid #1b2b45; border-radius: 12px;
  padding: .65rem; margin-bottom: 1.25rem;
}
.todo li {
  display: flex; align-items: center; gap: .6rem;
  padding: .52rem .65rem; border-radius: 7px;
  font-size: .83rem; color: #e8edf5;
  transition: all .25s; cursor: pointer;
}
.todo li:hover { background: rgba(255,255,255,.03); }
.todo li:has(input:checked) {
  text-decoration: line-through; color: #3d566e;
}
.todo input[type="checkbox"] {
  accent-color: #5b8dee; width: 15px; height: 15px;
  cursor: pointer; flex-shrink: 0;
}
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.card {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 12px; overflow: hidden; padding: 1rem;
}
.card:has(img) {
  padding: 0; display: flex; flex-direction: column;
  border-color: rgba(91,141,238,.3);
}
.card img { width: 100%; height: 75px; object-fit: cover; }
.card:has(img) h3, .card:has(img) p { padding: .7rem .85rem; }
.card:has(img) p { padding-top: 0; }
.card h3 { font-size: .9rem; font-weight: 700; color: #e8edf5; margin-bottom: .35rem; }
.card p  { font-size: .78rem; color: #7d9ab8; line-height: 1.55; }`,
js: ``
},

property: {
html: `<div class="demo">
  <h2>@property — Typed Custom Properties</h2>
  <div class="cards">
    <div class="card spin-card">
      <div class="spinner"></div>
      <h3>Animatable Angle</h3>
      <p><code>--angle</code> defined as <code>&lt;angle&gt;</code> — animates smoothly via CSS.</p>
    </div>
    <div class="card prog-card">
      <div class="progress-ring">
        <svg viewBox="0 0 80 80">
          <circle class="track" cx="40" cy="40" r="32"/>
          <circle class="fill" cx="40" cy="40" r="32"/>
        </svg>
        <span class="prog-text">72%</span>
      </div>
      <h3>Progress Ring</h3>
      <p>Typed <code>--progress</code> property drives the stroke offset animation.</p>
    </div>
  </div>
</div>`,
css: `@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@property --progress {
  syntax: '<number>';
  initial-value: 0;
  inherits: false;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 560px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: 1.25rem; letter-spacing: -.02em; }
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.card {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 14px; padding: 1.5rem 1.25rem;
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
h3 { font-size: .9rem; font-weight: 700; margin: .85rem 0 .4rem; color: #e8edf5; }
p  { font-size: .76rem; color: #7d9ab8; line-height: 1.6; }
code {
  font-family: 'DM Mono', monospace; font-size: .74rem;
  color: #a78bfa; background: rgba(139,92,246,.1);
  padding: .1rem .3rem; border-radius: 4px;
}
.spinner {
  width: 64px; height: 64px; border-radius: 50%;
  background: conic-gradient(from var(--angle), #5b8dee, #8b5cf6, #f472b6, #5b8dee);
  animation: spin-angle 2.5s linear infinite;
}
@keyframes spin-angle { to { --angle: 360deg; } }
.progress-ring { position: relative; width: 80px; height: 80px; }
.progress-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.track { fill: none; stroke: #1e2e4a; stroke-width: 6; }
.fill  {
  fill: none; stroke: #5b8dee; stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 201; stroke-dashoffset: 57;
  animation: fill-anim 1.5s cubic-bezier(.4,0,.2,1) forwards;
}
@keyframes fill-anim { from { stroke-dashoffset: 201; } to { stroke-dashoffset: 57; } }
.prog-text {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  font-size: .85rem; font-weight: 800; color: #e8edf5;
}`,
js: ``
},

subgrid: {
html: `<div class="demo">
  <h2>CSS Subgrid</h2>
  <p>All cards align their title, body, and footer on the parent grid's row tracks.</p>
  <div class="grid">
    <article class="card">
      <h3>Container Queries</h3>
      <p>Style based on parent container size — the cornerstone of truly portable components that work in any layout context.</p>
      <footer><a>Learn more</a></footer>
    </article>
    <article class="card">
      <h3>@property</h3>
      <p>Typed, animatable custom properties with syntax validation and inheritance control. CSS variables with superpowers.</p>
      <footer><a>Learn more</a></footer>
    </article>
    <article class="card">
      <h3>Anchor Positioning</h3>
      <p>Tether floated/absolute elements to any anchor in the DOM without JavaScript.</p>
      <footer><a>Learn more</a></footer>
    </article>
  </div>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 680px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: .5rem; letter-spacing: -.02em; }
.demo > p { color: #7d9ab8; font-size: .84rem; margin-bottom: 1.5rem; line-height: 1.7; }
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 14px; overflow: hidden;
  padding: 1.25rem; gap: 0;
  transition: border-color .2s, transform .2s;
}
.card:hover { border-color: #2a4070; transform: translateY(-2px); }
h3 { font-size: .9rem; font-weight: 700; color: #e8edf5; margin-bottom: .6rem; }
p  { font-size: .79rem; color: #7d9ab8; line-height: 1.65; align-self: start; }
footer { padding-top: 1rem; border-top: 1px solid #1b2b45; margin-top: .75rem; }
a {
  font-size: .75rem; font-weight: 600; color: #5b8dee;
  text-decoration: none; cursor: pointer;
}
a:hover { text-decoration: underline; }
@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; grid-template-rows: auto; }
  .card { grid-row: auto; grid-template-rows: auto; }
}`,
js: ``
},

scroll: {
html: `<div class="page">
  <div class="progress-bar"></div>
  <header class="hero">
    <h1>Scroll-Driven Animations</h1>
    <p>Scroll down to see elements animate as they enter the viewport.</p>
    <span class="arrow">↓</span>
  </header>
  <section class="section">
    <div class="reveal-card">
      <div class="card-icon">◆</div>
      <h2>No JavaScript</h2>
      <p>Scroll-driven animations are triggered by scroll progress, not JS scroll listeners. Pure CSS with <code>animation-timeline</code>.</p>
    </div>
    <div class="reveal-card" style="animation-delay:.1s">
      <div class="card-icon" style="background:linear-gradient(135deg,#8b5cf6,#f472b6)">◈</div>
      <h2>animation-timeline</h2>
      <p>Use <code>scroll()</code> or <code>view()</code> as the timeline source. Elements animate as they enter the scroll container.</p>
    </div>
    <div class="reveal-card" style="animation-delay:.2s">
      <div class="card-icon" style="background:linear-gradient(135deg,#22d3a5,#5b8dee)">◇</div>
      <h2>view() timeline</h2>
      <p>The <code>view()</code> function ties animation to an element's position within the scrollport — perfect for reveal effects.</p>
    </div>
  </section>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  min-height: 100vh;
}
.progress-bar {
  position: fixed; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, #5b8dee, #8b5cf6);
  transform-origin: 0 50%; transform: scaleX(0);
  z-index: 100;
  animation: progress-anim linear;
  animation-timeline: scroll(root);
}
@keyframes progress-anim { to { transform: scaleX(1); } }
.hero {
  height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 2rem;
}
h1 { font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 800; letter-spacing: -.04em; margin-bottom: .75rem; }
.hero p { color: #7d9ab8; font-size: 1rem; line-height: 1.7; max-width: 440px; }
.arrow { font-size: 1.5rem; margin-top: 2rem; color: #4a6080; animation: bounce 2s ease-in-out infinite; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
.section {
  padding: 4rem 2rem; max-width: 700px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 1.5rem;
}
.reveal-card {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 14px; padding: 1.5rem 1.75rem;
  display: flex; gap: 1.25rem; align-items: flex-start;
  opacity: 0; transform: translateY(24px);
  animation: card-reveal linear both;
  animation-timeline: view();
  animation-range: entry 10% entry 45%;
}
@keyframes card-reveal {
  to { opacity: 1; transform: translateY(0); }
}
.card-icon {
  width: 44px; height: 44px; border-radius: 10px;
  background: linear-gradient(135deg, #5b8dee, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; flex-shrink: 0;
}
h2 { font-size: 1rem; font-weight: 700; color: #e8edf5; margin-bottom: .4rem; }
p  { font-size: .82rem; color: #7d9ab8; line-height: 1.65; }
code {
  font-family: 'DM Mono', monospace; font-size: .76rem;
  color: #5b8dee; background: rgba(91,141,238,.1);
  padding: .1rem .28rem; border-radius: 4px;
}`,
js: ``
},

layer: {
html: `<div class="demo">
  <h2>Cascade Layers — @layer</h2>
  <p>Layer order: <strong>base → components → utilities</strong>.<br>
  Later layers win regardless of specificity.</p>
  <div class="examples">
    <div class="ex">
      <h3>Base layer</h3>
      <button class="btn-base">Base button</button>
      <code>@layer base { .btn-base { … } }</code>
    </div>
    <div class="ex">
      <h3>Components override base</h3>
      <button class="btn-comp">Component button</button>
      <code>@layer components { .btn-comp { … } }</code>
    </div>
    <div class="ex">
      <h3>Utilities override all</h3>
      <button class="btn-comp btn-util">Utility override</button>
      <code>@layer utilities { .btn-util { … } }</code>
    </div>
  </div>
</div>`,
css: `@layer base, components, utilities;

@layer base {
  .btn-base {
    background: #475569; color: white;
    padding: .5rem 1.25rem; border-radius: 5px;
    border: none; cursor: pointer; font-size: .84rem;
    font-family: 'DM Sans', sans-serif;
    transition: filter .2s;
  }
  .btn-base:hover { filter: brightness(1.15); }
}

@layer components {
  .btn-comp {
    background: #5b8dee; border-radius: 9px;
    font-weight: 700; padding: .55rem 1.4rem;
    border: none; cursor: pointer; font-size: .84rem;
    color: white; font-family: 'DM Sans', sans-serif;
    transition: filter .2s;
  }
  .btn-comp:hover { filter: brightness(1.1); }
}

@layer utilities {
  .btn-util { background: #8b5cf6; }
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 580px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: .5rem; letter-spacing: -.02em; }
.demo > p { color: #7d9ab8; font-size: .84rem; line-height: 1.7; margin-bottom: 1.5rem; }
strong { color: #e8edf5; font-weight: 600; }
.examples { display: flex; flex-direction: column; gap: .85rem; }
.ex {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 12px; padding: 1.1rem 1.25rem;
  display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
}
h3 { font-size: .78rem; font-weight: 600; color: #7d9ab8; min-width: 150px; }
code {
  font-family: 'DM Mono', monospace; font-size: .7rem;
  color: #4a6080; margin-left: auto;
}`,
js: ``
},

scope: {
html: `<div class="demo">
  <h2>@scope — Scoped Styles</h2>
  <div class="scoped-card">
    <h3>Inside @scope</h3>
    <p>This paragraph gets blue text from <code>@scope(.scoped-card)</code>.</p>
    <div class="child-component">
      <h3>Child component</h3>
      <p>@scope stops here when a lower boundary is used. Styles don't leak in.</p>
    </div>
  </div>
  <div class="outside">
    <h3>Outside @scope</h3>
    <p>This paragraph is unstyled by the scoped rule — default color applies.</p>
  </div>
</div>`,
css: `@scope (.scoped-card) to (.child-component) {
  p {
    color: #60a5fa;
    font-size: .84rem;
    line-height: 1.65;
  }
  h3 { color: white; font-weight: 700; font-size: .95rem; }
}

@scope (.child-component) {
  p { color: #a78bfa; font-size: .82rem; }
  h3 { color: #c4b5fd; font-weight: 600; font-size: .88rem; }
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #8ea3bf;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 520px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: 1.25rem; color: #e8edf5; letter-spacing: -.02em; }
.scoped-card {
  background: #0f1a2e; border: 1px solid rgba(91,141,238,.35);
  border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem;
}
.child-component {
  background: rgba(139,92,246,.08); border: 1px solid rgba(139,92,246,.2);
  border-radius: 9px; padding: 1rem; margin-top: 1rem;
}
.outside {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 12px; padding: 1.25rem;
}
code {
  font-family: 'DM Mono', monospace; font-size: .75rem;
  color: #5b8dee; background: rgba(91,141,238,.1);
  padding: .1rem .3rem; border-radius: 4px;
}`,
js: ``
},

anchor: {
html: `<div class="demo">
  <h2>CSS Anchor Positioning</h2>
  <p>The tooltip is tethered to the button via <code>anchor-name</code> and <code>position-anchor</code> — zero JavaScript.</p>
  <div class="scene">
    <button class="anchor-btn" id="anchor-trigger">Hover Me</button>
    <div class="tooltip" id="tooltip">
      ✦ Pure CSS anchored tooltip
    </div>
  </div>
  <div class="note">
    <i>⚠</i> Requires Chrome 125+ for native anchor positioning. Fallback polyfill needed for other browsers.
  </div>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 520px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: .5rem; letter-spacing: -.02em; }
p { color: #7d9ab8; font-size: .84rem; line-height: 1.7; margin-bottom: 1.5rem; }
code {
  font-family: 'DM Mono', monospace; font-size: .77rem;
  color: #5b8dee; background: rgba(91,141,238,.1);
  padding: .1rem .3rem; border-radius: 4px;
}
.scene {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 14px; padding: 3rem 2rem;
  display: flex; align-items: center; justify-content: center;
  position: relative; margin-bottom: 1rem;
}
.anchor-btn {
  anchor-name: --demo-btn;
  background: #5b8dee; color: white; border: none;
  padding: .65rem 1.5rem; border-radius: 9px;
  font-size: .88rem; font-weight: 600;
  cursor: pointer; font-family: inherit;
  transition: background .2s;
}
.anchor-btn:hover { background: #4a7ddd; }
.tooltip {
  position: absolute;
  position-anchor: --demo-btn;
  top: anchor(top);
  left: anchor(center);
  translate: -50% calc(-100% - 10px);
  background: #162240; color: #e8edf5;
  border: 1px solid #2a4070;
  padding: .4rem .9rem; border-radius: 8px;
  font-size: .75rem; font-weight: 600;
  white-space: nowrap; pointer-events: none;
  box-shadow: 0 4px 16px rgba(0,0,0,.4);
  opacity: 0; transition: opacity .2s;
}
.anchor-btn:hover ~ .tooltip,
.scene:has(.anchor-btn:hover) .tooltip { opacity: 1; }
.note {
  background: rgba(246,165,42,.08); border: 1px solid rgba(246,165,42,.2);
  border-radius: 9px; padding: .75rem 1rem;
  font-size: .78rem; color: #f6a52a;
  display: flex; gap: .5rem; align-items: flex-start; line-height: 1.55;
}`,
js: ``
},

textwrap: {
html: `<div class="demo">
  <h2>text-wrap: balance &amp; pretty</h2>
  <div class="compare">
    <div class="card">
      <span class="badge">text-wrap: normal</span>
      <h3 class="normal">The quick brown fox jumps over the lazy dog and lands on the other side</h3>
      <p>Default wrapping — last line can be a single orphaned word.</p>
    </div>
    <div class="card">
      <span class="badge green">text-wrap: balance</span>
      <h3 class="balance">The quick brown fox jumps over the lazy dog and lands on the other side</h3>
      <p>Balanced line lengths — no orphans, equal visual weight.</p>
    </div>
    <div class="card">
      <span class="badge purple">text-wrap: pretty</span>
      <h3 class="pretty">The quick brown fox jumps over the lazy dog and lands on the other side</h3>
      <p>Avoids orphaned words at the end of paragraphs specifically.</p>
    </div>
  </div>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 680px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: 1.25rem; letter-spacing: -.02em; }
.compare { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
@media (max-width: 500px) { .compare { grid-template-columns: 1fr; } }
.card {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 12px; padding: 1.25rem;
}
.badge {
  display: inline-block; font-family: 'DM Mono', monospace;
  font-size: .64rem; font-weight: 700; color: #5b8dee;
  background: rgba(91,141,238,.12); border: 1px solid rgba(91,141,238,.25);
  padding: .18rem .55rem; border-radius: 5px; margin-bottom: .85rem;
}
.badge.green  { color: #22d3a5; background: rgba(34,211,165,.12); border-color: rgba(34,211,165,.25); }
.badge.purple { color: #a78bfa; background: rgba(139,92,246,.12); border-color: rgba(139,92,246,.25); }
h3 {
  font-size: .92rem; font-weight: 700; color: #e8edf5;
  line-height: 1.4; margin-bottom: .65rem; max-width: 180px;
}
p { font-size: .76rem; color: #7d9ab8; line-height: 1.6; }
.normal  { text-wrap: normal; }
.balance { text-wrap: balance; }
.pretty  { text-wrap: pretty; }`,
js: ``
},

viewtransition: {
html: `<div class="demo">
  <h2>View Transitions API</h2>
  <p>Click the button to animate between states using <code>document.startViewTransition()</code>.</p>
  <div class="stage">
    <div class="box" id="vt-box">◆ State A</div>
  </div>
  <div class="controls">
    <button class="btn" onclick="triggerTransition()">
      <span>▶</span> Trigger Transition
    </button>
  </div>
  <div class="code-note">
    <code>::view-transition-old(root)</code> and <code>::view-transition-new(root)</code>
    control the outgoing/incoming animations.
  </div>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 520px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: .5rem; letter-spacing: -.02em; }
p { color: #7d9ab8; font-size: .84rem; line-height: 1.7; margin-bottom: 1.5rem; }
code {
  font-family: 'DM Mono', monospace; font-size: .77rem;
  color: #5b8dee; background: rgba(91,141,238,.1);
  padding: .1rem .3rem; border-radius: 4px;
}
.stage {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 14px; padding: 3rem 2rem;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.25rem;
}
.box {
  width: 160px; height: 80px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; font-weight: 800; color: white;
  background: linear-gradient(135deg, #5b8dee, #8b5cf6);
  view-transition-name: demo-box;
  transition: opacity .25s, transform .25s;
}
.controls { margin-bottom: 1rem; }
.btn {
  background: #5b8dee; color: white; border: none;
  padding: .6rem 1.4rem; border-radius: 9px;
  font-size: .85rem; font-weight: 600;
  cursor: pointer; font-family: inherit;
  display: inline-flex; align-items: center; gap: .5rem;
  transition: background .2s;
}
.btn:hover { background: #4a7ddd; }
.code-note {
  background: rgba(91,141,238,.06); border: 1px solid rgba(91,141,238,.15);
  border-radius: 9px; padding: .75rem 1rem;
  font-size: .78rem; color: #7d9ab8; line-height: 1.6;
}
::view-transition-old(root) {
  animation: vt-out 300ms ease-out both;
}
::view-transition-new(root) {
  animation: vt-in 300ms ease-in both;
}
@keyframes vt-out {
  to { opacity: 0; transform: translateY(-12px); }
}
@keyframes vt-in {
  from { opacity: 0; transform: translateY(12px); }
}`,
js: `const states = [
  { label: '◆ State A', bg: 'linear-gradient(135deg,#5b8dee,#8b5cf6)' },
  { label: '● State B', bg: 'linear-gradient(135deg,#ec4899,#be185d)' },
  { label: '▲ State C', bg: 'linear-gradient(135deg,#22d3a5,#0d9488)' },
];
let idx = 0;
function triggerTransition() {
  const box = document.getElementById('vt-box');
  idx = (idx + 1) % states.length;
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      box.textContent = states[idx].label;
      box.style.background = states[idx].bg;
    });
  } else {
    box.style.opacity = '0'; box.style.transform = 'translateY(-12px)';
    setTimeout(() => {
      box.textContent = states[idx].label;
      box.style.background = states[idx].bg;
      box.style.opacity = '1'; box.style.transform = '';
    }, 250);
  }
}`
},

mathfuncs: {
html: `<div class="demo">
  <h2>CSS Math Functions</h2>
  <section class="card">
    <h3>Circular layout — cos() &amp; sin()</h3>
    <div class="orbit" id="orbit">
      <div class="center">CSS</div>
    </div>
    <p>Each orbit dot is positioned using <code>cos()</code> and <code>sin()</code> — pure CSS, no JS.</p>
  </section>
  <section class="card">
    <h3>clamp() — fluid typography</h3>
    <div class="fluid-text">Fluid Heading</div>
    <p>Resize the viewport — text scales between <code>1rem</code> and <code>2.5rem</code>.</p>
  </section>
  <section class="card">
    <h3>round(), mod(), pow(), sqrt()</h3>
    <div class="math-grid">
      <div class="math-chip"><span>round(37px, 4px)</span><strong>= 36px</strong></div>
      <div class="math-chip"><span>mod(17, 5)</span><strong>= 2</strong></div>
      <div class="math-chip"><span>sqrt(144)</span><strong>= 12</strong></div>
      <div class="math-chip"><span>pow(2, 8)</span><strong>= 256</strong></div>
    </div>
  </section>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 560px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: .25rem; letter-spacing: -.02em; }
.card {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 14px; padding: 1.5rem;
}
h3 { font-size: .82rem; font-weight: 700; color: #7d9ab8; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 1.1rem; }
p  { font-size: .8rem; color: #4a6080; margin-top: .85rem; line-height: 1.6; }
code {
  font-family: 'DM Mono', monospace; font-size: .75rem;
  color: #5b8dee; background: rgba(91,141,238,.1);
  padding: .1rem .3rem; border-radius: 4px;
}
.orbit {
  position: relative; width: 180px; height: 180px;
  margin: 0 auto;
}
.orbit::before {
  content: ''; position: absolute; inset: 0;
  border-radius: 50%; border: 1px dashed #1b2b45;
}
.center {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, #5b8dee, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  font-size: .78rem; font-weight: 800; color: white; z-index: 1;
}
.dot {
  position: absolute; width: 32px; height: 32px; border-radius: 50%;
  background: #162240; border: 2px solid #5b8dee;
  display: flex; align-items: center; justify-content: center;
  font-size: .68rem; font-weight: 700; color: #5b8dee;
}
.fluid-text {
  font-size: clamp(1rem, 5vw + .5rem, 2.5rem);
  font-weight: 800; letter-spacing: -.04em; color: #e8edf5;
  background: linear-gradient(135deg, #5b8dee, #a78bfa);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.math-grid { display: flex; flex-wrap: wrap; gap: .6rem; }
.math-chip {
  background: #162240; border: 1px solid #1e2e4a;
  border-radius: 9px; padding: .6rem .85rem;
  display: flex; flex-direction: column; gap: .2rem;
  min-width: 120px;
}
.math-chip span { font-family: 'DM Mono', monospace; font-size: .7rem; color: #4a6080; }
.math-chip strong { font-family: 'DM Mono', monospace; font-size: .88rem; color: #22d3a5; }`,
js: `const labels = ['A','B','C','D','E','F'];
const orbit = document.getElementById('orbit');
labels.forEach((l, i) => {
  const angle = (360 / labels.length) * i;
  const rad = angle * Math.PI / 180;
  const r = 70;
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.textContent = l;
  dot.style.left = 'calc(50% + ' + (Math.cos(rad) * r) + 'px - 16px)';
  dot.style.top  = 'calc(50% + ' + (Math.sin(rad) * r) + 'px - 16px)';
  orbit.appendChild(dot);
});`
},

logicalprops: {
html: `<div class="demo">
  <h2>CSS Logical Properties</h2>
  <p>The same CSS works correctly in both LTR and RTL without writing direction-specific overrides.</p>
  <div class="ltr-section">
    <div class="dir-label">dir="ltr" (English)</div>
    <div class="card" dir="ltr">
      <div class="icon">◆</div>
      <div class="body">
        <h3>Logical Properties — LTR</h3>
        <p>The blue border is on the <strong>inline-start</strong> side — left in LTR.</p>
        <code>border-inline-start: 3px solid #5b8dee</code>
      </div>
    </div>
  </div>
  <div class="rtl-section">
    <div class="dir-label">dir="rtl" (Arabic)</div>
    <div class="card" dir="rtl">
      <div class="icon">◆</div>
      <div class="body">
        <h3>الخصائص المنطقية — RTL</h3>
        <p>نفس خاصية CSS، لكن الحد يظهر على <strong>اليمين</strong> تلقائيًا.</p>
        <code>border-inline-start: 3px solid #a78bfa</code>
      </div>
    </div>
  </div>
  <div class="table-wrap">
    <h3 class="table-title">Physical → Logical Mapping</h3>
    <table>
      <tr><th>Physical</th><th>Logical</th></tr>
      <tr><td><code>margin-left</code></td><td><code>margin-inline-start</code></td></tr>
      <tr><td><code>padding-right</code></td><td><code>padding-inline-end</code></td></tr>
      <tr><td><code>border-top</code></td><td><code>border-block-start</code></td></tr>
      <tr><td><code>width</code></td><td><code>inline-size</code></td></tr>
      <tr><td><code>height</code></td><td><code>block-size</code></td></tr>
    </table>
  </div>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 560px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: .5rem; letter-spacing: -.02em; }
.demo > p { color: #7d9ab8; font-size: .84rem; line-height: 1.7; margin-bottom: 1.5rem; }
code {
  font-family: 'DM Mono', monospace; font-size: .72rem;
  color: #5b8dee; background: rgba(91,141,238,.1);
  padding: .1rem .3rem; border-radius: 4px; display: inline-block; margin-top: .35rem;
}
.ltr-section, .rtl-section { margin-bottom: 1rem; }
.dir-label {
  font-size: .65rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: #4a6080; margin-bottom: .45rem;
}
.card {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 12px; padding: 1.1rem;
  display: flex; gap: 1rem; align-items: flex-start;
  border-inline-start: 3px solid #5b8dee;
}
.card[dir="rtl"] { border-inline-start-color: #a78bfa; }
.icon {
  font-size: 1.3rem; padding-block-start: .1rem;
  background: linear-gradient(135deg, #5b8dee, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; flex-shrink: 0;
}
h3 { font-size: .88rem; font-weight: 700; color: #e8edf5; margin-block-end: .35rem; }
p  { font-size: .79rem; color: #7d9ab8; line-height: 1.6; }
strong { color: #e8edf5; }
.table-wrap {
  background: #0f1a2e; border: 1px solid #1b2b45;
  border-radius: 12px; padding: 1.1rem; margin-block-start: 1rem;
}
.table-title { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #4a6080; margin-block-end: .85rem; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: .45rem .6rem; text-align: start; font-size: .78rem; border-block-end: 1px solid #1b2b45; }
th { color: #7d9ab8; font-weight: 600; }
td { color: #e8edf5; }
td code { color: #a78bfa; background: rgba(139,92,246,.1); }`,
js: ``
},

startingstyle: {
html: `<div class="demo">
  <h2>@starting-style</h2>
  <p>Animate entry from <code>display: none</code> — no JS, no class toggling, no RAF hacks.</p>
  <div class="controls">
    <button class="btn" onclick="showToast()">Show Toast</button>
    <button class="btn btn-sec" onclick="showDialog()">Show Dialog</button>
  </div>
  <div id="toast" class="toast hidden">
    <span class="toast-icon">✓</span>
    Animated with @starting-style — no JS animation!
  </div>
  <dialog id="dialog" class="dialog">
    <h3>Dialog Entry</h3>
    <p>This dialog fades and slides in from <code>display: none</code> using <code>@starting-style</code>.</p>
    <button class="btn" onclick="document.getElementById('dialog').close()">Close</button>
  </dialog>
  <div class="code-note">
    <code>@starting-style</code> defines initial styles <em>before</em> the element's first paint,
    giving the browser a "from" state for the transition.
  </div>
</div>`,
css: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 520px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: .5rem; letter-spacing: -.02em; }
.demo > p { color: #7d9ab8; font-size: .84rem; line-height: 1.7; margin-bottom: 1.5rem; }
code {
  font-family: 'DM Mono', monospace; font-size: .76rem;
  color: #5b8dee; background: rgba(91,141,238,.1);
  padding: .1rem .3rem; border-radius: 4px;
}
.controls { display: flex; gap: .75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.btn {
  background: #5b8dee; color: white; border: none;
  padding: .6rem 1.4rem; border-radius: 9px;
  font-size: .85rem; font-weight: 600; cursor: pointer;
  font-family: inherit; transition: background .2s;
}
.btn:hover { background: #4a7ddd; }
.btn-sec { background: #162240; border: 1px solid #2a4070; color: #8ea3bf; }
.btn-sec:hover { background: #1e2e4a; color: #e8edf5; }
.toast {
  display: flex; align-items: center; gap: .75rem;
  background: #0f2d1a; border: 1px solid rgba(34,211,165,.3);
  border-radius: 12px; padding: .85rem 1.1rem;
  font-size: .84rem; color: #22d3a5; font-weight: 600;
  margin-bottom: 1.25rem;
  opacity: 1; transform: translateX(0);
  transition:
    opacity .4s ease,
    transform .4s ease,
    display .4s ease allow-discrete;
  @starting-style {
    opacity: 0;
    transform: translateX(60px);
  }
}
.toast.hidden {
  display: none;
  opacity: 0;
  transform: translateX(60px);
}
.toast-icon { font-size: 1rem; }
.dialog {
  background: #0f1a2e; border: 1px solid #2a4070;
  border-radius: 16px; padding: 2rem; max-width: 380px;
  width: 90%; color: #e8edf5;
  box-shadow: 0 20px 60px rgba(0,0,0,.6);
  opacity: 1; transform: translateY(0) scale(1);
  transition:
    opacity .35s ease,
    transform .35s ease,
    display .35s ease allow-discrete,
    overlay .35s ease allow-discrete;
  @starting-style {
    opacity: 0;
    transform: translateY(-20px) scale(.95);
  }
}
.dialog:not([open]) {
  display: none; opacity: 0; transform: translateY(-20px) scale(.95);
}
.dialog::backdrop { background: rgba(0,0,0,.55); backdrop-filter: blur(4px); }
.dialog h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: .65rem; letter-spacing: -.02em; }
.dialog p  { color: #7d9ab8; font-size: .84rem; line-height: 1.65; margin-bottom: 1.25rem; }
.code-note {
  background: rgba(91,141,238,.06); border: 1px solid rgba(91,141,238,.15);
  border-radius: 9px; padding: .85rem 1rem;
  font-size: .8rem; color: #7d9ab8; line-height: 1.65;
}`,
js: `let toastTimer;
function showToast() {
  const t = document.getElementById('toast');
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 3000);
}
function showDialog() {
  document.getElementById('dialog').showModal();
}`
},

interpolatesize: {
html: `<div class="demo">
  <h2>interpolate-size: allow-keywords</h2>
  <p>Animate to and from intrinsic sizing keywords like <code>height: auto</code> — the accordion devs always wanted.</p>
  <div class="accordion">
    <div class="item">
      <button class="item-btn" onclick="toggle(this)">
        What is interpolate-size?
        <span class="chevron">›</span>
      </button>
      <div class="item-body">
        <p><code>interpolate-size: allow-keywords</code> enables transitions to intrinsic sizing values.
        No JS height measurement, no <code>max-height</code> hacks — just <code>height: auto</code>.</p>
      </div>
    </div>
    <div class="item">
      <button class="item-btn" onclick="toggle(this)">
        Which keywords are supported?
        <span class="chevron">›</span>
      </button>
      <div class="item-body">
        <p>Supported keywords include: <code>auto</code>, <code>min-content</code>,
        <code>max-content</code>, and <code>fit-content</code>.
        Set on <code>:root</code> for global effect, or on a specific element.</p>
      </div>
    </div>
    <div class="item">
      <button class="item-btn" onclick="toggle(this)">
        Browser support in 2027?
        <span class="chevron">›</span>
      </button>
      <div class="item-body">
        <p>Chrome 129+ ships it. Firefox and Safari have it behind a flag or in preview.
        Pair with a <code>@supports</code> check for progressive enhancement.</p>
      </div>
    </div>
  </div>
  <div class="chip-demo">
    <h3>fit-content chip expansion</h3>
    <div class="chips">
      <div class="chip">Hover me to expand width to max-content →</div>
    </div>
  </div>
</div>`,
css: `:root { interpolate-size: allow-keywords; }

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #060b16; color: #e8edf5;
  font-family: 'DM Sans', system-ui, sans-serif;
  padding: 2rem; min-height: 100vh;
}
.demo { max-width: 540px; margin: 0 auto; }
h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: .5rem; letter-spacing: -.02em; }
.demo > p { color: #7d9ab8; font-size: .84rem; line-height: 1.7; margin-bottom: 1.5rem; }
code {
  font-family: 'DM Mono', monospace; font-size: .75rem;
  color: #5b8dee; background: rgba(91,141,238,.1);
  padding: .1rem .3rem; border-radius: 4px;
}
.accordion { background: #0f1a2e; border: 1px solid #1b2b45; border-radius: 14px; overflow: hidden; margin-bottom: 1.5rem; }
.item { border-bottom: 1px solid #1b2b45; }
.item:last-child { border-bottom: none; }
.item-btn {
  width: 100%; text-align: left; padding: .9rem 1.1rem;
  background: none; border: none; color: #e8edf5;
  font-size: .88rem; font-weight: 600; font-family: inherit;
  cursor: pointer; display: flex; justify-content: space-between; align-items: center;
  transition: background .15s;
}
.item-btn:hover { background: rgba(255,255,255,.03); }
.chevron {
  font-size: 1.1rem; color: #5b8dee;
  transition: transform .35s ease;
  display: inline-block;
}
.chevron.rotated { transform: rotate(90deg); }
.item-body {
  height: 0; overflow: hidden;
  transition: height .4s ease;
}
.item-body p { padding: .2rem 1.1rem 1rem; font-size: .82rem; color: #7d9ab8; line-height: 1.65; }
.chip-demo { background: #0f1a2e; border: 1px solid #1b2b45; border-radius: 12px; padding: 1.2rem; }
h3 { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #4a6080; margin-bottom: .85rem; }
.chips { display: flex; }
.chip {
  width: fit-content; max-width: 200px;
  background: rgba(91,141,238,.12); color: #5b8dee;
  border: 1px solid rgba(91,141,238,.25);
  border-radius: 99px; padding: .35rem .9rem;
  font-size: .78rem; font-weight: 600; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
  transition: max-width .4s ease, background .2s;
  cursor: default;
}
.chip:hover { max-width: max-content; background: rgba(91,141,238,.2); }`,
js: `function toggle(btn) {
  const body = btn.nextElementSibling;
  const chevron = btn.querySelector('.chevron');
  const isOpen = body.classList.contains('open');
  if (isOpen) {
    body.style.height = body.scrollHeight + 'px';
    requestAnimationFrame(() => { body.style.height = '0'; });
    body.classList.remove('open');
    chevron.classList.remove('rotated');
  } else {
    body.style.height = body.scrollHeight + 'px';
    body.classList.add('open');
    chevron.classList.add('rotated');
    body.addEventListener('transitionend', () => {
      if (body.classList.contains('open')) body.style.height = 'auto';
    }, { once: true });
  }
}`
}

}; // end SNIPPETS


// ─── State ────────────────────────────────────────────────────────────────────
let htmlEditor, cssEditor, jsEditor;
let runTimer = null;
let activeTab = 'html';
let currentSnip = 'welcome';
let previewBgMode = 'dark';

// ─── Init Monaco ──────────────────────────────────────────────────────────────
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs' } });

require(['vs/editor/editor.main'], function () {

  monaco.editor.defineTheme('mastors-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'tag',            foreground: '7dd3fc' },
      { token: 'attribute.name', foreground: '93c5fd' },
      { token: 'attribute.value',foreground: '86efac' },
      { token: 'string',         foreground: '86efac' },
      { token: 'keyword',        foreground: 'c084fc' },
      { token: 'number',         foreground: 'fbbf24' },
      { token: 'comment',        foreground: '4a6080', fontStyle: 'italic' },
      { token: 'property',       foreground: '60a5fa' },
      { token: 'variable',       foreground: 'e8edf5' },
    ],
    colors: {
      'editor.background':           '#070c18',
      'editor.foreground':           '#e8edf5',
      'editor.lineHighlightBackground': '#0d1526',
      'editorLineNumber.foreground': '#2a4070',
      'editorLineNumber.activeForeground': '#5b8dee',
      'editor.selectionBackground':  '#5b8dee33',
      'editorCursor.foreground':     '#5b8dee',
      'editorWidget.background':     '#111e35',
      'editorWidget.border':         '#1e2e4a',
      'editorSuggestWidget.background':    '#111e35',
      'editorSuggestWidget.border':        '#1e2e4a',
      'editorSuggestWidget.selectedBackground': '#1e2e4a',
      'editorSuggestWidget.highlightForeground': '#5b8dee',
      'list.hoverBackground':        '#162240',
      'editorIndentGuide.background1': '#1e2e4a',
      'scrollbar.shadow':            '#00000000',
      'scrollbarSlider.background':  '#1e2e4a88',
      'scrollbarSlider.hoverBackground': '#2a407088',
      'scrollbarSlider.activeBackground': '#5b8dee88',
    }
  });
  monaco.editor.setTheme('mastors-dark');

  const commonOptions = {
    theme: 'mastors-dark',
    fontSize: 13,
    fontFamily: "'DM Mono', 'Cascadia Code', 'Fira Code', monospace",
    fontLigatures: true,
    lineHeight: 22,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'off',
    suggest: { showIcons: true, preview: true },
    quickSuggestions: { other: true, comments: false, strings: true },
    acceptSuggestionOnEnter: 'on',
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    autoIndent: 'full',
    formatOnType: false,
    formatOnPaste: true,
    padding: { top: 8 },
    renderLineHighlight: 'line',
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    smoothScrolling: true,
  };

  htmlEditor = monaco.editor.create(document.getElementById('html-editor'), {
    ...commonOptions, language: 'html', value: '',
  });
  cssEditor = monaco.editor.create(document.getElementById('css-editor'), {
    ...commonOptions, language: 'css', value: '',
  });
  jsEditor = monaco.editor.create(document.getElementById('js-editor'), {
    ...commonOptions, language: 'javascript', value: '',
  });

  // Cursor + char count
  const updateStatus = () => {
    const ed = activeTab === 'html' ? htmlEditor : activeTab === 'css' ? cssEditor : jsEditor;
    const pos = ed.getPosition();
    document.getElementById('cursor-pos').textContent = `Ln ${pos.lineNumber}, Col ${pos.column}`;
    const total = htmlEditor.getValue().length + cssEditor.getValue().length + jsEditor.getValue().length;
    document.getElementById('char-count').textContent = `${total} chars`;
  };
  htmlEditor.onDidChangeCursorPosition(updateStatus);
  cssEditor.onDidChangeCursorPosition(updateStatus);
  jsEditor.onDidChangeCursorPosition(updateStatus);

  // Keybindings
  [htmlEditor, cssEditor, jsEditor].forEach(ed => {
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runPreview);
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, saveToStorage);
    ed.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, formatCode);
  });

  // ── Emmet expansion ────────────────────────────────────────────────────────
  function expandEmmet(editor, language) {
    const model = editor.getModel();
    const pos   = editor.getPosition();
    const line  = model.getLineContent(pos.lineNumber);
    const before = line.substring(0, pos.column - 1);
    const abbr  = before.match(/[\w.#>+*()\[\]="'^$|:!@-]+$/)?.[0];
    if (!abbr) return false;

    function parseAbbr(a) {
      const m = a.match(/^([a-z][a-z0-9-]*)?((?:[.#][a-z][a-z0-9-_]*)*)?(?:\*(\d+))?$/i);
      if (!m) return null;
      const tag   = m[1] || 'div';
      const mods  = m[2] || '';
      const count = parseInt(m[3] || '1');
      const classes = [...mods.matchAll(/\.([a-z][a-z0-9-_]*)/gi)].map(x => x[1]);
      const id      = (mods.match(/#([a-z][a-z0-9-_]*)/i) || [])[1];
      const attrs   = [];
      if (classes.length) attrs.push(`class="${classes.join(' ')}"`);
      if (id) attrs.push(`id="${id}"`);
      const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
      const voidTags = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
      const isVoid = voidTags.test(tag);
      if (count > 1) {
        return Array.from({length: count}, () =>
          isVoid ? `<${tag}${attrStr}>` : `<${tag}${attrStr}></${tag}>`
        ).join('\n');
      }
      return isVoid ? `<${tag}${attrStr}>` : `<${tag}${attrStr}></${tag}>`;
    }

    const cssMap = {
      m:'margin',ma:'margin',mt:'margin-top',mr:'margin-right',mb:'margin-bottom',ml:'margin-left',
      p:'padding',pa:'padding',pt:'padding-top',pr:'padding-right',pb:'padding-bottom',pl:'padding-left',
      w:'width',h:'height',mw:'max-width',mh:'max-height',
      d:'display',df:'display:flex',db:'display:block',di:'display:inline',dn:'display:none',
      f:'font-size',fw:'font-weight',ff:'font-family',c:'color',bg:'background',
      pos:'position',t:'top',r:'right',b:'bottom',l:'left',
      bd:'border',bdr:'border-radius',bs:'box-shadow',
      fl:'float',cl:'clear',ov:'overflow',op:'opacity',
      z:'z-index',cur:'cursor',td:'text-decoration',ta:'text-align',tt:'text-transform',
    };

    if (language === 'css') {
      const cm = abbr.match(/^([a-z]+)(-?[\d.]+)([a-z%]*)?$/i);
      if (cm && cssMap[cm[1]]) {
        const prop = cssMap[cm[1]];
        const unit = cm[3] || (isNaN(cm[2]) ? '' : 'px');
        const expanded = `${prop}: ${cm[2]}${unit};`;
        const startCol = pos.column - abbr.length;
        editor.executeEdits('emmet', [{ range: { startLineNumber: pos.lineNumber, startColumn: startCol, endLineNumber: pos.lineNumber, endColumn: pos.column }, text: expanded }]);
        return true;
      }
      if (cssMap[abbr]) {
        const expanded = `${cssMap[abbr]}: ;`;
        const startCol = pos.column - abbr.length;
        editor.executeEdits('emmet', [{ range: { startLineNumber: pos.lineNumber, startColumn: startCol, endLineNumber: pos.lineNumber, endColumn: pos.column }, text: expanded }]);
        editor.setPosition({ lineNumber: pos.lineNumber, column: startCol + expanded.length - 1 });
        return true;
      }
      return false;
    }

    if (language === 'javascript') return false;

    const expanded = parseAbbr(abbr);
    if (!expanded) return false;
    const startCol = pos.column - abbr.length;
    editor.executeEdits('emmet', [{ range: { startLineNumber: pos.lineNumber, startColumn: startCol, endLineNumber: pos.lineNumber, endColumn: pos.column }, text: expanded }]);
    const inner = expanded.indexOf('><');
    if (inner !== -1) {
      editor.setPosition({ lineNumber: pos.lineNumber, column: startCol + inner + 1 });
    }
    return true;
  }

  htmlEditor.addCommand(monaco.KeyCode.Tab, () => {
    if (!expandEmmet(htmlEditor, 'html')) htmlEditor.trigger('keyboard', 'tab', {});
  });
  cssEditor.addCommand(monaco.KeyCode.Tab, () => {
    if (!expandEmmet(cssEditor, 'css')) cssEditor.trigger('keyboard', 'tab', {});
  });
  jsEditor.addCommand(monaco.KeyCode.Tab, () => {
    if (!expandEmmet(jsEditor, 'javascript')) jsEditor.trigger('keyboard', 'tab', {});
  });

  // Auto-run on change
  htmlEditor.onDidChangeModelContent(e => {
    updateStatus();
    if (document.getElementById('autorun-chk').checked) scheduleRun();
    // Auto close tag on '>'
    for (const change of e.changes) {
      if (change.text === '>') {
        const model = htmlEditor.getModel();
        const pos   = htmlEditor.getPosition();
        const lineContent = model.getLineContent(pos.lineNumber);
        const beforeCursor = lineContent.substring(0, pos.column - 1);
        const tagMatch = beforeCursor.match(/<([a-zA-Z][a-zA-Z0-9-]*)(?:\s[^>]*)?\s*$/);
        const voidTags = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
        if (tagMatch && !voidTags.test(tagMatch[1]) && !beforeCursor.trimEnd().endsWith('/')) {
          const tag = tagMatch[1];
          htmlEditor.executeEdits('auto-close-tag', [{
            range: { startLineNumber: pos.lineNumber, startColumn: pos.column, endLineNumber: pos.lineNumber, endColumn: pos.column },
            text: `</${tag}>`,
          }]);
          htmlEditor.setPosition({ lineNumber: pos.lineNumber, column: pos.column });
        }
      }
    }
  });
  cssEditor.onDidChangeModelContent(() => {
    updateStatus();
    if (document.getElementById('autorun-chk').checked) scheduleRun();
  });
  jsEditor.onDidChangeModelContent(() => {
    updateStatus();
    if (document.getElementById('autorun-chk').checked) scheduleRun();
  });

  // Wire buttons
  document.getElementById('btn-format').addEventListener('click', formatCode);
  document.getElementById('btn-clear').addEventListener('click', clearEditors);
  document.getElementById('btn-save').addEventListener('click', saveToStorage);
  document.getElementById('btn-share').addEventListener('click', shareLink);
  document.getElementById('btn-run').addEventListener('click', runPreview);
  document.getElementById('btn-fullscreen').addEventListener('click', openFullscreen);
  document.getElementById('btn-mobile-menu').addEventListener('click', () => {
    const m = document.getElementById('mobile-menu');
    m.classList.toggle('hidden');
    m.style.display = m.classList.contains('hidden') ? '' : 'flex';
  });

  initSharePopup();

  document.querySelectorAll('.snip-btn').forEach(btn => {
    btn.addEventListener('click', () => loadSnippet(btn.dataset.snip));
  });

  // Load from hash or storage
  const hash = location.hash.slice(1);
  if (hash) {
    try {
      const data = JSON.parse(decodeURIComponent(escape(atob(hash))));
      if (data && (data.html || data.css || data.js)) {
        htmlEditor.setValue(data.html || '');
        cssEditor.setValue(data.css  || '');
        jsEditor.setValue(data.js    || '');
        document.querySelectorAll('.snip-btn').forEach(b => b.classList.remove('active'));
        if (data.snip) {
          const btn = document.querySelector(`.snip-btn[data-snip="${data.snip}"]`);
          if (btn) btn.classList.add('active');
          currentSnip = data.snip;
        } else { currentSnip = null; }
        history.replaceState(null, '', location.pathname);
        runPreview();
      } else { loadFromStorageOrDefault(); }
    } catch(e) { loadFromStorageOrDefault(); }
  } else {
    loadFromStorageOrDefault();
  }

  initResize();
  window.addEventListener('resize', updatePreviewDimensions);
  updatePreviewDimensions();
});

// ─── Tab switching ─────────────────────────────────────────────────────────────
function switchTab(tab) {
  activeTab = tab;
  document.getElementById('wrap-html').style.display = tab === 'html' ? 'block' : 'none';
  document.getElementById('wrap-css').style.display  = tab === 'css'  ? 'block' : 'none';
  document.getElementById('wrap-js').style.display   = tab === 'js'   ? 'block' : 'none';
  document.getElementById('tab-html').classList.toggle('active', tab === 'html');
  document.getElementById('tab-css').classList.toggle('active',  tab === 'css');
  document.getElementById('tab-js').classList.toggle('active',   tab === 'js');
  if (tab === 'html' && htmlEditor) { htmlEditor.layout(); htmlEditor.focus(); }
  if (tab === 'css'  && cssEditor)  { cssEditor.layout();  cssEditor.focus(); }
  if (tab === 'js'   && jsEditor)   { jsEditor.layout();   jsEditor.focus(); }
}

// ─── Run preview ───────────────────────────────────────────────────────────────
function scheduleRun() {
  clearTimeout(runTimer);
  showSkeleton();
  runTimer = setTimeout(runPreview, 450);
}

function showSkeleton() {
  const overlay = document.getElementById('skeleton-overlay');
  const isWhite = previewBgMode === 'white';
  overlay.style.background = isWhite ? '#ffffff' : '#070c18';
  overlay.querySelectorAll('.sk-line').forEach(el => el.classList.toggle('light', isWhite));
  overlay.classList.add('active');
  document.getElementById('preview-frame').style.opacity = '0';
}

function hideSkeleton() {
  document.getElementById('skeleton-overlay').classList.remove('active');
  document.getElementById('preview-frame').style.opacity = '1';
}

function runPreview() {
  const html = htmlEditor.getValue();
  const css  = cssEditor.getValue();
  const js   = jsEditor.getValue();

  const bgOverride = previewBgMode === 'white'
    ? `<style id="__pg-bg-override__">
        html {
          filter: invert(1) hue-rotate(180deg) !important;
          background: #ffffff !important;
        }
        img, video, canvas, iframe, svg image,
        [style*="background-image"] {
          filter: invert(1) hue-rotate(180deg) !important;
        }
      </style>`
    : '';

  const doc = `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>${bgOverride}</head><body>${html}
<script>
document.addEventListener('click', function(e) {
  var a = e.target.closest('a');
  if (a) { e.preventDefault(); }
}, true);
${js}
<\/script>
</body></html>`;

  const frame = document.getElementById('preview-frame');
  frame.srcdoc = doc;
  frame.addEventListener('load', hideSkeleton, { once: true });
  const status = document.getElementById('preview-status');
  status.innerHTML = '<i class="fa-solid fa-circle-check text-[.58rem]"></i> Updated';
  status.style.color = '#22d3a5';
}

// ─── Load from storage or default snippet ─────────────────────────────────────
function loadFromStorageOrDefault() {
  const saved = loadFromStorage();
  if (saved && (saved.html || saved.css || saved.js)) {
    htmlEditor.setValue(saved.html || '');
    cssEditor.setValue(saved.css  || '');
    jsEditor.setValue(saved.js    || '');
    document.querySelectorAll('.snip-btn').forEach(b => b.classList.remove('active'));
    if (saved.snip) {
      const btn = document.querySelector(`.snip-btn[data-snip="${saved.snip}"]`);
      if (btn) btn.classList.add('active');
      currentSnip = saved.snip;
    } else {
      currentSnip = null;
    }
    runPreview();
  } else {
    loadSnippet('welcome');
  }
}

// ─── Load snippet ──────────────────────────────────────────────────────────────
function loadSnippet(key) {
  const snip = SNIPPETS[key];
  if (!snip) return;
  currentSnip = key;
  htmlEditor.setValue(snip.html || '');
  cssEditor.setValue(snip.css  || '');
  jsEditor.setValue(snip.js   || '');
  document.querySelectorAll('.snip-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.snip === key);
  });
  runPreview();
}

// ─── Format ───────────────────────────────────────────────────────────────────
async function formatCode() {
  const ed = activeTab === 'html' ? htmlEditor : activeTab === 'css' ? cssEditor : jsEditor;
  const val = ed.getValue();
  let parser, plugin;
  if (activeTab === 'html') { parser = 'html'; plugin = prettierPlugins.html; }
  else if (activeTab === 'css') { parser = 'css'; plugin = prettierPlugins.postcss; }
  else { parser = 'babel'; plugin = prettierPlugins.babel; }

  try {
    const formatted = await prettier.format(val, {
      parser,
      plugins: [plugin],
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      singleQuote: false,
      htmlWhitespaceSensitivity: 'ignore',
    });
    ed.setValue(formatted);
    showNotif('<i class="fa-solid fa-check" style="color:#22d3a5"></i> Formatted');
  } catch (e) {
    showNotif('<i class="fa-solid fa-xmark" style="color:#f4456b"></i> Format error');
    console.error('Prettier error:', e);
  }
}

// ─── Clear ────────────────────────────────────────────────────────────────────
function clearEditors() {
  if (!confirm('Clear all editors?')) return;
  htmlEditor.setValue('');
  cssEditor.setValue('');
  jsEditor.setValue('');
  document.querySelectorAll('.snip-btn').forEach(b => b.classList.remove('active'));
  currentSnip = null;
  try { localStorage.removeItem(LS_KEY); } catch(e) {}
  runPreview();
}

// ─── localStorage ─────────────────────────────────────────────────────────────
const LS_KEY = 'mastorscdn_playground';
const LS_VER = 3; // bumped — now stores js too

function saveToStorage() {
  try {
    const data = {
      v:    LS_VER,
      html: htmlEditor.getValue(),
      css:  cssEditor.getValue(),
      js:   jsEditor.getValue(),
      snip: currentSnip || null,
    };
    localStorage.setItem(LS_KEY, JSON.stringify(data));
    showToast('toast-save');
  } catch(e) {
    showNotif('<i class="fa-solid fa-xmark" style="color:#f4456b"></i> Storage full or unavailable');
  }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.v !== LS_VER) {
      localStorage.removeItem(LS_KEY);
      return null;
    }
    return data;
  } catch(e) {
    localStorage.removeItem(LS_KEY);
    return null;
  }
}

// ─── Share popup ──────────────────────────────────────────────────────────────
let _sharePopupOpen = false;
let _shareUrl = '';

function buildShareUrl() {
  try {
    const data = {
      html: htmlEditor.getValue(),
      css:  cssEditor.getValue(),
      js:   jsEditor.getValue(),
      snip: currentSnip || null,
    };
    return location.origin + location.pathname + '#' + btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  } catch(e) {
    return location.href;
  }
}

function openSharePopup() {
  const popup = document.getElementById('share-popup');
  if (_sharePopupOpen) { closeSharePopup(); return; }
  _shareUrl = buildShareUrl();
  const btn  = document.getElementById('btn-share');
  const rect = btn.getBoundingClientRect();
  popup.style.top   = (rect.bottom + 6) + 'px';
  popup.style.right = (window.innerWidth - rect.right) + 'px';
  popup.classList.remove('visible');
  requestAnimationFrame(() => requestAnimationFrame(() => popup.classList.add('visible')));
  _sharePopupOpen = true;
}

function closeSharePopup() {
  document.getElementById('share-popup').classList.remove('visible');
  _sharePopupOpen = false;
}

function shareLink() { openSharePopup(); }

function initSharePopup() {
  const popup   = document.getElementById('share-popup');
  const copyBtn = document.getElementById('sp-url-bar');

  copyBtn.addEventListener('mousedown', e => e.stopPropagation());
  copyBtn.addEventListener('click', () => {
    const doCopy = () => {
      if (navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(_shareUrl);
      const ta = document.createElement('textarea');
      ta.value = _shareUrl;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return Promise.resolve();
    };
    doCopy().then(() => {
      copyBtn.innerHTML = '<i class="fa-solid fa-check" style="font-size:.6rem;color:#22d3a5"></i> Copied!';
      copyBtn.style.color = '#22d3a5';
      copyBtn.style.borderColor = 'rgba(34,211,165,.35)';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-link" style="font-size:.6rem"></i> Copy Link';
        copyBtn.style.color = '';
        copyBtn.style.borderColor = '';
      }, 2000);
    });
  });

  const socials = {
    'sp-twitter':  u => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent('Check out this CSS Playground on MastorsCDN!')}`,
    'sp-facebook': u => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
    'sp-linkedin': u => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
    'sp-whatsapp': u => `https://wa.me/?text=${encodeURIComponent('Check out this CSS Playground: ' + u)}`,
    'sp-telegram': u => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent('CSS Playground on MastorsCDN')}`,
    'sp-reddit':   u => `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent('CSS Playground — MastorsCDN')}`,
  };
  Object.entries(socials).forEach(([id, urlFn]) => {
    const el = document.getElementById(id);
    el.addEventListener('mousedown', e => e.stopPropagation());
    el.addEventListener('click', () => {
      window.open(urlFn(_shareUrl), '_blank', 'noopener,noreferrer,width=640,height=480');
      closeSharePopup();
    });
  });

  document.addEventListener('mousedown', e => {
    if (!_sharePopupOpen) return;
    const shareBtn = document.getElementById('btn-share');
    if (!popup.contains(e.target) && !shareBtn.contains(e.target)) closeSharePopup();
  }, true);

  document.getElementById('preview-frame').addEventListener('mouseenter', () => {
    if (_sharePopupOpen) closeSharePopup();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && _sharePopupOpen) closeSharePopup();
  });
}

// ─── Misc controls ────────────────────────────────────────────────────────────
function reloadPreview() { runPreview(); }

function openFullscreen() {
  const frame = document.getElementById('preview-frame');
  if (frame.requestFullscreen) frame.requestFullscreen();
  else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
}

function setViewport(size) {
  const frame   = document.getElementById('preview-frame');
  const wrapper = document.getElementById('preview-wrapper');
  document.querySelectorAll('.vp-btn').forEach(b => b.classList.remove('active'));
  if (size === 'full') {
    frame.style.width = '100%'; frame.style.minWidth = ''; frame.style.maxWidth = '';
    frame.style.minHeight = '100%';
    wrapper.style.alignItems = 'stretch'; wrapper.style.justifyContent = 'flex-start';
    document.getElementById('vp-full').classList.add('active');
  } else {
    const w = size === 'tablet' ? '768px' : '375px';
    frame.style.width = w; frame.style.minWidth = w; frame.style.maxWidth = w;
    frame.style.minHeight = '100%';
    wrapper.style.alignItems = 'flex-start'; wrapper.style.justifyContent = 'center';
    document.getElementById(size === 'tablet' ? 'vp-tablet' : 'vp-mobile').classList.add('active');
  }
  updatePreviewDimensionsAfterTransition();
}

function updatePreviewDimensions() {
  const frame = document.getElementById('preview-frame');
  document.getElementById('preview-dimensions').textContent = `${frame.offsetWidth} × ${frame.offsetHeight}`;
}

function updatePreviewDimensionsAfterTransition() {
  const frame = document.getElementById('preview-frame');
  frame.addEventListener('transitionend', () => updatePreviewDimensions(), { once: true });
  updatePreviewDimensions();
}

function initResize() {
  const handle    = document.getElementById('resize-handle');
  const edPane    = document.getElementById('editor-pane');
  const workspace = document.getElementById('workspace');
  const overlay   = document.getElementById('drag-overlay');
  let dragging = false, startX = 0, startW = 0;

  handle.addEventListener('mousedown', e => {
    dragging = true; startX = e.clientX; startW = edPane.offsetWidth;
    handle.classList.add('dragging');
    overlay.classList.add('active');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const totalW = workspace.offsetWidth;
    const newW = Math.min(Math.max(startW + (e.clientX - startX), 220), totalW - 220);
    edPane.style.width = newW + 'px';
    updatePreviewDimensions();
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    overlay.classList.remove('active');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    htmlEditor.layout(); cssEditor.layout(); jsEditor.layout();
  });
}

function setPreviewBg(mode) {
  previewBgMode = mode;
  const wrapper  = document.getElementById('preview-wrapper');
  const btnDark  = document.getElementById('bg-dark');
  const btnWhite = document.getElementById('bg-white');
  wrapper.classList.remove('bg-dark', 'bg-white');
  btnDark.classList.remove('active-dark');
  btnWhite.classList.remove('active-white');
  if (mode === 'white') {
    wrapper.classList.add('bg-white');
    btnWhite.classList.add('active-white');
  } else {
    wrapper.classList.add('bg-dark');
    btnDark.classList.add('active-dark');
  }
  runPreview();
}

// ─── Toasts ───────────────────────────────────────────────────────────────────
function showToast(id, duration = 2200) {
  const el = document.getElementById(id);
  el.style.display = 'flex';
  el.style.animation = 'toast-in .2s ease forwards';
  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.style.animation = 'toast-out .2s ease forwards';
    setTimeout(() => { el.style.display = 'none'; }, 200);
  }, duration);
}

function showNotif(html, duration = 1800) {
  const el = document.getElementById('toast-notif');
  el.innerHTML = html;
  el.style.display = 'flex';
  el.style.animation = 'toast-in .2s ease forwards';
  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.style.animation = 'toast-out .2s ease forwards';
    setTimeout(() => { el.style.display = 'none'; }, 200);
  }, duration);
}
