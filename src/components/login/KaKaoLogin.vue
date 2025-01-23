<template>
  <div class="login-container">
    <button @click="loginWithKakao" class="kakao-login-btn">
      카카오 계정으로 로그인
    </button>
    <!-- 사용자 정보 조회 버튼 -->
    <button v-if="isLoggedIn" @click="getUserInfo" class="user-info-btn">
      사용자 정보 조회
    </button>
    <!-- 사용자 정보 표시 -->
    <div v-if="userInfo" class="user-info">
      <h3>사용자 정보</h3>
      <p>ID: {{ userInfo.id }}</p>
      <p>닉네임: {{ userInfo.nickname }}</p>
      <p>제공자: {{ userInfo.provider }}</p>
      <p>총 좋아요: {{ userInfo.totalLikes }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "KakaoLogin",
  data() {
    return {
      KAKAO_CLIENT_ID: "카카오오클라이언트키",
      KAKAO_REDIRECT_URI: "http://localhost:3000/oauth/kakao/callback",
      userInfo: null,
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("accessToken");
    },
  },
  methods: {
    loginWithKakao() {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${this.KAKAO_CLIENT_ID}&redirect_uri=${this.KAKAO_REDIRECT_URI}&response_type=code`;
      window.location.href = kakaoAuthUrl;
    },

    async getUserInfo() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          alert("로그인이 필요합니다.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.success) {
          console.log(response.data.data)
          this.userInfo = response.data.data;
        }
      } catch (error) {
        console.error("사용자 정보 조회 중 오류 발생:", error);
        alert("사용자 정보 조회 중 오류가 발생했습니다.");
      }
    },
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
</style>
