'use strict';
const jsHours = document.querySelector('#clock__hours');
const jsMinutes = document.querySelector('#clock__minutes');
const jsSeconds = document.querySelector('#clock__right__sec');
const jsDay = document.querySelector('#clock__bottom');
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
