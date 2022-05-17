import { createRouter, createWebHistory } from "vue-router";
import { FlowForm } from "@ditdot-dev/vue-flow-form"
import store from "../store/index"
import routes from "./routes";

const router = createRouter({ history: createWebHistory('/'), routes, strict: true });
const navigationGuard = (to: any, from: any, next: any) => {
    if (to.name == "CheckForm") {
        store.commit("setSkipStepState", false)
        next()
    } else if (from.name == "CheckForm") {
        if (!to.query.hasNoDraftedRegistration) store.commit("setSkipStepState", true)
        next()
    }
    else next()
}
router.beforeEach(navigationGuard)

export default router