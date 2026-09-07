// assets/scripts.js
// Gestisce l'invio del form via fetch e mostra messaggi nella lingua della pagina.
// Le pagine contatti hanno l'attributo data-lang="it" o "en" sul form.
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    const lang = form.getAttribute('data-lang') || document.documentElement.lang || 'it';

    function msg(key) {
      const texts = {
        it: {
          sending: 'Invio in corso...',
          success: 'Messaggio inviato! Ti risponderò presto.',
          error: 'Si è verificato un errore. Riprova più tardi.',
          network: 'Errore di rete. Riprova.'
        },
        en: {
          sending: 'Sending...',
          success: 'Message sent! I will reply soon.',
          error: 'An error occurred. Please try again later.',
          network: 'Network error. Please try again.'
        }
      };
      return (texts[lang] && texts[lang][key]) || texts['it'][key];
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = msg('sending');
      status.className = 'text-sm text-slate-600';

      const action = form.getAttribute('action');
      const formData = new FormData(form);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => response.json().catch(() => ({})))
      .then(data => {
        if (data.ok === false || data.error) {
          status.textContent = msg('error');
          status.className = 'text-sm text-red-600';
        } else {
          status.textContent = msg('success');
          status.className = 'text-sm text-emerald-600';
          form.reset();
        }
      })
      .catch(() => {
        status.textContent = msg('network');
        status.className = 'text-sm text-red-600';
      });
    });
  }

  // --- Image fallback handler ---
  // Se le immagini esterne non si caricano (es. Unsplash bloccato), mostra una SVG placeholder con il gradiente lilla->verde-acqua.
  function makePlaceholderDataURL(width, height, text) {
    const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
      <defs>
        <linearGradient id='g' x1='0' x2='1'>
          <stop offset='0' stop-color='#7c3aed'/>
          <stop offset='1' stop-color='#14b8a6'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)' />
      <text x='50%' y='50%' font-family='Inter, Arial, sans-serif' font-size='24' fill='#ffffff' text-anchor='middle' dominant-baseline='middle'>${text}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function applyImageFallback(img) {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = '1';
    const lang = document.documentElement.lang || 'it';
    const text = (lang.startsWith('en')) ? 'Image unavailable' : 'Immagine non disponibile';
    // Use reasonable size for placeholder
    const w = img.width || 800;
    const h = img.height || 400;
    img.src = makePlaceholderDataURL(w, h, text);
    img.classList.add('object-cover');
  }

  const imgs = Array.from(document.querySelectorAll('img'));
  imgs.forEach(img => {
    img.addEventListener('error', function () { applyImageFallback(img); });
    // Some images might already be broken — check and apply fallback
    if (img.complete && img.naturalWidth === 0) {
      applyImageFallback(img);
    }
  });

  // End DOMContentLoaded
});
