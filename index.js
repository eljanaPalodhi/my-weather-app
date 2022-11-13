var today = new Date();
var day = today.getDay();
var daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday",
];
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

document.getElementById("displayDateTime").innerHTML =
  daylist[day] + " " + dateTime;

function search(city) {
  let apiKey = "80f4af8305ac3f97e4o3d1af593bt3d5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeathercondition);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocationTemperature);
}

function showLocationTemperature(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "80f4af8305ac3f97e4o3d1af593bt3d5";
  let unit = "metric";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${apiEndpoint}lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeathercondition);
}

function getForecast(coordinates) {
  let apiKey = "80f4af8305ac3f97e4o3d1af593bt3d5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function displayWeathercondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#city").innerHTML = response.data.city;
  document
    .querySelector("#icon")
    .setAttribute("src", response.data.condition.icon_url);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
         <div class="col-2">
             <div class="weather-forecast-date">${day}</div>
              <img src="cloudy-sun.png"
               alt=""
               width="36"
              />
              </br> 
              <div class="weather-forecast-temperature">
               <span class="weather-temperature-max"> 
               18° </span> 
               <span class="weather-temperature-min">
               12° </span> 
             </div>
            </div>
          
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let currentTime = new Date();
let currentDate = document.querySelector("#current-time");
currentDate.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", showCity);

let button = document.querySelector("#location");
button.addEventListener("click", getCurrentPosition);

search("Zurich");
