<template>
	<div>
		<el-dialog title="审核流程详情" :visible.sync="form.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeDialog">
			<div class="wrapper_dialog">
				<el-table
			      :data="form.tableData"
			      style="width: 100%">
			      <el-table-column
			        prop="operatorName"
			        label="审核人员"
			        >
			      </el-table-column>
			      <el-table-column
			        label="审核状态"
					prop="statusAfteroperate"
			       >
			         <!-- <template slot-scope="scope">
			         		  <div v-if="scope.row.statusAfteroperate == '待审核'">
					               <span class="imgScript shenhe"></span>
					           	   待审核 	   
					           </div>
					           <div v-else-if="scope.row.statusAfteroperate == '未通过'">
					               <span class="imgScript nosussess"></span>
					           	   未通过
					           </div>
					           <div v-else-if="scope.row.statusAfteroperate == '已销假'">
					                <span class="imgScript chexiao"></span>
					           	   已撤销请假
					           </div>
					           <div v-else-if="scope.row.statusAfteroperate == '已通过'">
					                <span class="imgScript success"></span>
					           	   已通过
					           </div>
			         </template> -->
					
			      </el-table-column>
			      <el-table-column
			        prop="operatorTime"
			        label="审核时间" show-overflow-tooltip>
			      </el-table-column>
			    </el-table>	
			    <div class="xiaojia" v-show="form.vacateStatus == '5'"></div>			
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				tableData: []
			}
		},
		props:{
			form:{
				dialogFormVisible: Boolean,
				tableData:[],
				vacateStatus: ''
			}
		},
		methods:{
			closeDialog () {
				this.$emit('closeDialog')
			}
		}


	}
</script>
<style type="text/css" lang="scss">
	.wrapper_dialog{
		position:relative;
		.xiaojia{
			position:absolute;
			right:-12px;
			top:-30px;
			width:113px;
			height:112px;
			background:url(../../assets/img/connet/xiaojia.png) no-repeat;
		}
	}
</style>