import Vue from "vue";
import axios from "axios";
import App from "./App.vue";

new Vue({
  el: "#app",
  beforeCreated() {
    Vue.prototype.$http = axios;
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  },
  render: h => h(App)
});
