document.querySelectorAll('.hub-card-links').forEach(container => {
  const links = container.querySelectorAll('a');
  if (links.length !== 1 || !links[0].textContent.trim().startsWith('配布先を開く')) return;

  const link = links[0];
  container.tabIndex = 0;
  container.setAttribute('role', 'link');

  container.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    link.click();
  });

  container.addEventListener('keydown', event => {
    if (event.target.closest('a') || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    link.click();
  });
});
