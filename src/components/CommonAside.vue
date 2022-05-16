<template>
  <el-menu
    default-active="Home"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "通用管理系统" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(child, childIndex) in item.children"
        :key="child.path"
      >
        <el-menu-item :index="childIndex + ''" @click="clickMenu(child)">
          <span>{{ child.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "s-shop",
        },

        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user-solid",
        },

        {
          path: "/other",
          label: "其他",
          icon: "setting",
          children: [
            {
              path: "/pageOne",
              name: "pageOne",
              label: "页面一",
            },
            {
              path: "/pageTwo",
              name: "pageTwo",
              label: "页面二",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
      console.log("item", item);
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      console.log(
        "this.$store.state.tab.isCollapse",
        this.$store.state.tab.isCollapse
      );
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>