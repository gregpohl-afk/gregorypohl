(() => {
  const formatTime = zone => new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  }).format(new Date());

  const formatDate = zone => new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    weekday: 'short', month: 'short', day: 'numeric'
  }).format(new Date()).toUpperCase();

  const updateClocks = () => {
    const locations = [
      ['amsClock', 'amsDate', 'Europe/Amsterdam'],
      ['laClock', 'laDate', 'America/Los_Angeles']
    ];

    locations.forEach(([clockId, dateId, zone]) => {
      const clock = document.getElementById(clockId);
      const date = document.getElementById(dateId);
      if (clock) clock.textContent = formatTime(zone);
      if (date) date.textContent = formatDate(zone);
    });
  };

  updateClocks();
  window.setInterval(updateClocks, 1000);
})();
