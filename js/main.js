/* ============================================================
   Icons (inline SVG)
   ============================================================ */
const ICONS = {
  github: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
  scholar: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z"/></svg>',
  download: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  paper: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  code: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  link: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'
};

function linkIcon(label) {
  const l = label.toLowerCase();
  if (l === 'paper') return ICONS.paper;
  if (l === 'code') return ICONS.code;
  return ICONS.link;
}

/* ============================================================
   i18n — UI strings
   ============================================================ */
const I18N = {
  en: {
    navAbout: 'About',
    navNews: 'News',
    navPub: 'Publications',
    navComp: 'Competitions',
    navCollab: 'Collaborators',
    about: 'Research Interests',
    news: 'News',
    publications: 'Selected Publications',
    competitions: 'Competitions',
    collaboration: 'Collaboration',
    collabIntro: 'I have close collaboration with the following researchers:',
    updated: 'Updated',
    builtWith: 'Built with',
  },
  zh: {
    navAbout: '关于',
    navNews: '动态',
    navPub: '论文',
    navComp: '竞赛',
    navCollab: '合作',
    about: '研究方向',
    news: '新闻动态',
    publications: '代表论文',
    competitions: '竞赛获奖',
    collaboration: '学术合作',
    collabIntro: '我与以下研究者有密切合作：',
    updated: '更新于',
    builtWith: '构建工具',
  }
};

function getLang() {
  return document.documentElement.dataset.lang || 'en';
}

function t(key) {
  return (I18N[getLang()] || I18N.en)[key] || (I18N.en)[key] || key;
}

/** Pick field with Zh suffix when in Chinese, fallback to base field */
function locField(obj, field) {
  const lang = getLang();
  if (lang === 'zh' && obj[field + 'Zh'] != null) return obj[field + 'Zh'];
  return obj[field];
}

/** Update all elements with data-i18n attribute */
function applyI18nLabels() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}

/* ============================================================
   Data Loading
   ============================================================ */
async function loadJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return res.json();
}

async function loadAllData() {
  const [profile, publications, news, competitions] = await Promise.all([
    loadJSON('data/profile.json'),
    loadJSON('data/publications.json'),
    loadJSON('data/news.json'),
    loadJSON('data/competitions.json')
  ]);
  return { profile, publications, news, competitions };
}

/* ============================================================
   Helpers
   ============================================================ */
function formatAuthors(str) {
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

/* ============================================================
   Render: Hero
   ============================================================ */
function renderHero(p) {
  const content = document.getElementById('hero-content');
  content.innerHTML = `
    <h1 class="hero-name">${locField(p, 'name')}</h1>
    <p class="hero-title">${locField(p, 'title')}</p>
    <p class="hero-bio">${locField(p, 'bio')}</p>
    <p class="hero-bio">${locField(p, 'bioSecondary')}</p>
    <p class="hero-email">Email: ${p.email}</p>
    <div class="hero-links">
      <a href="${p.cvUrl}" class="hero-link" target="_blank">${ICONS.download} CV</a>
      ${p.socialLinks.map(s =>
        `<a href="${s.url}" class="hero-link" target="_blank">${ICONS[s.icon] || ''} ${s.label}</a>`
      ).join('')}
    </div>
  `;

  const photo = document.getElementById('hero-photo');
  photo.innerHTML = `<img src="${p.photoUrl}" alt="Photo of ${p.name}" loading="eager">`;
}

/* ============================================================
   Render: Research Interests
   ============================================================ */
function renderResearchInterests(p) {
  const ri = p.researchInterests;
  const container = document.getElementById('research-interests');
  container.innerHTML = `
    <p class="research-text">${locField(ri, 'summary')} ${locField(ri, 'highlightNote')}</p>
  `;
}

/* ============================================================
   Render: News
   ============================================================ */
function renderNews(items) {
  const list = document.getElementById('news-list');
  list.innerHTML = '';
  items.forEach((item, i) => {
    const div = el('div', 'news-item reveal revealed');
    div.innerHTML = `
      <span class="news-date">${item.date}</span>
      <span class="news-content">
        ${item.isNew ? '<span class="badge-new">New</span>' : ''}
        ${locField(item, 'content')}
      </span>
    `;
    list.appendChild(div);
  });
}

/* ============================================================
   Render: Publications
   ============================================================ */
function renderPublications(pubs) {
  const list = document.getElementById('pub-list');
  list.innerHTML = '';
  pubs.forEach((pub, i) => {
    const card = el('div', `pub-card reveal revealed${pub.highlight ? ' pub-card--highlighted' : ''}`);

    // Image
    let imgHTML = `<img src="${pub.image}" alt="${pub.id}">`;
    if (pub.imageHover) {
      imgHTML = `
        <img src="${pub.image}" alt="${pub.id}">
        <img src="${pub.imageHover}" alt="${pub.id} hover" class="pub-img-hover">
      `;
    }

    // Award
    const award = locField(pub, 'award');
    const awardHTML = award
      ? `<div class="pub-award">${award}</div>`
      : '';

    // Tags
    const tags = locField(pub, 'tags');
    const tagsHTML = tags.map(t => `<span class="pub-tag">${t}</span>`).join('');

    // Links
    const linksHTML = pub.links.map(l =>
      `<a href="${l.url}" class="pub-link" target="_blank">${linkIcon(l.label)} ${l.label}</a>`
    ).join('');

    card.innerHTML = `
      <div class="pub-img-wrap">${imgHTML}</div>
      <div class="pub-body">
        <div class="pub-title">${pub.title}</div>
        <div class="pub-authors">${formatAuthors(pub.authors)}</div>
        <div class="pub-venue"><em>${pub.venue}</em> <strong>(${pub.venueShort})</strong></div>
        ${awardHTML}
        <div class="pub-tags">${tagsHTML}</div>
        <div class="pub-links">${linksHTML}</div>
      </div>
    `;
    list.appendChild(card);
  });
}

/* ============================================================
   Render: Competitions
   ============================================================ */
function renderCompetitions(comps) {
  const list = document.getElementById('comp-list');
  list.innerHTML = '';
  comps.forEach((c, i) => {
    const item = el('div', 'comp-item reveal revealed');
    const result = locField(c, 'result');
    const isGold = /1st|一等/i.test(result);
    item.innerHTML = `
      <span class="comp-date">${c.date}</span>
      <span class="comp-name"><a href="${c.url}" target="_blank">${locField(c, 'name')}</a></span>
      <span class="comp-badge${isGold ? ' comp-badge--gold' : ''}">${result}</span>
    `;
    list.appendChild(item);
  });
}

/* ============================================================
   Render: Collaborators
   ============================================================ */
function renderCollaborators(p) {
  const container = document.getElementById('collab-content');
  const chips = p.collaborators.map(c =>
    `<a href="${c.url}" class="collab-chip" target="_blank">${c.name}</a>`
  ).join('');
  container.innerHTML = `
    <p class="collab-text">${t('collabIntro')}</p>
    <div class="collab-chips">${chips}</div>
  `;
}

/* ============================================================
   Render: Footer
   ============================================================ */
function renderFooter() {
  const now = new Date();
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  document.getElementById('footer-date').textContent = `${months[now.getMonth()]} ${now.getFullYear()}`;
}

/* ============================================================
   Render All (for language switch)
   ============================================================ */
function renderAll(data) {
  applyI18nLabels();
  renderHero(data.profile);
  renderResearchInterests(data.profile);
  renderNews(data.news);
  renderPublications(data.publications);
  renderCompetitions(data.competitions);
  renderCollaborators(data.profile);
  renderFooter();
}

/* ============================================================
   Theme Toggle
   ============================================================ */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const saved = localStorage.getItem('theme');
  if (saved) {
    html.dataset.theme = saved;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.dataset.theme = 'dark';
  }

  toggle.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('theme', next);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      html.dataset.theme = e.matches ? 'dark' : 'light';
    }
  });
}

/* ============================================================
   Language Toggle
   ============================================================ */
function initLangToggle(data) {
  const btn = document.getElementById('lang-toggle');
  const html = document.documentElement;
  const options = btn.querySelectorAll('.lang-option');

  // Restore saved language
  const saved = localStorage.getItem('lang');
  if (saved) html.dataset.lang = saved;

  // Highlight the active option
  function updateActive() {
    const lang = getLang();
    options.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    html.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
  }
  updateActive();

  btn.addEventListener('click', () => {
    const next = getLang() === 'en' ? 'zh' : 'en';
    html.dataset.lang = next;
    localStorage.setItem('lang', next);
    updateActive();
    renderAll(data);
  });
}

/* ============================================================
   Navbar Scroll
   ============================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('navbar--scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ============================================================
   Mobile Menu
   ============================================================ */
function initMobileNav() {
  const btn = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      btn.classList.remove('open');
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============================================================
   Scroll Reveal
   ============================================================ */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   Active Nav Tracking
   ============================================================ */
function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-h')} 0px -40% 0px` });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   Init
   ============================================================ */
async function init() {
  initThemeToggle();
  initNavbar();
  initMobileNav();

  try {
    const data = await loadAllData();
    renderAll(data);
    initLangToggle(data);
    initScrollReveal();
    initActiveNavTracking();
  } catch (err) {
    console.error('Failed to load site data:', err);
    document.querySelector('main').innerHTML =
      '<p style="text-align:center;padding:4rem;color:#888;">Failed to load content. If viewing locally, please use a local server:<br><code>python3 -m http.server</code></p>';
  }
}

init();
