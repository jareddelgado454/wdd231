// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', function() {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    const now = new Date();
    const timestamp = now.toISOString();
    timestampField.value = timestamp;
  }

  // Animate membership cards on page load
  animateMembershipCards();

  // Initialize modals
  initModals();
});

// Animate membership cards on initial page load
function animateMembershipCards() {
  const cards = document.querySelectorAll('.membership-card');
  
  cards.forEach((card, index) => {
    // Set initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.marginTop = '20px';
    
    // Animate with delay
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, margin-top 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.marginTop = '0';
    }, index * 150); // Stagger animation
  });
}

// Modal functionality
function initModals() {
  const modalLinks = document.querySelectorAll('.modal-link');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal-close');

  // Open modal
  modalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.setAttribute('aria-hidden', 'false');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modal.focus();
      }
    });
  });

  // Close modal
  function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      closeModal(modal);
    });
  });

  // Close on background click
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.getAttribute('aria-hidden') === 'false') {
          closeModal(modal);
        }
      });
    }
  });
}

// Set year and last modified
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
