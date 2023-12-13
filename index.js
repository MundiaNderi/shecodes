// Function to change city and temperature based on search
function changeCity(event) {
  event.preventDefault(); // Prevent form submission default behavior
  let city = document.getElementById('search-input').value; // Get city value from input
  let apiKey = '234f4abc1b885ao79f4a74dddtb3084f';
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url)
    .then(response => {

      // Update city name
      let cityName = document.getElementById('current-city');
      cityName.textContent = response.data.city;

      // Update temperature
      let temperature = document.getElementsByClassName('current-temperature-value')[0];
      temperature.textContent = Math.round(response.data.temperature.current);

    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}



// Get data
function getForecast(city) {
  let apiKey = '234f4abc1b885ao79f4a74dddtb3084f';
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(url).then(displayForecast);
}

// Display the data
function displayForecast(response) {
  console.log(response.data);

  // Array of days

  let forecastHTML = "";

  response.data.daily.forEach(function (day){
   forecastHTML = forecastHTML + `
   <div class="forecast-day">
    <div class="weather-forecast-date">$Tue</div>
    <div class="weather-forecast-icon">⛅️</div>
   <div class="weather-forecast-temparatures">
   <div class="weather-forecast-temperature">
   <strong>${Math.round(day.temperature.maximum)}</strong>
   </div>
   <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}</div>
   </div>
   </div>
        `  
  });
  
  let forecastElement = document.querySelector("#forecast")
  forecastElement.innerHTML = forecastHTML;
};

// Event listener for form submission
let form = document.getElementById('search-form');
form.addEventListener('submit', changeCity);
displayForecast()
