<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
import MapPositions from '~/assets/mappositions.json';

export default {
  mounted() {
    const API_KEY = 'd2577fedb4f298e401a8d421825311fa';

    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(36.73035, 127.967487),
        level: 13,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      const positions = MapPositions.map((pos) => ({
        latlng: new kakao.maps.LatLng(...pos.latlng),
        cityName: pos.cityName,
      }));
      // 마커를 생성 / 마커 클릭하고 디스패치
      positions.forEach((pos) => {
        const marker = new kakao.maps.Marker({
          position: pos.latlng, // 마커의 위치
        });
        marker.setMap(map);
        //마커 클릭했을 때 store로 전달
        kakao.maps.event.addListener(marker, 'click', () => {
          // 클릭한 위도, 경도 정보를 가져옵니다
          // watch로 따로 빼지 않고, 직접 할당
          this.$store.commit('openWeatherApi/SET_CITYNAME', pos.cityName);
          this.$store.commit('openWeatherApi/SET_LATLON', marker.getPosition());
          this.$store.dispatch('openWeatherApi/FETCH_OPENWEATHER_API');
        });
        // 지도 위 마커를 제거
        // marker.setMap(null);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/scss/main.scss';

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