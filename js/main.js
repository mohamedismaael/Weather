document.addEventListener("DOMContentLoaded", () => {
  const weatherCondition = "sunny"; 

  if (weatherCondition === "rain") {
    createRainEffect();
  } else if (weatherCondition === "sunny") {
    createSunEffect();
  } else if (weatherCondition === "cloudy") {
    createCloudEffect();
  }
});

function createRainEffect() {
  const container = document.querySelector(".hero-section");
  removeAllEffects(container);
  for (let i = 0; i < 50; i++) {
    const drop = document.createElement("div");
    drop.classList.add("rain-drop");
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(drop);
  }
}

function createSunEffect() {
  const container = document.querySelector(".hero-section");
  removeAllEffects(container);
  const sun = document.createElement("div");
  sun.classList.add("sun");
  container.appendChild(sun);
}

function createCloudEffect() {
  const container = document.querySelector(".hero-section");
  removeAllEffects(container);
  for (let i = 0; i < 3; i++) {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.left = `${i * 30}%`;
    container.appendChild(cloud);
  }
}

function removeAllEffects(container) {
  const rainDrops = container.querySelectorAll(".rain-drop");
  rainDrops.forEach(drop => drop.remove());
  const sun = container.querySelector(".sun");
  if (sun) sun.remove();
  const clouds = container.querySelectorAll(".cloud");
  clouds.forEach(cloud => cloud.remove());
}



