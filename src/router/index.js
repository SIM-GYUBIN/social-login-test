import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/Home.vue";
import KakaoCallback from "@/views/oauth/KakaoCallback.vue";
import GoogleCallback from "@/views/oauth/GoogleCallback.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/oauth/kakao/callback",
    name: "KakaoCallback",
    component: KakaoCallback,
  },
  {
    path: "/oauth/google/callback",
    name: "GoogleCallback",
    component: GoogleCallback,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
