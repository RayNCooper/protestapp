import { createApp } from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

const firebaseConfig = require("../firebase.config.json")
const app = initializeApp(firebaseConfig);

getAnalytics(app);
getAuth(app)

createApp(App).mount('#app')

