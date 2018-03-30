<template>
  <div class="stufund">
    <fc-header></fc-header>
    <div class="container">
        <!-- <div class="stufund-hd">
            <h5>学生资助管理(学生)</h5>
            <div class="back clearfix" @click="returnBtn">
                <span>返回</span>
                <i></i>
            </div>
        </div> -->
        <return-bar :title="title"></return-bar>
        <div class="stufund-bd">
            <el-tabs type="border-card">
                <el-tab-pane label="助学金">
                    <st-aid></st-aid>
                </el-tab-pane>
                <!-- <el-tab-pane label="奖学金">
                    <st-schlarship></st-schlarship>
                </el-tab-pane> -->
                <el-tab-pane label="免学费">
                    <st-tuition></st-tuition>
                </el-tab-pane>
            </el-tabs> 
        </div>
    </div>   
  </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    // 助学金
    import stAid from './staid.vue'
    // 奖学金
    // import stSchlarship from './stschlarship.vue'
    // 免学费
    import stTuition from './sttuition.vue'

    import returnBar from '../common/returnBar.vue'
    import api from '../../apis/fund.js'

    export default {
		components:{
            fcHeader,
            // 助学金
            stAid,
            // 奖学金
            // stSchlarship,
            // 免学费
            stTuition,
            returnBar
        },
        methods:{
            returnBtn () {
				this.$router.push('/newStudent')
			}
        },
        data () {
            return {
                title:'学生资助管理(学生)'
            }
        }
	}
</script>
<style scoped lang="scss">     
    .container{
        width:1200px;
        margin:0 auto;
        position: relative;
        .stufund-hd{
            height:50px;
            line-height:50px;
            background:#fff;
            padding-left:24px;
            padding-right:16px;
            border-radius:5px;
            margin-top:12px;
            margin-bottom:16px;
            h5{
                color:#208af5;
                font-size:16px;
                border-bottom:2px solid #208af5;
                float:left;
                font-weight:bold;
            }
            .back{
                float: right;
                cursor: pointer;
                overflow:hidden;
                span{
                    float:left;
                }
                i{
                    width:9px;
                    height: 15px;
                    float:left;
                    margin-top:18px;
                    margin-left:6px;
                    background:url("../../assets/img/overtime/arrow-right.png") 0 0 no-repeat;
                }
            }
        }
        .stufund-bd{
            background:#fff;
            // padding-left:24px;
            // padding-right:16px;
            border-radius:5px;
            margin-top:16px;
            min-height: 200px;
            .el-tabs--border-card{
                border:none;
                box-shadow:none;
                -webkit-box-shadow:none;
            }
        }
    }
</style>

