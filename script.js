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

  const bindDialog = (selector, eyebrowText, titleText, html) => {
    const trigger = document.querySelector(selector);
    if (trigger) trigger.addEventListener('click', () => show(eyebrowText, titleText, html));
  };

  bindDialog('.notebook', 'FROM THE DESK', 'Now what?',
    '<div class="note">The only question in life you always need an answer to is — now what?</div><p class="small">Also on the page: About That — like a child interrupting an adult conversation.</p>');
  bindDialog('.workshop-note', 'WORKSHOP', 'Ideas still baking',
    '<p><b>Nothing To See Here.</b> A product I launched, learned from, and would build differently today.</p><p><b>Tommy / LA28.</b> Strategy hiding inside culture, competition, and ritual.</p><p><b>City Local.</b> Reimagining a future for your take out.</p><p><b>Pharma strategists.</b> Every company should employ at least one. Hyper-regulated environments teach you to work to the letter and walk the edge of the line — a useful instinct in the age of AI, disclosures, privacy, and regulation.</p>');
  bindDialog('.feather', 'OBSERVATION', 'Every story leaves something behind.',
    '<p>The useful part is often the thing everyone stepped over on the way out.</p>');
  bindDialog('.door', 'THE BOREDROOM', 'Yes, knock. We know.',
    '<p>We’re migrating to chat. For now, leave a message and I’ll get back to you.</p><p><a href="mailto:greg@gregorypohl.com">Leave a note →</a></p>');

  const closeButton = dialog.querySelector('.close');
  if (closeButton) closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.hero-easter-egg.is-open').forEach(item => item.classList.remove('is-open'));
      if (dialog.open) dialog.close();
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
