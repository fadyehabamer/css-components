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

  let selectedIndex = 0;

  function rove(index) {
    tabs.forEach((tab, i) => {
      tab.tabIndex = i === index ? 0 : -1;
    });
  }

  function select(index) {
    selectedIndex = index;
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      panels[i].hidden = !selected;
    });
    rove(index);
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
    const rtl = getComputedStyle(list).direction === 'rtl';
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const backward = rtl ? 'ArrowRight' : 'ArrowLeft';
    let next = null;

    switch (event.key) {
      case forward:
        next = current === last ? 0 : current + 1;
        break;
      case backward:
        next = current === 0 ? last : current - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        select(current);
        return;
      default:
        return;
    }

    event.preventDefault();
    tabs[next].focus();
    if (tabs[next].scrollIntoView) tabs[next].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (root.dataset.activation === 'manual') rove(next);
    else select(next);
  });

  list.addEventListener('focusout', (event) => {
    if (!list.contains(event.relatedTarget)) rove(selectedIndex);
  });

  const fromHash = panels.findIndex((panel) => '#' + panel.id === location.hash);
  select(fromHash === -1 ? 0 : fromHash);
}

document.querySelectorAll('.tabs').forEach(initTabs);

const modeControl = document.getElementById('activation');
const productTabs = document.getElementById('product-tabs');

modeControl.addEventListener('change', () => {
  productTabs.dataset.activation = modeControl.querySelector('input:checked').value;
});
