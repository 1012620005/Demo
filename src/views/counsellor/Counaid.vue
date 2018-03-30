<template>
  <div class="aid">
    <fc-header></fc-header>
    <div class="container">
        <div class="aid-hd">
            <h5>学生资助管理(辅导员)</h5>
            <div class="back clearfix" @click="returnBtn">
                <span>返回</span>
                <i></i>
            </div>
        </div>
        <div class="aid-bd">
            <el-tabs type="border-card">
                <el-tab-pane label="助学金">
                    <fund-mage></fund-mage>
                </el-tab-pane>
                <el-tab-pane label="免学费">
                    <austu-fund></austu-fund>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
  </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    import fundMage from './fundmage.vue'
    import austuFund from './austufund.vue'
    export default {
		data () {
			return {
                or:false
			}
		},
		components:{
            fcHeader,
            fundMage,
            austuFund
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
    .aid-hd{
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
    .aid-bd{
        background:#fff;
        padding-left: 8px;
        border-radius:5px;
        height:100%;
        padding-bottom:100px;
        .el-tabs--border-card{
            border:none;
            box-shadow: none;
            .el-tabs.el-tabs--border-card>.el-tabs__header{
                border-bottom:none;
                margin-left:24px;
                margin-right:16px;
                .el-tabs__nav{
                    .is-active{
                        border-top-color: #d1dbe5;
                        border-left-color:none;
                    }
                }
            }
            .el-tabs--border-card>.el-tabs__content{
                padding-left:24px;
            }
        }
    }
}
</style>
<style lang="scss">
    .aid-bd{
        .el-tabs__nav{
            z-index:0;
        }
    }
</style>