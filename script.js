document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
    });

    // 2. Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to sections and specific elements
    const revealElements = document.querySelectorAll('.plot-card, .service-card, .stat-card, .about-content, .about-img, .section-header');

    // Injecting helper styles for reveal
    const style = document.createElement('style');
    style.textContent = `
        .plot-card, .service-card, .stat-card, .about-content, .about-img, .section-header {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    revealElements.forEach(el => observer.observe(el));

    // 3. Form Submission Simulation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Request Sent Successfully!';
            btn.style.background = '#10B981'; // Green for success
            btn.disabled = true;

            contactForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'var(--primary)';
                btn.disabled = false;
            }, 4000);
        });
    }

    // 4. Smooth Anchor Scrolling (Enhanced)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
