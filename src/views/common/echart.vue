<template>
  <div class="r-echarts-line" style="padding:0 20px;">
    <div class="bottom" id="echart" ref="mychart">
    </div>
  </div>
</template>
<script type="text/javascript">
import echarts from 'echarts'
console.log(echarts)
export default {
   data () {
    return {
	    typePick: '数值',
	    typeList: [
	      {
	        name: '数值'
	      },
	      {
	        name: '百分比'
	      }
	    ],
	    pagePick: 0,
	    // myChart实例
	    myChart: null,
	    myChartTwo:{},
	    percent: {
	        label: {
	          normal: {
	            show: true,
	            position: 'inside',
	            formatter: '{c}%'
	          }
	        }
	    },
	    numeric: {
		        label: {
		          normal: {
		            show: true,
		            position: 'inside',
		            formatter: '{c}'
		          }
		        }
	    }
    }
  },
  // props: {
  //   index: {
  //     required: true,
  //     type: Number
  //   },
  //   data: {
  //     required: true,
  //     type: Object
  //   }
  // },
  mounted () {
    this.setEchart();
  },
  // updated () {
  //   if (!this.myChart) {
  //     this.setEchart();
  //   }
  //   this.chartChange();
  // },
  computed: {
    origin () {
      return this.data;
    },
    opt() {
      let that = this;
      let obj = {
        title: {
        text: '专业人数比率'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        show: false,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} W'
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: 6,
            color: 'green'
        }, {
            gt: 6,
            lte: 8,
            color: 'red'
        }, {
            gt: 8,
            lte: 14,
            color: 'green'
        }, {
            gt: 14,
            lte: 17,
            color: 'red'
        }, {
            gt: 17,
            color: 'green'
        }]
    },
    series: [
        {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
                data: [ [{
                    name: '早高峰',
                    xAxis: '07:30'
                }, {
                    xAxis: '10:00'
                }], [{
                    name: '晚高峰',
                    xAxis: '17:30'
                }, {
                    xAxis: '21:15'
                }] ]
            }
        }
    ]
      }
      return obj;
    },
    type () {
      if (this.typePick == '数值') {
        return 'numeric';
      } else if (this.typePick == '百分比') {
        return 'percent';
      } else {
        return 'numeric';
      }
    }
  },
  methods: {
    setEchart () {
      let dom = this.$refs.mychart;
      this.myChart = echarts.init(document.getElementById('echart'));
      this.myChart.setOption(this.opt);
      // this.myChartTwo = this.$echart.init(document.getElementById('echartLine'))

      // this.myChart.setOption(this.numeric);
    },
    // chartChange () {

    //   this.myChart.setOption(this.opt);
    //   if (this.typePick == '百分比') {
    //     this.myChart.setOption(this.percent);
    //   }
    //   if (this.typePick == '数值') {
    //     this.myChart.setOption(this.numeric);
    //   }
    // }
  }
}
</script>
<style type="text/css" lang="scss">
.bottom{
	width:900px;
	height:600px;
}
</style>