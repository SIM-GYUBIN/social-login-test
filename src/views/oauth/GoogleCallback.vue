<template>
    <div class="callback-container">
      <p>Google 로그인 처리 중...</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "GoogleCallback",
    async created() {
      const code = this.$route.query.code;
      if (code) {

        try {
            const response = await axios.post(
        "http://localhost:8080/api/oauth/google",
        { code }
      );
          
          if (response.data.success) {
            console.log(response.data.data);
            localStorage.setItem("accessToken", response.data.data.accessToken);
            localStorage.setItem("refreshToken", response.data.data.refreshToken);
            this.$router.push("/");
          }
        } catch (error) {
          console.error("Google 로그인 처리 중 오류 발생:", error);
          alert("로그인 처리 중 오류가 발생했습니다.");
          this.$router.push("/");
        }
      } else {
        alert("인증 코드가 없습니다.");
        this.$router.push("/");
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
  }
  </style>