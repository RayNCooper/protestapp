import VueRouter, { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({ history: createWebHistory('/'), routes });
/* router.beforeEach(navigationGuard) */

export default router