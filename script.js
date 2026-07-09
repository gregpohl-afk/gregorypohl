const observer = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.18});
document.querySelectorAll('section,.card,.paper,.family,.gregory-portrait,.walker,.chat').forEach(el=>observer.observe(el));
