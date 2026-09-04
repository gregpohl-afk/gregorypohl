(() => {
  const formatTime = zone => new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date());

  const timeParts = zone => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: zone,
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }).formatToParts(new Date());
    const get = type => Number(parts.find(part => part.type === type)?.value || 0);
    return { hour: get('hour'), minute: get('minute'), second: get('second') };
  };

  const formatDate = zone => new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    weekday: 'short', month: 'short', day: 'numeric'
  }).format(new Date()).toUpperCase();

  const formatZone = zone => new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    timeZoneName: 'short'
  }).formatToParts(new Date()).find(part => part.type === 'timeZoneName')?.value || '';

  const updateClocks = () => {
    const amsterdam = document.getElementById('amsClock');
    const losAngeles = document.getElementById('laClock');
    if (amsterdam) amsterdam.textContent = formatTime('Europe/Amsterdam');
    if (losAngeles) losAngeles.textContent = formatTime('America/Los_Angeles');

    const amsterdamDate = document.getElementById('amsDate');
    const losAngelesDate = document.getElementById('laDate');
    const amsterdamZone = document.getElementById('amsZone');
    const losAngelesZone = document.getElementById('laZone');
    if (amsterdamDate) amsterdamDate.textContent = formatDate('Europe/Amsterdam');
    if (losAngelesDate) losAngelesDate.textContent = formatDate('America/Los_Angeles');
    if (amsterdamZone) amsterdamZone.textContent = formatZone('Europe/Amsterdam');
    if (losAngelesZone) losAngelesZone.textContent = formatZone('America/Los_Angeles');

    document.querySelectorAll('.analog-clock').forEach(clock => {
      const time = timeParts(clock.dataset.zone);
      const hourAngle = (time.hour % 12) * 30 + time.minute * .5 + time.second / 120;
      const minuteAngle = time.minute * 6 + time.second * .1;
      const hourHand = clock.querySelector('.hour');
      const minuteHand = clock.querySelector('.minute');
      if (hourHand) hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
      if (minuteHand) minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
    });
  };

  updateClocks();
  window.setInterval(updateClocks, 1000);
})();
