<template>
  <div class="overtime-manage">
    <fc-header></fc-header>
    <div class="container">
        <div class="otm-hd">
            <h5>工资管理</h5>
            <div class="back clearfix" @click="returnBtn">
                <span>返回</span>
                <i></i>
            </div>
        </div>
        <div class="otm-bd">
            <el-tabs type="border-card">
                <el-tab-pane label="教职工工资管理">
                    <staffw-mage></staffw-mage>
                </el-tab-pane>
                <el-tab-pane label="自定义工资项目">
                    <cusa-prog></cusa-prog>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
  </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    import staffwMage from './staffwmage.vue'
    import cusaProg from './cusaprog.vue'
    export default {
		data () {
			return {
                or:false
			}
		},
		components:{
            fcHeader,
            staffwMage,
            cusaProg
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
    .otm-hd{
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
        .aud{
            margin-left:20px;
            span{
                color:#ef0000;
            }
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
    .otm-bd{
        background:#fff;
        padding-left: 8px;
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

<style lang="scss">  
.otm-bd{
    .el-tabs__nav{
        z-index:0;
    }
}
</style>