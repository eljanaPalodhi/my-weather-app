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

function displayForecast() {
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

function displayWeathercondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("wind").innerHTML = response.data.wind.speed;

  document
    .querySelector("#float-left")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "e16bf47a46c6c104ae6d402c1f0be31e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeathercondition);
}

function handleSumbit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSumbit);

function showPosition(position) {
  let apiKey = "e16bf47a46c6c104ae6d402c1f0be31e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeathercondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#location");
button.addEventListener("click", getCurrentPosition);

search("Zurich");
displayForecast();
