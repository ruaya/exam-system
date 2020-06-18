<template>
  <div class="login-page">
    <transition name="form-fade" mode="in-out">
      <Form class="login-form" ref="form" v-show="showLogin" :model="loginForm">
        <h2>Login</h2>
        <div style="margin-bottom:20px">
          <TextBox v-model="loginForm.authAccount" placeholder="authAccount" iconCls="icon-man"></TextBox>
        </div>
        <div style="margin-bottom:20px">
          <PasswordBox v-model="loginForm.password" placeholder="password"></PasswordBox>
        </div>
        <div style="margin-bottom:20px">
          <LinkButton :disabled="false" @click="submitForm">Submit</LinkButton>
        </div>

        <div style="margin-bottom:20px">
          <p>authAccount: ruaya123</p>
          <p>password: 123456</p>
        </div>
      </Form>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        authAccount: "",
        password: ""
      },
      rules: {
        authAccount: "required",
        password: "required"
      },
      errors: {},
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
  },
  computed: {
    login() {
      return this.$store.state.login;
    },
    posting() {
      return this.$store.state.posting;
    },
    authInfo() {
      return this.$store.state.user;
    }
  },
  methods: {
    getError(name) {
      return this.errors[name] && this.errors[name].length
        ? this.errors[name][0]
        : null;
    },
    hasError(name) {
      return this.getError(name) != null;
    },
    getTipOpts(name) {
      return {
        content: this.getError(name),
        closed: !this.hasError(name),
        position: "right"
      };
    },
    async submitForm() {
      if (this.loginForm.authAccount !== "" && this.loginForm.password !== "") {
        const res = await this.$store.dispatch("login", this.loginForm);
        if (res.code === 1) this.$router.push('/')
      } else {
        this.$messager.alert({
          title: "Error",
          icon: "error",
          msg: '确认信息完整'
        });
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.login-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form {
  border: 1px solid blue;
  padding: 20px;
  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
  }
}
.error {
  color: red;
  font-size: 12px;
  margin: 4px 0;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>