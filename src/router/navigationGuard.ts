import store from "@/store";
import { NavigationGuard } from "vue-router";
const loggedInRoutes = ["Sheets", "Graphs", "Notes", "Settings"]

const navigationGuard: NavigationGuard<Vue> = (to, from, next) => {
    const isLoggedIn = store.getters.getUser
    /* Guarded Routes (Must be Logged In) */
    if (loggedInRoutes.includes(to.name!)) {
        isLoggedIn ? next() : next({ name: "Login" })
    }
    /* Login Route Guard (Must be Logged Out) */
    else if (to.name == "Login") {
        isLoggedIn ? next({ name: "Landing" }) : next()
    }
    /* Admin Route Guard (Must be Logged In & Admin) */
    else if (to.name == "Admin" || to.name == "Templates") {
        if (isLoggedIn && store.getters.isAdmin) next()
        else next({ name: "Login" })
    }
    else next()
}
export default navigationGuard