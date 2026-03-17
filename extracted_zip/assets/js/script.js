/* ==========================================================================
   Funcionalidades Javascript Nativo
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Toggle
    const mobileBtn = document.querySelector('.menu-mobile-btn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-overlay');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        // Impede scroll do body quando menu estiver aberto
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileBtn && navLinks && overlay) {
        mobileBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu); // Fecha menu ao clicar no fundo
    }

    // 2. Smooth Scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                // Fecha o menu mobile se estiver aberto
                if (navLinks && navLinks.classList.contains('active')) {
                    toggleMenu();
                }

                // Ajuste pelo tamanho do header (navbar fixed)
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 5. Cookie Banner Logica
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        const btnAceitar = document.getElementById('btn-cookie-aceitar');
        const btnRejeitar = document.getElementById('btn-cookie-rejeitar');
        const btnPersonalizar = document.getElementById('btn-cookie-personalizar');

        // Verifica se já aceitou ou rejeitou no passado
        if (!localStorage.getItem('cookieConsentViaSeg')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000); // Mostra após 1 segundo
        }

        const fecharCookieBanner = (consentimento) => {
            localStorage.setItem('cookieConsentViaSeg', consentimento);
            cookieBanner.classList.remove('show');
        };

        if (btnAceitar) btnAceitar.addEventListener('click', () => fecharCookieBanner('aceito'));
        if (btnRejeitar) btnRejeitar.addEventListener('click', () => fecharCookieBanner('rejeitado'));
        if (btnPersonalizar) btnPersonalizar.addEventListener('click', () => {
            // Em um sistema real, abriria um modal de personalização
            // Para simplicidade, vamos tratar como aceito parcial ou fechar
            fecharCookieBanner('personalizado');
        });
    }
});
