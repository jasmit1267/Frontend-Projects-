const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');


const range_not_found = document.querySelector('.range-not-found');

const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key ="f4fe2f86ff8cbad4032724449fdf7305"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        range_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    weather_body.style.display = "flex";
    range_not_found.style.display = "none";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML =  `${weather_data.weather[0].description}`;
    humidity.innerHTML =`${weather_data.main.humidity}%`;
    wind_speed.innerHTML =`${weather_data.wind_speed}km/H`;
    
    switch(weather_data.weather[0].main) {
        case 'clouds':
            weather_img.src="/icon/cloudy.png";
            break;
        case 'Clear':
            weather_img.src= "/icon/clear.png";
            break;
        case 'Rain':
            weather_img.src= "/icon/rain.png";
            break;
        case 'Mist':
            weather_img.src= "/icon/mist.png";
            break;
        case 'Snow':
            weather_img.src= "/icon/snow.png";
            break;
    }
    
    console.log(weather_data);

}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
})

