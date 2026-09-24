function actionToggle() {
  var action = document.querySelector('.action');
  action.classList.toggle('active')
  action.querySelector('span').setAttribute('aria-expanded', action.classList.contains('active'))
}

// keyboard access for the toggle
document.querySelector('.action span').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    actionToggle();
  }
});