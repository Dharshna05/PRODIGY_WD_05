const apiKey ="24e0e11ef05c0d975cfc82fc49e1afc8"; 

document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();

    if(city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => {
            if(!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML = `❌ ${error.message}`;
        });
});

function displayWeather(data) {
    const city = data.name;
    const tempC = (data.main.temp - 273.15).toFixed(2);
    const tempMin = (data.main.temp_min - 273.15).toFixed(2);
    const tempMax = (data.main.temp_max - 273.15).toFixed(2);
    const weatherDescription = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const rain = data.rain ? data.rain["3h"] : 0;
    const clouds = data.clouds.all;

    document.getElementById("weatherResult").innerHTML = `
        <h2>Weather in ${city}</h2>
        <p><strong>Temperature:</strong> ${tempC} °C (Min: ${tempMin} °C, Max: ${tempMax} °C)</p>
        <p><strong>Condition:</strong> ${weatherDescription}</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Rain (last 3h):</strong> ${rain} mm</p>
        <p><strong>Clouds:</strong> ${clouds}%</p>
    `;
}


