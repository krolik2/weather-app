window.addEventListener("load", () => {
  getWeather();
  getScreenSize();
});

const getWeather = () => {
  let lat;
  let lon;
  const weatherTemperature = document.querySelector(".temperature");
  const weatherDescription = document.querySelector(".description");
  const iconElement = document.querySelector(".icon");
  const errorMsg = document.querySelector(".error-msg");

  navigator.geolocation.getCurrentPosition(
    async function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      let weatherApi = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3624b3f59e055e002b7371bc12fb5983/${lat},${lon}`;
      // let airQualityApi = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=25043f9679b1359396e1a0704780b1304a866021`; will be added in future

      const response = await fetch(weatherApi);
      const data = await response.json();

      const { icon, summary, temperature } = data.currently;
      const celsius = Math.floor((temperature - 30) / 2);
      weatherTemperature.innerText = celsius;
      weatherDescription.innerText = summary;
      setIcons(icon, iconElement);
    },
    function error() {
      if (error.code == error.PERMISION_DENIED) {
        iconElement.style.display = "none";
        errorMsg.style.display = "block";
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

const setWallpaper = async (screenWidth, screenHeight) => {
  let wallpaperApi = `https://picsum.photos/${screenWidth}/${screenHeight}`;
  console.log(screenWidth, screenHeight);
  const body = document.querySelector("body");
  const response = await fetch(wallpaperApi);
  const blob = await response.blob();
  body.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
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
