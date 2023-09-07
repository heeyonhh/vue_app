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
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko"); //한국어 locale사용
import { useStore } from "vuex";
import { computed, onMounted, ref, watchEffect } from "vue";

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

    //store에서 fetchOpenWeatherApi
    const store = useStore();
    const fetchOpenWeatherApi = async () => {
      try {
        await store.dispatch("openWeatherApi/FETCH_OPENWEATHER_API");
        const {
          currentFeelsLike,
          currentSunrise,
          currentSunset,
          currentVisibility,
        } = store.state.openWeatherApi.currentWeather;

        let isInitialCityName = store.state.openWeatherApi.cityName;
        let isFeelLikeTemp = computed(() => {
          return currentFeelsLike;
        });
        let isTimeOfSunrise = computed(() => {
          return currentSunrise;
        });
        let isTimeOfSunSet = computed(() => {
          return currentSunset;
        });
        let isLineOfSight = computed(() => {
          return currentVisibility;
        });

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
        for (const point of pivots) {
          if (isFeelLikeTemp.value < point) break;
          index++;
        }

        feeling.value = labels[index];

        //가공할 데이터 새로운 배열 생성 v-for편하게 쓰기 위해
        let isProcessedData = [
          { name: "일출시간", value: Unix_timestamp(isTimeOfSunrise.value) },
          { name: "일몰시간", value: Unix_timestamp(isTimeOfSunSet.value) },
          {
            name: "가시거리",
            value:
              isLineOfSight.value
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "M",
          },
        ];
        // Composition API에서 AJAX요청과 데이터 변경을 하려면 데이터.value로 접근
        cityName.value = isInitialCityName;
        subWeatherData.value = isProcessedData;
      } catch (error) {
        console.log(error);
      }
    };

    //한번만 처리 하기 위해서 async await
    watchEffect(async () => {
      await fetchOpenWeatherApi();
    });

    // //Composition API에서 mounted 라이프 사이클 호출
    // fetchOpenWeatherApi();
    //store computed 후 호출
    onMounted(() => {
      fetchOpenWeatherApi();
    });

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
