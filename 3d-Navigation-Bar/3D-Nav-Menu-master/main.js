function toggleMenu() {
    const menu = selector('.menu');
    menu.classList.toggle('open');
    selector('header').classList.toggle('open');
    selector('.overlay').classList.toggle('open');
    menu.setAttribute('aria-expanded', menu.classList.contains('open'));
}

selector('.menu').addEventListener('click', toggleMenu);
selector('.menu').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

function selector(s) {
    return document.querySelector(s);
}