import { createRouter, createWebHashHistory } from "vue-router";
import Forecast from "~/components/Forecast";
import Airquality from "~/components/Airquality";

const routes = [
    {
        path: "/",
        name: "Forecast",
        component: Forecast,
    },
    {
        path: "/airquality",
        name: "Airquality",
        component: Airquality,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/404"
    },
];

export default createRouter({
    // hash 모드: 특정 페이지에서 새로고침했을 때, 페이지 찾을 수 없음과 같은 메시지 알림을 방지
    history: createWebHashHistory(),
    routes,
});