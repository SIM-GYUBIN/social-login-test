<template>
  <div class="callback-container">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else class="loading-message">카카오 로그인 처리 중...</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "KakaoCallback",
  data() {
    return {
      error: null,
    };
  },
  async created() {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      this.error = "인증 코드를 찾을 수 없습니다.";
      setTimeout(() => this.$router.push("/"), 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/oauth/kakao",
        { code }
      );

      if (response.data.success) {
        // 토큰과 유저 정보 저장
        console.log(response.data.data);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        // localStorage.setItem("user", JSON.stringify(response.data.data.user));

        // 메인 페이지로 리다이렉트
        this.$router.push({
          path: "/",
          query: {
            loginSuccess: true,
            isNew: response.data.data.isNew,
          },
        });
      }
    } catch (error) {
      console.error("로그인 처리 중 오류 발생:", error);
      this.error = "로그인 처리 중 오류가 발생했습니다.";
      setTimeout(() => this.$router.push("/"), 3000);
    }
  },
};
</script>

<style scoped>
.callback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.loading-message {
  color: #4caf50;
  font-size: 1.2em;
}

.error-message {
  color: #f44336;
  font-size: 1.2em;
}
</style>
