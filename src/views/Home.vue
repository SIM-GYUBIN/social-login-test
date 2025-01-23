<template>
  <div class="home-page">
    <kakao-login />
    <google-login />
  </div>
</template>

<script>
import KakaoLogin from "@/components/login/KaKaoLogin.vue";
import GoogleLogin from "@/components/login/GoogleLogin.vue";

export default {
  name: "HomePage",
  components: {
    KakaoLogin,
    GoogleLogin,
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
