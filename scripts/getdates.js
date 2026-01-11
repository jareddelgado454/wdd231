// Obtener el año actual para el copyright
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Mostrar la fecha de última modificación
document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;