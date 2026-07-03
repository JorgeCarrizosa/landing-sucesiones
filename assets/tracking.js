/* Tracking compartido — Google Ads (gtag) + Consent Mode v2 + banner de cookies.
   Lo usan las páginas interiores; index.html lleva su propia copia inline.
   Cargar con <script src="/assets/tracking.js"></script> en el <head> (síncrono,
   para que el consent default quede fijado antes de que cargue gtag.js). */

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);

(function(){
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17531743025';
  document.head.appendChild(s);
})();
gtag('js', new Date());
gtag('config', 'AW-17531743025');

window.CYA_ADS = {
  id: 'AW-17531743025',
  labels: {
    formulario: '-y4FCJbXs6QcELHW5KdB',
    telefono:   'fgGVCOjVicocELHW5KdB',
    whatsapp:   'cpHyCOvVicocELHW5KdB'
  }
};
window.cyaConversion = function(tipo){
  var etiqueta = window.CYA_ADS.labels[tipo];
  if(!etiqueta) return;
  gtag('event','conversion',{'send_to': window.CYA_ADS.id + '/' + etiqueta});
};

window.cyaConsent = {
  leer: function(){
    try {
      var c = JSON.parse(localStorage.getItem('cya_consent') || 'null');
      if (c && (Date.now() - c.ts) < 365*24*60*60*1000) return c;
    } catch(e) {}
    return null;
  },
  guardar: function(acepta){
    try { localStorage.setItem('cya_consent', JSON.stringify({granted: acepta, ts: Date.now()})); } catch(e) {}
    if (acepta) {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
  }
};
(function(){
  var c = window.cyaConsent.leer();
  if (c && c.granted) window.cyaConsent.guardar(true);
})();

document.addEventListener('DOMContentLoaded', function(){
  // Banner de cookies (mismo markup y clases que index.html; estilos en estilo.css)
  var banner = document.getElementById('cookie-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<div class="cookie-inner">' +
      '<p class="cookie-text">Utilizamos cookies de Google Ads únicamente para medir la eficacia de nuestra publicidad. ' +
      'No se activan si usted no lo acepta, y puede cambiar su elección en cualquier momento desde el enlace «Cookies» del pie de página. ' +
      '<a href="https://www.carrizosayalmazor.com/politica-privacidad" target="_blank" rel="noopener">Más información</a></p>' +
      '<div class="cookie-actions">' +
      '<button class="cookie-btn rechazar" id="cookie-rechazar">Rechazar</button>' +
      '<button class="cookie-btn aceptar" id="cookie-aceptar">Aceptar</button>' +
      '</div></div>';
    document.body.appendChild(banner);
  }
  function cerrar(acepta){
    window.cyaConsent.guardar(acepta);
    banner.classList.remove('visible');
  }
  document.getElementById('cookie-aceptar').addEventListener('click', function(){ cerrar(true); });
  document.getElementById('cookie-rechazar').addEventListener('click', function(){ cerrar(false); });
  window.cyaCookiePrefs = function(){ banner.classList.add('visible'); };
  if (window.cyaConsent.leer() === null) banner.classList.add('visible');

  // Conversiones por clic: teléfono y WhatsApp
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
    a.addEventListener('click', function(){ cyaConversion('telefono'); });
  });
  var wa = document.querySelector('.wa-fab');
  if (wa) wa.addEventListener('click', function(){ cyaConversion('whatsapp'); });
});
