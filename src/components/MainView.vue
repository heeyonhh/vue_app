<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>San Fransisco</p>
        <p>Jan 28,</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">forecast</button>
          <button class="airquality">airquality</button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="weatherDegree">
          <p>10&deg;</p>
        </div>
        <div class="weatherIcon">
          <img src="~/assets/images/01d.png" alt="MainLogo" />
        </div>
        <div class="weatherData">
          <div>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
        <p>이번주 날씨 보기</p>
      </div>
      <div class="timelyWeatherBox">
        <div class="timelyWeather">
          <div class="icon">
            <img src="~/assets/images/01n.png" alt="29" />
          </div>
          <div class="data">
            <p class="time">2pm</p>
            <p class="current">32&deg;</p>
            <div>
              <img src="~/assets/images/drop.png" alt="drop" />
              <p class="fall">15%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      temporaryData: [
        {
          title: "습도",
          value: "89%",
        },
        {
          title: "풍thr",
          value: "10m/s",
        },
        {
          title: "풍향",
          value: "WS",
        },
      ],
    };
  },
  created() {
    //https://api.openweathermap.org/data/2.5/onecall?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric
    const API_KEY = "284bfdeb630520653864189833ba7c68";
    let initialLat = 36.5683;
    let initialLon = 126.9778;

    //get() api호출 then() 응답 catch() 에러 조회
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
@import "~/scss/mainview.scss";
</style>
