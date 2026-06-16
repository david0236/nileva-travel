/* ═══════════════════════════════════════════
   Nileva Travel — Main JavaScript
   WA_NUMBER: WhatsApp number for enquiries
   Edit WA_NUMBER if the owner's number changes
═══════════════════════════════════════════ */

// ── Navigation scroll
const nav = document.getElementById('nav');
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
});

// ── Hamburger / Mobile Menu
function toggleMobile() {
  const h = document.getElementById('hamburger');
  const m = document.getElementById('mobileMenu');
  h.classList.toggle('open'); m.classList.toggle('open');
}
function closeMobile() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── Language Switcher
const langLabels = {
  en: { code: 'gb', label: 'EN' },
  fr: { code: 'fr', label: 'FR' },
  ja: { code: 'jp', label: 'JP' },
  zh: { code: 'cn', label: 'ZH' },
  ru: { code: 'ru', label: 'RU' }
};
function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  const { code, label } = langLabels[lang];
  const flagHtml = `<img src="https://flagcdn.com/20x15/${code}.png" alt="${label}" class="lang-flag"> ${label} ▾`;
  document.getElementById('langBtn').innerHTML = flagHtml;
  const mb = document.getElementById('langBtnMobile');
  if (mb) mb.innerHTML = flagHtml;
  document.getElementById('langDropdown').classList.remove('open');
  const mbd = document.getElementById('langDropdownMobile');
  if (mbd) mbd.classList.remove('open');
  document.querySelectorAll('.footer-lang').forEach(el => {
    el.classList.toggle('active', el.onclick.toString().includes("'" + lang + "'"));
  });
}
// Alias for mobile buttons
function setLangAll(lang) { setLang(lang); }
document.getElementById('langBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('langDropdown').classList.toggle('open');
});
const langBtnMobile = document.getElementById('langBtnMobile');
if (langBtnMobile) {
  langBtnMobile.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('langDropdownMobile').classList.toggle('open');
  });
}
document.addEventListener('click', () => {
  document.getElementById('langDropdown').classList.remove('open');
  const mbd = document.getElementById('langDropdownMobile');
  if (mbd) mbd.classList.remove('open');
});

// ── Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Package Tabs
document.getElementById('pkgTabs').addEventListener('click', (e) => {
  const tab = e.target.closest('.pkg-tab');
  if (!tab) return;
  document.querySelectorAll('.pkg-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const cat = tab.dataset.cat;
  document.querySelectorAll('.pkg-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
});

// ── FAQ Accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── WhatsApp number — CHANGE THIS to the owner's real number (country code + number, no + or spaces)
const WA_NUMBER = '447405767887';

// ── Form Submit → WhatsApp redirect
function handleFormSubmit(btn) {
  const firstName = document.getElementById('cf-firstname').value.trim();
  const lastName  = document.getElementById('cf-lastname').value.trim();
  const email     = document.getElementById('cf-email').value.trim();
  const dates     = document.getElementById('cf-dates').value.trim();
  const pax       = document.getElementById('cf-pax').value.trim();
  const tour      = document.getElementById('cf-tour').value;
  const message   = document.getElementById('cf-message').value.trim();

  if (!firstName || !dates || !pax) {
    alert('Please fill in at least your name, travel dates and number of travellers.');
    return;
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  const text = [
    '\u{1F44B} *New Enquiry \u2014 Nileva Travel*',
    '',
    '\u{1F464} *Name:* ' + fullName,
    email   ? '\u{1F4E7} *Email:* ' + email   : null,
    '\u{1F4C5} *Travel Dates:* ' + dates,
    '\u{1F465} *Travellers:* ' + pax,
    '\u{1F5FA} *Interested In:* ' + tour,
    message ? '\u{1F4AC} *Message:* ' + message : null,
  ].filter(Boolean).join('\n');

  // Open WhatsApp with pre-filled message
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank');

  // Visual feedback on button
  const original = btn.innerHTML;
  btn.innerHTML = '\u2705 Opening WhatsApp...';
  btn.style.background = '#1a7a4a';
  setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 4000);
}

// ── Smooth anchor scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});


// ── Gallery slider manual controls
function galleryShift(dir) {
  const track = document.getElementById('galleryTrack');
  track.style.animation = 'none';
  const slideW = track.querySelector('.gallery-slide').offsetWidth + 12;
  let current = parseInt(track.dataset.offset || 0);
  current -= dir * slideW * 2;
  track.style.transform = `translateX(${current}px)`;
  track.dataset.offset = current;
  setTimeout(() => {
    track.style.transform = '';
    track.style.animation = '';
  }, 4000);
}
// ── Gallery slider ROW 2 manual controls
function galleryShift2(dir) {
  const track = document.getElementById('galleryTrack2');
  track.style.animation = 'none';
  const slideW = track.querySelector('.gallery-slide').offsetWidth + 12;
  let current = parseInt(track.dataset.offset || 0);
  current += dir * slideW * 2;
  track.style.transform = `translateX(${current}px)`;
  track.dataset.offset = current;
  setTimeout(() => {
    track.style.transform = '';
    track.style.animation = '';
  }, 4000);
}