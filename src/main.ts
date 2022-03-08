import { createApp } from 'vue'
import App from './App.vue'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

import firebaseConfig from "../firebase.config.json"
const firebaseApp = initializeApp(firebaseConfig);

getAnalytics(firebaseApp);
getAuth(firebaseApp)

const app = createApp(App)

app.use(BalmUI);
app.use(BalmUIPlus);

app.mount('#app')



