<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const API_KEY = "d2577fedb4f298e401a8d421825311fa";

    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}`;
      document.head.appendChild(script);
    }
  },
  //지도 내타내기
  methods: {
    initMap() {
      const mapContainer = document.getElementById("map"); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(36.73035, 127.967487), // 지도의 중심좌표
        level: 13, // 지도의 확대 레벨
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      const positions = [
        {
          //서울
          latlng: new kakao.maps.LatLng(36.5683, 126.9778),
        },
        {
          //수원
          latlng: new kakao.maps.LatLng(37,2911, 127.0089),
        }
      ];
      // 마커 생성
      positions.forEach((pos) => {
        const marker = new kakao.maps.Marker({
          position: pos.latlng, // 마커 위치
        });
        // 마커가 지도 위에 표시
        marker.setMap(map);
        // kakao.maps.event.addListener(marker, "click", () => {
        //   // 클릭한 위도, 경도 정보를 가져오기
        //   // watch로 따로 빼지 않고, 직접 할당
        //   this.$store.commit("openWeatherApi/SET_CITYNAME", pos.cityName);
        //   this.$store.commit("openWeatherApi/SET_LATLON", marker.getPosition());
        //   this.$store.dispatch("openWeatherApi/FETCH_OPENWEATHER_API");
        // });
        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>
