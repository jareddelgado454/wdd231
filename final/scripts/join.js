import { initMenu, setCurrentYear } from './main.js';

// Inicializar menú y año
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  setCurrentYear();
  
  // Establecer timestamp
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Contador de caracteres para textarea
  const description = document.getElementById('description');
  const charCount = document.getElementById('charCount');
  
  if (description && charCount) {
    description.addEventListener('input', () => {
      const length = description.value.length;
      charCount.textContent = `${length} / 500 caracteres`;
      
      if (length > 450) {
        charCount.style.color = '#d84315';
      } else {
        charCount.style.color = '#4a4a4a';
      }
    });
  }

  // Validación del formulario
  const form = document.getElementById('joinForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        // Mostrar mensajes de error
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.reportValidity();
        }
      }
    });
  }
});
