const form = document.getElementById('signup');
const steps = [...form.querySelectorAll('.step')];
const progress = [...document.querySelectorAll('.progress-step')];
const backButton = form.querySelector('.btn-back');
const nextButton = form.querySelector('.btn-next');
const status = document.getElementById('step-status');

let current = 0;

function showStep(index, moveFocus = true) {
  current = index;
  steps.forEach((step, i) => {
    step.hidden = i !== index;
  });
  progress.forEach((item, i) => {
    item.classList.toggle('is-done', i < index);
    if (i === index) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });

  backButton.hidden = index === 0;
  nextButton.textContent = index === steps.length - 1 ? 'Create workspace' : 'Next';
  status.textContent = 'Step ' + (index + 1) + ' of ' + steps.length + ': ' + steps[index].querySelector('.step-title').textContent;

  if (moveFocus) {
    const title = steps[index].querySelector('.step-title');
    title.tabIndex = -1;
    title.focus();
  }
}

form.noValidate = true;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (current < steps.length - 1) showStep(current + 1);
});

backButton.addEventListener('click', () => {
  if (current > 0) showStep(current - 1);
});

showStep(0, false);
