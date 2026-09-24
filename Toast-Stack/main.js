const stack = document.querySelector('.toast-stack');
const DURATION = 5000;

const presets = {
  success: { icon: '✓', title: 'Changes saved', message: 'Your profile has been updated.' },
  error: { icon: '!', title: 'Upload failed', message: 'The file is larger than 10 MB. Try a smaller one.' },
  info: { icon: 'i', title: 'New version available', message: 'Refresh the page to get the latest features.' }
};

function removeToast(toast) {
  if (!toast.isConnected) return;
  clearTimeout(toast.timer);
  const next = toast.nextElementSibling || toast.previousElementSibling;
  const hadFocus = toast.contains(document.activeElement);
  toast.remove();
  if (hadFocus) {
    const target = next ? next.querySelector('.toast-close') : document.querySelector('[data-toast]');
    if (target) target.focus();
  }
}

function startTimer(toast) {
  toast.startedAt = performance.now();
  toast.timer = setTimeout(() => removeToast(toast), toast.remaining);
}

function updatePause(toast) {
  const shouldPause = toast.hovered || toast.focused;
  if (shouldPause === toast.classList.contains('is-paused')) return;
  toast.classList.toggle('is-paused', shouldPause);
  if (shouldPause) {
    clearTimeout(toast.timer);
    toast.remaining -= performance.now() - toast.startedAt;
  } else {
    startTimer(toast);
  }
}

function showToast(type, options = {}) {
  const preset = presets[type] || presets.info;
  const toast = document.createElement('li');
  toast.className = 'toast toast-' + type;
  if (type === 'error') toast.setAttribute('role', 'alert');

  const icon = document.createElement('span');
  icon.className = 'toast-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = preset.icon;

  const body = document.createElement('div');
  body.className = 'toast-body';
  const title = document.createElement('p');
  title.className = 'toast-title';
  title.textContent = options.title || preset.title;
  const message = document.createElement('p');
  message.className = 'toast-message';
  message.textContent = options.message || preset.message;
  body.append(title, message);

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'toast-close';
  close.setAttribute('aria-label', 'Dismiss: ' + title.textContent);
  close.textContent = '×';
  close.addEventListener('click', () => removeToast(toast));

  const progress = document.createElement('span');
  progress.className = 'toast-progress';
  progress.setAttribute('aria-hidden', 'true');

  const duration = options.duration || DURATION;
  toast.style.setProperty('--duration', duration + 'ms');
  toast.append(icon, body, close, progress);
  stack.append(toast);

  toast.remaining = duration;
  startTimer(toast);

  toast.addEventListener('mouseenter', () => {
    toast.hovered = true;
    updatePause(toast);
  });
  toast.addEventListener('mouseleave', () => {
    toast.hovered = false;
    updatePause(toast);
  });
  toast.addEventListener('focusin', () => {
    toast.focused = true;
    updatePause(toast);
  });
  toast.addEventListener('focusout', (event) => {
    if (toast.contains(event.relatedTarget)) return;
    toast.focused = false;
    updatePause(toast);
  });
  return toast;
}

document.querySelectorAll('[data-toast]').forEach((button) => {
  button.addEventListener('click', () => showToast(button.dataset.toast));
});
