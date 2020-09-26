import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from './components/common/toast/Toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();
Vue.prototype.$toast = Toast;

new Vue({
  render: h => h(App), 
  router,
  store,
}).$mount('#app')
