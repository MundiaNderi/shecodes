// Function to change city and temperature based on search
function changeCity(event) {
  event.preventDefault(); // Prevent form submission default behavior
  let city = document.getElementById('search-input').value; // Get city value from input
  let apiKey = '234f4abc1b885ao79f4a74dddtb3084f';
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(url)

  axios.get(url)
    .then(response => {

      // Update city name
      let cityName = document.getElementById('current-city');
      cityName.textContent = response.data.city;

      // Update temperature
      let temperature = document.getElementsByClassName('current-temperature-value')[0];
      temperature.textContent = Math.round(response.data.temperature.current);

      // Update the current date
      let currentDate = document.getElementById('current-date');
      currentDate.textContent = getCurrentDate()

      // Update the description
      let currentDescription = document.getElementById('condition-description');
      currentDescription.textContent = response.data.condition.description

      // Update humidity
      let humidityDetails = document.getElementById('humidity-details');
      humidityDetails.textContent = response.data.temperature.humidity + '%';

      // Update Wind Details
      let windDetails = document.getElementById('wind-details');
      windDetails.textContent = Math.round(response.data.wind.speed) + 'km/h'
 
       // Call getForecast function with the city value
        getForecast(city);

    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}
// Event listener for form submission
let form = document.getElementById('search-form');
form.addEventListener('submit', changeCity);

// Function to get the current date
function getCurrentDate() {
  let now = new Date();
  let days = ["Sun, ", "Mon, ", "Tue, ", "Wed, ", "Thu, ", "Fri, ", "Sat, "];
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  return `${day}`; 
}

// Function to format time
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000)
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

// Get data
function getForecast(city) {
  let apiKey = '234f4abc1b885ao79f4a74dddtb3084f';
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather)

}

function displayWeather(response) {
    console.log(response.data); 
  // Array of days

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index){ 
    if(index < 5) {
   forecastHTML = forecastHTML + `
   <div class="forecast-day">
    <div class="weather-forecast-date">${formatDate(day.time)}</div>
    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
   <div class="weather-forecast-temparatures">
   <div class="weather-forecast-temperature">
   <strong>${Math.round(day.temperature.maximum)}</strong>
    <div class="">${Math.round(day.temperature.minimum)}</div>
   </div>
   </div>
   </div>
        `  ;
  }
  });
  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = forecastHTML;
}
