<template>
    <div class="login-container">
      <button @click="loginWithGoogle" class="google-login-btn">
        Google 계정으로 로그인
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
    name: "GoogleLogin",
    data() {
      return {
        GOOGLE_CLIENT_ID: "구글클라이언트키",
        GOOGLE_REDIRECT_URI: "http://localhost:3000/oauth/google/callback",
        userInfo: null,
      };
    },
    computed: {
      isLoggedIn() {
        return !!localStorage.getItem("accessToken");
      },
    },
    methods: {
      loginWithGoogle() {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.GOOGLE_CLIENT_ID}&redirect_uri=${this.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
        window.location.href = googleAuthUrl;
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
            this.userInfo = response.data.data;
            console.log(response.data.data);
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
  .google-login-btn {
    background-color: #4285f4;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
  }
  
  .google-login-btn:hover {
    background-color: #357abd;
  }
  
  .user-info-btn {
    background-color: #34495e;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
  }
  
  .user-info {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  </style>