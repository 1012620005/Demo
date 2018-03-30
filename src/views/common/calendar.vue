<template>
	<div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header :current-date="currentDate" 
      :title-format="titleFormat"
      :first-day="firstDay"
      :month-names="monthNames"
      @change="emitChangeMonth">
    </fc-header>
    <!-- body display date day and events -->
    <fc-body :current-date="currentDate" :events="events" :month-names="monthNames" 
      :week-names="weekNames" :first-day="firstDay"
      @eventclick="emitEventClick" @dayclick="emitDayClick"
      @moreclick="emitMoreClick" ref="calendarBody">
    </fc-body>
  </div>
</template>
<script type="text/javascript">
  import langSets from './xiaoliCom/langSet.js'
	import fcBody from './xiaoliCom/body.vue'
	import fcHeader from './xiaoliCom/header.vue'
  export default {
    props : {
      events : { // events will be displayed on calendar
        type : [Array],
        default : function () {
           return []
        }
      },
      lang : {
        type : String,
        default : 'en'
      },
      firstDay : {
        type : Number | String,
        validator (val) {
          let res = parseInt(val)
          return res >= 0 && res <= 6
        },
        default : 0
      },
      titleFormat : {
        type : String,
        default () {
          return langSets[this.lang].titleFormat
        }
      },
      monthNames : {
        type : Array,
        default () {
          return langSets[this.lang].monthNames
        } 
      },
      weekNames : {
        type : Array,
        default () {
          let arr = langSets[this.lang].weekNames
          return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay))
        }
      }
    },
    data () {
      return {
        currentDate : new Date()
      }
    },
    methods : {
      emitChangeMonth (start, end, currentStart, current) {
        console.log('currentDate 2', this.currentDate)
        this.currentDate = current
        console.log('currentDate 3', this.currentDate)
        this.$emit('changeMonth', start, end, currentStart)
        this.$emit('emitChangeMonth', start, end, currentStart)
      },
      emitEventClick (event, jsEvent, pos) {
        this.$refs.calendarBody.emitEventClick()
        alert('子组件')
        this.$emit('eventClick', event, jsEvent, pos)
      },
      emitDayClick (day, jsEvent) {
        this.$emit('dayClick', day, jsEvent)
      },
      emitMoreClick (day, events, jsEvent) {
        this.$emit('moreClick', day, event, jsEvent)
      }
    },
    components : {
      fcBody,
      fcHeader 
    }
  }
</script>
<style type="text/css" lang="scss">
	.comp-full-calendar{
    // font-family: "elvetica neue", tahoma, "hiragino sans gb";
    width:315px;
	height:320px;
    background: #fff;
    border-radius:3px;
    ul,p{
      margin:0;
      padding:0;
      font-size: 14px;
    }

  }
</style>