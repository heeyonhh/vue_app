<template>
  <div class="rightContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>{{ cityName }}</p>
        <p>{{ currentTime }}</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">Forecast</button>
          <button class="airquality">Air Quality</button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="airCondition">
          <p>{{ feeling }}</p>
        </div>
        <div class="detail">
          <div class="title">
            <p>🌈상세한 날씨 데이터🌞</p>
          </div>
          <div class="data">
            <div class="dataName">
              <p></p>
              <p></p>
            </div>
            <div class="dataValue">
              <p><span></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Map />
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>

<script>
import Map from "./Map.vue";
import { ref } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import axios from "axios";
dayjs.locale("ko"); //한국어 locale사용

export default {
  components: {
    Map,
  },
  //vue3 composition api사용
  setup() {
    //화면에 보여질 데이터
    let currentTime = dayjs().format("YYYY. MM .DD. ddd");
    let cityName = ref(""); // 도시 이름
    let feeling = ref(""); // 현재 온도에 대한 체감을 나타내는 데이터
    // let subWeatherData = ref([]); // 상세 날씨 데이터

    const fetchOpenWeatherApi = async () => {
      const API_KEY = "e7878598157a92ae89d1403b94d8653d";
      let initialLat = 36.5683;
      let initialLon = 126.9778;

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric`
        );
        console.log(res);

        let isInitialData = res.data.current; //초기 데이터
        let isInitialCityName = res.data.timezone; // 초기 도시이름
        let isFeelLikeTemp = isInitialData.feels_like; // 초기 체감온도
        let isTimeOfSunrise = isInitialData.sunrise; // 일출시간
        let isTimeOfSunSet = isInitialData.sunset; // 일몰시간
        let isLineOfSight = isInitialData.visibility; // 가시거리
        // Composition API에서 AJAX요청과 데이터 변경을 하려면 데이터.value로 접근해야한다.
        cityName.value = isInitialCityName.split("/")[1];
        feeling.value = isFeelLikeTemp;
        // subWeatherData.value = isProcessedData;
      } catch (error) {
        console.log(error);
      }
    };

    fetchOpenWeatherApi();

    return {
      currentTime,
      cityName,
      feeling,
      // subWeatherData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
@import "~/scss/subview.scss";
</style>
