(() => {
  const items = window.WORK_ITEMS || [];
  const featured = items.filter(item => item.featured).slice(0, 4);
  const featuredGrid = document.getElementById('featuredWork');
  const archive = document.getElementById('archiveDialog');
  const archiveGrid = document.getElementById('archiveGrid');
  const concept = document.getElementById('conceptDialog');
  const liir = document.getElementById('liirDialog');

  const artwork = item => {
    if (item.visual === 'board') return `<div class="work-art"><div class="black-board">3 PEOPLE.<br>1 REP.<br>3 BOARDS.<br>1 WORLD LADDER.</div></div>`;
    if (!item.image) return `<div class="work-art"><div class="coming-card">COMING<br>SOON.</div></div>`;
    return `<div class="work-art"><img src="${item.image}" alt=""></div>`;
  };

  const action = (item, cls='work-link interactive') => {
    if (item.restricted) return `<button class="${cls}" type="button" data-concept="myhouse">${item.action} →</button>`;
    if (item.href) return `<a class="${cls}" href="${item.href}" target="_blank" rel="noopener">${item.action || 'Open'} →</a>`;
    return `<span class="${cls}">${item.status || 'Coming soon'}</span>`;
  };

  featuredGrid.innerHTML = featured.map((item, i) => `
    <article class="work-card interactive" tabindex="0" role="link" data-work-id="${item.id}" aria-label="Open ${item.title}">
      <span class="work-index">0${i + 1}</span>
      <h3>${item.title}</h3>
      ${artwork(item)}
      <p class="work-dek">${item.dek}</p>
      ${action(item)}
    </article>`).join('');

  archiveGrid.innerHTML = items.map(item => `
    <article class="archive-item">
      <span>${item.kind}</span>
      <h3>${item.title}</h3>
      <p>${item.dek}</p>
      ${action(item, 'interactive')}
    </article>`).join('');

  document.getElementById('openArchive').addEventListener('click', () => archive.showModal());
  document.querySelectorAll('.archive-close').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog').close()));
  document.addEventListener('click', e => { if (e.target.closest('[data-concept="myhouse"]')) concept.showModal(); });

  const openWork = card => {
    const item = items.find(x => x.id === card.dataset.workId);
    if (!item) return;
    if (item.restricted) { concept.showModal(); return; }
    if (item.href) window.open(item.href, '_blank', 'noopener');
  };
  featuredGrid.addEventListener('click', e => {
    const card = e.target.closest('.work-card');
    if (!card || e.target.closest('a,button')) return;
    openWork(card);
  });
  featuredGrid.addEventListener('keydown', e => {
    const card = e.target.closest('.work-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openWork(card); }
  });
  document.getElementById('openLiir').addEventListener('click', () => liir.showModal());

  document.querySelectorAll('.principle-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const article = button.closest('.principle');
      const detail = article.querySelector('.principle-detail');
      const opening = !article.classList.contains('is-open');
      article.classList.toggle('is-open', opening);
      button.setAttribute('aria-expanded', String(opening));
      detail.hidden = !opening;
    });
  });

  [archive, concept, liir].forEach(dialog => dialog.addEventListener('click', e => {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }));

  const cursor = document.querySelector('.open-cursor');
  window.addEventListener('mousemove', e => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
  document.addEventListener('mouseover', e => { if (e.target.closest('a,button,.work-card')) document.body.classList.add('cursor-on'); });
  document.addEventListener('mouseout', e => { if (e.target.closest('a,button,.work-card')) document.body.classList.remove('cursor-on'); });

  const parts = (zone) => {
    const now = new Date();
    const raw = new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }).formatToParts(now);
    const pick = t => Number(raw.find(p => p.type === t)?.value || 0);
    return { h: pick('hour'), m: pick('minute'), s: pick('second') };
  };

  const updateClocks = () => {
    document.querySelectorAll('.clock').forEach(clock => {
      const p = parts(clock.dataset.zone);
      const hourDeg = (p.h % 12) * 30 + p.m * 0.5;
      const minDeg = p.m * 6 + p.s * 0.1;
      clock.querySelector('.hour').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
      clock.querySelector('.minute').style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
    });
    const format = zone => new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
    document.getElementById('amsClock').textContent = format('Europe/Amsterdam');
    document.getElementById('laClock').textContent = format('America/Los_Angeles');
  };
  updateClocks();
  setInterval(updateClocks, 1000);
})();
