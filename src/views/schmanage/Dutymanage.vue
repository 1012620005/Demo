<template>
  <div class="overtime-manage">
    <fc-header></fc-header>
    <div class="container">
        <div class="otm-hd">
            <h5>值班管理</h5>
            <!-- <span class="aud" v-show="or">待审核：<span>6</span></span> -->
            <div class="back clearfix" @click="returnBtn">
                <span>返回</span>
                <i></i>
            </div>
        </div>
        <div class="otm-bd">
            <el-tabs type="border-card">
                <el-tab-pane label="发起值班">
                    <duty-list></duty-list>
                </el-tab-pane>
                <el-tab-pane label="值班记录">
                    <duty-case></duty-case>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
  </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    import dutyList from './dutylist.vue'
    import dutyCase from './dutycase.vue'
    export default {
		data () {
			return {
                // or:false
			}
        },
        methods:{
            returnBtn () {
				this.$router.push('/newIndex')
			}
        },
		components:{
            fcHeader,
            dutyList,
            dutyCase
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