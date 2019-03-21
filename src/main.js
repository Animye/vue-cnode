import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import 'moment/locale/zh-cn'
Vue.prototype.$moment = moment
// Vue.filter('dateformat', function(dataStr, pattern = '') {
//   return moment(dataStr).fromNow(pattern)
// })
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
