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

##

- npm i -D webpack-dev-server@next로 설치(webpack-cli 버전(@4^)과 일치)
  
- package.json 옵션 browserslist
  
- .postcssrc.js 생성(PostCSS 구성 옵션)
  
- .babelrc.js` 생성(Babel 구성 옵션)

- npm run dev
