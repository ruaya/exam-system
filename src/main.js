import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/css-reset.css"
import "./assets/css/index.css"
import "vx-easyui/dist/themes/default/easyui.css";
import "vx-easyui/dist/themes/icon.css";
import "vx-easyui/dist/themes/vue.css";
import formatDate from './utils/filters'
import EasyUI from "vx-easyui";
Vue.use(EasyUI);
Vue.filter('formatDate', formatDate)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
