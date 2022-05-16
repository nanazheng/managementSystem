<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="avatar" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="login-info">
          <p>上次登录事件：<span>2022-05-14</span></p>
          <p>上次登录地点：<span>广州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px" shadow="hover">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, index) in tableLabel"
            :key="index"
            :prop="index"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="(item, index) in countData"
          :key="index"
          :index="index"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            :class="`el-icon-${item.icon}`"
            class="icon"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div style="height: 240px" ref="userecharts"></div>
        </el-card>
        <el-card style="height: 260px">
          <div style="height: 240px" ref="videoEcharts"></div
        ></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../../api/data.js";
import * as echarts from "echarts";

export default {
  name: "HomeOld",
  data() {
    return {
      avatar: require("../../assets/images/logo.png"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  // 接口请求一般放 mounted 中
  mounted() {
    getData().then((result) => {
      const { code, data } = result.data;
      console.log("data", data);
      if (code === 20000) {
        this.tableData = data.tableData;
        const orderData = data.orderData;
        const xData = orderData.date;
        const keyArray = Object.keys(orderData.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          console.log(key);
          series.push({
            name: key,
            data: orderData.data.map((item) => item[key]),
            type: "line",
          });
        });
        const option = {
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option);

        const userData = data.userData;
        const userOption = {
          tooltip: {
            trigger: "axis",
          },
          legend: {},
          xAxis: [
            {
              type: "category",
              data: userData.map((data) => data.date),
            },
          ],
          yAxis: {},
          series: [
            {
              name: "新用户",
              type: "bar",
              // prettier-ignore
              data: userData.map(data => data.new),
            },
            {
              name: "活跃用户",
              type: "bar",
              data: userData.map((data) => data.active),
            },
          ],
        };
        const U = echarts.init(this.$refs.userecharts);
        U.setOption(userOption);

        const videoData = data.videoData;
        console.log("videoData", videoData);
        const videoOption = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "销售量",
              type: "pie",
              radius: "50%",
              data: videoData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        const V = echarts.init(this.$refs.videoEcharts);
        V.setOption(videoOption);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0px;
}
</style>
