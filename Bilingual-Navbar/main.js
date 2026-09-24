const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
