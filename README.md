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

- 혼합된 액티브 콘텐츠 “http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d2577fedb4f298e401a8d421825311fa” 로드를 차단함

  > Content-Security-Policy 헤더를 사용하여 http://dapi.kakao.com/v2/maps/sdk.js를 차단하지 않도록 설정

      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

- 배포 후 이미지 차단 오류 > Content Security Policy (CSP) 설정에 따라 리소스 로드가 차단

 CSP 개요
 
    Mozilla가 개발한 표준으로 XSS, Data Injection, Click Jacking 등의 공격을 방지하기 위한 컨텐츠 기반 보안 정책
    SOP(Same Origin Policy)와 비슷하지만 CSP는 웹 사이트 관리자가 규칙 적용
    웹 서버는 웹 사이트에서 사용 가능한 CSP 헤더를 브라우저에게 전달, 브라우저는 이를 기반으로 웹 페이지 렌더링
    인라인 자바스크립트(태그 내에 자바스크립트 명령어 작성) 실행 금지 설정 가능
    특정 웹사이트(origin)에서만 자원을 불러오도록 설정하여 공격자 서버에 요청을 차단
    공격자가 웹 사이트에 본래 존재하지 않던 스크립트 삽입하는 것을 방지
    CSP 보안 정책을 정의한 상태에서 공격자가 다른 소스의 스크립트를 로딩 시 에러 출력

지시문

    default-src : 모든 리소스에 대한 정책
    script-src : Javascript 등 웹에서 실행 가능한 스크립트에 대한 정책
    style-src : css에 대한 정책
    connect-src : script src로 불러올 수 있는 url에 대한 정책
    img-src : 이미지 ( data: URL에서 이미지가 로드되는 것을 허용하려면 data:를 지정 )
    script-nonce : script-src에 nonce가 포함되는 정책
    form-action : form 태그 내 action 부분에 대한 정책
    object-src : 플러그인, 오브젝트에 대한 정책
    media-src : video, audio
    font-src : font
    sandbox : HTML 샌드박스
    reflected-xss : X-XSS-Protection header와 동일한 효과
    report-uri : 정책 위반 케이스가 나타났을 때 내용을 전달할 URL
    base-uri: <base> 요소에 나타날 수 있는 URL을 제한

옵션(src)

    * : 모든 것을 허용
    'none' : 모두 차단
    'self' : 현재 도메인만 허용
    'unsafe-inline' : 소스코드 내 인라인 자바스크립트 및 CSS 허용
    'unsafe-eval' : eval 같은 텍스트-자바스크립트 메커니즘 허용

메타 태그 삽입으로 해결

      <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; ">
