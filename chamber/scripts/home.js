// --- CONFIGURACIÓN DE CLIMA ---
const myKey = "83df7e482d162587fed0aeb35679deca";
const myLat = "-16.4090"; 
const myLon = "-71.5375"; 

// URLs para obtener datos actuales y pronóstico
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=imperial&appid=${myKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&units=imperial&appid=${myKey}`;

async function apiFetch() {
  try {
    // Obtener datos actuales y pronóstico en paralelo
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (currentResponse.ok && forecastResponse.ok) {
      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      displayCurrentWeather(currentData);
      displayForecast(forecastData);
    } else {
      const errorData = currentResponse.ok ? await forecastResponse.json() : await currentResponse.json();
      console.error('Error de API:', errorData);
      displayWeatherError(errorData.message || 'Error al obtener datos del clima');
    }
  } catch (error) {
    console.error('Error de red:', error);
    displayWeatherError('No se pudo conectar con el servicio de clima');
  }
}

function displayCurrentWeather(data) {
  const container = document.querySelector('#current-weather-info');
  
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const high = Math.round(data.main.temp_max);
  const low = Math.round(data.main.temp_min);
  const humidity = data.main.humidity;
  
  // Calcular sunrise y sunset
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  const sunriseTime = sunrise.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const sunsetTime = sunset.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  container.innerHTML = `
    <div class="weather-icon-temp">
      <img src="${iconUrl}" alt="${desc}" class="weather-icon">
      <div class="temp-main">${temp}° F</div>
    </div>
    <p class="weather-desc">${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
    <div class="weather-details">
      <p><strong>High:</strong> ${high}°</p>
      <p><strong>Low:</strong> ${low}°</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Sunrise:</strong> ${sunriseTime}</p>
      <p><strong>Sunset:</strong> ${sunsetTime}</p>
    </div>
  `;
}

function displayForecast(data) {
  const container = document.querySelector('#weather-forecast-info');
  
  // Filtrar pronóstico (buscamos una lectura por día, ej. a las 12:00)
  const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  if (forecast.length === 0) {
    // Si no hay datos a las 12:00, tomar el primer elemento de cada día
    const today = new Date();
    const forecastDays = [];
    for (let i = 0; i < 3 && i < data.list.length; i++) {
      forecastDays.push(data.list[i]);
    }
    forecast.push(...forecastDays);
  }

  let forecastHTML = '';
  forecast.forEach((day, index) => {
    const date = new Date(day.dt * 1000);
    let dayName;
    if (index === 0) {
      dayName = 'Today';
    } else {
      dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    }
    const temp = Math.round(day.main.temp);
    forecastHTML += `<p><strong>${dayName}:</strong> ${temp}°F</p>`;
  });

  container.innerHTML = forecastHTML;
}

function displayWeatherError(message) {
  const currentContainer = document.querySelector('#current-weather-info');
  const forecastContainer = document.querySelector('#weather-forecast-info');
  
  const errorHTML = `
    <p style="color: #d32f2f;"><strong>⚠️ Error:</strong> ${message}</p>
    <p style="font-size: 0.9em; color: #666;">Por favor, verifica tu API key en OpenWeatherMap</p>
  `;
  
  currentContainer.innerHTML = errorHTML;
  forecastContainer.innerHTML = errorHTML;
}

// --- CONFIGURACIÓN DE SPOTLIGHTS (MIEMBROS) ---
const membersUrl = "data/members.json";

async function getSpotlights() {
  const response = await fetch(membersUrl);
  const data = await response.json();
  
  // 1. Filtrar solo Gold (3) y Silver (2)
  const eligibleMembers = data.members.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);
  
  // 2. Mezclar y elegir 2 o 3 al azar
  const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  displaySpotlights(selected);
}

function displaySpotlights(members) {
  const container = document.querySelector('#spotlight-container');
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");
    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name}">
      <p>${member.phone}</p>
      <p>${member.address}</p>
      <a href="${member.website}">${member.website}</a>
      <p>Level: ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
    `;
    container.appendChild(card);
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

apiFetch();
getSpotlights();