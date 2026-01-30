const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = localStorage.getItem("weatherApiKey");

function onGeoOk(position) {
    if (!API_KEY) {
      weather.innerText = "날씨 API 키를 설정해주세요";
      city.innerText = "localStorage.weatherApiKey";
      return;
    }
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${Math.round(data.main.temp)}°C`;
    });       
}

function onGeoError() {
    alert("위치를 찾을 수 없습니다. 날씨 정보를 표시할 수 없어요.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
