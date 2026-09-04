(() => {
  const formatTime = zone => new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date());

  const updateClocks = () => {
    const amsterdam = document.getElementById('amsClock');
    const losAngeles = document.getElementById('laClock');
    if (amsterdam) amsterdam.textContent = formatTime('Europe/Amsterdam');
    if (losAngeles) losAngeles.textContent = formatTime('America/Los_Angeles');
  };

  updateClocks();
  window.setInterval(updateClocks, 1000);
})();
