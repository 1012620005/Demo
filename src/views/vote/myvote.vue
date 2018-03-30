<template>
	<div class="contanier">
		<fc-header></fc-header>
		<div class="content">
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
			    <el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	  	  <span class="label">校区</span>
 						  <el-select v-model="formInline.campus"  placeholder="校区" class="select_width" @change="findCampusList">
                             <el-option v-for="item in campusList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                          </el-select>
						<el-input placeholder="请输入投票主题" icon="search" class="label_time" v-model="formInline.keyword" @click="changeInput">
						</el-input> 				  	   	  
				</el-form>	
				<el-table
							    :data="tableData"
							    style="margin: 0 16px 0 24px;width:1160px;">
							    <el-table-column
							      type="index"
							      label="序号" width="80">
							    </el-table-column>
							    <el-table-column
							      prop="campus_name"
							      label="校区"  show-overflow-tooltip>
							    </el-table-column>
							    <el-table-column
							      prop="vote_subject"
							      label="投票主题" show-overflow-tooltip >
							    </el-table-column>
							    <el-table-column
							      prop="start_time"
							      label="开始时间" show-overflow-tooltip >
							    </el-table-column>								
							    <el-table-column
							      prop="end_time"
							      label="结束时间" show-overflow-tooltip >
							    </el-table-column>
							    <el-table-column
							      label="操作">
							      <template slot-scope="scope">
									<div class="box">
										<div v-if="scope.row.status == '未投票'" @click="editorDialog(scope.row)">
											<span class="imgScript shenhe"></span>
										    <span>未投票</span>
											<!-- <span class="btns editor"  style="cursor:pointer"></span> -->
											
										</div>
										<div v-else-if="scope.row.status == '已投票'">
											<span class="imgScript success"></span>
											<span>已投票</span>
											<!-- <span class="btns editor" @click="editorDialog(scope.row.id)" style="cursor:pointer" v-show="btnDisable(scope.row.createTime)"></span> -->
										</div>
									</div>
							      </template>
							    </el-table-column>				    			    			    
				</el-table>
				<div class="con_left_tab_con_page">
					<el-pagination
						@current-change="handleCurrentChange"
						:current-page.sync="formInline.currentPage"
						:page-size="10"
						layout="prev, pager, next, jumper"
						:total="formInline.count">
					</el-pagination>
			   </div>							
			</div>
		</div>
		<!--编辑-->
		<el-dialog title="查看投票" :visible.sync="seeForm.dialogFormVisible" class="dialogImg"  size="tiny" @close="closeSeeForm">
		  <el-form :model="seeForm" class="wrapper_radio">
		    <el-form-item label="校区">
		        <span>{{ seeForm.regionName }}</span>
		    </el-form-item>
		    <el-form-item label="通知成员">
				<span>{{ membersArr[seeForm.departName]}}</span>
		    </el-form-item>	
		    <el-form-item label="开始时间" class="el-editor">
				<span>{{ seeForm.startTime }}</span>
		    </el-form-item>			
		    <el-form-item label="结束时间" class="el-editor">
				<span>{{ seeForm.endTime }}</span>
		    </el-form-item>
		    <el-form-item label="投票主题:" class="el-editor">
		    		
				<span>{{ seeForm.voteTheme}}</span>
		    </el-form-item>
			<div v-for="(item, index) in seeForm.voteOption" class="seeItem">
				<el-radio class="radio" v-model="seeForm.radio" :label="item.id"></el-radio><span>{{ letters[index]+':'}}</span> <span>{{ item.optionName }}</span>
			</div>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="confirmForm">确 认</el-button>
		  </div>
		</el-dialog>		
	</div>
</template>
<script type="text/javascript">
 	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import apis from '../../apis/voteList.js'
	import commonApis from '../../apis/common.js'
	export default{
		data () {
			return {
				title:'我的投票',
				formInline:{
					campus: '',
					keyword:'',
					currentPage:1,
					count:1
				},
				campusList:[],
				tableData:[],
				seeForm:{
					id: '',
					departName:'',
					campusDepart:'',
					regionName:'',
					startTime:'',
					endTime:'',
					voteOption:[],
					voteTheme:'',
					radio: '',
					dialogFormVisible:false					
				},
				membersArr:['','全体师生','全体教职工','全体学生'],
				letters:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O']
			}
		},
		components:{
			fcHeader,
			returnBar
		},
		methods:{
			editorDialog (obj) {
				var _this = this
				var formData = new FormData();
				this.seeForm.id = obj.id
				formData.append('vid',obj.id)
				apis.editorMyVoted(formData).then(res =>{
					if(res) {
						var data = res.data.data
					    _this.seeForm.regionName = data.voteinfo.campusName
						_this.seeForm.departName = data.voteinfo.receiverType
						_this.seeForm.startTime = data.voteinfo.startTime
						_this.seeForm.endTime = data.voteinfo.endTime
						_this.seeForm.voteTheme = data.voteinfo.voteSubject
						_this.seeForm.voteOption = data.options
						_this.seeForm.dialogFormVisible = true
					}
				})
				this.seeForm.dialogFormVisible = true
			},
			handleCurrentChange (val) {
				this.getList(val)
			},
			getCampus () {
				var _this = this
				apis.getCampusList().then(res =>{
					if(res) {
						var data = res.data.data
						_this.campusList = data
					}
				})
			},
			closeSeeForm () {

			},
			confirmForm () {
				var _this = this
				if(this.seeForm.radio) {
					// 获取选项的姓名
					var obj = this.seeForm.voteOption.find(function(v,i,arr){
						return v.id == _this.seeForm.radio
					})
					var formData = new FormData()
					formData.append('vid',this.seeForm.id)
					formData.append('optionId',this.seeForm.radio)
					formData.append('optionName',obj.optionName)
					apis.editorVoteRaios(formData).then(res =>{
						if(res) {
							_this.$message({
								type:'success',
								message: '投票成功'
							})
							_this.seeForm.dialogFormVisible = false
							_this.seeForm.id = ''
							_this.seeForm.departName = ''
							_this.seeForm.campusDepart = ''
							_this.seeForm.regionName = ''
							_this.seeForm.startTime = ''
							_this.seeForm.endTime = ''
							_this.seeForm.voteOption = []
							_this.seeForm.voteTheme = ''
							_this.seeForm.radio = ''
							_this.getList()
						}
					})
				} else {
					this.$message({
						type:'error',
						message: '请选择要投票的选项'
					})
				}
			},
			getList (pageNum,campus,keyword) {
				pageNum = pageNum ? pageNum : '1'
				campus = campus ? campus : ''
				keyword = keyword ? keyword : ''
				var _this = this;
				var formData = new FormData()
				formData.append('pageNum',pageNum)
				formData.append('campusId',campus)
				formData.append('voteSubject',keyword)
				apis.getUserVoteList(formData).then(res =>{
					if(res) {
						var data = res.data.data
						_this.tableData = data.list
						_this.formInline.count = data.totalSize
					}
				})
			},
			findCampusList (val) {
				this.getList(this.formInline.currentPage,val,this.formInline.keyword)
			},
			changeInput (val) {
				this.getList(this.formInline.currentPage,this.formInline.campus,val)
			},
			btnDisable (time) {
				var date = new Date()
				var dayTime = date.getTime()
				var times = new Date(time).getTime()
				if(times > dayTime) {
					return true
				} else {
					return false
				}
			}
		},
		// computed:{
		// 	btnDisable (time) {
		// 		var date = new Date()
		// 		var dayTime = date.getTime()
		// 		var times = new Date(time).getTime()
		// 		if(times > dayTime) {
		// 			return false
		// 		} else {
		// 			return true
		// 		}
		// 	}
		// },
		mounted () {
			this.getCampus()
			this.getList()
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
   @import '../../common/css/common.scss';
	.box{
		display:flex;
		align-items:center;
	}
	.label{
		padding-right:10px;
		padding-left:5px;
		color:#333;
	}
	.label_time{
		padding-left:10px;
	}
	.demo-form-inline{
		line-height: 50px;
	}
	.seeItem{
		padding:5px 0;
	}
</style>