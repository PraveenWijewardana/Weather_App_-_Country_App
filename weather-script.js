console.log("Weather page loaded");

function load() {
    let cityName = document.getElementById("weather-location-input");
    fetch(`http://api.weatherapi.com/v1/current.json?key=41c458f1f0124bb290790209251211&q=${cityName.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let weatherIcon;

            let conditionNow = data.current.condition.text;
            switch (conditionNow) {
                // ☀️ Sunny/Clear Cases
                case 'Sunny':
                case 'Clear':
                    weatherIcon = '☀️';
                    break;

                // ☁️ Cloudy Cases
                case 'Partly cloudy':
                case 'Cloudy':
                case 'Overcast':
                    weatherIcon = '☁️';
                    break;

                // 🌧️ Rain Cases
                case 'Patchy rain possible':
                case 'Light rain':
                case 'Moderate rain':
                case 'Heavy rain':
                    weatherIcon = '🌧️';
                    break;

                // ❄️ Snow Cases
                case 'Light snow':
                case 'Moderate snow':
                case 'Heavy snow':
                    weatherIcon = '❄️';
                    break;

                // 🌫️ Fog/Mist Cases
                case 'Mist':
                case 'Fog':
                    weatherIcon = '🌫️';
                    break;

                // ⛈️ Thunderstorm Cases
                case 'Thundery outbreaks possible':
                case 'Patchy light rain with thunder':
                case 'Moderate or heavy rain with thunder':
                    weatherIcon = '⛈️';
                    break;

                // Default: If none of the above match, use the default icon
                default:
                    weatherIcon = '❓';
            }





            document.getElementById("weather-temp").innerText = data.current.temp_c;
            document.getElementById("weather-humidity").innerText = data.current.humidity;
            document.getElementById("weather-wind").innerText = data.current.wind_mph;
            document.getElementById("weather-pressure").innerText = data.current.pressure_mb;
            document.getElementById("weather-feels").innerText = data.current.feelslike_c;
            document.getElementById("weather-visibility").innerText = data.current.vis_km;
            document.getElementById("weather-uv").innerText = data.current.uv;
            
            document.getElementById("weather-icon").innerText = weatherIcon;


        })
}



