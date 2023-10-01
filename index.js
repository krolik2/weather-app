window.addEventListener("DOMContentLoaded", () => {
  getData();
  getScreenSize();
});

const getData = () => {
  let lat;
  let lon;
  const proxy = "https://test-123-app.fly.dev/";

  const getLocation = (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    return getWeather(lat, lon);
    //  getAirQuality(lat, lon)
  };

  const error = () => {
    const iconElement = document.querySelector(".animation-container__icon");
    const errorMsg = document.querySelector(
      ".animation-container__error-msg--invisible"
    );
    if (error.code === error.PERMISION_DENIED) {
      iconElement.style.display = "none";
      errorMsg.classList.add("animation-container__error-msg--visible");
      errorMsg.classList.remove("animation-container__error-msg--invisible");
    }
  };

  navigator.geolocation.getCurrentPosition(getLocation, error);

  async function getWeather() {
    const locationElement = document.querySelector(
      ".weather-container__location"
    );
    const sunriseElement = document.querySelector(
      ".weather-details__item.sunrise > div.value"
    );

    const sunsetElement = document.querySelector(
      ".weather-details__item.sunset > div.value"
    );

    const weatherTemperature = document.querySelector(
      ".weather-container__temperature"
    );

    const weatherTemperatureMin = document.querySelector(
      ".weather-details__item.min > div.value"
    );

    const weatherTemperatureMax = document.querySelector(
      ".weather-details__item.max > div.value"
    );

    const weatherDescription = document.querySelector(
      ".weather-container__description"
    );
    const iconElement = document.querySelector(".animation-container__icon");

    const humidityElement = document.querySelector(
      ".weather-details__item.humidity > div.value"
    );
    const windElement = document.querySelector(
      ".weather-details__item.wind > div.value"
    );

    let weatherApi = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e6e6ff70d10b14f828af744c7854a70e`;
    
    const response = await fetch(weatherApi);
    const data = await response.json();

    const { name } = data;
    const { humidity, temp, temp_min, temp_max } = data.main;
    const { country, sunrise, sunset } = data.sys;
    const { speed } = data.wind;
    const { description, icon } = data.weather[0];
    // const milesPerHourToKilometerPerHourRatio = 1.609344;
    // const windInKmph = Math.round(
    //   windSpeed * milesPerHourToKilometerPerHourRatio
    // );

    locationElement.innerText = `${name}, ${country}`;
    weatherTemperature.innerText = `${Math.round(temp)}`;
    weatherTemperatureMin.innerText = `${Math.round(temp_min)}°`;
    weatherTemperatureMax.innerText = `${Math.round(temp_max)}°`;
    let localSunrise = new Date(sunrise * 1000).toLocaleTimeString("pl-PL");
    let localSunset = new Date(sunset * 1000).toLocaleTimeString("pl-PL");
    sunriseElement.innerText = localSunrise;
    sunsetElement.innerText = localSunset;
    humidityElement.innerText = `${humidity}`;
    windElement.innerText = `${speed} m/s`;
    weatherDescription.innerText = description;
    const iconPath = "icons/fill/openweathermap/";
    iconElement.src = `${iconPath}${icon}.svg`;
  }

  // async function getAirQuality() {
  //   const aqiElement = document.querySelector(
  //     ".air-quality-container__display"
  //   );

  //   const so2Element = document.querySelector(".so2");
  //   const no2Element = document.querySelector(".no2");
  //   const coElement = document.querySelector(".co");

  //   let airQualityApi = `${proxy}https://api.waqi.info/feed/geo:${lat};${lon}/?token=25043f9679b1359396e1a0704780b1304a866021`;

  //   const responseQ = await fetch(airQualityApi);
  //   const dataQ = await responseQ.json();

  //   const aqi = dataQ.data.aqi;
  //   aqiElement.innerText = `Air quality: ${aqi} AQI`;
  //   const { so2, no2, co } = dataQ.data.iaqi;
  //   so2Element.innerText = so2.v;
  //   no2Element.innerText = no2.v;
  //   coElement.innerText = co.v;
  // }
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

// const clock = () => {
//   let date = new Date();
//   let hours = String(date.getHours()).padStart(2, "0");
//   let minutes = String(date.getMinutes()).padStart(2, "0");
//   let seconds = String(date.getSeconds()).padStart(2, "0");
//   const clock = document.querySelector(".clock");
//   clock.textContent = `${hours}:${minutes}:${seconds}`;
// };

// const getCurrentDate = () => {
//   let date = new Date();
//   const dateElement = document.querySelector(".date");
//   dateElement.innerText = date.toLocaleDateString();
// };

// const updateWeather = setInterval(() => {
//   getData();
// }, 3600000);

// const updateTime = setInterval(() => {
//   clock();
//   getCurrentDate();
// }, 1000);
