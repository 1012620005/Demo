<template>
	<div class="contanier">
		<fc-header></fc-header>
		<div class="content">
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
			    <el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	  	  <div  class="btnS" @click="absence" style="cursor:pointer"><span class="btn qingjia"></span>创建投票</div>
				  	  	  <span class="label">校区</span>
 						  <el-select v-model="formInline.campus"  clearable placeholder="校区" class="select_width" @change="findCampusList">
                             <el-option v-for="item in campusList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                          </el-select>				  	  	  
				  	  	 <span class="label">状态</span>
				          <el-select v-model="formInline.voteStatus" clearable placeholder="审核状态" class="select_width" @change="findStatusList">
                              <el-option label="未发布" value= "1" ></el-option>
                              <el-option label="已发布" value="2"></el-option>
                              <el-option label="已结束" value="3"></el-option>
                         </el-select>
						<el-input placeholder="请输入投票主题" icon="search" v-model="formInline.keyword" class="label_time" @blur="changeInput">
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
							      prop="campusName"
							      label="校区"  show-overflow-tooltip>
							    </el-table-column>
							    <el-table-column
							      prop="voteSubject"
							      label="投票主题" show-overflow-tooltip >
							    </el-table-column>
							    <el-table-column
							      prop="startTime"
							      label="开始时间" show-overflow-tooltip >
							    </el-table-column>								
							    <el-table-column
							      prop="endTime"
							      label="结束时间" show-overflow-tooltip >
							    </el-table-column>
							    <el-table-column
							      label="操作">
							      <template slot-scope="scope">
									<div class="box">
										<div v-if="scope.row.status == 1">
										    <span style="color:#208af5" class="cursor" @click="publicVote(scope.row)">未发布</span>
											
											<span class="btns editor" @click="editorDialog(scope.row.id)" style="cursor:pointer"></span>
											<span class="btns delete" @click="deleteDialog(scope.row.id)" style="cursor:pointer"></span>
										</div>
										<div v-else-if="scope.row.status == 2">
											<span style="color:#91c604">已发布</span>
											<span class="imgScript seeBtn cursor" @click="seeDetial(scope.row.id)"></span>
								            <span class="result cursor" @click="seeResultFuc(scope.row)"></span>
										</div>
										<div v-else-if="scope.row.status == 3">
											<span style="color:#ff8b00">已结束</span>
											<span class="imgScript seeBtn cursor" @click="seeDetial(scope.row.id)"></span>
											<span class="result cursor" @click="seeResultFuc(scope.row)"></span>
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
		<!--编辑或添加-->
		<el-dialog :title="form.title" :visible.sync="form.dialogFormVisible" size="tiny" class="dialogImg" @close="closeForm('form')">
		  <el-form :model="form"  ref="form" :rules="formRules">
		    <el-form-item label="校区" prop="campus">
		      <el-select clearable v-model="form.campus" placeholder="请选择校区" @change="findCampusName">
		        <el-option v-for="t in campusList" :label="t.name" :value="t.id" :key="t.id">{{t.name}}</el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="通知成员" prop="campusDepart">
		      <!-- <el-select  clearable v-model="form.campusDepart" placeholder="请选择校区" @change="findCampusDepart">
		        <el-option v-for="t in members" :label="t.label" :value="t.value" :key="t.value">{{t.label}}</el-option>
		      </el-select> -->
			  <el-select  clearable v-model="form.campusDepart" placeholder="请选择通知成员" @change="findCampusDepart">
		          <el-option v-for="t in membersList" :label="t.label" :value="t.value" :key="t.value">{{t.label}}</el-option>
		      </el-select>
		    </el-form-item>	
		    <el-form-item label="开始时间" class="el-editor" prop="startTime">
		     <el-date-picker v-model="form.startTime" type="date"placeholder="选择结束时间"class="label_time">
	         </el-date-picker>
		    </el-form-item>			
		    <el-form-item label="结束时间" class="el-editor" prop="endTime">
		     <el-date-picker v-model="form.endTime" type="date"placeholder="选择结束时间"class="label_time">
	         </el-date-picker>
		    </el-form-item>
		    <el-form-item label="投票主题:" prop="voteTheme" class="el-editor" >
		    		<div class="vacateReason">
		    			<el-input type="textarea" resize="none" v-model="form.voteTheme" :rows="3"></el-input>
		    		</div>
		    </el-form-item>
			<div v-for="(item, index) in number" :key="index">
				<el-form-item :label="letters[index]" :prop="'voteOption[' + index + ']'" :rules="{required: true, message: '请输入选项', trigger: 'blur'}"class="el-editor" >
		    		<div class="vacateReason">
		    			<el-input  v-model="form.voteOption[index]" icon="close" @click="handleIconClick(index)"></el-input>
		    		</div>
		        </el-form-item>
			</div>
			<div class="addBtn" @click="addOption">添加选项</div>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
		  </div>
		</el-dialog>		
		<!--查看详情-->
		<el-dialog title="查看投票" :visible.sync="seeForm.dialogFormVisible" size="tiny" class="dialogImg" @close="closeSeeForm">
		  <el-form :model="seeForm">
		    <el-form-item label="校区">
		        <span>{{ seeForm.regionName }}</span>
		    </el-form-item>
		    <el-form-item label="通知成员">
				<span>{{ membersArr[seeForm.departName] }}</span>
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
			<div v-for="(item, index) in seeForm.voteOption">
				<span>{{ letters[index]+':'}}</span> <span>{{ item.optionName }}</span>
			</div>
		  </el-form>
		</el-dialog>		
		<!--查看结果-->
			<el-dialog title="结果统计" :visible.sync="seeResult.dialogFormVisible" size="tiny" class="dialogImg" @close="closeSeeResult" >
				<p class="voteTheme">{{ seeResult.voteTheme }}</p>
				<ul class="votePaggress">
					<li class="voteItem" v-for="item in seeResult.voteOption">
						<p class="voteCount"><span>{{ item.optionName }}</span><span>{{ item.userNum}}</span></p>
						<el-progress :text-inside="true" :stroke-width="18" :percentage="(item.ratio)*100" type="line"></el-progress>
					</li>
				</ul>
				<p class="voteTheme" style="margin-top:15px;margin-bottom:10px;">明细表</p>
					<el-table
									:data="seeResult.tableData">
									<el-table-column
									type="index"
									label="序号" width="80">
									</el-table-column>
									<el-table-column
									prop="voterName"
									label="姓名"  show-overflow-tooltip>
									</el-table-column>
									<el-table-column
									prop="optionName"
									label="投票选项" show-overflow-tooltip >
									</el-table-column>
					</el-table>			
			</el-dialog>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import apis from '../../apis/voteList.js'
	import commonApis from '../../apis/common.js'
	import dictApi from '../../apis/dict.js'
	import util from '../../common/js/util.js'
	export default {
		data () {
			return {
				title: '投票管理',
				formInline:{
					voteStatus: '',
					campus: '',
					keyword: '',
					currentPage: 1,
					count: 12
				},
				campusList:[],
				members:[],
				membersList:[{value:'1',label:'全体师生'},{value:'2',label:'全体教职工'},{value:'3',label:'全体学生'}],
				tableData:[],
				formRules:{
					campus:[
						{ required: true, message: '请选择校区', trigger: 'change' }
					],
					campusDepart:[
						{ required: true, message: '请选择要下发的人员', trigger: 'change' }
					],
					startTime:[
						{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					],
					endTime:[
						{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					],					
					voteTheme:[{
						 required: true, message: '请输入投票的主题', trigger: 'change'
					}],
					voteOption:[]
				},
				form:{
					id: '',
					title:'',
					campus: '',
					departName:'',
					campusDepart:'',
					regionName:'',
					startTime:'',
					endTime:'',
					voteOption:[],
					voteTheme:'',
					dialogFormVisible:false
				},
				seeForm:{
					id: '',
					title:'',
					campus: '',
					departName:'',
					campusDepart:'',
					regionName:'',
					startTime:'',
					endTime:'',
					voteOption:[],
					voteTheme:'',
					dialogFormVisible:false					
				},
				number: 1,
				letters:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'],
				membersArr:['','全体师生','全体教职工','全体学生'],
				seeResult: {
					id:'',
					voteTheme: '',
					voteOption:[],
					tableData:[],
					dialogFormVisible:false	
				}
			}
		},
		components:{
			fcHeader,
			returnBar
		},
		methods:{
			absence () {
				this.form.title = '新增投票'
				this.form.dialogFormVisible = true
			},
			handleCurrentChange (val) {
				this.formInline.currentPage = val
				this.getVoteList(val)
			},
			findCampusList (val) {
				this.getVoteList(this.formInline.currentPage,val,this.formInline.voteStatus,this.formInline.keyword)
			},
			findStatusList (val) {
				this.getVoteList(this.formInline.currentPage,this.formInline.campus,val,this.formInline.keyword)	
			},
			changeInput (val) {
				this.getVoteList(this.formInline.currentPage,this.formInline.campus,this.formInline.voteStatus,val)
			},
			publicVote (obj) {
				var vid = obj.id
				var formData = new FormData()
				var _this = this
				formData.append('vid',vid)
				apis.publishVote(formData).then(res =>{
					if(res) {
						_this.$message({
							type:'success',
							message:'发布成功'
						})
						_this.getVoteList()
					   formData.delete('vid')
					}
				})
			},
			seeDetial (id) {
				var _this = this
				var formData = new FormData()
				formData.append('vid',id)
				apis.getSingleMsg(formData).then(res =>{
					if(res) {
						var data = res.data.data
						_this.seeForm.id = data.id
						_this.seeForm.departName = data.voteinfo.receiverType
						_this.seeForm.regionName = data.voteinfo.campusName
						_this.seeForm.startTime = data.voteinfo.startTime
						_this.seeForm.endTime = data.voteinfo.endTime
						_this.seeForm.voteOption = data.options
						_this.seeForm.voteTheme = data.voteinfo.voteSubject
						_this.seeForm.dialogFormVisible = true
					}
				})
				_this.seeForm.dialogFormVisible = true
			},
			closeSeeForm () {
			   this.seeForm.id = ''
			   this.seeForm.title = ''
			   this.seeForm.departName = ''
			   this.seeForm.regionName = ''
			   this.seeForm.loadTime = ''
			   this.seeForm.voteOption = []
			   this.seeForm.voteTheme = ''
			   this.seeForm.dialogFormVisible = false
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
			findCampusName (value) {
				this.form.regionName = this.campusList.find(function (obj) {
				     return  obj.id == value ? obj.name : ''
				})				
			},
			getNumbers () {
				let params = {type:'msg_ut'};
				dictApi.apiGetDictMapList(params).then(r=>{
					if(r) {
						this.members = r.data.data;
					}
				});
			},
			findCampusDepart (value) {
				this.form.departName = this.membersList.find(function (obj) {
				     return  obj.value == value ? obj.value : ''
				})
			},
			getVoteList (pageNum,campus,status,keyWord) {
				pageNum = pageNum ? pageNum :'1';
				campus = campus ? campus : '';
				status = status ? status : ''
				keyWord = keyWord ? keyWord : ''
				var formData = new FormData()
				formData.append('pageNum',pageNum)
				formData.append('campusId',campus)
				formData.append('status',status)
				formData.append('voteSubject',keyWord)
				apis.getVoteList(formData).then(res =>{
					if(res) {
						var data = res.data.data
						this.tableData = data.list
						this.formInline.count = data.totalSize
						formData.delete('pageNum')
						formData.delete('campusId')
						formData.delete('status')
						formData.delete('voteSubject')
					}
				})
			},
			seeResultFuc (obj) {
				var _this = this
				var vid = obj.id
				var formData = new FormData()
				formData.append('vid',vid)
				apis.getResult(formData).then(res =>{
					if (res)  {
						var data = res.data.data
						console.log(data)
						_this.seeResult.tableData = data.detail
						_this.seeResult.voteOption = data.userNumAndRatio
						_this.seeResult.voteTheme = data.voteSubject
						_this.seeResult.dialogFormVisible = true
					}
				})

			},
			closeSeeResult () {
				this.seeResult.dialogFormVisible = false
			},
			editorDialog (id) {
				this.number = ''
				this.form.voteOption = []
				var _this = this
				this.form.id = id
				var formData = new FormData()
				formData.append('vid',id)
				apis.getSingleMsg(formData).then(res =>{
					if(res) {
						var data = res.data.data
						_this.form.title = '编辑投票'
						_this.form.campusDepart = data.voteinfo.receiverType
						_this.form.campus = data.voteinfo.campusId
						_this.form.startTime = new Date(data.voteinfo.startTime)
						_this.form.endTime = new Date(data.voteinfo.endTime)
						_this.form.voteTheme = data.voteinfo.voteSubject
						_this.number = data.options.length
						console.log(_this.number)
						var options = data.options
						for(var i = 0, len = options.length; i < len; i++) {
							_this.form.voteOption.push(options[i].optionName)
						}
						console.log(_this.form.voteOption)
						_this.form.dialogFormVisible = true
					}
				})				
			},
			deleteDialog (id) {
				var _this = this
				this.$confirm('确认删除吗？','提示').then(() =>{
					apis.delVote({vid:id}).then(res =>{
						if(res) {
							_this.$message({
								type:'success',
								message: '删除成功'
							})
							_this.getVoteList()
						}
					})
				}).catch(() =>{

				})
			},
			submitForm(form){
				var _this = this
				this.$refs[form].validate((valid) => {
					if(valid) {
						var formData = new FormData()
						formData.append('campusId',this.form.campus)
						if(!this.form.regionName){
							this.findCampusName(this.form.campus)
						}
						formData.append('campusName',this.form.regionName.name)
						formData.append("receiverType",this.form.campusDepart)
						formData.append('receiverName',this.form.departName.label)
						formData.append('startTime',util.formatDate.format(this.form.startTime, 'yyyy-MM-dd'))
						formData.append('endTime',util.formatDate.format(this.form.endTime, 'yyyy-MM-dd'))
						formData.append("voteSubject",this.form.voteTheme)	
						for(let i = 0, len = this.form.voteOption.length; i < len; i++) {
							formData.append('option_' + (i + 1),this.form.voteOption[i])
						}
						console.log(_this.form.id)
						if(_this.form.id) {
							// 编辑
							formData.append('vid',this.form.id)
							apis.editorVote(formData).then(res =>{
								if(res) {
									_this.$message({
										type:'success',
										message: '修改成功'
									})
									_this.form.campus = ''
									_this.form.regionName = ''
									_this.form.campusDepart = ''
									_this.form.departName = ''
									_this.form.loadTime = ''
									_this.form.voteTheme = ''
									_this.form.voteOption = ['']	
									_this.form.dialogFormVisible = false
									_this.getVoteList()									
								}
							})
						} else {
							// 新增
							apis.addVote(formData).then(res =>{
								if(res) {
									_this.$message({
										type:'success',
										message: '添加成功'
									})
								}
								_this.form.campus = ''
								_this.form.regionName = ''
								_this.form.campusDepart = ''
								_this.form.departName = ''
								_this.form.loadTime = ''
								_this.form.voteTheme = ''
								_this.form.voteOption = ['']	
								_this.form.dialogFormVisible = false
								_this.getVoteList()
								
							})
						}
						
					}
				})
			},
			closeForm (form) {
				this.$refs[form].resetFields();
				this.form.id = ''
				this.form.campus = ''
				this.form.regionName = ''
				this.form.campusDepart = ''
				this.form.departName = ''
				this.form.loadTime = ''
				this.form.voteTheme = ''
				this.form.voteOption = ['']	
				this.number = ''
				console.log(this.number)
			},
			handleIconClick (index) {
				 if(this.number>=2){
                    this.number=this.number-1;
                }else{
                    return false
                }
				this.form.voteOption.splice(index,1)
				
			},
			addOption () {
				this.form.voteOption.push('');
				this.number += 1;
			}
		},
		mounted () {
			this.getCampus()
			this.getVoteList()
			this.getNumbers()
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
	.result{
		display:inline-block;
		width:16px;
		height:16px;
		background:url(../../assets/img/connet/voteResult.png) no-repeat left center;

	}
	.addBtn{
		color:#f1c92c;
		font-size:14px;
		background:url(../../assets/img/connet/addVoteOption.png) no-repeat left center;
		background-size:16px 16px;
		padding-left:26px;
	}
	.voteTheme{
		color:#333;
		font-size:14px;
	}
	.voteItem{
		padding-top:26px;
		width:60%;
	}
	.voteCount{
		font-size:12px;
		color:#333;
		display: flex;
		justify-content:space-between;
		margin-bottom:5px;
	}
</style>