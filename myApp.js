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

    }
    showDate();

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
      document.querySelector("#card-title").innerHTML = response.data.name;
      document.querySelector("#card-degrees").innerHTML = Math.round(
        response.data.main.temp
      );
      document.querySelector("#humidity").innerHTML =
        response.data.main.humidity;
      document.querySelector("#windy").innerHTML = Math.round(
        response.data.wind.speed
      );
      document.querySelector("#type-weather").innerHTML =
        response.data.weather[0].main;
        
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAtrribute("alt", response.data.weather[0].description);
    
    }

    function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  forecastElement.innerHTML = ` <div class="row">
              <div class="col-sm">
                <span class="hour">12:00</span><br />
                <i class="fas fa-cloud-showers-heavy"></i> <br />
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

  



      
