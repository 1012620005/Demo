<template>
  <div class="full-calendar-body">
    <div class="weeks">
      <span class="week" v-for="week in weekNames">{{week}}</span>
    </div>
    <div class="dates" ref="dates">
      <div class="dates-bg">
        <div class="week-row" v-for="week in currentDates">
          <div class="day-cell" v-for="day in week"
            :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}">
            <p class="day-number">{{day.monthDay}}</p>
          </div>
        </div>
      </div>
      <!-- absolute so we can make dynamic td -->
      <div class="dates-events">
        <div class="events-week" v-for="week in currentDates">
          <div class="events-day" v-for="day in week" track-by="$index"
            :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}" @click="dayClick(day.date, $event)">
            <p class="day-number">{{day.monthDay}}</p>
            <div class="event-box">
              <p class="event-item" v-for="event in day.events" v-show="event.cellIndex <= eventLimit"
                 :class="[classNames(event.cssClass), {
                  'is-start'   : isStart(event.start, day.date),
                  'is-end'     : isEnd(event.end,day.date),
                  'is-opacity' : !event.isShow,
                  'today'      : day.isToday
                  }]">
                {{ day.monthDay }}
                <span class="events-text">{{ isBegin(event, day.date, day.weekDay) }}</span>
              </p>
              <p v-if="day.events.length > eventLimit"
                class="more-link" @click.stop="selectThisDay(day, $event)">
                + {{day.events[day.events.length -1].cellIndex - eventLimit}} more
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="notes">
        <p class="color">
          <span style="width:70px">今日提醒：</span><span><marquee loop="infinite" style="width:210px"><font  color=green>{{ tip }}</font></marquee></span>
        </p>
        <!-- <span class="color" id="note">{{ getToadyTitle(events) }}</span> -->
      </div>
      <slot name="body-card">

      </slot>

    </div>
  </div>
</template>
<script type="text/babel">
  import dateFunc from './dateFunc'
  import userApi from '../../../apis/userCenter.js'
  export default {
    props : {
      currentDate : {},
      events      : {},
      weekNames   : {
        type : Array,
        default : []
      },
      monthNames  : {},
      firstDay    : {},
     
    },
    created () {
      this.events.forEach((item, index) => {
        item._id = item.id || index
        item.end = item.end || item.start
      })
      userApi.findMyTody().then(r=>{
        let xl = r.data.data;
        if (xl && xl.length > 0) {
          for (let i = 0; i < xl.length; i ++) {
            if (this.tip) {
              this.tip = this.tip + " 下一条提醒：" + "《" + xl[i].content + "》";
            } else {
              this.tip = "《" + xl[i].content + "》";
            }
          };
          // console.log("提醒");
          // console.log(xl);
          // console.log(this.tip);
        }
      });
      console.log(this.events)
      // this.events = events
    },
    data () {
      return {
        // weekNames : DAY_NAMES,
        weekMask : [1,2,3,4,5,6,7],
        // events : [],
        isLismit : true,
        eventLimit : 1,
        showMore : false,
        morePos : {
          top: 0,
          left : 0
        },
        selectDay : {},
        tip:''
      }
    },
    watch : {
      weekNames (val) {
        console.log('watch weekNames', val)
      }
    },
    computed : {
      currentDates () {
        return this.getCalendar()
      }
    },
    methods : {
      isBegin (event, date, index) {
        let st = new Date(event.start)

        if (index == 0 || st.toDateString() == date.toDateString()) {
          return event.title
        }
        return '　'
      },
      moreTitle (date) {
        let dt = new Date(date)
        return this.weekNames[dt.getDay()] + ', ' + this.monthNames[dt.getMonth()] + dt.getDate()
      },
      classNames (cssClass) {
        if(!cssClass) return ''
        // string  
        if (typeof cssClass == 'string') return cssClass

        // Array
        if (Array.isArray(cssClass)) return cssClass.join(' ')
        
        // else
        return ''
      },
      getCalendar () {
        // calculate 2d-array of each month
        // first day of this month
        let now = new Date() // today
        let current = new Date(this.currentDate)

        let startDate = dateFunc.getStartDate(current) // 1st day of this month
        let curWeekDay = startDate.getDay()

        // begin date of this table may be some day of last month
        let diff = parseInt(this.firstDay) - curWeekDay
        diff = diff > 0 ? (diff - 7) : diff

        startDate.setDate(startDate.getDate() + diff)
        let calendar = []

        for(let perWeek = 0 ; perWeek < 6 ; perWeek++) {

          let week = []

          for(let perDay = 0 ; perDay < 7 ; perDay++) {
            week.push({
              monthDay : startDate.getDate(),
              isToday : now.toDateString() == startDate.toDateString(),
              isCurMonth : startDate.getMonth() == current.getMonth(),
              weekDay : perDay,
              date : new Date(startDate),
              events : this.slotEvents(startDate)
            })

            startDate.setDate(startDate.getDate() + 1)
            // if (startDate.toDateString() == endDate.toDateString()) {
            //   isFinal = true
            //   break
            // }
          }
          calendar.push(week)
          // if (isFinal) break
        }
        return calendar
      },
      slotEvents (date) {

        // find all events start from this date
        let cellIndexArr = []
        let thisDayEvents = this.events.filter(day => {
          let dt = new Date(day.start)
          let st = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
          let ed = day.end ? new Date(day.end) : st
         // console.log('slotEvt', st, ed, date)
         // console.log(date>=st && date<=ed)
          return date>=st && date<=ed
        })

        // sort by duration
        thisDayEvents.sort((a,b)=>{
          if(!a.cellIndex) return 1
          if (!b.cellIndex) return -1
          return a.cellIndex - b.cellIndex
        })

        // mark cellIndex and place holder
        for (let i = 0;i<thisDayEvents.length;i++) {
          thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1)
          thisDayEvents[i].isShow = true
          if (thisDayEvents[i].cellIndex == i+1 || i>2) continue
          thisDayEvents.splice(i,0,{
            title : 'holder',
            cellIndex : i+1,
            start : dateFunc.format(date,'yyyy-MM-dd'),
            end : dateFunc.format(date,'yyyy-MM-dd'),
            isShow : false
          })
        }
        return thisDayEvents
      },
      isStart (eventDate, date) {
        let st = new Date(eventDate)
        return st.toDateString() == date.toDateString()
      },
      isEnd (eventDate,date) {
        let ed = new Date(eventDate)
        return ed.toDateString() == date.toDateString()
      },
      selectThisDay (day, jsEvent) {
        this.selectDay = day
        this.showMore = true
        this.morePos = this.computePos(event.target)
        this.morePos.top -= 100
        let events = day.events.filter(item =>{
          return item.isShow == true
        })
        this.$emit('moreclick', day.date, events, jsEvent)
      },
      computePos (target) {
        let eventRect = target.getBoundingClientRect()
        let pageRect = this.$refs.dates.getBoundingClientRect()
        return {
          left : eventRect.left - pageRect.left,
          top  : eventRect.top + eventRect.height - pageRect.top
        }
      },
      dayClick(day, jsEvent) {
        this.$emit('dayclick', day, jsEvent)
      },
      eventClick(event, jsEvent) {
        if (!event.isShow) {
          return
        }
        jsEvent.stopPropagation()
        let pos = this.computePos(jsEvent.target)
        this.$emit('eventclick', event, jsEvent, pos)
      },
      
      getToadyTitle (events) {
          var now = new Date();
          var nowDate = now.getDate();
          var nowMonth = now.getMonth() + 1;
          console.log(nowMonth)
          for(var i = 0,len = events.length; i < len; i++ ){
            var eventDay = events[i].start;
            var eventMonth = new Date(eventDay).getMonth() + 1;
            var eventDate = new Date(eventDay).getDate();
            if (eventMonth === nowMonth && eventDate === nowDate) {
                return events[i].title
            } 
          }
      }
    }
  }
</script>
<style lang="scss">
.full-calendar-body{
  .weeks{
    display: flex;
    .week{
      width:45px;
      height:35px;
      text-align: center;
      line-height:35px;
    }
  }
  .dates {
    position:relative;
    .week-row{
      // width: 100%;
      // position:absolute;
      display: flex;
      .day-cell{
        width:45px;
        height:35px;
        text-align:center;
        line-height:35px;
        .day-number{
          // text-align: right;
        }
        &.today{
          background-color:#e3eefa;
          color:#208af5;
          border-radius:3px;
        }
        &.not-cur-month{
          .day-number{
            color:rgba(0,0,0,0.45);
          }
        }
      }
    }
    .dates-events{
      position:absolute;
      top:0;
      left:0;
      z-index:1;
      width: 100%;
      .events-week{
        display: flex;
        .events-day{
          cursor: pointer;
          width:45px;
          height:35px;
          overflow: hidden;
          text-overflow: ellipsis;
          .day-number{
            text-align: center;
            // padding:4px 5px 4px 4px;
            opacity: 0;
            height:0;
          }
          &.not-cur-month{
            .day-number{
              color:rgba(0,0,0,.24);
            }
          }
          .event-box{
            height:100%;
            text-align:center;
            line-height:35px;
            .event-item{
              height:35px;
              width:45px;
              font-size:12px;
              background-color:#e3eefa;
              color: #333;
              text-align:center;
              position:relative;
              &.is-start{
                //margin-left: 4px;
                // border-top-left-radius:4px;
                // border-bottom-left-radius:4px;
              }
              &.is-end{
                //margin-right: 4px;
                // border-top-right-radius:4px;
                // border-bottom-right-radius:4px;
              }
              &.is-opacity{
                opacity: 0;
              }
              &.today{
                color:#208af5;
              }
            }
            .more-link{
              cursor: pointer;
              // text-align: right;
              padding-left: 8px;
              padding-right: 2px;
              color: rgba(0,0,0,.38);
              font-size: 14px;
            }
          }
        }
      }
    }
    .more-events{
      position:absolute;
      width: 150px;
      z-index: 2;
      border:1px solid #eee;
      box-shadow: 0 2px 6px rgba(0,0,0,.15);
      .more-header{
        background-color:#eee;
        padding:5px;
        display: flex;
        align-items : center;
        font-size: 14px;
        .title{
          flex:1;
        }
        .close{
          margin-right: 2px;
          cursor: pointer;
          font-size: 16px;
        }
      }
      .more-body{
        height: 140px;
        overflow: hidden;
        .body-list{
          height: 120px;
          padding:5px;
          overflow: auto;
          background-color:#fff;
          .body-item{
            cursor: pointer;
            font-size:12px;
            background-color:#C7E6FD;
            margin-bottom:2px;
            color: rgba(0,0,0,.87);
            padding:0 0 0 4px;
            height: 18px;
            line-height: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
.events-text{
  height:0;
  opacity:0;
  width:0;
  position:absolute;
  left:0;
  top:0;
  z-index:-999999;
}
// 更多
    .notes{
      height:40px;
      line-height:40px;
      padding-left:15px;
      .color{
        color:#ef0000;
        font-size:14px;
        font-weight:bold;
        span{
          float:left;
        }
      }
    }

</style>
