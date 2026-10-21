'use strict';

/*
 * Rede de Proteção — MVP acadêmico
 * - O catálogo é estático e fica apenas neste arquivo.
 * - A pesquisa roda localmente no navegador.
 * - Não utiliza cookies, analytics, localStorage ou sessionStorage.
 * - Contatos locais aparecem com aviso de confirmação operacional pendente.
 */

const services = [
  {
    id: 'ligue-180',
    name: 'Ligue 180 — Central de Atendimento à Mulher',
    category: 'Orientação e denúncia',
    icon: '♡',
    description: 'Oferece acolhimento e orientação sobre direitos e serviços. Também recebe denúncias e realiza encaminhamentos aos órgãos competentes. Gratuito, 24 horas por dia.',
    status: 'Canal oficial',
    statusType: 'source',
    review: 'Fonte oficial consultada em 20/10/2026.',
    source: 'https://www.gov.br/mulheres/pt-br/ligue180',
    actions: [
      { label: 'Ligar 180', href: 'tel:180', type: 'primary' },
      { label: 'WhatsApp', href: 'https://wa.me/556196100180', type: 'outline', external: true }
    ]
  },
  {
    id: 'policia-190',
    name: 'Polícia Militar — 190',
    category: 'Emergência',
    icon: '!',
    urgent: true,
    description: 'Canal para situações de emergência, violência em andamento ou risco imediato que exija intervenção policial.',
    status: 'Emergência',
    statusType: 'urgent',
    review: 'Orientação publicada pelo Ministério das Mulheres; revisar antes da publicação do produto.',
    source: 'https://www.gov.br/mulheres/pt-br/ligue180',
    actions: [
      { label: 'Ligar 190', href: 'tel:190', type: 'emergency' }
    ]
  },
  {
    id: 'cram-campina-grande',
    name: 'CRAM / Coordenadoria da Mulher',
    category: 'Atendimento especializado',
    icon: '♡',
    description: 'Serviço municipal de referência para acolhimento e orientação a mulheres. A página institucional informa atendimento social, psicológico e encaminhamentos.',
    status: 'Confirmação direta pendente',
    statusType: 'pending',
    review: 'Contato publicado em fonte municipal; confirmar telefone, horário e procedimento antes de se deslocar.',
    source: 'https://campinagrande.pb.gov.br/cartadeservico/coordenadoria-da-mulher/',
    actions: [
      { label: 'Ligar (83) 3310-6279', href: 'tel:+558333106279', type: 'primary' },
      { label: 'WhatsApp', href: 'https://wa.me/5583988266906', type: 'outline', external: true }
    ],
    extra: [
      { label: 'E-mail', value: 'coordenadoriadamulher@gabinete.campinagrande.pb.gov.br', href: 'mailto:coordenadoriadamulher@gabinete.campinagrande.pb.gov.br' }
    ]
  },
  {
    id: 'delegacia-mulher-cg',
    name: 'Delegacia da Mulher — Campina Grande',
    category: 'Atendimento especializado',
    icon: '▤',
    description: 'A página institucional da Coordenadoria da Mulher lista um telefone para a Delegacia da Mulher. Confirme o funcionamento e a forma de atendimento antes de utilizar o contato.',
    status: 'Confirmação direta pendente',
    statusType: 'pending',
    review: 'Contato listado no portal institucional; unidade e atendimento atual precisam ser reconfirmados.',
    source: 'https://coordenadoriadamulher.campinagrande.pb.gov.br/',
    actions: [
      { label: 'Ligar (83) 3310-9300', href: 'tel:+558333109300', type: 'primary' }
    ]
  },
  {
    id: 'whatsapp-180',
    name: 'WhatsApp do Ligue 180',
    category: 'Orientação e denúncia',
    icon: '↗',
    description: 'Alternativa por mensagem para acessar a Central de Atendimento à Mulher. O WhatsApp é um serviço externo e segue as regras próprias da plataforma.',
    status: 'Canal oficial',
    statusType: 'source',
    review: 'Fonte oficial consultada em 20/10/2026.',
    source: 'https://www.gov.br/mulheres/pt-br/ligue180',
    actions: [
      { label: 'Abrir WhatsApp', href: 'https://wa.me/556196100180', type: 'primary', external: true },
      { label: 'Ligar 180', href: 'tel:180', type: 'outline' }
    ]
  }
];

const searchInput = document.querySelector('#serviceSearch');
const clearSearchButton = document.querySelector('#clearSearch');
const filterContainer = document.querySelector('#categoryFilters');
const serviceGrid = document.querySelector('#serviceGrid');
const resultsCount = document.querySelector('#resultsCount');
const emptyState = document.querySelector('#emptyState');
const resetFiltersButton = document.querySelector('#resetFilters');
const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
const quickExit = document.querySelector('#quickExit');
let activeFilter = 'Todos';

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined && text !== null) element.textContent = text;
  return element;
}

function createActionLink(action) {
  const link = createElement('a', `button ${action.type === 'primary' ? 'button-primary' : action.type === 'emergency' ? 'button-emergency' : 'button-outline'}`, action.label);
  link.href = action.href;
  if (action.external) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  return link;
}

function createServiceCard(service) {
  const article = createElement('article', 'service-card');
  article.setAttribute('aria-labelledby', `title-${service.id}`);

  const top = createElement('div', 'service-card-top');
  const icon = createElement('span', `service-icon${service.urgent ? ' is-emergency' : service.category === 'Canais nacionais' ? ' is-national' : ''}`, service.icon);
  icon.setAttribute('aria-hidden', 'true');
  const statusClass = service.statusType === 'pending' ? 'status-pending' : service.statusType === 'urgent' ? 'status-urgent' : 'status-verified-source';
  const status = createElement('span', `status-pill ${statusClass}`, service.status);
  top.append(icon, status);

  const category = createElement('p', 'service-category', service.category);
  const title = createElement('h4', '', service.name);
  title.id = `title-${service.id}`;
  const description = createElement('p', 'service-description', service.description);

  const meta = createElement('p', 'service-meta');
  const metaStrong = createElement('strong', '', 'Situação da informação: ');
  meta.append(metaStrong, document.createTextNode(service.review));

  const actions = createElement('div', 'service-actions');
  service.actions.forEach((action) => actions.append(createActionLink(action)));

  article.append(top, category, title, description);

  if (Array.isArray(service.extra) && service.extra.length) {
    service.extra.forEach((item) => {
      const extraLine = createElement('p', 'service-meta');
      const label = createElement('strong', '', `${item.label}: `);
      const link = createElement('a', 'text-link', item.value);
      link.href = item.href;
      extraLine.append(label, link);
      article.append(extraLine);
    });
  }

  article.append(meta, actions);
  const sourceLink = createElement('a', 'service-link', 'Consultar fonte institucional ↗');
  sourceLink.href = service.source;
  sourceLink.target = '_blank';
  sourceLink.rel = 'noopener noreferrer';
  article.append(sourceLink);
  return article;
}

function getFilteredServices() {
  const query = normalizeText(searchInput.value);
  return services.filter((service) => {
    const matchesCategory = activeFilter === 'Todos' || service.category === activeFilter;
    const searchable = normalizeText([
      service.name,
      service.category,
      service.description,
      service.status,
      service.review
    ].join(' '));
    const matchesQuery = query === '' || searchable.includes(query);
    return matchesCategory && matchesQuery;
  });
}

function renderServices() {
  const filteredServices = getFilteredServices();
  const fragment = document.createDocumentFragment();
  filteredServices.forEach((service) => fragment.append(createServiceCard(service)));
  serviceGrid.replaceChildren(fragment);
  serviceGrid.hidden = filteredServices.length === 0;
  emptyState.hidden = filteredServices.length !== 0;
  serviceGrid.setAttribute('aria-busy', 'false');
  const count = filteredServices.length;
  resultsCount.textContent = count === 1 ? '1 serviço encontrado' : `${count} serviços encontrados`;
  clearSearchButton.hidden = searchInput.value.length === 0;
}

function setActiveFilter(newFilter) {
  activeFilter = newFilter;
  filterContainer.querySelectorAll('[data-filter]').forEach((button) => {
    const isActive = button.dataset.filter === newFilter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  renderServices();
}

function resetFilters() {
  searchInput.value = '';
  setActiveFilter('Todos');
  searchInput.focus();
}


searchInput.addEventListener('input', renderServices);
clearSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  renderServices();
  searchInput.focus();
});
filterContainer.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  setActiveFilter(button.dataset.filter);
});
resetFiltersButton.addEventListener('click', resetFilters);

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

mainNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }
});

quickExit.addEventListener('click', () => {
  // Saída de um clique: troca a página atual, mas não apaga logs, cache ou histórico sincronizado.
  window.location.replace('https://www.google.com/');
});

// O texto digitado não é enviado a um servidor nem colocado na URL.
renderServices();
