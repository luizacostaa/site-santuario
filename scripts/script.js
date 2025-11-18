    // Configuration
    const defaultConfig = {
        site_title: "Santuário Arquidiocesano Nossa Senhora Aparecida",
        hero_title: "Bem-vindos ao Santuário",
        hero_subtitle: "Um lugar sagrado de fé, oração e comunhão com Nossa Senhora Aparecida",
        highlights_title: "Destaques",
        footer_text: "Santuário Arquidiocesano Nossa Senhora Aparecida",
        contact_title: "Entre em Contato"
      };
  
      // Current page tracking
      let currentPage = 'home';
  
      // Carousel state
      let currentSlide = 0;
      let currentDizimoSlide = 0;
      let carouselInterval;
      let dizimoCarouselInterval;
  
      // Navigation
      function navigateTo(page) {
        // Hide all pages
        const pages = document.querySelectorAll('.content-page');
        pages.forEach(p => p.classList.remove('active'));
        
        // Show selected page
        const targetPage = document.getElementById(page + 'Page');
        if (targetPage) {
          targetPage.classList.add('active');
          currentPage = page;
          window.scrollTo(0, 0);
          
          // Start appropriate carousel
          if (page === 'home') {
            startCarousel();
            stopDizimoCarousel();
          } else if (page === 'dizimo') {
            startDizimoCarousel();
            stopCarousel();
          } else {
            stopCarousel();
            stopDizimoCarousel();
          }
        }
      }
  
      // Mobile menu toggle
      function toggleMobileMenu() {
        const menu = document.getElementById('navMenu');
        menu.classList.toggle('active');
      }
  
      // Hero Carousel functions
      function changeSlide(direction) {
        const slides = document.querySelectorAll('#heroCarousel .carousel-slide');
        const dots = document.querySelectorAll('#heroCarousel .carousel-dot');
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
      }
  
      function goToSlide(index) {
        const slides = document.querySelectorAll('#heroCarousel .carousel-slide');
        const dots = document.querySelectorAll('#heroCarousel .carousel-dot');
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
      }
  
      function startCarousel() {
        stopCarousel();
        carouselInterval = setInterval(() => {
          changeSlide(1);
        }, 5000);
      }
  
      function stopCarousel() {
        if (carouselInterval) {
          clearInterval(carouselInterval);
        }
      }
  
      // Dízimo Carousel functions
      function changeDizimoSlide(direction) {
        const slides = document.querySelectorAll('#dizimoCarousel .carousel-slide');
        const dots = document.querySelectorAll('#dizimoCarousel .carousel-dot');
        
        slides[currentDizimoSlide].classList.remove('active');
        dots[currentDizimoSlide].classList.remove('active');
        
        currentDizimoSlide = (currentDizimoSlide + direction + slides.length) % slides.length;
        
        slides[currentDizimoSlide].classList.add('active');
        dots[currentDizimoSlide].classList.add('active');
      }
  
      function goToDizimoSlide(index) {
        const slides = document.querySelectorAll('#dizimoCarousel .carousel-slide');
        const dots = document.querySelectorAll('#dizimoCarousel .carousel-dot');
        
        slides[currentDizimoSlide].classList.remove('active');
        dots[currentDizimoSlide].classList.remove('active');
        
        currentDizimoSlide = index;
        
        slides[currentDizimoSlide].classList.add('active');
        dots[currentDizimoSlide].classList.add('active');
      }
  
      function startDizimoCarousel() {
        stopDizimoCarousel();
        dizimoCarouselInterval = setInterval(() => {
          changeDizimoSlide(1);
        }, 5000);
      }
  
      function stopDizimoCarousel() {
        if (dizimoCarouselInterval) {
          clearInterval(dizimoCarouselInterval);
        }
      }
  
      // Create sparkles
      function createSparkles() {
        const sparkleSection = document.getElementById('sparkleSection');
        if (!sparkleSection) return;
        
        for (let i = 0; i < 50; i++) {
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle';
          sparkle.style.left = Math.random() * 100 + '%';
          sparkle.style.top = Math.random() * 100 + '%';
          sparkle.style.animationDelay = Math.random() * 3 + 's';
          sparkleSection.appendChild(sparkle);
        }
      }
  
      // Initialize
      function init() {
        createSparkles();
        startCarousel();
        
        if (window.elementSdk) {
          window.elementSdk.init({
            defaultConfig,
            onConfigChange: async (config) => {
              const headerLogo = document.getElementById('headerLogo');
              const heroTitle1 = document.getElementById('heroTitle1');
              const heroSubtitle1 = document.getElementById('heroSubtitle1');
              const highlightsTitle = document.getElementById('highlightsTitle');
              const footerText = document.getElementById('footerText');
              const contactTitle = document.getElementById('contactTitle');
              
              if (headerLogo) {
                headerLogo.textContent = (config.site_title || defaultConfig.site_title).replace('Santuário Arquidiocesano ', '').replace(' ', '\n');
              }
              
              if (heroTitle1) {
                heroTitle1.textContent = config.hero_title || defaultConfig.hero_title;
              }
              
              if (heroSubtitle1) {
                heroSubtitle1.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
              }
              
              if (highlightsTitle) {
                highlightsTitle.textContent = config.highlights_title || defaultConfig.highlights_title;
              }
              
              if (footerText) {
                footerText.textContent = config.footer_text || defaultConfig.footer_text;
              }
              
              if (contactTitle) {
                contactTitle.textContent = config.contact_title || defaultConfig.contact_title;
              }
            },
            mapToCapabilities: (config) => ({
              recolorables: [],
              borderables: [],
              fontEditable: undefined,
              fontSizeable: undefined
            }),
            mapToEditPanelValues: (config) => new Map([
              ['site_title', config.site_title || defaultConfig.site_title],
              ['hero_title', config.hero_title || defaultConfig.hero_title],
              ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
              ['highlights_title', config.highlights_title || defaultConfig.highlights_title],
              ['footer_text', config.footer_text || defaultConfig.footer_text],
              ['contact_title', config.contact_title || defaultConfig.contact_title]
            ])
          });
        }
      }
  
      // Start when page loads
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    