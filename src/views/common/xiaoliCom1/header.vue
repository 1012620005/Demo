<template>
  <div class="full-calendar-header">
      <span class="left_img">校历</span>
      <div class="header-right">
        <span class="prev-month" @click.stop="goPrev"></span>
        <span class="title"></span>
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
  height:64px;
  color:#fff;
  background:#14c3c2;
  font-size:14px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0 17px 0 20px;
  border-top-left-radius:5px;
	border-top-right-radius:5px;
  .left_img{
      display:inline-block;
      padding-left:32px;
      background:url(../../../assets/img/connet/indexDate.png) no-repeat left center;
      background-size:23px 23px;
      font-size:18px;
      color:#fff;
      line-height:40px;
  }
  .header-right{
    line-height:40px;
    span.prev-month{
       display:inline-block;
       width:7px;
       height:11px;
       background:url(../../../assets/img/connet/left.png) no-repeat left center;
       cursor: pointer;

     }
     span.next-month{
       display:inline-block;
       width:7px;
       height:11px;
       background:url(../../../assets/img/connet/right.png) no-repeat left center;
       cursor: pointer;
     }
     .title{
        display:inline-block;
        width:60px;
     }
  }
  .header-center{
     flex:1;
  }
}
</style>
