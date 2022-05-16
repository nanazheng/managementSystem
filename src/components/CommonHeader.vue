<template>
  <header>
    <div class="l-content">
      <el-button size="mini" @click="handleMenu">
        <i class="el-icon-menu"></i>
      </el-button>
      <h3 style="color: #fff">首页</h3>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="avatar" class="avatar" />
        </span>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CommonHeader',
  data() {
    return {
      avatar: require('../assets/images/logo.png')
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  margin-left: auto;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>