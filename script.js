const apiKey = "1ebe003aefd44ad268b39cda91bd1f59";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector("#weatherIcon");
const defaultCity = "New York";

async function loadIconMap() {
  const response = await fetch('icons.json');
  return response.json();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function checkWeather(city, iconMap) {
    if (!city) {
        city = defaultCity;
      }
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    const pressureInHg = 0.02952998057228486 * data.main.pressure;
    const pressureRounded = pressureInHg.toFixed(2);

    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = data.wind.speed + "mph";
    document.querySelector("#pressure").innerHTML = pressureRounded + "in";
    document.querySelector("#description").innerHTML = capitalizeFirstLetter(data.weather[0].description);

    const weatherId = data.weather[0].id;
    const iconCode = data.weather[0].icon;

    const iconName = iconMap.icons[iconCode] || iconMap.id[weatherId.toString()];
    
    if (iconName) {
        weatherIcon.src = `/assets/${iconName}.svg`;
    } else {
        weatherIcon.src = '/assets/clear-day.svg';
    }
}

let iconMap = {};
loadIconMap().then(loadedIcons => {
    iconMap = loadedIcons;

    // Call checkWeather with the default city after the icon map has been loaded
    checkWeather(defaultCity, iconMap);

    searchBtn.addEventListener("click", () => {
        checkWeather(search.value, iconMap);
    });

    search.addEventListener("keypress", function (e) {
        if (e.key === 'Enter') {
            checkWeather(search.value, iconMap);
        }
    });
});


const skele = document.querySelectorAll('.skeleton');
window.addEventListener('load', function() {
  setTimeout(function() {
    skele.forEach(item => {
      item.classList.remove('skeleton');
    });
  }, 1000);
});