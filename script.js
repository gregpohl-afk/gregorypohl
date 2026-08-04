(() => {
  const dialog = document.getElementById('contentDialog');
  const eyebrow = document.getElementById('dialogEyebrow');
  const title = document.getElementById('dialogTitle');
  const body = document.getElementById('dialogBody');

  if (!dialog || !eyebrow || !title || !body) return;

  const show = (eyebrowText, titleText, html) => {
    eyebrow.textContent = eyebrowText;
    title.textContent = titleText;
    body.innerHTML = `<div class="dialog-inner">${html}</div>`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  /* Desk artifacts use their own physical forms instead of the generic dialog. */
  const artifactLayer = document.createElement('div');
  artifactLayer.className = 'artifact-layer';
  artifactLayer.setAttribute('aria-hidden', 'true');
  artifactLayer.innerHTML = '<div class="artifact-backdrop"></div><div class="artifact-stage" role="dialog" aria-modal="true" aria-labelledby="artifactTitle"></div>';
  document.body.appendChild(artifactLayer);

  const artifactStage = artifactLayer.querySelector('.artifact-stage');
  let returnFocus = null;

  const artifactContent = {
    nowwhat: `
      <article class="desk-reveal notebook-reveal">
        <button class="artifact-close" type="button" aria-label="Close">×</button>
        <div class="notebook-wire" aria-hidden="true"></div>
        <span class="notebook-tape" aria-hidden="true"></span>
        <span class="coffee-ring" aria-hidden="true"></span>
        <p class="pencil-kicker">Now what?</p>
        <p class="pencil-aside"><span aria-hidden="true">↳</span> The only question you always need an answer to.</p>
        <p class="book-boast">Apparently, my answer was to write the greatest business-life field guide known to mankind.<sup>*</sup></p>
        <h2 id="artifactTitle">The org chart ran out of language before you ran out of ability.</h2>
        <p>Rigid job descriptions, padded timelines, and the corporate theater of belonging can make extraordinary range look like a failure to focus.</p>
        <p><em>Somebody’s Unicorn</em> is a sharp, zero-fluff field guide for cross-domain thinkers whose intelligence, speed, and capacity keep breaking the containers they’re handed.</p>
        <p>It gives you language for what you are, explains why the available categories have always felt too small, and helps you find—or build—the terrain where your speed is essential.</p>
        <p class="book-command">Stop hedging. Leave the wrong dictionary behind. Go build.</p>
        <a class="artifact-cta" href="https://www.amazon.com/dp/B0H3877HZP" target="_blank" rel="noopener noreferrer">Read Somebody’s Unicorn →</a>
        <p class="doodle-disclaimer"><span aria-hidden="true">♘</span> *Greatest-known-to-mankind designation has not been independently verified.</p>
      </article>`,
    workshop: `
      <section class="desk-reveal workshop-reveal">
        <button class="artifact-close" type="button" aria-label="Close">×</button>
        <header class="workshop-heading">
          <p>The Workshop</p>
          <h2 id="artifactTitle">Work in progress.</h2>
        </header>
        <article class="concept-card concept-one">
          <span>01</span><h3>Nothing To See Here</h3>
          <p>The postmortem of a promising idea—and the more interesting question: what would I build differently now?</p>
        </article>
        <article class="concept-card concept-two">
          <span>02</span><h3>Tommy / LA28</h3>
          <p>How competition becomes culture—and what brands miss when they mistake fandom for attention.</p>
        </article>
        <article class="concept-card concept-three">
          <span>03</span><h3>City Local</h3>
          <p>The ordinary gift bag as cultural artifact. A city archive disguised as wrapping paper.</p>
        </article>
<article class="concept-card concept-four my-house-card">
  <span>04</span>
  <p class="my-house-label">Concept · 2026</p>
  <h3>My House</h3>
  <p>A new system for seeing football talent before consensus catches up.</p>
</article>          
<span>04</span><p class="my-house-label">Concept · 2026</p><h3>My House</h3>
          <p>A global ranking system for football talent—built before the infrastructure exists.</p>
          <p class="my-house-line">The board is the infrastructure. Rank is the product.</p>
          <a href="assets/perspectives/my-house-july-2026.pdf" target="_blank" rel="noopener">View the concept →</a>
        </article>
        <aside class="advisory-card">
          <p>Currently in the room</p>
          <strong>Pharmaceuticals<br>Technology<br>Individual Leadership 3rd Eye</strong>
          <a href="https://wa.me/13235724418?text=Hi%20Greg%E2%80%94I%27d%20like%20to%20learn%20more%20about%20your%20current%20advisory%20work." target="_blank" rel="noopener noreferrer">References available when useful →</a>
        </aside>
        <p class="workshop-scribble">Please don’t make me put dates on these.</p>
      </section>`,
    feather: `
      <article class="desk-reveal feather-reveal">
        <button class="artifact-close" type="button" aria-label="Close">×</button>
        <p class="feather-question" id="artifactTitle">If your company had to be run out of a garage, who is in that garage with you?</p>
        <p class="feather-answer">That’s your company.</p>
      </article>`,
    boredroom: `
      <article class="desk-reveal boredroom-reveal">
        <button class="artifact-close" type="button" aria-label="Close">×</button>
        <p class="boredroom-kicker">The Boredroom</p>
        <h2 id="artifactTitle">You’re talking to the actual human whose name is on the website.</h2>
        <p>No assistant. No intake form. No funnel.</p>
        <p>Less “How may I help?”<br>More “Tell me what’s actually going on.”</p>
        <p>Sometimes I’ll answer immediately. Sometimes after school pickup. Sometimes after staring out a window pretending to work.</p>
        <p>Either way—I’ll answer.</p>
        <a class="artifact-cta whatsapp-cta" href="https://wa.me/13235724418?text=Hi%20Greg%E2%80%94I%20knocked.%20Here%E2%80%99s%20what%E2%80%99s%20actually%20going%20on%3A" target="_blank" rel="noopener noreferrer">Come in →</a>
        <p class="boredroom-status">Status: meetings are exhausting. This isn’t one.</p>
      </article>`
  };

  const closeArtifact = () => {
    artifactLayer.classList.remove('is-visible');
    artifactLayer.setAttribute('aria-hidden', 'true');
    artifactStage.innerHTML = '';
    document.body.classList.remove('artifact-open');
    if (returnFocus) returnFocus.focus();
  };

  const openArtifact = (name, trigger) => {
    artifactStage.innerHTML = artifactContent[name];
    artifactLayer.dataset.artifact = name;
    artifactLayer.classList.add('is-visible');
    artifactLayer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('artifact-open');
    returnFocus = trigger;
    artifactStage.querySelector('.artifact-close')?.focus();
  };

  const workLinks = [...document.querySelectorAll('.tile')];

  const getWorkItem = (link, index) => {
    const card = document.querySelector(`.work-${index + 1}-card`);
    if (!card) return null;

    return {
      eyebrow: card.querySelector('.work-eyebrow')?.textContent.trim() || 'PERSPECTIVE',
      title: card.querySelector('strong')?.textContent.trim() || link.dataset.label,
      deck: card.querySelector('em')?.textContent.trim() || '',
      summary: card.querySelector('p')?.textContent.trim() || '',
      href: link.href,
      featured: link.dataset.featured === 'true'
    };
  };

  const showWorkItem = (link, index) => {
    const item = getWorkItem(link, index);
    if (!item) {
      window.open(link.href, '_blank', 'noopener');
      return;
    }

    artifactStage.innerHTML = `
      <article class="desk-reveal work-reveal${item.featured ? ' featured-work-reveal' : ''}">
        <button class="artifact-close" type="button" aria-label="Close">×</button>
        <p class="work-reveal-kicker">${item.featured ? 'Featured Perspective · ' : ''}${item.eyebrow}</p>
        <h2 id="artifactTitle">${item.title}</h2>
        ${item.deck ? `<p class="work-reveal-deck">${item.deck}</p>` : ''}
        <p>${item.summary}</p>
        <a class="artifact-cta" href="${item.href}" target="_blank" rel="noopener noreferrer">Read on →</a>
      </article>`;
    artifactLayer.dataset.artifact = 'work';
    artifactLayer.classList.add('is-visible');
    artifactLayer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('artifact-open');
    returnFocus = link;
    artifactStage.querySelector('.artifact-close')?.focus();
  };

  workLinks.forEach((link, index) => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showWorkItem(link, index);
    });
  });

  const perspectivesIndex = document.querySelector('.perspectives-index');
  if (perspectivesIndex) {
    perspectivesIndex.addEventListener('click', () => {
      const items = workLinks.map(getWorkItem).filter(Boolean);
      const featured = items.find(item => item.featured) || items[0];
      const archive = items.filter(item => item !== featured);

      artifactStage.innerHTML = `
        <section class="desk-reveal perspectives-reveal">
          <button class="artifact-close" type="button" aria-label="Close">×</button>
          <header class="perspectives-heading">
            <p>Perspectives</p>
            <h2 id="artifactTitle">Six ways of looking at what everyone else has agreed to call obvious.</h2>
          </header>
          <article class="perspectives-feature">
            <p class="work-reveal-kicker">Start here · ${featured.eyebrow}</p>
            <h3>${featured.title}</h3>
            <p class="perspectives-deck">${featured.deck}</p>
            <p>${featured.summary}</p>
            <a class="artifact-cta" href="${featured.href}" target="_blank" rel="noopener noreferrer">Read the Perspective →</a>
          </article>
          <div class="perspectives-archive" aria-label="More Perspectives">
            ${archive.map(item => `
              <a href="${item.href}" target="_blank" rel="noopener noreferrer">
                <span>${item.eyebrow}</span>
                <strong>${item.title}</strong>
                <em>${item.deck}</em>
              </a>`).join('')}
          </div>
        </section>`;
      artifactLayer.dataset.artifact = 'perspectives';
      artifactLayer.classList.add('is-visible');
      artifactLayer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('artifact-open');
      returnFocus = perspectivesIndex;
      artifactStage.querySelector('.artifact-close')?.focus();
    });
  }

  const bindArtifact = (selector, name) => {
    const trigger = document.querySelector(selector);
    if (trigger) trigger.addEventListener('click', () => openArtifact(name, trigger));
  };

  bindArtifact('.notebook', 'nowwhat');
  bindArtifact('.workshop-note', 'workshop');
  bindArtifact('.feather', 'feather');
  bindArtifact('.door', 'boredroom');

  artifactLayer.addEventListener('click', event => {
    if (event.target.closest('.artifact-close') || event.target.classList.contains('artifact-backdrop')) closeArtifact();
  });

  const closeButton = dialog.querySelector('.close');
  if (closeButton) closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.hero-easter-egg.is-open').forEach(item => item.classList.remove('is-open'));
      if (dialog.open) dialog.close();
      if (artifactLayer.classList.contains('is-visible')) closeArtifact();
    }
  });

  /* Hover/focus works through CSS; click adds touch-friendly persistence. */
  document.querySelectorAll('.hero-easter-egg').forEach(egg => {
    const trigger = egg.querySelector(':scope > button');
    const card = egg.querySelector(':scope > .hero-story-card');
    if (!trigger || !card) return;

    trigger.addEventListener('click', event => {
      event.preventDefault();
      const opening = !egg.classList.contains('is-open');
      document.querySelectorAll('.hero-easter-egg.is-open').forEach(item => item.classList.remove('is-open'));
      egg.classList.toggle('is-open', opening);
      card.setAttribute('aria-hidden', opening ? 'false' : 'true');
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.hero-easter-egg')) {
      document.querySelectorAll('.hero-easter-egg.is-open').forEach(item => item.classList.remove('is-open'));
    }
  });
})();
