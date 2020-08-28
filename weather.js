const weather = document.querySelector(".js-weather");

const API_KEY = "0954e9d941dd4bdc65ec68c531b7a725";
const CORDS = "cords";

function getWeather(lat, lng){
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place =json.name;
        weather.innerText = `${temperature} @ ${place}`
    });
}
function saveCords(cordsObj){
    localStorage.setItem(CORDS, JSON.stringify(cordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.cords.latitude;
    const longitude = position.cords.longitude;
    const cordsObj = {
        latitude,
        longitude
    };
    saveCords(cordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError(){
    console.log('cannot access geo ');
}

function askForCords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCords(){
    const loadedCords = localStorage.getItem(CORDS);
    if (loadedCords === null){
        askForCords();
    } else { 
      const parseCords = JSON.parse(loadedCords)
      console.log(parseCords);
      getWeather(parseCords.latitude, parseCords.longitude)
    }
}
 
function init(){
    loadCords();
}

init();