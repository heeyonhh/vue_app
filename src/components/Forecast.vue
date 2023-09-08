<template>
  <div class="home">
    <div id="cityNameBox">
      <div class="cityName">
        <p>{{ cityName }}</p>
        <p>{{ currentTime }}</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">날씨</button>
          <router-link to="/airquality">
            <button class="airquality">상세</button>
          </router-link>
        </div>
      </div>
      <div class="weatherBox">
        <div class="weatherDegree">
          <p>{{ currentTemp }}&deg;</p>
        </div>
        <div class="weatherIcon">
          <img :src="images[0]" alt="MainLogo" />
        </div>
        <div class="weatherData">
          <div
            v-for="temporary in temporaryData"
            :key="temporary.title"
            class="detailData">
            <p>{{ temporary.title }}</p>
            <p>{{ temporary.value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
      </div>
      <div class="timelyWeatherBox">
        <div
          class="timelyWeather"
          v-for="(temp, index) in arrayTemps"
          :key="index">
          <div class="icon">
            <img :src="images[index]" alt="" />
          </div>
          <div class="data">
            <p class="time">
              {{ Unix_timestamp(temp.dt) }}
            </p>
            <p class="currentDegree">{{ Math.round(temp.temp) }}&deg;</p>
            <div>
              <img :src="drop" alt="" />
              <p class="fall">{{ temp.humidity }}%</p>
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
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko"); // 한국어 locale 사용

export default {
  data() {
    return {
      // Dayjs 플러그인 사용
      currentTime: dayjs().format("YYYY. MM. DD. ddd"),
      drop: '/images/drop.png',
    };
  },
  async created() {
    // 초기데이터 선언 https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    await this.$store.dispatch("openWeatherApi/FETCH_OPENWEATHER_API");
    const { currentTemp, currentHumidity, currentWindSpeed, currentFeelsLike } =
      this.$store.state.openWeatherApi.currentWeather;

    this.currentTemp = currentTemp; // 현재온도
    this.temporaryData[0].value = currentHumidity + "%"; //습도
    this.temporaryData[1].value = currentWindSpeed + "m/s"; //풍속
    this.temporaryData[2].value = Math.round(currentFeelsLike) + "도"; //체감온도
    this.arrayTemps = this.$store.state.openWeatherApi.hourlyWeather;
    this.images = this.$store.state.openWeatherApi.images;
  },
  computed: {
    // 마커를 선택했을 때 보여지는 도시 이름
    cityName() {
      return this.$store.state.openWeatherApi.cityName;
    },
    //현재 온도
    currentTemp() {
      const { currentTemp } = this.$store.state.openWeatherApi.currentWeather;
      return currentTemp;
    },
    arrayTemps() {
      return this.$store.state.openWeatherApi.hourlyWeather;
    },
    // 상세 날씨 데이터 할당
    temporaryData() {
      const { currentHumidity, currentWindSpeed, currentFeelsLike } =
        this.$store.state.openWeatherApi.currentWeather;
      return [
        {
          title: "습도",
          value: currentHumidity + "%",
        },
        {
          title: "풍속",
          value: currentWindSpeed + "m/s",
        },
        {
          title: "체감온도",
          value: Math.round(currentFeelsLike) + "도",
        },
      ];
    },
    // 시간별 날씨 데이터에 대한 아이콘 이미지
    images() {
      return this.$store.state.openWeatherApi.images;
    },
  },
  methods: {
    // 타임스탬프로 변환
    Unix_timestamp(dt) {
      let date = new Date(dt * 1000);
      let hour = date.getHours().toString().padStart(2, "0");
      return hour + "시";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";
@import "../scss/forecast.scss";
</style>
