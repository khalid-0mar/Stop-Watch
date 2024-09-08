const api = {
  key: "260a359ad96a32322223c5272c3d1a18",
  base: "https://api.openweathermap.org/data/2.5/",
};
window.addEventListener("load", () => {
  getResults("London"); // Change to your preferred default city
});

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`City not found: ${response.statusText}`);
      }
      return response.json();
    })
    .then(displayResults)
    .catch((err) => console.error("Error fetching weather data:", err));
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let dateElement = document.querySelector(".location .date");
  dateElement.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector(".current .hi-low");
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;

  changeBackground(weather.weather[0].main);
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function changeBackground(weatherCondition) {
  if (weatherCondition === "Clear") {
    document.body.style.backgroundImage = "url('images/clear_sky.jpeg')";
  } else if (weatherCondition === "Rain") {
    document.body.style.backgroundImage = "url('images/rainy_sky.jpeg')";
  } else if (weatherCondition === "Clouds") {
    document.body.style.backgroundImage = "url('images/cloudy.jpeg')";
  } else if (weatherCondition === "Snow") {
    document.body.style.backgroundImage = "url('images/snow_sky.jpeg')";
  } else if (weatherCondition === "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpeg')";
  } else {
    document.body.style.backgroundImage = "url('images/london-city.jpeg')";
  }
}
