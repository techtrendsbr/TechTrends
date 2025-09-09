// --- FUNÇÕES GLOBAIS ---
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    navLinks.classList.toggle('mobile-active');
    mobileToggle.classList.toggle('active');
}
function handleContactForm(formData) { console.log('Contact form submitted:', formData); alert('Mensagem enviada com sucesso!'); }
function subscribeNewsletter(email) { console.log('Newsletter subscription:', email); alert('Obrigado por se inscrever!'); }
function formatCurrency(value) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value); }
function trackClick(action, label) { console.log(`Action: ${action}, Label: ${label}`); }
function initIntegrations() { /* Placeholder */ }


// --- LÓGICA PRINCIPAL DA PÁGINA ---
document.addEventListener('DOMContentLoaded', function () {
    
    initIntegrations();

    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Efeito de scroll no Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Animar elementos no scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    // ATUALIZADO: Adicionado .pain-point-card ao seletor para animar a nova seção
    document.querySelectorAll('.pain-point-card, .feature-item, .consultant-card, .benefit-item, .pricing-card, .story-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Rastreamento de cliques nos botões
    document.querySelectorAll('.btn, .pricing-btn, .instagram-btn').forEach(button => {
        button.addEventListener('click', () => trackClick('button_click', button.textContent.trim()));
    });

    // Adiciona estilos dinâmicos (animações, menu mobile)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .nav-links.mobile-active { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: white; padding: 20px 24px; border-top: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); gap: 20px; }
        .mobile-menu-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .mobile-menu-toggle.active span:nth-child(2) { opacity: 0; }
        .mobile-menu-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
    `;
    document.head.appendChild(style);


    // LÓGICA DO CARROSSEL DE 2 COLUNAS
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        const slides = document.querySelectorAll('.slide');
        const prevArrow = document.querySelector('.slider-arrow.prev');
        const nextArrow = document.querySelector('.slider-arrow.next');
        const dotsContainer = document.querySelector('.slider-dots');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        const getVisibleSlides = () => window.innerWidth <= 992 ? 1 : 2;
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        const dots = dotsContainer.querySelectorAll('.slider-dot');

        function goToSlide(index) {
            const visibleSlides = getVisibleSlides();
            const maxIndex = totalSlides - visibleSlides;
            if (index > maxIndex) index = maxIndex;
            if (index < 0) index = 0;

            sliderWrapper.style.transform = `translateX(-${index * slides[0].offsetWidth}px)`;
            currentIndex = index;
            updateUI();
        }

        function updateUI() {
            const visibleSlides = getVisibleSlides();
            const maxIndex = totalSlides - visibleSlides;
            prevArrow.disabled = currentIndex === 0;
            nextArrow.disabled = currentIndex >= maxIndex;
            dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
        }

        nextArrow.addEventListener('click', () => goToSlide(currentIndex + 1));
        prevArrow.addEventListener('click', () => goToSlide(currentIndex - 1));
        
        goToSlide(0);
        window.addEventListener('resize', () => goToSlide(currentIndex));
    }

    // LÓGICA DO MODAL
    const modalOverlay = document.getElementById('storyModal');
    const storyButtons = document.querySelectorAll('.story-btn');

    if (modalOverlay && storyButtons.length > 0) {
        const modalCloseBtn = modalOverlay.querySelector('.modal-close-btn');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalDescription = document.getElementById('modalDescription');

        storyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.story-card');
                modalTitle.textContent = card.dataset.title;
                modalDate.textContent = card.dataset.date;
                modalDescription.textContent = card.dataset.fullDescription;
                modalOverlay.classList.add('active');
            });
        });

        const closeModal = () => modalOverlay.classList.remove('active');
        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
        });
    }

    // --- NOVA LÓGICA DO FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Fecha outros itens abertos para funcionar como um acordeão
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Abre ou fecha o item clicado
                item.classList.toggle('active');
            });
        });
    }
        // --- NOVA LÓGICA DO CARROSSEL DE PALESTRAS ---
    const keynoteSliderWrapper = document.querySelector('.keynote-slider-wrapper');
    if (keynoteSliderWrapper) {
        const keynoteSlides = document.querySelectorAll('.keynote-slide');
        const keynotePrevArrow = document.querySelector('.keynote-slider-arrow.keynote-prev');
        const keynoteNextArrow = document.querySelector('.keynote-slider-arrow.keynote-next');
        const keynoteDotsContainer = document.querySelector('.keynote-slider-dots');
        
        let keynoteCurrentIndex = 0;
        const keynoteTotalSlides = keynoteSlides.length;

        // Função para determinar quantos slides são visíveis
        const getKeynoteVisibleSlides = () => {
            if (window.innerWidth <= 768) return 1; // Celular
            if (window.innerWidth <= 992) return 2; // Tablet
            return 4; // Desktop
        };
        
        // Cria os pontos de navegação
        for (let i = 0; i < keynoteTotalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('keynote-slider-dot');
            dot.addEventListener('click', () => goToKeynoteSlide(i));
            keynoteDotsContainer.appendChild(dot);
        }
        const keynoteDots = keynoteDotsContainer.querySelectorAll('.keynote-slider-dot');

        // Função principal para mover o slider
        function goToKeynoteSlide(index) {
            const visibleSlides = getKeynoteVisibleSlides();
            const maxIndex = keynoteTotalSlides - visibleSlides;
            
            if (index > maxIndex) index = maxIndex;
            if (index < 0) index = 0;

            const slideWidth = keynoteSlides[0].offsetWidth;
            keynoteSliderWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
            keynoteCurrentIndex = index;
            updateKeynoteUI();
        }

        // Atualiza os botões e pontos
        function updateKeynoteUI() {
            const visibleSlides = getKeynoteVisibleSlides();
            const maxIndex = keynoteTotalSlides - visibleSlides;
            
            keynotePrevArrow.disabled = keynoteCurrentIndex === 0;
            keynoteNextArrow.disabled = keynoteCurrentIndex >= maxIndex;
            
            keynoteDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === keynoteCurrentIndex);
            });
        }

        keynoteNextArrow.addEventListener('click', () => goToKeynoteSlide(keynoteCurrentIndex + 1));
        keynotePrevArrow.addEventListener('click', () => goToKeynoteSlide(keynoteCurrentIndex - 1));
        
        // Inicializa o carrossel e adiciona um listener para redimensionamento da tela
        goToKeynoteSlide(0);
        window.addEventListener('resize', () => goToKeynoteSlide(keynoteCurrentIndex));
    }
});
