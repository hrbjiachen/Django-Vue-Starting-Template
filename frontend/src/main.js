import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreated() {
    Vue.prototype.$http = axios;
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  },
  render: h => h(App)
}).$mount("#app");
