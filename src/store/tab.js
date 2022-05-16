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
  },
};
