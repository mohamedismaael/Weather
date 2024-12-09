let myInput = document.getElementById("newCountry");
var name = document.getElementById("countryName");
GetData();
async function GetData() {
  try {
    let url = "";
    if (myInput.value) {
      url = `https://api.weatherapi.com/v1/current.json?key=9e74ea87dea84dc4b1b175309240712&q=${myInput.value}&aqi=yes`;
    }
    if (!myInput.value) {
      url = `https://api.weatherapi.com/v1/current.json?key=9e74ea87dea84dc4b1b175309240712&q=cairo&aqi=yes`;
    }    
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Res status: ${res.status}`);
    }
    const data = await res.json();
    document.getElementById("countryName").textContent = data.location.name
    document.getElementById("tempDegree").textContent = `${data.current.temp_c}°C`
    console.log(data);
  } catch (error) {
    console.log("Error", error.message);
  }
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
