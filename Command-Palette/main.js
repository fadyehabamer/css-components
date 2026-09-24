const palette = document.getElementById('palette');
const input = document.getElementById('palette-input');
const list = document.getElementById('palette-list');
const empty = palette.querySelector('.palette-empty');
const openButton = document.querySelector('.open-palette');
const closeButton = palette.querySelector('.palette-close');
const backdrop = palette.querySelector('.palette-backdrop');
const lastRun = document.querySelector('.last-run');

const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
let returnFocus = null;

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

function render(results) {
  list.replaceChildren();
  results.forEach(({ command, match }) => {
    const option = document.createElement('li');
    option.className = 'palette-option';
    option.id = 'command-' + commands.indexOf(command);
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');

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
}

function openPalette() {
  if (!palette.hidden) return;
  returnFocus = document.activeElement;
  input.value = '';
  render(filter(''));
  palette.hidden = false;
  document.body.style.overflow = 'hidden';
  input.focus();
}

function closePalette() {
  if (palette.hidden) return;
  palette.hidden = true;
  document.body.style.overflow = '';
  if (returnFocus && returnFocus.focus) returnFocus.focus();
}

input.addEventListener('input', () => render(filter(input.value)));

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
