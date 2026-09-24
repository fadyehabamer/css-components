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

  const fromHash = panels.findIndex((panel) => '#' + panel.id === location.hash);
  select(fromHash === -1 ? 0 : fromHash);
}

document.querySelectorAll('.tabs').forEach(initTabs);
