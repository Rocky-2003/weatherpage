'use strict';

// SELECTING THINGS NEEDED
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const temperature = document.querySelector('.temp h1');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const img = document.querySelector('.temp img');
const invalidCity = document.querySelector('.invalid');
const tempInfo = document.querySelector('.temp-info');

// SELECTING APPI KEY AND URL
const apiKey = '545865cbcb1fa0b8616302920e0b55e4';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric';

// api call to fetch data
async function checkWeather(inputValue) {
  const response = await fetch(`${apiUrl}&q=${inputValue}&appid=${apiKey}`);
  const data = await response.json();

  // IF-ELSE CONDITION TO CHECK THE CITY IS VALID OR NOT
  if (response.status == 404) {
    invalidCity.classList.remove('hideAndSeek');
    tempInfo.classList.add('hideAndSeek');
  } else {
    temperature.textContent = `${data.main.temp.toFixed(1)}°C`;
    city.textContent = `${data.name}`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed.toFixed(1)}%`;
    let { weather } = data;
    let [weathercondition] = weather;
    let { main } = weathercondition;
    img.src = `img/${main}.png`;
    tempInfo.classList.remove('hideAndSeek');
    invalidCity.classList.add('hideAndSeek');
    input.value = '';
  }
}

// EVENT HANDLER TO CHECK THE CITY TEMPERATURE WHEN CLICK HAPPEN ON SEARCH BUTTON
btn.addEventListener('click', (e) => {
  e.preventDefault();
  checkWeather(input.value);
});
