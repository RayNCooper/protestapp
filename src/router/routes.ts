import Dashboard from "../components/Dashboard.vue"
import History from "../components/History.vue"

const routes = [
    /* { path: "*", component: NotFoundComponent, name: "Not Found" }, */
    { path: "/", name: "Root", redirect: { name: "Dashboard" } },
    { path: "/dashboard", component: Dashboard, name: "Dashboard" },
    { path: "/historie", component: History, name: "History" },
];

export default routes