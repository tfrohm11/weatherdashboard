// variables
const searchCities = [];
// functions
function handleCoords(searchCity) {
  const fetchUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=4b9f7dc3f8536150bc0eb915e8e4a81b`;

  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      handleCurrentWeather(data.coord, data.name);
    });
}

function handleCurrentWeather(coordinates, city) {
  const lat = coordinates.lat;
  const lon = coordinates.lon;

  const fetchUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=4b9f7dc3f8536150bc0eb915e8e4a81b`;

  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayCurrentWeather(data.current, city);
      displayFiveDayWeather(data.daily);
    });
}

function displayCurrentWeather(currentCityData, cityName) {
  let weatherIcon = `http://openweathermap.org/img/wn/${currentCityData.weather[0].icon}.png`;
  document.querySelector("#currentWeather").innerHTML = `<h2>${cityName} ${moment.unix(currentCityData.dt).format("MMM Do YY")} <img src="${weatherIcon}"></h2> <div>Temp: ${currentCityData.temp} \xB0F</div> <div> Humidity: ${currentCityData.humidity} %</div> <div> Windspeed: ${currentCityData.wind_speed} MPH</div> <div> Uvi: ${currentCityData.uvi}</div>`;
}

function displayFiveDayWeather(fiveDayCityData) {
  const cityData = fiveDayCityData.slice(1, 6);
  document.querySelector("#fiveDayWeather").innerHTML = "";

  cityData.forEach((day) => {
    let weatherIcon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    document.querySelector("#fiveDayWeather").innerHTML += `<div class="col-sm m-1 p-2 card"><div>${moment.unix(day.dt).format("MMM Do YY")}</div> <div><img src="${weatherIcon}"></div> <div>Temp: ${day.temp.max} \xB0F</div> <div>Humidity: ${day.humidity} %</div> <div>Windspeed: ${day.wind_speed} MPH</div> <div> Uvi: ${day.uvi}</div></div>`;
  });
}

function handleFormSubmit(event) {
  document.querySelector("#searchHistory").innerHTML = "";
  event.preventDefault();
  const city = document.querySelector("#searchInput").value.trim();
  searchCities.push(city);
  searchCities.filter((city) => {});
  searchCities.forEach((city) => {
    document.querySelector("#searchHistory").innerHTML += `<button data-city="${city}" class="w-100 d-block my-2">${city}</button>`;
  });
  handleCoords(city);
}

function handleHistory(event) {
  const city = event.target.getAttribute("data-city");
  handleCoords(city);
}

document.querySelector("#searchForm").addEventListener("submit", handleFormSubmit);
document.querySelector("#searchHistory").addEventListener("click", handleHistory);
