const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
const langToggle = document.querySelector('[data-i18n-switch]');
const desktop = window.matchMedia('(min-width: 761px)');

const strings = {
  en: {
    pageTitle: 'Bilingual Navbar',
    brand: 'Qahwa',
    menu: 'Menu',
    home: 'Home',
    coffee: 'Menu',
    branches: 'Branches',
    about: 'About',
    contact: 'Contact',
    order: 'Order now',
    switchTo: 'العربية',
    switchLabel: 'التبديل إلى العربية',
    title: 'Specialty coffee, roasted in Cairo',
    lead: 'Fresh beans every week, delivered to your door or ready at the nearest branch.'
  },
  ar: {
    pageTitle: 'شريط تنقل ثنائي اللغة',
    brand: 'قهوة',
    menu: 'القائمة',
    home: 'الرئيسية',
    coffee: 'المشروبات',
    branches: 'الفروع',
    about: 'من نحن',
    contact: 'تواصل معنا',
    order: 'اطلب الآن',
    switchTo: 'English',
    switchLabel: 'Switch to English',
    title: 'قهوة مختصة، محمّصة في القاهرة',
    lead: 'حبوب طازجة كل أسبوع، تصلك إلى باب البيت أو تستلمها من أقرب فرع.'
  }
};

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
}

function setLanguage(lang) {
  const dict = strings[lang];
  const other = lang === 'ar' ? 'en' : 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = dict.pageTitle;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = dict[el.dataset.i18n];
  });

  langToggle.textContent = dict.switchTo;
  langToggle.lang = other;
  langToggle.setAttribute('aria-label', dict.switchLabel);

  try {
    localStorage.setItem('bilingual-navbar-lang', lang);
  } catch (error) {}
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    setMenu(false);
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (nav.classList.contains('is-open') && !nav.contains(event.target)) setMenu(false);
});

desktop.addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

langToggle.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar');
});

let saved = null;
try {
  saved = localStorage.getItem('bilingual-navbar-lang');
} catch (error) {}
setLanguage(saved === 'ar' ? 'ar' : 'en');
