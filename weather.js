'use strict';

const API_KEY = 'cf200ee24993180b6e1148b7a071f9b4';
const weatherCondition = document.querySelector('#weather__condition');
const weatherOtherInformation = document.querySelector(
  '#weather__other_information'
);
const weatherTranslatorKR = {
  200: '가벼운 비를 동반한 천둥구름',
  201: '비를 동반한 천둥구름',
  202: '폭우를 동반한 천둥구름',
  210: '약한 천둥구름',
  211: '천둥구름',
  212: '강한 천둥구름',
  221: '불규칙적 천둥구름',
  230: '약한 연무를 동반한 천둥구름',
  231: '연무를 동반한 천둥구름',
  232: '강한 안개비를 동반한 천둥구름',
  300: '가벼운 안개비',
  301: '안개비',
  302: '강한 안개비',
  310: '가벼운 적은비',
  311: '적은비',
  312: '강한 적은비',
  313: '소나기와 안개비',
  314: '강한 소나기와 안개비',
  321: '소나기',
  500: '약한 비',
  501: '중간 비',
  502: '강한 비',
  503: '매우 강한 비',
  504: '극심한 비',
  511: '우박',
  520: '약한 소나기 비',
  521: '소나기 비',
  522: '강한 소나기 비',
  531: '불규칙적 소나기 비',
  600: '가벼운 눈',
  601: '눈',
  602: '강한 눈',
  611: '진눈깨비',
  612: '소나기 진눈깨비',
  615: '약한 비와 눈',
  616: '비와 눈',
  620: '약한 소나기 눈',
  621: '소나기 눈',
  622: '강한 소나기 눈',
  701: '박무',
  711: '연기',
  721: '연무',
  731: '모래 먼지',
  741: '안개',
  751: '모래',
  761: '먼지',
  762: '화산재',
  771: '돌풍',
  781: '토네이도',
  800: '구름 한 점 없이 맑음',
  801: '약간의 구름 낌',
  802: '드문드문 구름 낌',
  803: '구름 자욱함',
  804: '구름낌',
  900: '토네이도',
  901: '태풍',
  902: '허리케인',
  903: '한랭',
  904: '고온',
  905: '바람',
  906: '우박',
  951: '매우 약한 바람',
  952: '약한 바람',
  953: '부드러운 바람',
  954: '중간 세기 바람',
  955: '신선한 바람',
  956: '강풍',
  957: '강풍주의',
  958: '돌풍',
  959: '심각한 돌풍',
  960: '폭풍',
  961: '강한 폭풍',
  962: '허리케인',
};

function init() {
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
          console.log(json);
          const city = json.name;
          const humidity = json.main.humidity;
          const temp = json.main.temp;
          const tempMax = json.main.temp_max;
          const tempMin = json.main.temp_min;
          const weatherId = json.weather[0].id;
          const weather = json.weather[0].main;
          weatherCondition.innerHTML = weather;
          weatherCondition.nextElementSibling.innerHTML =
            weatherTranslatorKR[weatherId];
          weatherOtherInformation.innerHTML = `${city}, Humidity:${humidity}%, Temp:${temp}°C (Max ${tempMax}, Min${tempMin})`;
        });
    } catch (e) {}
  });
}

init();
