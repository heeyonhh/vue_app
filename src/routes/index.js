import { createRouter, createWebHashHistory } from "vue-router";
import Forecast from "~/components/Forecast";
import Airquality from "~/components/Airquality";

export default createRouter({

    //hash모드 : 특정 페이지에서 새로고침했을때, 페이지 찾을수 없음과 같은 메세지 알림을 방지
    history: createWebHashHistory(),

    routes: [
        {
            path: "/",
            name: Forecast,
            component: Forecast,
        },
        {
            path: "/airquality",
            name: Airquality,
            component: Airquality,
        },
    ]
})