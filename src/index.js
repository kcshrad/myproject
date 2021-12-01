/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};

// write your code here//
let city = prompt("Enter the City");
if (city !== null) {
  city = city.toLowerCase();
  city = city.trim();
}

if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let humidity = weather[city].humidity;
  let tempC = Math.round(temperature);
  let tempF = Math.round((temperature * 9) / 5 + 32);
  alert(
    `It is currently ${tempC}°C(${tempF}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't have this in our database. Please refer to http://www.google.com/search?q=weather+ ${city}`
  );
}*/
let now = new Date();
let para = document.querySelector("#time");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
para.innerHTML = `${hours}:${minutes} <br/>${day} ${date}, ${month} ${year}`;

function showTemperature(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;

  //let temperatureInput = Math.round(response.data.main.temp);
  //let newTemp = document.querySelector(".currentTemp");
  //newTemp.innerHTML = `${temperatureInput}°C`;
  document.querySelector(".currentTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  let weatherType = response.data.weather[0].main;
  let newweather = document.querySelector(".description");
  newweather.innerHTML = weatherType;

  let humidity = document.querySelector("#humidity");
  let newHumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity ${newHumidity}%`;

  let pressure = document.querySelector("#pressure");
  let newPressure = response.data.main.pressure;
  pressure.innerHTML = ` Pressure ${newPressure}`;
}

function search(searchInput) {
  let apiKey = "409c92218249e96f0e8de22a43f0bc4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function searchCurrent(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city").value;
  //let cityInput = document.querySelector("#current-city");
  //cityInput.innerHTML = `${searchInput.value}`;
  //let apiKey = "409c92218249e96f0e8de22a43f0bc4b";
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
  //axios.get(apiUrl).then(showTemperature);
  search(searchInput);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCurrent);

search("New York");

function currentLocationTemperature(response) {
  //let temperature = Math.round(response.data.main.temp);
  let button = document.querySelector("#current-location");
  button.addEventListener("click", getCurrentLocationTemperature);

  function getCurrentLocationTemperature(event) {
    event.preventDefault();
    let city = response.data.name;
    let newCurrentTemp = document.querySelector(".currentTemp");
    newCurrentTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
    let h2 = document.querySelector("#current-city");
    h2.innerHTML = city;

    let weatherType = response.data.weather[0].main;
    let newweather = document.querySelector(".description");
    newweather.innerHTML = weatherType;

    let humidity = document.querySelector("#humidity");
    let newHumidity = response.data.main.humidity;
    humidity.innerHTML = `Humidity ${newHumidity}%`;

    let pressure = document.querySelector("#pressure");
    let newPressure = response.data.main.pressure;
    pressure.innerHTML = ` Pressure ${newPressure}`;
  }
}
function showLocation(position) {
  let apiKey = "409c92218249e96f0e8de22a43f0bc4b";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentLocationTemperature);
}
navigator.geolocation.getCurrentPosition(showLocation);

/*function showCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = "21°C";
}
let celsiusButton = document.querySelector(".celsius");
celsiusButton.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = "69.8F";
}
let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheit); 
*/
