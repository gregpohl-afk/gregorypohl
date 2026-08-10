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

  if (featuredGrid) featuredGrid.innerHTML = featured.map((item, i) => `
    <article class="work-card interactive" tabindex="0" role="link" data-work-id="${item.id}" aria-label="Open ${item.title}">
      <span class="work-index">0${i + 1}</span>
      <h3>${item.title}</h3>
      ${artwork(item)}
      <p class="work-dek">${item.dek}</p>
      ${action(item)}
    </article>`).join('');

  if (archiveGrid) archiveGrid.innerHTML = items.map(item => `
    <article class="archive-item">
      <span>${item.kind}</span>
      <h3>${item.title}</h3>
      <p>${item.dek}</p>
      ${action(item, 'interactive')}
    </article>`).join('');

  const cursor = document.querySelector('.open-cursor');
  const parkCursorInDialog = dialog => {
    if (cursor && dialog) dialog.appendChild(cursor);
  };
  const returnCursorToBody = () => {
    if (cursor && cursor.parentElement !== document.body) document.body.appendChild(cursor);
    document.body.classList.remove('cursor-on');
  };

  document.getElementById('openArchive')?.addEventListener('click', () => {
    if (!archive) return;
    archive.showModal();
    parkCursorInDialog(archive);
  });
  document.querySelectorAll('.archive-close').forEach(btn => btn.addEventListener('click', () => {
    btn.closest('dialog').close();
    returnCursorToBody();
  }));
  document.addEventListener('click', e => { if (e.target.closest('[data-concept="myhouse"]')) concept.showModal(); });

  const openWork = card => {
    const item = items.find(x => x.id === card.dataset.workId);
    if (!item) return;
    if (item.restricted) { concept.showModal(); return; }
    if (item.href) window.open(item.href, '_blank', 'noopener');
  };
  featuredGrid?.addEventListener('click', e => {
    const card = e.target.closest('.work-card');
    if (!card || e.target.closest('a,button')) return;
    openWork(card);
  });
  featuredGrid?.addEventListener('keydown', e => {
    const card = e.target.closest('.work-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openWork(card); }
  });
  document.getElementById('openLiir')?.addEventListener('click', () => liir?.showModal());

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

  [archive, concept, liir].filter(Boolean).forEach(dialog => dialog.addEventListener('click', e => {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      dialog.close();
      returnCursorToBody();
    }
  }));

  window.addEventListener('mousemove', e => { if (!cursor) return; cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
  document.addEventListener('mouseover', e => { if (e.target.closest('a,button,.work-card')) document.body.classList.add('cursor-on'); });
  document.addEventListener('mouseout', e => { if (e.target.closest('a,button,.work-card')) document.body.classList.remove('cursor-on'); });

  const timeParts = (zone) => {
    const now = new Date();
    const raw = new Intl.DateTimeFormat('en-GB', {
      timeZone: zone,
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }).formatToParts(now);
    const pick = t => Number(raw.find(p => p.type === t)?.value || 0);
    return { h: pick('hour'), m: pick('minute'), s: pick('second') };
  };

  const timeString = zone => new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  }).format(new Date());

  const dateString = zone => new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    weekday: 'short', month: 'short', day: 'numeric'
  }).format(new Date()).toUpperCase();

  const zoneString = zone => {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      timeZoneName: 'short'
    }).formatToParts(new Date());
    return parts.find(p => p.type === 'timeZoneName')?.value || '';
  };

  const updateClocks = () => {
    document.querySelectorAll('.clock').forEach(clock => {
      const p = timeParts(clock.dataset.zone);
      const hourDeg = (p.h % 12) * 30 + p.m * 0.5 + p.s / 120;
      const minDeg = p.m * 6 + p.s * 0.1;
      const hour = clock.querySelector('.hour');
      const minute = clock.querySelector('.minute');
      if (hour) hour.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
      if (minute) minute.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
    });

    const amsClock = document.getElementById('amsClock');
    const laClock = document.getElementById('laClock');
    const amsZone = document.getElementById('amsZone');
    const laZone = document.getElementById('laZone');
    const amsDate = document.getElementById('amsDate');
    const laDate = document.getElementById('laDate');

    if (amsClock) amsClock.textContent = timeString('Europe/Amsterdam');
    if (laClock) laClock.textContent = timeString('America/Los_Angeles');
    if (amsZone) amsZone.textContent = zoneString('Europe/Amsterdam');
    if (laZone) laZone.textContent = zoneString('America/Los_Angeles');
    if (amsDate) amsDate.textContent = dateString('Europe/Amsterdam');
    if (laDate) laDate.textContent = dateString('America/Los_Angeles');
  };

  updateClocks();
  setInterval(updateClocks, 1000);
})();
