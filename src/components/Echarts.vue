<template>
  <div ref="echarts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ECharts",
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  data() {
    return {
      axisOption: {
        tooltip: {
          trigger: "item",
        },
        legend: {},
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [],
      },
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        legend: {},
        series: [],
      },
      echart: null,
    };
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
  watch: {
    chartData: {
      handler: function () {
        this.initCharts();
      },
      deep: true,
    },
  },
  methods: {
    initCharts() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echarts);
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
  },
};
</script>