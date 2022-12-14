import Vue from "vue";
import App from "./App.vue";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

import "./assets/main.css";
Vue.use(VueTelInput);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
