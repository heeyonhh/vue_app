import axios from 'axios';

export default {
    // store에서 모듈화
    namespaced: true,
    // state 실제 취급하는 데이터
    state: {
        position: {
            lat: 37.5683,
            lon: 126.9778,
        },
        cityName: 'Seoul',
        currentWeather: {
            //subview
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
    // // 계산된 상태를 만들어내는 속성 (computed와 기능 유사)
    // getters: {},
    // mutations, actions (methods 유사)
    // mutations : state 변경 변이 메서드
    mutations: {
        SET_LATLON(state, payload) {
            state.position.lat = payload.Ma;
            state.position.lon = payload.La;
        },
        SET_CITYNAME(state, payload) {
            state.cityName = payload;
        },
        SET_CURRENT_WEATHER(state, payload) {
            state.currentWeather.currentTemp = Math.round(payload.temp);
            state.currentWeather.currentHumidity = payload.humidity;
            state.currentWeather.currentWindSpeed = payload.wind_speed;
            state.currentWeather.currentFeelsLike = Math.round(payload.feels_like);
            state.currentWeather.currentSunrise = payload.sunrise;
            state.currentWeather.currentSunset = payload.sunset;
            state.currentWeather.currentVisibility = payload.visibility;
        },
        SET_TIMELY_WEATHER(state, payload) {
            state.hourlyWeather = payload;
        },
        SET_IMAGEPATH(state, payload) {
            state.images = payload;
        },
    },
    // actions 비동기 async, await
    actions: {
        // mutations처럼 state를 바로 불러올 수 없다 context를 참조하여 불러옴
        async FETCH_OPENWEATHER_API(context) {
            // context : 매개변수 전달
            const API_KEY = '284bfdeb630520653864189833ba7c68';
            let initialLat = context.state.position.lat;
            let initialLon = context.state.position.lon;

            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric`);

                const images = new Array();
                for (let i = 0; i < 48; i++) {
                    const weatherIcon = res.data.hourly[i].weather[0].icon;
                    images[i] = `/images/${weatherIcon}.png`;
                }

                context.commit('SET_IMAGEPATH', images);
                context.commit('SET_CURRENT_WEATHER', res.data.current); // 현재시간 날씨데이터
                context.commit('SET_TIMELY_WEATHER', res.data.hourly); // 시간대별 날씨데이터
            } catch (error) {
                console.log(error);
            }
        },
    },
};