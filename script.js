/* avatar click-to-speak */
  const avatarCard = document.getElementById('avatarCard');
  if(avatarCard){
    avatarCard.addEventListener('click', () => {
      avatarCard.classList.add('speaking');
      if('speechSynthesis' in window){
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance('Hello Hamza kaise ho, our sab kaisa chal raha hai?');
        utter.lang = 'hi-IN';
        utter.rate = 1;
        utter.onend = () => avatarCard.classList.remove('speaking');
        window.speechSynthesis.speak(utter);
      } else {
        setTimeout(() => avatarCard.classList.remove('speaking'), 2200);
      }
    });
  }

  /* scroll progress bar */
  const scrollBar = document.getElementById('scrollBar');
  function updateScrollBar(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    scrollBar.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateScrollBar, { passive:true });
  updateScrollBar();

  /* cursor spotlight in hero */
  const spotlight = document.getElementById('spotlight');
  const heroEl = document.querySelector('.hero');
  if(heroEl && spotlight){
    heroEl.addEventListener('mousemove', (e) => {
      spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      spotlight.classList.add('active');
    });
    heroEl.addEventListener('mouseleave', () => spotlight.classList.remove('active'));
  }

  /* project card glow follows cursor */
  document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* active nav link on scroll */
  const navA = document.querySelectorAll('nav.links a');
  const sections = [...navA].map(a => document.querySelector(a.getAttribute('href')));
  function updateActiveNav(){
    let current = sections[0];
    sections.forEach(s => { if(s && window.scrollY >= s.offsetTop - 140) current = s; });
    navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
  }
  window.addEventListener('scroll', updateActiveNav, { passive:true });
  updateActiveNav();

  /* animated counting numbers */
  function animateCount(el){
    const target = parseFloat(el.dataset.count);
    const divide = parseFloat(el.dataset.divide) || 1;
    const suffix = el.dataset.suffix || '';
    const displayTarget = target / divide;
    const decimals = (displayTarget % 1 !== 0) ? 2 : 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = displayTarget * eased;
      el.textContent = val.toFixed(decimals) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ animateCount(e.target); countObserver.unobserve(e.target); }
    });
  }, { threshold:0.4 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  const introVideo = document.getElementById('introVideo');
  const soundBtn = document.getElementById('soundBtn');
  if(introVideo && soundBtn){
    soundBtn.addEventListener('click', () => {
      introVideo.muted = !introVideo.muted;
      soundBtn.textContent = introVideo.muted ? '🔇' : '🔊';
    });
  }

  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, { threshold: 0.15 });

  document.querySelectorAll('.project, .stat-line, .tl-item').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
