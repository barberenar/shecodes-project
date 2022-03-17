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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
  ];
      let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML = forecastHTML + `<div class="col-2">

                <div>
                    <h5 class="forecast-day" id="day-one">${day}</h5>
                    <div><img src="https://openweathermap.org/img/wn/04d@2x.png" alt="Forecast Icon" width="40px"
                            id="icon-day-one" /></div>
                    <span class="forecast-temp-max" id="temp-max-day-one">32° </span><span class="forecast-temp-min"
                        id="temp-min-day-one">22°
                    </span>
                </div>
            </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}


function showCityTemp(response) {
  celsiusTemp = response.data.main.temp;
  let temp = Math.round(celsiusTemp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temp;
  let city = response.data.name;
  let cityTitle = document.querySelector("#city-title");
  cityTitle.innerHTML = city;
  let description = response.data.weather[0].description;
  let descriptionText = document.querySelector("#description");
  descriptionText.innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
  let wind = Math.round(response.data.wind.speed);
  let windText = document.querySelector("#wind");
  windText.innerHTML = wind;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    celsiusLink.classList.add("active");
  farenhLink.classList.remove("active");
}


function searchCurrentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemp);
  
  
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  searchCity(city.value);
}


function tempToFarenh(event) {
  let farenhTemp = (celsiusTemp * 9 / 5) + 32;
  let temp = Math.round(farenhTemp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temp;
  farenhLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function tempToCelsius(event) {
  let temp = Math.round(celsiusTemp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temp;
  celsiusLink.classList.add("active");
  farenhLink.classList.remove("active");
}

let celsiusTemp = null;
let apiKey = "21475e7ebad3c82a3f3c6e1dfcd1aad7";
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", getCity);
let geoButton = document.querySelector("#geoTarget");
geoButton.addEventListener("click", getCurrentPosition);
let farenhLink = document.querySelector("#farenh-link");
farenhLink.addEventListener("click", tempToFarenh);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", tempToCelsius);
searchCity("Managua");
displayForecast();