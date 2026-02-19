// Modal functionality

export function initModal(dojo) {
  const modal = document.getElementById('dojoModal');
  const modalBody = document.getElementById('modalBody');
  
  if (!modal || !modalBody) return;

  // Create modal content
  modalBody.innerHTML = `
    <h2 id="modalTitle">${dojo.name}</h2>
    <img src="${dojo.image_url}" alt="${dojo.name}" class="modal-image">
    <div class="modal-details">
      <p><strong>Discipline:</strong> ${dojo.discipline}</p>
      <p><strong>Location:</strong> 📍 ${dojo.location}</p>
      <p><strong>Monthly Price:</strong> $${dojo.monthly_price}</p>
      <p><strong>Rating:</strong> ⭐ ${dojo.rating.toFixed(1)} / 5.0</p>
      <p><strong>Description:</strong></p>
      <p>${dojo.description}</p>
    </div>
  `;

  // Show modal
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus on modal
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) {
    modalTitle.focus();
  }

  // Event listeners to close
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close with Escape
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  document.addEventListener('keydown', escapeHandler);
}

function closeModal() {
  const modal = document.getElementById('dojoModal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
