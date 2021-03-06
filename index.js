'use strict';

const jsHours = document.querySelector('#clock__hours');
const jsMinutes = document.querySelector('#clock__minutes');
const jsSeconds = document.querySelector('#clock__right__sec');
const jsAmPm = document.querySelector('#clock__right__AP');
const jsDay = document.querySelector('#clock__bottom');
const bgImage = new Array('img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg');

function bgChanger() {
  const randomNum = Math.floor(Math.random() * bgImage.length);
  document.getElementById('bg').style.backgroundRepeat = 'no-repeat';
  document.getElementById('bg').style.backgroundImage =
    "url('" + bgImage[randomNum] + "')";
}

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
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  if (hours >= 12) {
    jsAmPm.innerHTML = 'PM';
  } else {
    jsAmPm.innerHTML = 'AM';
  }
  if (hours >= 13) hours = hours - 12;
  jsDay.innerHTML = WEEK[day];
  jsHours.innerHTML = `${hours < 10 ? `0${hours}` : hours}`;
  jsMinutes.innerHTML = `${minutes < 10 ? `0${minutes}` : minutes}`;
  jsSeconds.innerHTML = `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  bgChanger();
  setInterval(() => {
    clock();
  }, 1000);
}

init();
