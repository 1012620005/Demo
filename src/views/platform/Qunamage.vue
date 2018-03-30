<template>
  <div class="qunamage">
    <fc-header></fc-header>
    <div class="container">
        <!-- 上 -->
        <div class="quest-title clearfix">
            <h5>问卷调查管理</h5>
            <div class="back clearfix" @click="returnBtn">
                <span>返回</span>
                <i></i>
            </div>
        </div>
        <!-- 下 -->
        <div class="quest-content">
            <el-tabs type="border-card">
                <el-tab-pane label="发起问卷">
                    <quest-naire></quest-naire>
                </el-tab-pane>
                <el-tab-pane label="我参与问卷">
                    <answer-qu></answer-qu>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
  </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    // 问卷调查
    import questNaire from './questnaire.vue'
    // 回答问卷
    import answerQu from './answerqu.vue'
    export default {
		data () {
			return {
                or:false
			}
		},
		components:{
            fcHeader,
            questNaire,
            answerQu
        },
        methods:{
            returnBtn () {
				this.$router.push('/newIndex')
			}
        }
	}
</script>
<style scoped lang="scss">     
.container{
    width:1200px;
    margin:0 auto;
    position: relative;
    // 上
    .quest-title{
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
            float:right;
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
    // 下
    .quest-content{
        background:#fff;
        padding-left:8px;
        border-radius:5px;
        height:100%;
        padding-bottom:100px;
        .el-tabs--border-card{
            border:none;
            box-shadow: none;
        }
    }
}
</style>

