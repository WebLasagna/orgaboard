import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

import fr from './lang/fr'
import en from './lang/en'

const socket = io('https://orgaboard-socketio.octavelr.repl.co')
Vue.use(VueSocketIOExt, socket)

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: navigator.language.split('-')[0],
  fallbackLocale: 'en',
  messages: {
    fr, en
  }
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
