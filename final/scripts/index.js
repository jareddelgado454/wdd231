import { fetchDojos } from './utils.js';
import { initModal } from './modal.js';

// Load featured dojos (top 3 by rating)
export async function loadFeaturedDojos() {
  try {
    const dojos = await fetchDojos();
    const featured = dojos
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    const container = document.getElementById('featuredDojos');
    if (container) {
      container.innerHTML = featured.map(dojo => createDojoCard(dojo)).join('');
      
      // Lazy load images
      const images = container.querySelectorAll('img[data-src]');
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          });
        });

        images.forEach(img => imageObserver.observe(img));
      } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        });
      }

      // Add event listeners to cards for modal
      container.querySelectorAll('.dojo-card').forEach(card => {
        card.addEventListener('click', () => {
          const dojoId = parseInt(card.dataset.id);
          const dojo = featured.find(d => d.id === dojoId);
          if (dojo) {
            initModal(dojo);
          }
        });

        // Keyboard support
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const dojoId = parseInt(card.dataset.id);
            const dojo = featured.find(d => d.id === dojoId);
            if (dojo) {
              initModal(dojo);
            }
          }
        });
      });
    }
  } catch (error) {
    console.error('Error loading featured dojos:', error);
    const container = document.getElementById('featuredDojos');
    if (container) {
      container.innerHTML = '<p class="error">Error loading featured dojos. Please try again later.</p>';
    }
  }
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadFeaturedDojos);
