const form = document.getElementById('signup');
const steps = [...form.querySelectorAll('.step')];
const progress = [...document.querySelectorAll('.progress-step')];
const backButton = form.querySelector('.btn-back');
const nextButton = form.querySelector('.btn-next');
const status = document.getElementById('step-status');

let current = 0;

const messages = {
  name: { missing: 'Enter your full name.', short: 'Your name looks too short.' },
  email: { missing: 'Enter your work email.', format: 'Enter an email like name@company.com.' },
  password: { missing: 'Choose a password.', short: 'Use at least 8 characters.' },
  size: { missing: 'Choose your team size.' },
  country: { missing: 'Choose a country.' },
  topics: { missing: 'Pick at least one option.' },
  contact: { missing: 'Choose how we should reach you.' }
};

function setError(field, errorId, message) {
  const error = document.getElementById(errorId);
  error.textContent = message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

function checkField(field) {
  const text = field.value.trim();
  const fieldMessages = messages[field.id] || {};
  if (field.required && !text) return fieldMessages.missing || 'This field is required.';
  if (field.minLength > 0 && text && text.length < field.minLength) return fieldMessages.short || 'Too short.';
  if (field.type === 'email' && text && field.validity.typeMismatch) return fieldMessages.format;
  return '';
}

function checkGroup(group) {
  const checked = group.querySelector('input:checked');
  return checked ? '' : messages[group.id].missing;
}

function validateStep(step) {
  let firstInvalid = null;

  step.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], select').forEach((field) => {
    if (!field.hasAttribute('aria-describedby')) return;
    const message = checkField(field);
    setError(field, field.id + '-error', message);
    if (message && !firstInvalid) firstInvalid = field;
  });

  step.querySelectorAll('fieldset.group').forEach((group) => {
    const message = checkGroup(group);
    setError(group, group.id + '-error', message);
    if (message && !firstInvalid) firstInvalid = group.querySelector('input');
  });

  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

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
  if (!validateStep(steps[current])) return;
  if (current < steps.length - 1) showStep(current + 1);
});

form.addEventListener('input', (event) => {
  const field = event.target;
  const group = field.closest('fieldset.group');
  if (group) {
    if (group.hasAttribute('aria-invalid')) setError(group, group.id + '-error', checkGroup(group));
  } else if (field.hasAttribute('aria-invalid')) {
    setError(field, field.id + '-error', checkField(field));
  }
});

backButton.addEventListener('click', () => {
  if (current > 0) showStep(current - 1);
});

showStep(0, false);
