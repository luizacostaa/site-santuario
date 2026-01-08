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


