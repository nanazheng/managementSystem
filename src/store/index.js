import Vue from 'vue'
import VueX from 'vuex'
import tab from './tab'
import user from './user'

Vue.use(VueX)

export default new VueX.Store({
  modules: {
    tab,
    user,
  }
})