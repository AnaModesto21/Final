function showDate() {
      let curDate = new Date();
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[curDate.getDay()];
      let showDay = document.querySelector("#card-date");
      showDay.innerHTML = day;
      let hours = curDate.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutes = curDate.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      let showTime = document.querySelector("#card-hour");
      showTime.innerHTML = `${hours}:${minutes}`;

    //}
    //showDate();
    function formatHours(timestamp) {
    let day = days[curDate.getDay()];
      let showDay = document.querySelector("#card-date");
      showDay.innerHTML = day;
      let hours = curDate.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutes = curDate.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

    function showCity(event) {
      event.preventDefault();
      let cityName = document.querySelector("#card-title");
      let input = document.querySelector("input");
      cityName.innerHTML = input.value;
      searching(cityName.innerHTML);
    }
    let searchForm = document.querySelector("form");
    searchForm.addEventListener("submit", showCity);

    
    function displayWeather(response) {
    let temperatureElement = document.querySelector("#card-degrees");
    let cityElement = document.querySelector("#card-title");
    let descriptionElement = document.querySelector("#typeWeather");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#windy");
    let dateElement = document.querySelector("#card-date");
    let iconElement = document.querySelector("#icon");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    }

    function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  forecastElement.innerHTML = ` <div class="row">
              <div class="col-sm">
                <span class="hour">${formatHours(forecast.dt * 1000)}</span><br />
                <small> <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                /></small> <br />
                <span class="max">${Math.round(forecast.main.temp_max)}º</span><span> | </span>
                <span class="min">${Math.round(forecast.main.temp_min)}º</span>
              </div>
            </div>`;
}

    function searching(cityName) {
  let key = "68f3915a75420edb9d9f25f95e630a55";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);

      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric`;
      axios.get(apiUrl).then(displayForecast);
    }

function searchLocation(position) {
  let key = "68f3915a75420edb9d9f25f95e630a55";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

    function getCurrentLocation(event) {
      navigator.geolocation.getCurrentPosition(searchLocation);
    }

    let currentLocationBtn = document.querySelector("#btnLocation");
    currentLocationBtn.addEventListener("click", getCurrentLocation);
  }
}
