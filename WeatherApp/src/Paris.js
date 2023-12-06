// Function to change city and temperature based on search
function changeCity(event) {
  event.preventDefault(); // Prevent form submission default behavior
  let city = document.getElementById('search-input').value; // Get city value from input
  let apiKey = '234f4abc1b885ao79f4a74dddtb3084f';
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url)
    .then(response => {
      console.log(response.data);

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

// Event listener for form submission
let form = document.getElementById('search-form');
form.addEventListener('submit', changeCity);
