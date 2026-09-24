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

function render(items) {
  list.replaceChildren();
  items.forEach((command, index) => {
    const option = document.createElement('li');
    option.className = 'palette-option';
    option.id = 'command-' + commands.indexOf(command);
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');

    const title = document.createElement('span');
    title.className = 'option-title';
    title.textContent = command.title;

    const group = document.createElement('span');
    group.className = 'option-group';
    group.textContent = command.group;

    option.append(title, group);
    list.append(option);
  });
  empty.hidden = items.length > 0;
}

function openPalette() {
  if (!palette.hidden) return;
  returnFocus = document.activeElement;
  input.value = '';
  render(commands);
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
