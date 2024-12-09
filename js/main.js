let myInput = document.getElementById("newCountry");
var name = document.getElementById("countryName");

GetData();

async function GetData() {
  try {
    let url = "";

    if (myInput.value) {
      url = `https://api.weatherapi.com/v1/forecast.json?key=9e74ea87dea84dc4b1b175309240712&q=${myInput.value}&days=4&aqi=yes`;  // تغيير إلى forecast.json
    } else {
      getLocation();
      return;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Unable to fetch data. Status: ${res.status}`);
    }

    const data = await res.json();
    
    document.getElementById("countryName").textContent = data.location.name;
    document.getElementById("tempDegree").textContent = `${data.current.temp_c}°C`;
    
  
    updateForecast(data.forecast.forecastday);

    console.log(data);
  } catch (error) {
    console.log("Error", error.message);
    document.getElementById("countryName").textContent = "Unable to fetch data";
    document.getElementById("tempDegree").textContent = "N/A";
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      
      GetWeatherByCoordinates(latitude, longitude);
    }, function (error) {
      console.log("Error getting location: ", error.message);
      
      
      GetWeatherByCoordinates("30.0444", "31.2357");
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
    GetWeatherByCoordinates("30.0444", "31.2357");
  }
}

async function GetWeatherByCoordinates(lat, lon) {
  try {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=9e74ea87dea84dc4b1b175309240712&q=${lat},${lon}&days=4&aqi=yes`;  // تغيير إلى forecast.json

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Unable to fetch data. Status: ${res.status}`);
    }

    const data = await res.json();
    
    document.getElementById("countryName").textContent = data.location.name;
    document.getElementById("tempDegree").textContent = `${data.current.temp_c}°C`;

    
    updateForecast(data.forecast.forecastday);

    console.log(data);
  } catch (error) {
    console.log("Error", error.message);
    document.getElementById("countryName").textContent = "Unable to fetch data";
    document.getElementById("tempDegree").textContent = "N/A";
  }
}

function updateForecast(forecastDays) {
  const forecastElements = document.querySelectorAll('.forecast-card');
  forecastDays.forEach((day, index) => {
    if (forecastElements[index]) {
      forecastElements[index].querySelector('h3').textContent = new Date(day.date).toLocaleDateString('en-GB', { weekday: 'long' }); 
      forecastElements[index].querySelector('span').textContent = `${day.day.avgtemp_c}°C`;
      forecastElements[index].querySelector('p').textContent = day.day.condition.text; 
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const weatherCondition = "sunny";
  if (weatherCondition === "sunny") {
    createSunEffect();
  } 
});

function createSunEffect() {
  const container = document.querySelector(".hero-section");
  removeAllEffects(container);
  const sun = document.createElement("div");
  sun.classList.add("sun");
  container.appendChild(sun);
}

function removeAllEffects(container) {
  const sun = container.querySelector(".sun");
  if (sun) sun.remove();
}
