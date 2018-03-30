<template>
  <div class="full-calendar-header">
    <div class="header-left">
       <span class="left_img"></span><span class="size">校历</span>
    </div>
    <div class="header-center">
      
    </div>
    <div class="header-right">
      <span class="prev-month" @click.stop="goPrev"></span>
      <span class="title">{{title}}</span>
      <span class="next-month" @click.stop="goNext"></span>
    </div>
  </div>
</template>
<script type="text/babel">
  import dateFunc from './dateFunc.js'

  export default {
    created () {
      this.dispatchEvent()
    },
    props : {
      currentDate : {},
      titleFormat : {},
      firstDay    : {},
      monthNames  : {}
    },
    data () {
      return {
        title      : '',
        leftArrow  : '<',
        rightArrow : '>',
        headDate : new Date()
      }
    },
    watch : {
      currentDate (val) {
        if (!val) return
        this.headDate = val
        console.log('currentDate', val)
        // this.headDate = JSON.parse(JSON.stringify(val))
      }
    },
    methods : {
      goPrev () {
        this.headDate = this.changeMonth(this.headDate, -1)
        this.dispatchEvent()
      },
      goNext () {
        this.headDate = this.changeMonth(this.headDate, 1)
        this.dispatchEvent()
      },
      changeMonth (date, num) {
        let dt = new Date(date)
        return new Date(dt.setMonth(dt.getMonth() + num))
      },
      dispatchEvent() {
        this.title = dateFunc.format(this.headDate, this.titleFormat, this.monthNames)
        let startDate = dateFunc.getStartDate(this.headDate)
        let curWeekDay = startDate.getDay()

        // 1st day of this monthView
        let diff = parseInt(this.firstDay) - curWeekDay
        if (diff) diff -= 7
        startDate.setDate(startDate.getDate() + diff) 

        // the month view is 6*7
        let endDate = dateFunc.changeDay(startDate, 41)

        // 1st day of current month
        let currentDate = dateFunc.getStartDate(this.headDate)

        this.$emit('change', 
          dateFunc.format(startDate, 'yyyy-MM-dd'),
          dateFunc.format(endDate, 'yyyy-MM-dd'),
          dateFunc.format(currentDate,'yyyy-MM-dd'),
          this.headDate
        )
      }
    }
  }
</script>
<style lang="scss" scoped>
.full-calendar-header{
  display: flex;
  display: -webkit-flex;
  align-items:center;
  height:40px;
  background:#dae9f8;
  padding:0 23px 0 27px;
  margin:0 auto;
  color:#208af5;
  font-size:14px;
  .header-left{
    width:20%;
    .left_img{
      display:inline-block;
      width:16px;
      height:16px;
      margin-right:5px;
      margin-top:8px;
      background:url(../../../assets/img/com/guangbo.png) no-repeat left top;
      background-size:cover;
    }
    .size{
      display:inline-block;
      font-size: 16px;
      line-height:40px;
    }
  }
  .header-right{
    width:50%;
    text-align:right;
    span.prev-month{
       display:inline-block;
       width:0;
       height:0;
       border:6px solid transparent;
       border-right-color: #208af5;
     }
     span.next-month{
       display:inline-block;
       width:0;
       height:0;
       border:6px solid transparent;
       border-left-color: #208af5;
     }
  }
  .header-center{
     flex:1;
  }
  

}
</style>
