// Display form data from URL parameters
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Get required fields
  const firstName = urlParams.get('firstName') || 'Not provided';
  const lastName = urlParams.get('lastName') || 'Not provided';
  const email = urlParams.get('email') || 'Not provided';
  const phone = urlParams.get('phone') || 'Not provided';
  const businessName = urlParams.get('businessName') || 'Not provided';
  const timestamp = urlParams.get('timestamp') || 'Not provided';

  // Display the data
  document.getElementById('display-firstName').textContent = firstName;
  document.getElementById('display-lastName').textContent = lastName;
  document.getElementById('display-email').textContent = email;
  document.getElementById('display-phone').textContent = phone;
  document.getElementById('display-businessName').textContent = businessName;

  // Format timestamp
  if (timestamp && timestamp !== 'Not provided') {
    try {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      document.getElementById('display-timestamp').textContent = formattedDate;
    } catch (e) {
      document.getElementById('display-timestamp').textContent = timestamp;
    }
  } else {
    document.getElementById('display-timestamp').textContent = timestamp;
  }
});

// Set year and last modified
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
