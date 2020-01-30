window.addEventListener("load", () => {
  getWeather();
  getScreenSize();
});

const getWeather = () => {
  let lat;
  let lon;
  const weatherTemperature = document.querySelector(
    ".weather-container__temperature"
  );
  const weatherDescription = document.querySelector(
    ".weather-container__description"
  );
  const iconElement = document.querySelector(".animation-container__icon");
  const errorMsg = document.querySelector(
    ".animation-container__error-msg--invisible"
  );
  const humidityElement = document.querySelector(
    ".weather-container__humidity"
  );
  const windElement = document.querySelector(".weather-container__wind");
  const locationElement = document.querySelector(
    ".weather-container__location"
  );
  const aqiElement = document.querySelector(".air-quality-container__display");
  const pm10Element = document.querySelector(".pm10");
  const so2Element = document.querySelector(".so2");
  const no2Element = document.querySelector(".no2");
  const coElement = document.querySelector(".co");

  navigator.geolocation.getCurrentPosition(
    async function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      const proxy = "https://protected-badlands-82701.herokuapp.com/";
      let weatherApi = `${proxy}https://api.darksky.net/forecast/3624b3f59e055e002b7371bc12fb5983/${lat},${lon}`;
      let airQualityApi = `${proxy}https://api.waqi.info/feed/geo:${lat};${lon}/?token=25043f9679b1359396e1a0704780b1304a866021`;

      const response = await fetch(weatherApi);
      const data = await response.json();

      const responseQ = await fetch(airQualityApi);
      const dataQ = await responseQ.json();

      const {
        icon,
        summary,
        temperature,
        windSpeed,
        humidity
      } = data.currently;
      const celsius = Math.floor((temperature - 30) / 2);
      const milesPerHourToKilometerPerHourRatio = 1.609344;
      const windInKmph = Math.round(
        windSpeed * milesPerHourToKilometerPerHourRatio
      );
      const humidityPercentage = humidity * 100;
      humidityElement.innerText = `H: ${humidityPercentage}%`;
      windElement.innerText = `W: ${windInKmph} km/h`;
      weatherTemperature.innerText = celsius;
      weatherDescription.innerText = summary;
      setIcons(icon, iconElement);

      const aqi = dataQ.data.aqi;
      aqiElement.innerText = `Air quality: ${aqi} AQI`;
      const location = dataQ.data.city.name;
      const nameEnd = location.search(",");
      const filteredLocationName = location.slice(0, nameEnd);
      locationElement.innerText = filteredLocationName;
      const { pm10, so2, no2, co } = dataQ.data.iaqi;
      pm10Element.innerText = pm10.v;
      so2Element.innerText = so2.v;
      no2Element.innerText = no2.v;
      coElement.innerText = co.v;
    },
    function error() {
      if (error.code === error.PERMISION_DENIED) {
        iconElement.style.display = "none";
        errorMsg.classList.add("animation-container__error-msg--visible");
        errorMsg.classList.remove("animation-container__error-msg--invisible");
      }
    }
  );

  const setIcons = (icon, iconId) => {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  };
};

const getScreenSize = () => {
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;
  return setWallpaper(screenWidth, screenHeight);
};

const setWallpaper = (screenWidth, screenHeight) => {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(https://picsum.photos/${screenWidth}/${screenHeight})`;
};

const clock = () => {
  let date = new Date();
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = String(date.getSeconds()).padStart(2, "0");
  const clock = document.querySelector(".clock");
  clock.textContent = `${hours}:${minutes}:${seconds}`;
};

const getCurrentDate = () => {
  let date = new Date();
  const dateElement = document.querySelector(".date");
  dateElement.innerText = date.toLocaleDateString();
};

const updateWeather = setInterval(() => {
  getWeather();
}, 3600000);

const updateTime = setInterval(() => {
  clock();
  getCurrentDate();
}, 1000);
