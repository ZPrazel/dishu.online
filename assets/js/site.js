(() => {
  const applyExternalLinkSafety = () => {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      rel.add('noreferrer');
      link.setAttribute('rel', [...rel].join(' '));
    });
  };

  const setupBackToTop = () => {
    if (document.getElementById('siteBackToTop') || document.getElementById('btt')) return;
    const button = document.createElement('button');
    button.id = 'siteBackToTop';
    button.className = 'site-btt';
    button.type = 'button';
    button.setAttribute('aria-label', '回到顶部');
    button.textContent = '↑';
    document.body.appendChild(button);
    const sync = () => button.classList.toggle('show', window.scrollY > 520);
    window.addEventListener('scroll', sync, { passive: true });
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    sync();
  };

  const setupNavHighlight = () => {
    const links = [...document.querySelectorAll('.side-a[href^="#"], .sidebar nav a[href^="#"], .toc a[href^="#"]')];
    if (!links.length) return;
    const pairs = links
      .map((link) => ({ link, section: document.getElementById(link.getAttribute('href').slice(1)) }))
      .filter((pair) => pair.section);
    if (!pairs.length) return;
    const sync = () => {
      let active = pairs[0];
      for (const pair of pairs) {
        if (pair.section.getBoundingClientRect().top <= 120) active = pair;
      }
      links.forEach((link) => link.classList.remove('active'));
      active.link.classList.add('active');
    };
    window.addEventListener('scroll', sync, { passive: true });
    sync();
  };

  document.addEventListener('DOMContentLoaded', () => {
    applyExternalLinkSafety();
    setupBackToTop();
    setupNavHighlight();
  });
})();

