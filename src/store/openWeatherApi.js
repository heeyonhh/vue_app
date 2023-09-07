import axios from 'axios';

export default {
    // namespaced : 모듈화하여 사용될 수 있음을 명시적으로 나타내는 개념
    namespaced: true,
    // state : 실제로 취급해야하는 데이터
    state: {
        position: {
            lat: 37.5683,
            lon: 126.9778,
        },
        cityName: 'Seoul',
        currentWeather: {
            currentTemp: 0,
            currentHumidity: 0,
            currentWindSpeed: 0,
            currentFeelsLike: 0,
            currentSunrise: 0,
            currentSunset: 0,
            currentVisibility: 0,
        },
        hourlyWeather: [],
        images: [],
    },
    // getters: 계산된 상태를 만들어내는 속성 computed와 기능 유사
    getters: {},
    // mutations, actions : methods와 유사
    // mutations : 변이 메서드 관리하는 데이터(state)를 변경
    mutations: {
        SET_LATLON(state, payload) {
            state.position.lat = payload.Ma;
            state.position.lon = payload.La;
        },
        SET_CITYNAME(state, payload) {
            state.cityName = payload;
        },
        SET_CURRENT_WEATHER(state, payload) {
            state.currentWeather.currentTemp = Math.round(payload.temp); // 현재온도
            state.currentWeather.currentHumidity = payload.humidity; // 습도
            state.currentWeather.currentWindSpeed = payload.wind_speed; // 풍속
            state.currentWeather.currentFeelsLike = Math.round(payload.feels_like); // 체감온도
            state.currentWeather.currentSunrise = payload.sunrise; // 일출시간
            state.currentWeather.currentSunset = payload.sunset; // 일몰시간
            state.currentWeather.currentVisibility = payload.visibility; // 가시거리
        },
        SET_TIMELY_WEATHER(state, payload) {
            state.hourlyWeather = payload;
        },
        SET_IMAGEPATH(state, payload) {
            state.images = payload;
        },
    },
    // actions : 특정한 데이터를 직접적으로 수정하는 것이 허용되지 않음.
    // 비동기로 동작 async, await
    actions: {
        // actions부분에선 mutations처럼 state를 바로 불러올수 없다.
        // context라는 객체데이터를 가지고 온후 context를 참조하여 데이터 불러오기
        // context: state, getters, mutations을 활용
        // mutations을 불러오기 위서 context.mutations가 아니라 context.commit을 활용
        // searchData({ context }) {
        // 객체 구조분해하여 같은 방법으로 불러올 수 있다.
        // context.state, context.getters, context.commit;
        // searchData2({ state, getters, commit }, payload) {},
        // 두 번째 매개변수 자리 (payload): 함수가 실행될 때, 인수로 들어온 특정한 데이터를 payload 자리에 받는다.

        // OPENWEATHER API 데이터 호출
        async FETCH_OPENWEATHER_API(context) {
            // context 매개변수 전달
            const API_KEY = '284bfdeb630520653864189833ba7c68';
            let initialLat = context.state.position.lat;
            let initialLon = context.state.position.lon;

            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric`);
                // context.commit("SET_CITYNAME", res.data.timezone.split("/")[1]); // 도시이름 데이터
                const images = new Array();
                for (let i = 0; i < 48; i++) {
                    const weatherIcon = res.data.hourly[i].weather[0].icon;
                    images[i] = `/images/${weatherIcon}.png`;
                }

                context.commit('SET_IMAGEPATH', images);
                context.commit('SET_CURRENT_WEATHER', res.data.current); // 조회하는 현재시간에 대한 날씨데이터
                context.commit('SET_TIMELY_WEATHER', res.data.hourly); // 시간대별 날씨데이터
            } catch (error) {
                console.log(error);
            }
        },
    },
};