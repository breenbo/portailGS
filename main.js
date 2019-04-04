import Vue from 'vue'

// import font-awesome for cards logos
import 'vue-awesome/icons/cogs'
import 'vue-awesome/icons/male'
import 'vue-awesome/icons/anchor'
import 'vue-awesome/icons/chart-pie'
import 'vue-awesome/icons/bug'
import 'vue-awesome/icons/cloud'
import 'vue-awesome/icons/address-card'
import 'vue-awesome/icons/heartbeat'
import 'vue-awesome/icons/building'
import 'vue-awesome/icons/shopping-cart'
import 'vue-awesome/icons/shield-alt'
import 'vue-awesome/icons/briefcase'
import 'vue-awesome/icons/users'
import 'vue-awesome/icons/tasks'
import 'vue-awesome/icons/fire-extinguisher'
import 'vue-awesome/icons/envelope'
import 'vue-awesome/icons/street-view'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/ship'
import 'vue-awesome/icons/exclamation-circle'
import 'vue-awesome/icons/hands-helping'

import App from './App.vue'

Vue.config.productionTip = false

// register and call logo globally
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

new Vue({
  render: h => h(App),
}).$mount('#app')
