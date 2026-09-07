// assets/scripts.js
// Gestisce l'invio del form via fetch e mostra messaggi nella lingua della pagina.
// Le pagine contatti hanno l'attributo data-lang="it" o "en" sul form.
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
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
});
