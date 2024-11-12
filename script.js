const apiKey = "5fd6be47e0d0a19af6ad5df64e4728d0"; // Buraya kendi OpenWeatherMap API anahtarınızı yerleştirin

document.getElementById("weatherForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const city = document.getElementById("cityInput").value;
  getWeatherData(city);
});

function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Şehir bulunamadı!");
      }
      return response.json();
    })
    .then((data) => displayWeatherData(data))
    .catch((error) => {
      document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
    });
}

function displayWeatherData(data) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = `
    <div class="weather-item">
      <h3>${data.name}, ${data.sys.country}</h3>
      <p><strong>Sıcaklık:</strong> ${data.main.temp}°C</p>
      <p><strong>Hava Durumu:</strong> ${data.weather[0].description}</p>
      <p><strong>Nem:</strong> ${data.main.humidity}%</p>
      <p><strong>Rüzgar Hızı:</strong> ${data.wind.speed} m/s</p>
    </div>
  `;
}
