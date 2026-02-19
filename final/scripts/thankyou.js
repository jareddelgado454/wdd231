import { initMenu, setCurrentYear } from './main.js';

// Form field labels mapping
const fieldLabels = {
  dojoName: 'Dojo Name',
  discipline: 'Discipline',
  location: 'Location',
  price: 'Monthly Price',
  contactName: 'Contact Name',
  email: 'Email',
  phone: 'Phone',
  description: 'Description',
  timestamp: 'Application Date & Time'
};

function formatTimestamp(timestamp) {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return timestamp;
  }
}

function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

function displayFormData() {
  // Get data from URL (GET method for this example)
  // In production, this would come from the server
  const urlParams = new URLSearchParams(window.location.search);
  const summaryList = document.getElementById('summaryList');
  
  if (!summaryList) return;

  // If no parameters, show message
  if (urlParams.toString() === '') {
    summaryList.innerHTML = '<p>No application data found.</p>';
    return;
  }

  let html = '';
  
  for (const [key, value] of urlParams.entries()) {
    if (key === 'timestamp') {
      html += `<dt>${fieldLabels[key] || key}:</dt><dd>${formatTimestamp(value)}</dd>`;
    } else if (key === 'price') {
      html += `<dt>${fieldLabels[key] || key}:</dt><dd>${formatPrice(value)}</dd>`;
    } else if (key === 'description' && value) {
      html += `<dt>${fieldLabels[key] || key}:</dt><dd>${value}</dd>`;
    } else if (value) {
      html += `<dt>${fieldLabels[key] || key}:</dt><dd>${value}</dd>`;
    }
  }

  summaryList.innerHTML = html || '<p>No valid data found.</p>';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  setCurrentYear();
  displayFormData();
});
