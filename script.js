/* ===== HEADER SCROLL ===== */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== SMOOTH NAV ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.feature-card, .step, .gallery-item, .order-form, .order__info'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ===== ORDER FORM → WHATSAPP ===== */
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', e => {
    e.preventDefault();

    const get = id => document.getElementById(id)?.value?.trim() || '';

    const nome       = get('nome');
    const telefone   = get('telefone');
    const modelo     = get('modelo');
    const tamanho    = get('tamanho');
    const quantidade = get('quantidade');
    const cor        = get('cor');
    const estampa    = get('estampa');
    const obs        = get('obs');

    const lines = [
      '👕 *Novo pedido – VL Sublimação*',
      '',
      `👤 *Nome:* ${nome}`,
      `📱 *Telefone:* ${telefone}`,
      `👕 *Modelo:* ${modelo}`,
      `📏 *Tamanho:* ${tamanho}`,
      quantidade ? `🔢 *Quantidade:* ${quantidade}` : null,
      cor        ? `🎨 *Cor base:* ${cor}`          : null,
      `🖼️ *Estampa desejada:*\n${estampa}`,
      obs        ? `📝 *Observações:*\n${obs}`       : null,
    ].filter(Boolean);

    const msg = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/5521997512126?text=${msg}`;

    window.open(url, '_blank');
  });
}

/* ===== PHONE MASK ===== */
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
  phoneInput.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length >= 7) {
      v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    } else if (v.length >= 3) {
      v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    } else if (v.length >= 1) {
      v = `(${v}`;
    }
    e.target.value = v;
  });
}

/* ===== ADD REVEAL CSS ON-THE-FLY ===== */
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .55s ease, transform .55s ease;
  }
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .gallery-item.reveal  { transition-delay: calc(var(--i, 0) * .08s); }
  .feature-card.reveal  { transition-delay: calc(var(--i, 0) * .1s);  }
`;
document.head.appendChild(style);

/* stagger delay for grid children */
document.querySelectorAll('.gallery__grid .gallery-item').forEach((el, i) => {
  el.style.setProperty('--i', i);
});
document.querySelectorAll('.features__grid .feature-card').forEach((el, i) => {
  el.style.setProperty('--i', i);
});
