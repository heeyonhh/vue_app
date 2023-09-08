import { createRouter } from "vue-router";
import Forecast from "~/components/Forecast";
import Airquality from "~/components/Airquality";

export default createRouter({

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