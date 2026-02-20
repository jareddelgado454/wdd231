// Import discover items data
import discoverItems from '../data/discover.mjs';

// Get DOM elements
const visitMessage = document.getElementById('visitMessage');
const visitText = document.getElementById('visitText');
const discoverGrid = document.getElementById('discoverGrid');

// Handle visit message logic with localStorage
function displayVisitMessage() {
  const lastVisitKey = 'lastVisit';
  const now = Date.now();
  const lastVisit = localStorage.getItem(lastVisitKey);
  
  let message = '';
  
  if (!lastVisit) {
    // First visit
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const lastVisitTime = parseInt(lastVisit, 10);
    const timeDifference = now - lastVisitTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    
    if (hoursDifference < 24) {
      // Less than 24 hours
      message = 'Back so soon! Awesome!';
    } else {
      // More than a day
      const dayText = daysDifference === 1 ? 'day' : 'days';
      message = `You last visited ${daysDifference} ${dayText} ago.`;
    }
  }
  
  // Update the message
  visitText.textContent = message;
  
  // Save current visit time
  localStorage.setItem(lastVisitKey, now.toString());
}

// Render discover cards
function renderDiscoverCards() {
  discoverGrid.innerHTML = '';
  
  discoverItems.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'discover-card';
    card.setAttribute('data-index', index);
    
    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button class="learn-more-btn" aria-label="Learn more about ${item.name}">Learn More</button>
    `;
    
    // Add click handler to button
    const button = card.querySelector('.learn-more-btn');
    button.addEventListener('click', () => {
      alert(`Learn more about ${item.name}\n\n${item.description}\n\nAddress: ${item.address}`);
    });
    
    discoverGrid.appendChild(card);
  });
}

// Initialize page
function init() {
  displayVisitMessage();
  renderDiscoverCards();
  
  // Update footer year and last modified
  const yearSpan = document.getElementById('year');
  const lastModifiedSpan = document.getElementById('lastModified');
  
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
