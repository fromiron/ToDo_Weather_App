'use strict';
const jsHours = document.querySelector('#clock__hours');
const jsMinutes = document.querySelector('#clock__minutes');
const jsSeconds = document.querySelector('#clock__right__sec');
const jsDay = document.querySelector('#clock__bottom');
const nameParent = document.querySelector('#name__input__wrap');
const nameInput = document.querySelector('#name__input');
const greetingsMsg = document.querySelector('#greetings__msg');
const API_KEY = 'cf200ee24993180b6e1148b7a071f9b4';
const weatherCondition = document.querySelector('#weather__condition');
const weatherOtherInformation = document.querySelector(
  '#weather__other_information'
);

//greetings-----------------------------------------------------------

const saveName = (name) => {
  greetingsMsg.innerHTML = `Welcome, ${name}`;
  nameParent.removeChild(nameInput);
  localStorage.setItem('name', name);
};

const loadName = () => {
  const name = localStorage.getItem('name');
  if (name !== null) {
    greetingsMsg.innerHTML = `Welcome, ${name}`;
    nameParent.removeChild(nameInput);
  }
};

//clock---------------------------------------------------------------
const WEEK = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

function clock() {
  const date = new Date();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  jsDay.innerHTML = WEEK[day];
  jsHours.innerText = `${hours < 10 ? `0${hours}` : hours}`;
  jsMinutes.innerHTML = `${minutes < 10 ? `0${minutes}` : minutes}`;
  jsSeconds.innerHTML = `${seconds < 10 ? `0${seconds}` : seconds}`;
}
setInterval(() => {
  clock();
}, 1000);

//geolocation------------------------------------------------

navigator.geolocation.getCurrentPosition((position) => {
  try {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        const city = json.name;
        const humidity = json.main.humidity;
        const temp = json.main.temp;
        const tempMax = json.main.temp_max;
        const tempMin = json.main.temp_min;
        const weather = json.weather[0].main;
        weatherCondition.innerHTML = weather;
        weatherOtherInformation.innerHTML = `${city}, Humidity:${humidity}%, Temp:${temp}°C (Max ${tempMax}, Min${tempMin})`;
      });
  } catch (e) {}
});

function init() {
  loadName();
}
init();

nameInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13 && e.target.value !== '') saveName(e.target.value);
});
