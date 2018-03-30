<template>
    <div class="contanier">
        <fc-header></fc-header>
		<div class="content">
            <return-bar :title="title"></return-bar>
            <div class="sLeave-bottom">
                <el-tabs type="card"  v-model="tabCur" @tab-click="handleClick">
					  <el-tab-pane label="审核用车" name="auditCar"></el-tab-pane>
					  <el-tab-pane label="车型管理" name="carType"></el-tab-pane>
				</el-tabs>
				<router-view></router-view>                            
            </div>
		</div>
    </div>
</template>
<script type="text/javascript">
    import fcHeader from '../common/header.vue'
    import returnBar from '../common/returnBar.vue'
    import apis from '../../apis/transport.js'
    import util from '../../common/js/util.js'
    export default {
        data () {
            return {
                title:'审核用车',
                tabCur: 'auditCar'
            }
        },
        components:{
            fcHeader,
            returnBar
        },
        methods:{
           	handleClick (tab,event) {
				var name = tab.name;
				this.$router.push(name)
			}
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../common/css/common.scss';
    .box{
	  	display:flex;
		align-items: center;
    }
</style>