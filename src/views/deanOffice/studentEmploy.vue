<template>
	<div>
		<el-form :inline="true" v-model="formInline" class="demo-form-inline" style="margin-bottom:10px;">
			<div class="fontColor label_padding">校区:</div>
			<el-select v-model="formInline.campus" placeholder="校区" style="width:140px;" @change="findDepart">
                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.campusList"></el-option>
            </el-select>
			<div class="fontColor label_padding">院系:</div>
			<el-select v-model="formInline.depart" placeholder="院系" style="width:140px;" @change="findMajor" >
                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.departList"></el-option>
            </el-select>            
            <div class="fontColor label_padding">专业:</div>
			<el-select v-model="formInline.major" placeholder="专业" style="width:140px;" @change="findClazz">
               <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.majorList"></el-option>
            </el-select>
            <div class="fontColor label_padding">班级:</div>
			<el-select v-model="formInline.clazz" placeholder="班级" style="width:140px;">
                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.clazzList"></el-option>
            </el-select>
  			<el-input
				placeholder="请输入关键字"
				icon="search"
				v-model="formInline.keyword"
				style="width:193px;margin-left:10px;">
		    </el-input>         
		</el-form>	
		<div class="countDiv">学生就业统计 <span class="color">{{ size }}</span>人</div>
        <el-table
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号"width="80">
				    </el-table-column>
				    <el-table-column
				      prop="scoms"
				      label="校区" >
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="学生姓名">
				    </el-table-column>				    
				    <el-table-column
				      prop="dept"
				      label="院系" >
				    </el-table-column>
				    <el-table-column
				      prop="pro"
				      label="专业" >
				    </el-table-column>
				    <el-table-column
				      prop="classes"
				      label="班级" >
				    </el-table-column>				    
				    <el-table-column
				      prop="companys"
				      label="就业公司" >
				    </el-table-column>	
				    <el-table-column
				      label="就业状态">
				      <template slot-scope="scope">
				      		<span :class="[scope.row.status == 0? 'jiuye': 0]">已录用</span>
				      </template>
				    </el-table-column>	
				    <el-table-column prop="positionName" label="就业职位" show-overflow-tooltip>
				    </el-table-column>	 
				    <el-table-column  label="点评">
						<template slot-scope="scope">
							<el-button type="text" v-if="Number(scope.row.feedbackStatus)" @click="seeFeed(scope.row)">查看点评</el-button>
							<span class="colors" v-else>未点评</span>
						</template>
				    </el-table-column>				     
				  </el-table>
				  <div class="con_left_tab_con_page">
	                	<el-pagination
						      @current-change="handleCurrentChange"
						      :current-page="currentPage"
						      :page-size="10"
						      layout="prev, pager, next, jumper"
						      :total="size">
	    				</el-pagination>
	              </div>
	<!--查看点评-->
		<el-dialog title="查看点评" :visible.sync="showOrNoFeed" size="tiny">
		  <el-form :model="feedBackForm" v-for="(item,index) in feedBackForm.list" :key="index">
		    <el-form-item label="点评时间:">
		        {{ item.createTime }}
		    </el-form-item>
			<el-form-item label="点评内容:">
		        {{ item.feedback }}
		    </el-form-item>
		  </el-form>
		</el-dialog>					  				
	</div>
</template>
<script type="text/javascript">
    import apis from '../../apis/auditCompanyInfo.js'
		import commonApi from '../../apis/common.js'
		
	export default{
		data () {
			return {
				formInline:{
					keyword: '',
					campusList:[],
					campus: '',
					departList:[],
					depart:'',
					majorList:[],
					major:'',
					clazzList:[],
					clazz:'',
				},
				tableData:[],
				currentPage: 1,
				size:1,
				showOrNoFeed: false,
				feedBackForm:{
					list:[]
				},
				userId:''
			}
		},
		methods:{
			handleCurrentChange (curPage) {
				this.currentPage = curPage
				this.getStudentList(curPage)
			},
			getCampus () {
				let _this = this
				commonApi.getCampus().then(response =>{
					if(response.data.meta.code == 200) {
						var data =response.data.data
						_this.formInline.campusList = data
					}
				})
			},
			findDepart (value) {
				var _this  = this
				var data = {
					id: value,
					type: 1
				}
				this.getStudentList(this.currentPage,value)
				commonApi.getDepart(data).then(response =>{
					if(response) {
						var data = response.data.data
						_this.formInline.departList = data
					}
				})
			},
			findMajor (value) {
				var _this =  this
				var data = {
					id: value,
					type: 3
				}
				commonApi.getDepart(data).then(response =>{
					if(response) {
						var data =  response.data.data
						_this.formInline.majorList = data
					}
				})
			},
			findClazz (value) {
				var _this = this
				var data = {
					id: value,
					type: 4
				}
				commonApi.getDepart(data).then(response =>{
					if(response) {
						var data = response.data.data
						_this.formInline.clazzList = data
					}
				})
			},
			getStudentList (curPage,campus,depart,major,clazz) {
				curPage = curPage ? curPage : 1;
				campus = campus ? campus : '';
				depart = depart ? depart : '';
				major = major ? major : '';
				clazz = clazz ? clazz : '';
				var formdata = new FormData()
				var _this = this
				  formdata.append('pageNo',curPage)
				  formdata.append('scoms',campus)
				  formdata.append('dept',depart)
				  formdata.append('pro',major)
				  formdata.append('classes',clazz)
				  formdata.append('teacherId',this.userId)
				apis.queryStudentList(formdata).then(response =>{
					if(response) {
						var data = response.data.data
						_this.tableData = data.list
						_this.size = data.count
					}
					formdata.delete('pageNo')
					formdata.delete('scoms')
					formdata.delete('dept')
					formdata.delete('pro')
					formdata.delete('classes')
					formdata.delete('teacherId')					
				})
			},
			seeFeed (obj) {
				var _this = this
				var userId = obj.userId
				var formdata = new FormData()
				formdata.append('userId',userId)
				apis.seeFeedBack(formdata).then(res =>{
					if(res) {
						var data = res.data.data
						_this.feedBackForm.list = data 
						_this.showOrNoFeed = true
					}
				})
			}
		},
		mounted () {
			// 获取当前用户的id
			this.userId = this.$Cookies.get('userId')
			console.log(this.userId)
			// 获取校区的数据
			this.getCampus()
			// 获取学生就业的列表数据
			this.getStudentList()
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
	.jiuye{
		color:#91c604;
	}
    .countDiv{
         height:50px;
         line-height:50px;
         padding-left:39px;
    }
	.color{
		color:#ef0000;
		font-size:12px;
		font-weight:bold;
	}
    .colors{
		color:#a1a1a1;
	}
</style>