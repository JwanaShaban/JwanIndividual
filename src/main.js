import "vue-gifplayer/src/gif.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import { firebaseAuthentication } from "../src/firebase/database.js";

let app;
firebaseAuthentication.onAuthStateChanged(() => {

    if(!app){
        app = createApp(App)
        .use(router)
        .use(VueApexCharts)
        .mount('#app')
    }

})
