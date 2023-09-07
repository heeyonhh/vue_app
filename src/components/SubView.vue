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
            <p>TODAY 상세 날씨</p>
          </div>
          <div
            class="data"
            v-for="(detailData, index) in subWeatherData"
            :key="index"
          >
            <div class="dataName">
              <p></p>
              <p>{{ detailData.name }}</p>
            </div>
            <div class="dataValue">
              <p>{{ detailData.value }}<span></span></p>
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
    let subWeatherData = ref([]); // 상세 날씨 데이터

    // 타임스탬프로 변환
    const Unix_timestamp = (dt) => {
      let date = new Date(dt * 1000);
      // padStart() 메서드는 현재 문자열의 시작을 다른 문자열로 채워, 주어진 길이를 만족하는 새로운 문자열을 반환합니다.
      // 채워넣기는 대상 문자열의 시작(좌측)부터 적용됩니다.
      let hour = date.getHours().toString().padStart(2, "0");
      return hour.substring(-2) + "시";
    };

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

        const pivots = [0, 10, 15, 20, 25, 30];
        const labels = [
          "매우 추움",
          "추움",
          "쌀쌀함",
          "선선함",
          "보통",
          "더움",
          "매우 더움",
        ];

        let index = 0;
        for(const point of pivots){
          if(isFeelLikeTemp < point) break;
          index++;
        }

        feeling.value = labels[index];

        //가공할 데이터 새로운 배열 생성 v-for편하게 쓰기 위해
        let isProcessedData = [
          { name: "일출시간", value: Unix_timestamp(isTimeOfSunrise) },
          { name: "일몰시간", value: Unix_timestamp(isTimeOfSunSet) },
          {
            name: "가시거리",
            value:
              isLineOfSight
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "M",
          },
        ];
        // Composition API에서 AJAX요청과 데이터 변경을 하려면 데이터.value로 접근해야한다.
        cityName.value = isInitialCityName.split("/")[1];
        subWeatherData.value = isProcessedData;
      } catch (error) {
        console.log(error);
      }
    };

    fetchOpenWeatherApi();

    return {
      currentTime,
      cityName,
      feeling,
      subWeatherData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
@import "~/scss/subview.scss";
</style>
