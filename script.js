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
        <p class="pencil-kicker">Now what?</p>
        <p class="pencil-aside">The only question you always need an answer to.</p>
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
          <h2 id="artifactTitle">Unfinished business.</h2>
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
        <article class="concept-card concept-four">
          <span>04</span><h3>The Pharma Strategist</h3>
          <p>Why people trained inside hard constraints may be unusually prepared for the age of AI.</p>
        </article>
        <p class="workshop-scribble">Currently changing shape. Please don’t make me put dates on these.</p>
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
