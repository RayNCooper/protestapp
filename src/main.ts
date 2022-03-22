import { createApp } from 'vue'
import App from './App.vue'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

import router from './router';
import store from "./store"


const app = createApp(App)

app.use(store)
app.use(router)

app.use(BalmUI, {
    $theme: {
        primary: "white",
        secondary: "black",
        background: "white",
        surface: "white",
        error: "red",
        "on-primary": "black",
        "on-secondary": "white",
        "on-surface": "black",
        "on-error": "white",
    }
});
app.use(BalmUIPlus)

app.mount('#app')



