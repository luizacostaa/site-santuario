/*************************************************
 * CONFIGURAÇÃO GERAL
 *************************************************/
const defaultConfig = {
  site_title: "Santuário Arquidiocesano Nossa Senhora Aparecida",
  hero_title: "Bem-vindos ao Santuário",
  hero_subtitle: "Um lugar sagrado de fé, oração e comunhão com Nossa Senhora Aparecida",
  highlights_title: "Destaques",
  footer_text: "Santuário Arquidiocesano Nossa Senhora Aparecida",
  contact_title: "Entre em Contato"
};

/*************************************************
 * CONTROLE DE PÁGINA
 *************************************************/
let currentPage = 'home';

/*************************************************
 * NAVEGAÇÃO (não controla mais carrossel)
 *************************************************/
function navigateTo(page) {
  document.querySelectorAll('.content-page')
    .forEach(p => p.classList.remove('active'));

  const targetPage = document.getElementById(page + 'Page');
  if (!targetPage) return;

  targetPage.classList.add('active');
  currentPage = page;
  window.scrollTo(0, 0);
}

/*************************************************
 * MENU MOBILE
 *************************************************/
function toggleMobileMenu() {
  document.getElementById('navMenu')?.classList.toggle('active');
}

/*************************************************
 * SPARKLES (NÃO depende de include)
 *************************************************/
function createSparkles() {
  document.querySelectorAll('.sparkle-section').forEach(section => {
    for (let i = 0; i < 50; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 3 + 's';
      section.appendChild(sparkle);
    }
  });
}

/*************************************************
 * DOMContentLoaded → só o que NÃO depende de include
 *************************************************/
function init() {
  createSparkles();

  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities: () => ({
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

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();


/*************************************************
 * LÓGICA DO CARROSSEL
 *************************************************/
class Carousel {
  constructor(containerId) {
    // 1. Localiza o elemento principal no HTML
    this.wrapper = document.getElementById(containerId);
    if (!this.wrapper) return;

    // 2. Define o estado inicial (começa no slide 0)
    this.currentIndex = 0;
    this.interval = null; // Variável para guardar o timer do auto-play

    // 3. Executa as funções de preparação
    this.loadData(); // Lê os dados do HTML
    this.render();   // Cria o visual na tela
    this.startAutoPlay(); // Começa a rodar sozinho
  }

  // LÊ OS DADOS: Transforma aquelas divs <div class="carousel-data"> em uma lista organizada
  loadData() {
    const dataElements = this.wrapper.querySelectorAll('.carousel-data');
    
    // Array.from transforma a lista de elementos HTML em uma lista Javascript (Array)
    this.data = Array.from(dataElements).map(el => ({
      image: el.getAttribute('data-image'),
      gradient: el.getAttribute('data-gradient').split(','), // Separa as cores pela vírgula
      title: el.getAttribute('data-title'),
      link: el.getAttribute('data-link')
    }));
  }

  // RENDERIZA: Constrói o HTML das miniaturas e dos slides grandes
  render() {
    const thumbContainer = this.wrapper.querySelector('.thumbnails-container');
    const slidesContainer = this.wrapper.querySelector('.slides-container');

    let thumbsHTML = '';
    let slidesHTML = '';

    // Para cada item da nossa lista de dados...
    this.data.forEach((item, index) => {
      // Verifica se é o primeiro para já marcar como "active"
      const activeClass = index === 0 ? 'active' : '';

      // --- CONSTRÓI A MINIATURA ---
      // Se tiver imagem, mostra a imagem pequena. Se não, mostra um degradê colorido.
      const thumbContent = item.image 
        ? `<img src="${item.image}" class="thumb-content" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'"> <div class="thumb-content" style="display:none; background: linear-gradient(to right, ${item.gradient[0]}, ${item.gradient[1]})"></div>`
        : `<div class="thumb-content" style="background: linear-gradient(to right, ${item.gradient[0]}, ${item.gradient[1]})"></div>`;

      // Note o "onclick": quando clicar, chama a função goToSlide(index)
      thumbsHTML += `
        <div class="thumb-item ${activeClass}" onclick="window.myCarousel.goToSlide(${index})">
           ${thumbContent}
        </div>
      `;

      // --- CONSTRÓI O SLIDE GRANDE ---
      // Cria um SVG (desenho vetorial) para usar de fundo se a imagem falhar ou não existir
      const fallbackSVG = `
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad-${index}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${item.gradient[0]};" />
              <stop offset="100%" style="stop-color:${item.gradient[1]};" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad-${index})" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="40" font-family="Georgia">${item.title}</text>
        </svg>
      `;

      slidesHTML += `
        <div class="carousel-slide ${activeClass}" id="slide-${index}">
          ${item.image ? `<img src="${item.image}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; document.getElementById('svg-${index}').style.display='block'">` : ''}
          <div id="svg-${index}" style="${item.image ? 'display:none' : 'display:block'}; width:100%; height:100%">${fallbackSVG}</div>
          <a href="${item.link}" class="slide-btn">Saiba Mais</a>
        </div>
      `;
    });

    // Coloca o HTML gerado dentro das divs da página
    thumbContainer.innerHTML = thumbsHTML;
    slidesContainer.innerHTML = slidesHTML;

    // Guarda referências para usarmos depois (para trocar as classes active)
    this.thumbElements = thumbContainer.querySelectorAll('.thumb-item');
    this.slideElements = slidesContainer.querySelectorAll('.carousel-slide');
  }

  // MUDAR DE SLIDE: A função principal
  goToSlide(index) {
    // 1. Remove a classe 'active' do slide e miniatura atuais
    this.slideElements[this.currentIndex].classList.remove('active');
    this.thumbElements[this.currentIndex].classList.remove('active');

    // 2. Atualiza o índice para o novo
    this.currentIndex = index;

    // 3. Adiciona a classe 'active' no novo slide e miniatura
    this.slideElements[this.currentIndex].classList.add('active');
    this.thumbElements[this.currentIndex].classList.add('active');

    // 4. Reinicia o timer (para o carrossel não mudar sozinho logo após você clicar)
    this.resetTimer();
  }

  // AUTO PLAY: Configura o relógio
  startAutoPlay() {
    this.interval = setInterval(() => {
      // Calcula qual é o próximo (se for o último, volta para o 0)
      const nextIndex = (this.currentIndex + 1) % this.data.length;
      this.goToSlide(nextIndex);
    }, 5000); // 5000ms = 5 segundos
  }

  // REINICIAR TIMER
  resetTimer() {
    clearInterval(this.interval); // Para o relógio atual
    this.startAutoPlay();         // Começa um novo
  }
}

// INICIALIZAÇÃO
function init() {
    createSparkles(); // sua função antiga
    
    // Cria o carrossel e guarda na janela global para o HTML poder acessar o "onclick"
    window.myCarousel = new Carousel('main-carousel');
    
    // ... restante do seu código init ...
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();