<template>
    <div class="coner">
        <div class="cont receter-box">
            <el-tabs type="border-card" v-model="type" @tab-click="handleClick">
                <el-tab-pane label="全部"  name="0">
                    <research-total :type="type" @handleCurrentChange="allpage" :page="a_all"  ></research-total>
                </el-tab-pane>
                <el-tab-pane label="我的教研" name="1">
                    <research-total :type="type"  @handleCurrentChange="mypage" :page="a_my" ></research-total>
                </el-tab-pane>
                <el-tab-pane label="参与教研" name="2">
                    <research-total :type="type"  @handleCurrentChange="otherpage" :page="a_other" ></research-total>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script type="text/javascript">
import researchTotal from './researchTotal.vue'
import userApi from '../../../apis/userCenter.js'
import api from '../../../apis/researchCenter/research.js'

let id=1000;
export default {
	data() {
      return {
		type: '0',
		a_all: {
			list:[],
			pageNo:1,
			pageSize:12,
			count:0,
		},
		a_my: {
			list:[],
			pageNo:1,
			pageSize:12,
			count:0,
		},
		a_other: {
			list:[],
			pageNo:1,
			pageSize:12,
			count:0,
		},
      }
	},
	mounted () {
		this.paging();
	},
	methods: {
		router(url){
			this.$router.push("newIndex")
			// this.$router.go("newIndex");
		},
		allpage(val){
			this.a_all.pageNo = val;
			this.paging();
		},
		mypage(val){
			this.a_my.pageNo = val;
			this.paging();
		},
		otherpage(val){
			this.a_other.pageNo = val;
			this.paging();
		},
		gp() {
			let params = {
				type : this.type,
				pageSize:12,
				pageNo:1,
			};
			if (this.type == '0') {
				params.pageNo = this.a_all.pageNo;
				params.pageSize = this.a_all.pageSize;
			} else if (this.type == '1') {
				params.pageNo = this.a_my.pageNo;
				params.pageSize = this.a_my.pageSize;
			} else if (this.type == '2') {
				params.pageNo = this.a_other.pageNo;
				params.pageSize = this.a_other.pageSize;
			}
			return params;
		},
		paging(){
			let params = this.gp();
			api.findActivity(params).then(response => {
				if(response.data.meta.code == 200){
					let page = response.data.data;
					if (this.type == '0') {
						this.a_all.list = page.list;
						this.a_all.pageNo = page.pageNo;
						this.a_all.count = page.count;
					} else if (this.type == '1') {
						this.a_my.list = page.list;
						this.a_my.pageNo = page.pageNo;
						this.a_my.count = page.count;
					} else if (this.type == '2') {
						this.a_other.list = page.list;
						this.a_other.pageNo = page.pageNo;
						this.a_other.count = page.count;
					}
				}
			});
		},
		//   头部标签
		handleClick(tab, event) {
			// this.type = tab;
			this.paging();
		}
    },
	components:{
		researchTotal
	}
}
</script>
<style lang="scss" scoped>
    .el-tabs--border-card{
        border: 0;
        box-shadow:none
    }
	.tabbox .tabtop .tableft .el-tabs__header .el-tabs__nav{
		height: 38px;
		line-height:38px;
    }
</style>
<style lang="scss">
    .receter-box{
        .el-tabs__header{
            margin-left:0;
        }
        
        .el-tabs--border-card>.el-tabs__content{
            padding:0;
        }
    }
</style>
