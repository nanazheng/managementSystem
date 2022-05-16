<template>
  <div ref="echarts"></div>
</template>

<script>
  import * as echarts from 'echarts'
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
            tooltip: {
              trigger: 'item'
            },
            xData: [],
            series
          }
        }
      }
    },
    data() {
      return {
        axisOption: {
          textStyle: {
            color: "#333"
          },
          gird: {
            left: "20%"
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: "category",
            data: [],
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            },
            axisLabel: {
              interval: 0,
              color: '#333'
            }
          },
          yAxis: {
              
          },
          legend: {
            data: keyArray
          },
          series
        },
        normalOption: {
          series: []
        },
        echart
      }
    },
    computed: {
      options() {
        return this.isAxisChart ? this.axisOption : this.normalOption
      }
    },
    watch: {
      chartData: {
        handle: function() {
          this.initCharts()
        },
        deep: true
      }
    },
    methods: {
      initCharts() {
        this.initChartData()
      },
      initChartData() {
        if(this.isAxisChart) {
          this.axisOption.xAxis.data = this.chartData
          this.axisOption.series = this.chartData.series
        }else {
          this.axisOption.series = this.chartData.series
        }
      }
    },
  }
</script>