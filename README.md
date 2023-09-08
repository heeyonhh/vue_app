# Vue3 & SASS 웨더 앱 만들기

## Open Weather Api 사용

## 카카오 맵 Api 사용

## Composition api

Optional api 리팩토링 해보기

## Vuex : 데이터 관리 가공 작업 Vuex에서 완료 > 컴포넌트에서 호출, 데이터를 렌더링

- Vue.js 컴포넌트 내에서 필요한 데이터를 만들때 : Data 속성 안에서 만듬

      export default {
        data(){
          Return{
            data1: "",
            data2: "",
          };
        },
      };

- Vuex Store에서 데이터 만들 때 : state 속성 선언 후 그 아래에 데이터 선언

      export default {
        state: {
          data1: "",
          data2: "",
        };
      };

- state 호출

      //모듈로 따로 빼내지 않았을 경우
      const state1 = this.$store.state.data1;
      const state2 = this.$store.state.data2;
      
      //모듈로 빼냈을 경우
      const state1 = this.$store.state.모듈이름.data1;
      const state2 = this.$store.state.모듈이름.data2;
      
      <template>
        {{ this.$store.state.data1 }}
        {{ $store.state.data1 }}  
      </template>
      //this 사용하지 않아도 됨

- Getters : vue.js computed 속성과 동일한 기능(계산된 데이터 만들어내는 기능) -> 동일한 계산식을 필요하는 데이터들은 미리 만들어놓고 호출하기 때문에 효율적

      Vue.js

      computed: {
        doneTodosCount(){
        return this.$store.state.todos.filter(todo => todo.done).length
        },
      },

      Vuex Getters 호출

      computed: {
        doneTodosCount(){
        return this.$store.getters.doneTodosCount;
        },
      },

- Mutations : vue.js methods 속성과 유사 : state 변경 / Vuex state에서는 Mutations에서만 state 변경 가능 

      const store = createStore({
        state: {
          count: 1
        },
        mutation: {
          increment(state){
            state.count++
          }
        }
      })
      
- Mutations 실행 : commit 메서드 사용

      store.commit('뮤테이션_이름', 페이로드)

- Actions : vue.js methods 속성과 유사 / 비동기적 데이터 처리 api 호출할때 사용

      const store = createStore({
        state: {
          count: 0
        },
        mutation: {
          increment(state){
            state.count++
          }
        },
        actions{
          increment(context){
            context.commit('increment')
          }}
      })

- Actions 호출 : dispatch
      
      store.dispatch('액션_이름',[페이로드])

- 객체 구조분해하여 같은 방법으로 불러올 수 있음
  
      searchData({ context }) {
      context.state, context.getters, context.commit;
      },
      searchData2({ state, getters, commit }, payload) {},

##

- npm i -D webpack-dev-server@next로 설치(webpack-cli 버전(@4^)과 일치)
  
- package.json 옵션 browserslist
  
- .postcssrc.js 생성(PostCSS 구성 옵션)
  
- .babelrc.js` 생성(Babel 구성 옵션)

- npm run dev

- npm install vuex@next
  
- npm run build

## 빌드 후 문제 해결

- dist 폴더에 images 폴더 copy -> copy-webpack-plugin 사용 npm install copy-webpack-plugin --save-dev

      const CopyWebpackPlugin = require('copy-webpack-plugin');
      
      module.exports = {
        configureWebpack: {
          plugins: [
            new CopyWebpackPlugin({
              patterns: [
                {
                  from: 'public/images', // public 폴더의 이미지 폴더 경로
                  to: 'images', // dist 폴더에 복사될 경로
                },
              ],
            }),
          ],
        },
      };

- > vue.config.js

      module.exports = {
        // outputDir: './docs', // 빌드 결과물이 저장될 폴더
        publicPath: '', // 빌드된 파일의 루트 경로
      };
- Vue.js를 사용한 웹 애플리케이션 개발 중 새로고침 시 404 페이지로 리다이렉트 되는 이슈

 connect-history-api-fallback 현상

 Vue.js의 경우 라우터에 등록된 Vue 컴퍼넌트들을 모듈 번들러를 통하여 Javascript로 컴파일하여 WebServer의 Document Root 폴더에 가지고 있다. 

 라우터를 이용한 정상적인 페이지 요청 시에는 해당 페이지에 맞는 js 파일을 클라이언트가 요청하지만, 새로고침 시에는 도메인과 라우터 Path를 가지고 WebServer에 존재하지 않는 요청을 보내기 때문에 발생하는 이슈

 Hash Mode로 해결
 
      import { createRouter, createWebHashHistory } from 'vue-router'
            
      const router = createRouter({
            history: createWebHashHistory(),
            routes: [
            //...
      ],})

- 혼합된 액티브 콘텐츠 “http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=” 로드를 차단함 :  Mixed Content 오류

  > <meta> 태그는 브라우저에게 HTTP 리소스를 HTTPS로 업그레이드하도록 지시
  
  > Content-Security-Policy 헤더를 사용하여 http://dapi.kakao.com/v2/maps/sdk.js를 차단하지 않도록 설정

      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

  

