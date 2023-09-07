<template>
  <div class="leftContainer">
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
          <button class="airquality">Air quality</button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="weatherDegree">
          <!-- 반올림 한수와 가장 가까운 정수값 -->
          <p>{{ Math.round(currentTemp) }}&deg;</p>
        </div>
        <div class="weatherIcon">
          <img src="~/assets/images/01d.png" alt="MainLogo" />
        </div>
        <div class="weatherData">
          <div
            v-for="temporary in temporaryData"
            :key="temporary.title"
            class="detailData"
          >
            <p>{{ temporary.title }}</p>
            <p>{{ temporary.value }}</p>
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
        <div
          class="timelyWeather"
          v-for="(temp, index) in arrayTemps"
          :key="index"
        >
          <div class="icon">
            <img src="~/assets/images/01n.png" alt="29" />
          </div>
          <div class="data">
            <p class="time">{{ Unix_timestamp(temp.dt) }}</p>
            <p class="currentDegree">{{ Math.round(temp.temp) }}&deg;</p>
            <div>
              <img src="~/assets/images/drop.png" alt="drop" />
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
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko"); //한국어 locale사용

export default {
  data() {
    return {
      //현재 시간 불러오기 dayjs플러그인
      currentTime: dayjs().format("YYYY. MM .DD. ddd"),
      //상세 날씨 데이터 데이터 할당
      //현재 시간에 따른 현재 온도 데이터
      currentTemp: "",
      temps: [],
      icons: [],
      cityName: "",
      arrayTemps: [],

      //임시데이터
      temporaryData: [
        {
          title: "습도",
          value: "",
        },
        {
          title: "풍속",
          value: "",
        },
        {
          title: "체감온도",
          value: "",
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
        // console.log(response);
        let initialCityName = response.data.timezone;
        let initialCurrentWeatherData = response.data.current;

        this.cityName = initialCityName.split("/")[1]; // ['asia', 'seoul']

        this.currentTemp = initialCurrentWeatherData.temp;

        this.temporaryData[0].value = initialCurrentWeatherData.humidity + "%"; //습도
        this.temporaryData[1].value =
          initialCurrentWeatherData.wind_speed + "m/s"; //풍속
        this.temporaryData[2].value =
          Math.round(initialCurrentWeatherData.feels_like) + "도"; //체감온도

        //시간대별 날씨 데이터
        // this.arrayTemps = response.data.hourly;
        // //24시간 이내의 데이터만 활용
        for (let i = 0; i < 24; i++) {
          this.arrayTemps[i] = response.data.hourly[i];
        }
        // console.log(this.arrayTemps);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    //타임스탬프로 변환
    Unix_timestamp(dt) {
      let date = new Date(dt * 1000);
      let hour = date.getHours().toString().padStart(2, "0");
      return hour + "시";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
@import "~/scss/mainview.scss";
</style>
