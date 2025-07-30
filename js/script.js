// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');

    navLinks.classList.toggle('mobile-active');
    mobileToggle.classList.toggle('active');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .consultant-card, .benefit-item, .pricing-card');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click handlers for pricing buttons
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardTitle = this.closest('.pricing-card').querySelector('h3').textContent;

            // Create WhatsApp message
            const message = `Olá! Tenho interesse no plano ${cardTitle}. Gostaria de mais informações.`;
            const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');
        });
    });

    // Add hover effect to mockup
    const mockup = document.querySelector('.dashboard-mockup');
    if (mockup) {
        mockup.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(-2deg) rotateX(1deg) scale(1.05)';
        });

        mockup.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(-10deg) rotateX(5deg) scale(1)';
        });
    }

    // Typing effect for hero title (optional)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Add floating animation to benefit icons
    const benefitIcons = document.querySelectorAll('.benefit-icon');
    benefitIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });

    // Create floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .mobile-active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 20px 24px;
            border-top: 1px solid #e2e8f0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        .parallax {
            transform: translateY(0);
            transition: transform 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add click tracking for analytics (placeholder)
    function trackClick(action, label) {
        console.log(`Action: ${action}, Label: ${label}`);
        // Here you would integrate with Google Analytics or other tracking
        // gtag('event', action, { 'event_label': label });
    }

    // Track button clicks
    const ctaButtons = document.querySelectorAll('.btn, .pricing-btn, .instagram-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackClick('button_click', buttonText);
        });
    });
});

// Newsletter subscription (if needed later)
function subscribeNewsletter(email) {
    // Placeholder for newsletter subscription
    console.log('Newsletter subscription:', email);
    alert('Obrigado por se inscrever! Em breve você receberá nossos updates.');
}

// Contact form handler (if needed later)
function handleContactForm(formData) {
    // Placeholder for contact form submission
    console.log('Contact form submitted:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
}

// Utility function to format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Initialize any third-party integrations
function initIntegrations() {
    // Placeholder for third-party integrations
    // Example: Google Analytics, Facebook Pixel, etc.
}

// Call initialization
document.addEventListener('DOMContentLoaded', initIntegrations);
