const palette = document.getElementById('palette');
const input = document.getElementById('palette-input');
const list = document.getElementById('palette-list');
const empty = palette.querySelector('.palette-empty');
const openButton = document.querySelector('.open-palette');
const closeButton = palette.querySelector('.palette-close');
const backdrop = palette.querySelector('.palette-backdrop');
const lastRun = document.querySelector('.last-run');
const page = document.querySelector('.page');
const panel = palette.querySelector('.palette-panel');

const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
let returnFocus = null;
let results = [];
let active = -1;

const commands = [
  { title: 'Toggle dark theme', group: 'Appearance', run: () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  } },
  { title: 'Increase font size', group: 'Appearance', run: () => changeFontSize(1) },
  { title: 'Decrease font size', group: 'Appearance', run: () => changeFontSize(-1) },
  { title: 'Go to dashboard', group: 'Navigation' },
  { title: 'Go to settings', group: 'Navigation' },
  { title: 'Open recent project', group: 'Navigation' },
  { title: 'New file', group: 'Files' },
  { title: 'New folder', group: 'Files' },
  { title: 'Copy page link', group: 'Files' },
  { title: 'Invite a teammate', group: 'Team' },
  { title: 'Show keyboard shortcuts', group: 'Help' },
  { title: 'Sign out', group: 'Account' }
];

function changeFontSize(step) {
  const current = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const next = Math.min(22, Math.max(12, current + step));
  document.documentElement.style.fontSize = next + 'px';
}

function fuzzyMatch(query, text) {
  const q = query.toLowerCase().replace(/\s+/g, '');
  const t = text.toLowerCase();
  if (!q) return { score: 0, positions: [] };

  const positions = [];
  let score = 0;
  let from = 0;
  let previous = -2;

  for (const char of q) {
    const found = t.indexOf(char, from);
    if (found === -1) return null;
    positions.push(found);
    score += 1;
    if (found === previous + 1) score += 3;
    if (found === 0 || t[found - 1] === ' ') score += 2;
    score -= (found - from) * 0.1;
    previous = found;
    from = found + 1;
  }

  return { score, positions };
}

function highlight(text, positions) {
  const fragment = document.createDocumentFragment();
  let i = 0;
  while (i < text.length) {
    const marked = positions.includes(i);
    let j = i;
    while (j < text.length && positions.includes(j) === marked) j++;
    const chunk = text.slice(i, j);
    if (marked) {
      const mark = document.createElement('mark');
      mark.textContent = chunk;
      fragment.append(mark);
    } else {
      fragment.append(chunk);
    }
    i = j;
  }
  return fragment;
}

function filter(query) {
  return commands
    .map((command, order) => ({ command, order, match: fuzzyMatch(query, command.title) }))
    .filter((item) => item.match)
    .sort((a, b) => b.match.score - a.match.score || a.order - b.order);
}

function render(nextResults) {
  results = nextResults;
  list.replaceChildren();
  results.forEach(({ command, match }, index) => {
    const option = document.createElement('li');
    option.className = 'palette-option';
    option.id = 'command-' + commands.indexOf(command);
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');
    option.dataset.index = String(index);

    const title = document.createElement('span');
    title.className = 'option-title';
    title.append(highlight(command.title, match.positions));

    const group = document.createElement('span');
    group.className = 'option-group';
    group.textContent = command.group;

    option.append(title, group);
    list.append(option);
  });
  empty.hidden = results.length > 0;
  setActive(results.length ? 0 : -1);
}

function setActive(index) {
  const options = list.children;
  if (options[active]) options[active].setAttribute('aria-selected', 'false');
  active = index;
  if (options[active]) {
    options[active].setAttribute('aria-selected', 'true');
    input.setAttribute('aria-activedescendant', options[active].id);
    if (options[active].scrollIntoView) options[active].scrollIntoView({ block: 'nearest' });
  } else {
    input.removeAttribute('aria-activedescendant');
  }
}

function move(step) {
  if (!results.length) return;
  setActive((active + step + results.length) % results.length);
}

function runActive() {
  const item = results[active];
  if (!item) return;
  closePalette();
  if (item.command.run) item.command.run();
  lastRun.textContent = 'Ran: ' + item.command.title;
}

function openPalette() {
  if (!palette.hidden) return;
  returnFocus = document.activeElement;
  input.value = '';
  render(filter(''));
  palette.hidden = false;
  page.inert = true;
  document.body.style.overflow = 'hidden';
  input.focus();
}

function closePalette() {
  if (palette.hidden) return;
  palette.hidden = true;
  page.inert = false;
  document.body.style.overflow = '';
  if (returnFocus && returnFocus.focus) returnFocus.focus();
}

input.addEventListener('input', () => render(filter(input.value)));

input.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    move(1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    move(-1);
  } else if (event.key === 'Home' && event.ctrlKey) {
    event.preventDefault();
    setActive(results.length ? 0 : -1);
  } else if (event.key === 'End' && event.ctrlKey) {
    event.preventDefault();
    setActive(results.length - 1);
  } else if (event.key === 'Enter') {
    event.preventDefault();
    runActive();
  }
});

list.addEventListener('mousemove', (event) => {
  const option = event.target.closest('.palette-option');
  if (option && Number(option.dataset.index) !== active) setActive(Number(option.dataset.index));
});

list.addEventListener('click', (event) => {
  const option = event.target.closest('.palette-option');
  if (!option) return;
  setActive(Number(option.dataset.index));
  runActive();
});

function focusables() {
  return [...panel.querySelectorAll('input, button, [href], [tabindex]:not([tabindex="-1"])')]
    .filter((el) => !el.disabled && !el.closest('[hidden]'));
}

panel.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const items = focusables();
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.addEventListener('focusin', (event) => {
  if (!palette.hidden && !panel.contains(event.target)) input.focus();
});

openButton.querySelector('.shortcut').textContent = isMac ? '⌘ K' : 'Ctrl K';
openButton.addEventListener('click', openPalette);
closeButton.addEventListener('click', closePalette);
backdrop.addEventListener('click', closePalette);

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if (palette.hidden) openPalette();
    else closePalette();
    return;
  }
  if (event.key === 'Escape' && !palette.hidden) {
    event.preventDefault();
    closePalette();
  }
});
