<template>
  <el-form
    :model="loginForm"
    status-icon
    :rules="rules"
    ref="loginForm"
    label-width="100px"
    class="login-container"
  >
    <h1 class="login_title">系统登录</h1>
    <el-form-item
      prop="username"
      class="username"
      label="用户名"
      label-width="80px"
    >
      <el-input
        type="input"
        placeholder="请输入用户名"
        autocomplete="off"
        v-model="loginForm.username"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码" label-width="80px">
      <el-input
        type="password"
        v-model="loginForm.password"
        placeholder="请输入密码"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login" class="login_submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            message: "用户名长度不能小于3位",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            message: "密码长度不能小于6位",
          },
        ],
      },
    };
  },
  methods: {
    login() {},
  },
};
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 400px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit {
  margin: 10px auto 0 auto;
}
</style>
