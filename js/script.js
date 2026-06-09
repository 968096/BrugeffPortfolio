document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const body = document.body;

    requestAnimationFrame(() => {
        body.classList.add('is-loaded');
    });

    const observerOptions = {
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    const internalLinks = document.querySelectorAll('a[href$=".html"], a[href="index.html"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const target = link.getAttribute('href');

            if (!target || target.startsWith('http') || target.startsWith('#')) {
                return;
            }

            event.preventDefault();
            body.classList.add('is-navigating');

            window.setTimeout(() => {
                window.location.href = target;
            }, 180);
        });
    });
});
