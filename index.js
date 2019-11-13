console.log("hello world");

window.addEventListener("load", () => {
  let lat;
  let lon;
  let screenWidth;
  let screenHeight;

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       lat = position.coords.latitude;
  //       lon = position.coords.longitude;

  //       let airQualityApi = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=25043f9679b1359396e1a0704780b1304a866021`;
  //       fetch(airQualityApi)
  //         .then(res => {
  //           return res.json();
  //         })
  //         .then(data => {
  //           console.log(data);
  //         });
  //     });
  //   }
  getScreenSize();
  setWallpaper();
});

const getScreenSize = () => {
  screenWidth = window.screen.width;
  screenHeight = window.screen.height;
};

const setWallpaper = () => {
    let wallpaperApi = `https://picsum.photos/${screenWidth}/${screenHeight}`;
    const body = document.querySelector('body');
    fetch(wallpaperApi).then(body.style.background = `url(${wallpaperApi})`);
}