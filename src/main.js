import Vue from 'vue'
import { Button, Radio, Container, Aside, Header, Main, Menu, MenuItem, Submenu, MenuItemGroup, Dropdown, DropdownItem, DropdownMenu, Row, Col, Card, Divider, Table, TableColumn } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import './assets/less/index.less'

import router from './router'
import store from './store'
import http from 'axios'
import '../api/mock.js'

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
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$http = http

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
