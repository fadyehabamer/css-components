function initTabs(root) {
  const list = root.querySelector('.tab-list');
  const tabs = [...list.querySelectorAll('.tab')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('href').slice(1)));

  list.setAttribute('role', 'tablist');
  list.querySelectorAll('li').forEach((item) => item.setAttribute('role', 'presentation'));

  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[i].id);
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].tabIndex = 0;
  });

  function select(index) {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
  }

  list.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab) return;
    event.preventDefault();
    select(tabs.indexOf(tab));
  });

  list.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(event.target);
    if (current === -1) return;

    const last = tabs.length - 1;
    let next = null;

    switch (event.key) {
      case 'ArrowRight':
        next = current === last ? 0 : current + 1;
        break;
      case 'ArrowLeft':
        next = current === 0 ? last : current - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      case ' ':
        event.preventDefault();
        select(current);
        return;
      default:
        return;
    }

    event.preventDefault();
    tabs[next].focus();
    select(next);
  });

  const fromHash = panels.findIndex((panel) => '#' + panel.id === location.hash);
  select(fromHash === -1 ? 0 : fromHash);
}

document.querySelectorAll('.tabs').forEach(initTabs);
