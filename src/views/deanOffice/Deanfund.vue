<template>
    <div class="deanfund clearfix">
        <fc-header></fc-header>
        <div class="container">
            <!-- 上 -->
            <div class="deanfund-title clearfix">
                <h5 class="deanfund-title-lt">资助管理(教务处)</h5>
                <div class="back clearfix" @click="returnBtn">
                    <span>返回</span>
                    <i></i>
                </div>
            </div>
            <!-- 内容 -->
            <div class="deanfund-content">
                <el-tabs type="border-card">
                    <el-tab-pane label="助学金">
                        <df-send></df-send>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="审核学生资助">
                        <df-audit></df-audit>
                    </el-tab-pane>
                    <el-tab-pane label="奖学金">
                        <df-schlship></df-schlship>
                    </el-tab-pane> -->
                    <el-tab-pane label="免学费">
                        <df-tuition></df-tuition>
                    </el-tab-pane>
                </el-tabs> 
            </div> 
        </div>
    </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    // 助学金
    import dfSend from './dfsend.vue'
    // 审核学生资助
    // import dfAudit from './dfaudit.vue'
    // 奖学金
    // import dfSchlship from './dfschlship.vue'
    // 免学费
    import dfTuition from './dftuition.vue'

    export default {
        components:{
            fcHeader,
            // 下发学生资助
            dfSend,
            // 审核学生资助
            // dfAudit,
            // 奖学金
            // dfSchlship,
            // 免学费
            dfTuition    
        },
        methods:{
            returnBtn () {
				this.$router.push('/newIndex')
			}
        },
    }
</script>
<style scoped lang="scss">
.container{
    width:1200px;
    margin:0 auto;
    position: relative;
    // 上
    .deanfund-title{
        height:50px;
        line-height:50px;
        background:#fff;
        padding-left:24px;
        padding-right:16px;
        border-radius:5px;
        margin-top:12px;
        margin-bottom:16px;
        .deanfund-title-lt{
            float:left;
            color:#208af5;
            font-size:16px;
            border-bottom:2px solid #208af5;
            font-weight:bold;
        }
        .back{
            float:right;
            cursor: pointer;
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
    // 下
    .deanfund-content{
        background:#fff;
        // padding-left:24px;
        // padding-right:16px;
        border-radius:5px;
        min-height: 200px;
        .el-tabs--border-card{
            border:none;
            box-shadow:none;
            -webkit-box-shadow:none;
        }
    }
}
</style>

