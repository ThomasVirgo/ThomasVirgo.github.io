/*==================== NAV ELEMENTS ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*===== SHOW MENU =====*/
/* Validate if constant exists */
if (navToggle){
    navToggle.addEventListener('click', ()=>{
        navMenu.classList.add('show-menu')
    })
}

/*===== HIDE MENU =====*/
/* Validate if constant exists */
if (navClose){
    navClose.addEventListener('click', ()=>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU ON CLICKING LINK ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu'); // hide menu when a link is clicked
}

navLink.forEach(link => link.addEventListener('click', linkAction));

/*==================== SKILLS DROPDOWN ====================*/
const skillsContent = document.getElementsByClassName('skills__content');
const skillsHeaders = document.querySelectorAll('.skills__header');

function toggleSkills(){
    let parentClass = this.parentNode.className //returns the class name of the parent of the clicked item, as "this" refers to target of the event.
    if (parentClass === 'skills__content skills__open'){
        this.parentNode.className = 'skills__content skills__close'
    }
    if (parentClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeaders.forEach(item => item.addEventListener('click', toggleSkills));


/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

//Previously selected by user
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon': 'uil-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add': 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // No saved choice: follow the OS preference on first visit
    document.body.classList.add(darkTheme);
    themeButton.classList.add(iconTheme);
}

themeButton.addEventListener('click', ()=>{
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// Keyboard support: the toggle is an <i>, so activate it on Enter/Space
themeButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeButton.click();
    }
});


/*==================== ACTIVE LINK & HEADER SHADOW ON SCROLL ====================*/
const sections = document.querySelectorAll('section[id]');
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');
        if (!link) return; // not every section has a nav link
        link.classList.toggle('active-link',
            scrollY > sectionTop && scrollY <= sectionTop + current.offsetHeight);
    });

    header.classList.toggle('scroll-header', scrollY >= 80);
});




