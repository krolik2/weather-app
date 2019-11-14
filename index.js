console.log("hello world");

window.addEventListener("load", () => {
  let lat;
  let lon;
  const weatherTemperature = document.querySelector(".temperature");
  const weatherDescription = document.querySelector(".description");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      let weatherApi = `https://api.darksky.net/forecast/3624b3f59e055e002b7371bc12fb5983/${lat},${lon}`;

      let airQualityApi = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=25043f9679b1359396e1a0704780b1304a866021`;
      fetch(weatherApi)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          const { icon, summary, temperature } = data.currently;
          const celsius = Math.floor((temperature - 30) / 2);
          weatherTemperature.innerText = celsius;
          weatherDescription.innerText = summary;
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }
  const setIcons = (icon, iconId) => {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  };
  getScreenSize();
  // setWallpaper();
});

let screenWidth;
let screenHeight;

const getScreenSize = () => {
  screenWidth = window.screen.width;
  screenHeight = window.screen.height;
};

const setWallpaper = () => {
  let wallpaperApi = `https://picsum.photos/${screenWidth}/${screenHeight}`;
  const body = document.querySelector("body");
  fetch(wallpaperApi).then((body.style.background = `url(${wallpaperApi})`));
};

const getCurrentTime = setInterval(() => {
  let date = new Date();
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = String(date.getSeconds()).padStart(2, "0");
  const clock = document.querySelector(".clock");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}, 1000);
