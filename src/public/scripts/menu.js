const menuToggle = document.querySelector('[data-menu-toggle]');
const sidebar = document.querySelector('.sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        const aberto = sidebar.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(aberto));
        menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    sidebar.querySelectorAll('.sidebar-navigation a').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && sidebar.classList.contains('menu-open')) {
            sidebar.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            menuToggle.focus();
        }
    });
}
