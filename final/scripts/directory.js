import { fetchDojos } from './utils.js';
import { initModal } from './modal.js';

let allDojos = [];
let currentFilter = 'all';

async function loadDojos() {
  try {
    const savedFilter = localStorage.getItem('lastFilter');
    if (savedFilter) {
      currentFilter = savedFilter;
      updateFilterButtons(savedFilter);
    }

    allDojos = await fetchDojos();
    displayDojos(allDojos);
    
    localStorage.setItem('dojos', JSON.stringify(allDojos));
  } catch (error) {
    console.error('Error loading dojos:', error);
    const container = document.getElementById('dojosGrid');
    if (container) {
      container.innerHTML = '<p class="error">Error loading dojos. Please try again later.</p>';
    }
  }
}

function filterDojos(discipline) {
  currentFilter = discipline;
  localStorage.setItem('lastFilter', discipline);
  
  let filtered = allDojos;
  if (discipline !== 'all') {
    filtered = allDojos.filter(dojo => dojo.discipline === discipline);
  }
  
  displayDojos(filtered);
  updateFilterButtons(discipline);
}

function updateFilterButtons(activeFilter) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.dataset.filter === activeFilter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function displayDojos(dojos) {
  const container = document.getElementById('dojosGrid');
  if (!container) return;

  if (dojos.length === 0) {
    container.innerHTML = '<p class="no-results">No dojos found with this filter.</p>';
    return;
  }

  container.innerHTML = dojos.map(dojo => createDojoCard(dojo)).join('');
  
  const images = container.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
          img.classList.add('loaded');
        }
      });
    }, {
      rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  container.querySelectorAll('.dojo-card').forEach(card => {
    card.addEventListener('click', () => {
      const dojoId = parseInt(card.dataset.id);
      const dojo = allDojos.find(d => d.id === dojoId);
      if (dojo) {
        initModal(dojo);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const dojoId = parseInt(card.dataset.id);
        const dojo = allDojos.find(d => d.id === dojoId);
        if (dojo) {
          initModal(dojo);
        }
      }
    });
  });
}

function createDojoCard(dojo) {
  return `
    <article class="dojo-card" data-id="${dojo.id}" tabindex="0" role="button" aria-label="View details of ${dojo.name}">
      <img 
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3C/svg%3E" 
        data-src="${dojo.image_url}" 
        alt="${dojo.name}"
        loading="lazy"
      >
      <div class="card-content">
        <h3>${dojo.name}</h3>
        <p class="discipline">${dojo.discipline}</p>
        <p class="location">📍 ${dojo.location}</p>
        <p class="price">$${dojo.monthly_price}/month</p>
        <p class="rating">⭐ ${dojo.rating.toFixed(1)}</p>
      </div>
    </article>
  `;
}

function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterDojos(filter);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadDojos();
  initFilters();
});
