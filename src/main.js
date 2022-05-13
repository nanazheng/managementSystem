import Vue from 'vue'
import { Button, Radio, Container, Aside, Header, Main, Menu, MenuItem, Submenu, MenuItemGroup } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
