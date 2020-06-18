<template>
  <LayoutPanel region="north" style="height:80px;">
    <div class="header-container">
      <div class="title">
        <img src="../assets/images/logo.jpg" alt="" height="80">
      </div>
      <div class="operation">
        <div class="item">
          <span>欢迎: {{ authInfo.name }}</span>
        </div>
        <div class="item">
          <figure>
            <img src="../assets/images/top_right1.png" alt="">
          </figure>
          <p>前台学习</p>
        </div>
        <div class="item">
          <figure>
            <img src="../assets/images/top_right2.png" alt="">
          </figure>
          <p>考试帮助</p>
        </div>
        <div class="item" @click="loginOut">
          <figure>
            <img src="../assets/images/top_right3.png" alt="">
          </figure>
          <p>退出登录</p>
        </div>
      </div>
    </div>
  </LayoutPanel>
</template>

<script>
export default {
  name: 'north',
  computed: {
    authInfo() {
      return this.$store.state.user;
    }
  },
  created() {
    this.getAuthInfo()
  },
  methods: {
    getAuthInfo() {
      this.$store.dispatch('getAuth')
    },
    loginOut() {
      this.$messager.confirm({
        title: "Confirm",
        msg: "Are you confirm this?",
        result: r => {
          if (r) {
            localStorage.removeItem("TOKEN")
            this.$router.push('/login') 
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 100%;
  background: url('../assets/images/top_right_bg.jpg');
  display: flex;
  align-items: center;
  justify-content: space-between;
  .operation {
    display: flex;
    figure {
      margin: 0;
    }
    .item {
      padding: 0 10px;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>