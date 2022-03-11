import { createApp } from 'vue'
import App from './App.vue'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

import firebaseConfig from "../firebase.config.json"
import router from './router';
const firebaseApp = initializeApp(firebaseConfig);

getAnalytics(firebaseApp);
getAuth(firebaseApp)

const app = createApp(App)

app.use(router)

app.use(BalmUI, {
    $theme: {
        primary: "white",
        secondary: "green",
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



