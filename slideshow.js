(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = document.querySelector('.slide-dots');
  if (slides.length < 2 || !dots) return;

  let current = 0;
  const indicators = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slide-dot';
    dot.setAttribute('aria-label', `画像 ${index + 1} を表示`);
    dot.addEventListener('click', () => {
      show(index);
      restart();
    });
    dots.append(dot);
    return dot;
  });

  const show = index => {
    current = (index + slides.length) % slides.length;
    const previous = (current - 1 + slides.length) % slides.length;
    const next = (current + 1) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-current', i === current);
      slide.classList.toggle('is-previous', i === previous);
      slide.classList.toggle('is-next', i === next);
      slide.classList.toggle('is-hidden', i !== current && i !== previous && i !== next);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    indicators.forEach((dot, i) => {
      dot.classList.toggle('is-current', i === current);
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  };

  let timer = window.setInterval(() => show(current + 1), 3000);
  function restart() {
    window.clearInterval(timer);
    timer = window.setInterval(() => show(current + 1), 3000);
  }
  show(0);
})();
