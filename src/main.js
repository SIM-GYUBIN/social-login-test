import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import axios from "axios";
import router from "./router";

const app = createApp(App);
app.config.globalProperties.$axios = axios; // axios 전역 설정

app.use(createPinia());
app.use(router);

app.mount("#app");
