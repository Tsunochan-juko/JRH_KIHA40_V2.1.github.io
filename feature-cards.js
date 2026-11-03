document.querySelectorAll('.feature-flip-card').forEach(card => {
  const buttons = card.querySelectorAll('.feature-flip-button');
  const front = card.querySelector('.feature-flip-front');
  const back = card.querySelector('.feature-flip-back');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const flipped = card.classList.toggle('is-flipped');
      card.querySelectorAll('.feature-flip-button').forEach(item => {
        item.setAttribute('aria-expanded', String(flipped));
      });
      front.setAttribute('aria-hidden', String(flipped));
      back.setAttribute('aria-hidden', String(!flipped));
      front.inert = flipped;
      back.inert = !flipped;
    });
  });
});
