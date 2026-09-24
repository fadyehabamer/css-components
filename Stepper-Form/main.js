const form = document.getElementById('signup');
const steps = [...form.querySelectorAll('.step')];
const progress = [...document.querySelectorAll('.progress-step')];
const backButton = form.querySelector('.btn-back');
const nextButton = form.querySelector('.btn-next');
const status = document.getElementById('step-status');
const summary = form.querySelector('.summary');
const done = document.getElementById('done');
const progressList = document.querySelector('.progress');

let current = 0;
let editing = false;

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
  const targets = field.matches('fieldset') ? field.querySelectorAll('input') : [field];
  error.textContent = message;
  field.classList.toggle('is-invalid', Boolean(message));
  targets.forEach((target) => {
    if (message) target.setAttribute('aria-invalid', 'true');
    else target.removeAttribute('aria-invalid');
  });
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

function readValues() {
  const data = new FormData(form);
  const value = (name) => (data.get(name) || '').toString().trim();
  return [
    {
      title: 'Account',
      rows: [
        ['Name', value('name')],
        ['Email', value('email')],
        ['Password', '•'.repeat(value('password').length)]
      ]
    },
    {
      title: 'Company',
      rows: [
        ['Company', value('company') || 'Not provided'],
        ['Team size', value('size')],
        ['Country', value('country')]
      ]
    },
    {
      title: 'Preferences',
      rows: [
        ['Using it for', data.getAll('topics').join(', ')],
        ['Contact', value('contact')]
      ]
    }
  ];
}

function renderSummary() {
  summary.replaceChildren();
  readValues().forEach((section, index) => {
    const block = document.createElement('section');
    block.className = 'summary-block';

    const head = document.createElement('div');
    head.className = 'summary-head';
    const title = document.createElement('h3');
    title.textContent = section.title;
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'link-btn';
    edit.dataset.edit = String(index);
    edit.textContent = 'Edit';
    edit.setAttribute('aria-label', 'Edit ' + section.title.toLowerCase());
    head.append(title, edit);

    const list = document.createElement('dl');
    section.rows.forEach(([label, text]) => {
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = text;
      list.append(dt, dd);
    });

    block.append(head, list);
    summary.append(block);
  });
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

  const last = index === steps.length - 1;
  if (last) {
    editing = false;
    renderSummary();
  }
  backButton.hidden = index === 0 || editing;
  nextButton.textContent = last ? 'Create workspace' : editing ? 'Back to review' : 'Next';
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

  if (current < steps.length - 1) {
    showStep(editing ? steps.length - 1 : current + 1);
    return;
  }

  const invalid = steps.findIndex((step) => {
    step.hidden = false;
    const ok = validateStep(step);
    step.hidden = true;
    return !ok;
  });
  if (invalid !== -1) {
    showStep(invalid);
    validateStep(steps[invalid]);
    return;
  }

  const email = new FormData(form).get('email');
  form.hidden = true;
  progressList.hidden = true;
  done.hidden = false;
  done.querySelector('.done-text').textContent = 'We sent a confirmation link to ' + email + '.';
  done.querySelector('h2').focus();
});

summary.addEventListener('click', (event) => {
  const edit = event.target.closest('[data-edit]');
  if (!edit) return;
  editing = true;
  showStep(Number(edit.dataset.edit));
});

document.getElementById('restart').addEventListener('click', () => {
  form.reset();
  form.querySelectorAll('.field-error').forEach((error) => {
    error.textContent = '';
  });
  form.querySelectorAll('[aria-invalid]').forEach((field) => field.removeAttribute('aria-invalid'));
  form.querySelectorAll('.is-invalid').forEach((field) => field.classList.remove('is-invalid'));
  done.hidden = true;
  form.hidden = false;
  progressList.hidden = false;
  editing = false;
  showStep(0);
});

function revalidate(event) {
  const field = event.target;
  const group = field.closest('fieldset.group');
  if (group) {
    if (group.classList.contains('is-invalid')) setError(group, group.id + '-error', checkGroup(group));
  } else if (field.hasAttribute('aria-invalid')) {
    setError(field, field.id + '-error', checkField(field));
  }
}

form.addEventListener('input', revalidate);
form.addEventListener('change', revalidate);

backButton.addEventListener('click', () => {
  if (current > 0) showStep(current - 1);
});

showStep(0, false);
