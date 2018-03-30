<template>
    <div class="container">
        <div class="content receter-box">
            <el-tabs type="border-card" v-model="type" @tab-click="handleClick">
                <el-tab-pane label="我的备课" name="1">
                    <prepar-total :type="type"  @handleCurrentChange="mypage" :page="a_my" @paging="paging" :curTab="curTabSub"></prepar-total>
                </el-tab-pane>
                <el-tab-pane label="我的收藏" name="2">
                    <prepar-total :type="type"  @handleCurrentChange="myfavor" :page="a_favor" @paging="paging" :curTab="curTabSub"></prepar-total>
                </el-tab-pane>
                <el-tab-pane label="公共教案" name="3">
                    <prepar-total :type="type"  @handleCurrentChange="lesplan" :page="a_lesplan" @paging="paging" :curTab="curTabSub"></prepar-total>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script type="text/javascript">
import preparTotal from './preparTotal.vue'
import userApi from '../../../apis/userCenter.js'
import api from '../../../apis/researchCenter/research.js'

let id=1000;
export default {
	data() {
      return {
		type: '1',
		curTabSub:'',
		a_my: {
			list:[],
			pageNo:1,
			pageSize:12,
			count:0,
		},
		a_favor: {
			list:[],
			pageNo:1,
			pageSize:12,
			count:0,
		},
		a_lesplan: {
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
		},
		mypage(val){
			this.a_my.pageNo = val;
			this.paging();
		},
		myfavor(val){
			this.a_favor.pageNo = val;
			this.paging();
		},
		lesplan(val){
			this.a_lesplan.pageNo = val;
			this.paging();
		},
		gp() {
			let params = {
				pageSize:12,
				pageNo:1,
			};
			if (this.type == '1') {
				// params.publicflag = 0;
				params.pageNo = this.a_my.pageNo;
				params.pageSize = this.a_my.pageSize;
			} else if (this.type == '2') {
				params.collectiontype = 1;
				params.pageNo = this.a_favor.pageNo;
				params.pageSize = this.a_favor.pageSize;
			}else if(this.type == '3'){
				params.publicflag = 1;
				params.pageNo = this.a_lesplan.pageNo;
				params.pageSize = this.a_lesplan.pageSize;
			}
			return params;
		},
		paging(){
			let params = this.gp();
			if (this.type == '1') {
				// 我的备课列表
				this.curTabSub = "a"
				api.getMyLesList(params).then(r => {
					if(r){
						let page = r.data.data;
						this.a_my.list = page.list;
						this.a_my.pageNo = page.pageNo;
						this.a_my.count = page.count;
					}else{
						return false;
					}
				});
			}else if(this.type == '2'){
				// 我的收藏列表
				this.curTabSub = "b"
				api.getPrepAllList(params).then(r=>{
					if(r){
						let page = r.data.data;
						this.a_favor.list = page.list;
						this.a_favor.pageNo = page.pageNo;
						this.a_favor.count = page.count;
					}else{
						return false;
					}
				});
			}else{
				this.curTabSub = "c"
				// 公开教案
				api.getPubLesList(params).then(r=>{
					if(r){
						let page = r.data.data;
						this.a_lesplan.list = page.list;
						this.a_lesplan.pageNo = page.pageNo;
						this.a_lesplan.count = page.count;
					}else{
						return false;
					}
				});
			}
		},
		//   头部标签
		handleClick(tab, event) {
			this.paging();
		}
    },
	components:{
		preparTotal,
	},
}
</script>
<style lang="scss" scoped>
	.el-tabs--border-card{
        border: 0;
    }
	.receter-box{
        .el-tabs__header{
            margin-left:0;
        }
        .el-tabs__nav{
            height: 38px;
            line-height:38px;
        }
        .el-tabs--border-card>.el-tabs__content{
            padding:0;
        }
    }
</style>

