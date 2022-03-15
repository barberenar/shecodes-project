let date = new Date();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = daysOfWeek[date.getDay()];
let hour = date.getHours();
let minutes = date.getMinutes();
let dateTime = document.querySelector("#time");
dateTime.innerHTML = `${day}, ${hour}:${minutes}`;

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
}

function searchCurrentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "21475e7ebad3c82a3f3c6e1dfcd1aad7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityInput = city.value;
  //let cityTitle = document.querySelector("#city-title");
  //cityTitle.innerHTML = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);
  let apiKey = "21475e7ebad3c82a3f3c6e1dfcd1aad7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemp);
}

function showCityTemp(response) {
  celsiusTemp = response.data.main.temp;
  let temp = Math.round(celsiusTemp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temp;
  let city = response.data.name;
  let cityTitle = document.querySelector("#city-title");
  cityTitle.innerHTML = city;
}
function tempToFarenh(event) {
  let farenhTemp = (celsiusTemp * 9 / 5) + 32;
  let temp = Math.round(farenhTemp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temp;
  farenhLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function tempToCelsius(event) {
  let temp = Math.round(celsiusTemp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temp;
  celsiusLink.classList.remove("active");
  farenhLink.classList.add("active");
}

let celsiusTemp = null;
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", searchCity);
let geoButton = document.querySelector("#geoTarget");
geoButton.addEventListener("click", getCurrentPosition);
let farenhLink = document.querySelector("#farenh-link");
farenhLink.addEventListener("click", tempToFarenh);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", tempToCelsius);