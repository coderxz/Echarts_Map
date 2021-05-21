/*
 * @version: 
 * @Author: LHF
 * @Date: 2021-05-14 09:52:05
 * @LastEditors: LHF
 * @LastEditTime: 2021-05-17 09:16:04
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import echarts from 'echarts'
// import echartsGL from 'echarts-gl'
// import dataV from '@jiaminghi/data-view'

// Vue.prototype.$echartsGL = echartsGL
// Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
// Vue.use(dataV)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
