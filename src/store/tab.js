import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    tabLists: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
      },
    ],
    currentMenu: null,
    menu: []
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, menu) {
      if (menu.name !== "home") {
        state.currentMenu = menu;
        const index = state.tabLists.findIndex((tab) => tab.name === menu.name);
        if (index === -1) {
          state.tabLists.push(menu);
        }
      } else {
        state.currentMenu = null;
      }
    },
    closeTag(state, menu) {
      // state.tabLists = state.tabLists.filter(tab => tab.name !== menu.name)
      const index = state.tabLists.findIndex((tab) => tab.name === menu.name);
      state.tabLists.splice(index, 1);
    },
    setMenu(state, menu) {
      state.menu = menu
      Cookie.set('menu', JSON.stringify(menu))
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(child => {
            child.component = () => import(`../views/${child.url}`)
            return child
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      // 路由的动态添加  
      menuArray.map((item) => {
        router.addRoute('Main', item)
      })
    }
  },
};
