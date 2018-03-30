<template>
	<div>
				 <el-table
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号" width="150">
				    </el-table-column>
				    <el-table-column
				      prop="ip"
				      label="注册ID" width="150">
				    </el-table-column>
				    <el-table-column
				      prop="companyName"
				      label="公司名称">
				    </el-table-column>				    
				    <el-table-column
				      prop="companyContacts"
				      label="联系人" show-overflow-tooltip width="150" >
				    </el-table-column>
				    <el-table-column
				      prop="companyPhone"
				      label="手机号" width="150">
				    </el-table-column>
				    <el-table-column
				      prop="companyEmail"
				      label="邮箱"  width="150">
				    </el-table-column>	
				    <el-table-column
				      label="操作"  min-width="200">
				       <template slot-scope="scope">
				       	   
				       	    	<div v-if="scope.row.companyStatus == 0" @click="seeDetial(scope.row,'0')" class="box">
				                 	<span class="imgScript shenhe"></span>
					           	   	待审核 
						        </div>
						        <div v-else-if="scope.row.companyStatus == 2" class="box">
						            <span class="imgScript nosussess"></span>
						           	未通过
						           	<span class="imgScript seeBtn" @click="seeDetial(scope.row,'2')"></span> 
						        </div>
						        <div v-else-if="scope.row.companyStatus == 1" class="box">
						            <span class="imgScript success"></span>
						           	已通过
						           	<span class="imgScript seeBtn" @click="seeDetial(scope.row,'1')"></span> 
						        </div>	           	           				           
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
        <!--审核页面-->
        <el-dialog title="" :visible.sync="auditForm.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeDialog">
			<div class="wrapper_dialog">
				<div class="dialog-content">
					<h4 class="companyTitle">{{ auditForm.companyName }}</h4>
					<p class="companywebsite">{{ auditForm.companyWebsite }}</p>
					<p class="companyDetial"><span >{{ auditForm.companyMarket == 0?'未上市': '已上市'}}</span><span class="padding">|</span><span>{{ auditForm.companyPeopleNumber}}</span><span class="padding">|</span><span>{{ auditForm.companyIndustry }}</span></p>
					<dl class="companyFlex">
						<dt>公司营业执照:</dt>
						<dd>
							<img :src="auditForm.companyLicense" style="width:89px;height:121px" v-if="auditForm.fileId">
						</dd>
					</dl>
					<dl class="companyFlex">
						<dt>公司联系人:</dt>
						<dd>{{ auditForm.companyContacts}}</dd>
					</dl>
					<dl class="companyFlex">
						<dt>联系人电话:</dt>
						<dd>{{ auditForm.companyPhone}}</dd>
					</dl>
					<dl class="companyFlex">
						<dt>公司邮箱:</dt>
						<dd>{{ auditForm.companyEmail}}</dd>
					</dl>
					<dl class="companyFlex">
						<dt>公司地址:</dt>
						<dd>{{ auditForm.companyAddress }}</dd>
					</dl>
					<dl v-show="auditForm.pass || auditForm.audit" class="companyFlex">
						<dt>原因:</dt>
						<dd>
							<el-input type="textarea" v-model="auditForm.reason" auto-complete="off" placeholder="原因" :rows="5" resize="none" v-show="auditForm.audit"></el-input>
							<div v-show="auditForm.pass && !auditForm.audit">{{ auditForm.reason }}</div>
						</dd>
					</dl>				
				</div>
			    <div slot="footer" class="dialog-footer" style="text-align:right" v-show="auditForm.audit">
					<el-button type="success" @click="pass('1')">通过</el-button>
					<el-button type="danger" @click="pass('2')">不通过</el-button>
				</div>	
			</div>
		</el-dialog>              		
	</div>
</template>
<script type="text/javascript">
	import apis from '../../apis/auditCompanyInfo.js'
	import userApi from '../../apis/userCenter.js'
	export default{
		data () {
			return {
				tableData:[],
				currentPage: 1,
				size:1,
				auditForm:{
					dialogFormVisible: false,
					audit: true,
					id: '',
					companyName: '',
					companyWebsite: '',
					companyMarket: '',
					companyPeopleNumber:'',
					companyIndustry:'',
					companyLicense: '',
					companyContacts: '',
					companyPhone: '',
					companyEmail: '',
					companyAddress: '',
					reason: '',
					pass:true,
					fileId:''
				}
			}
		},
		methods:{
			handleCurrentChange (curPage) {
				this.getCompanyList(curPage)
			},
			seeDetial (obj,str) {
				if(str == '0') {
					// 待审核
					this.auditForm.audit = true

				} else if(str == '1') {
				    // 通过
				    this.auditForm.audit = false
				    this.auditForm.pass = false
				} else if(str == '2') {
					// 未通过
					this.auditForm.audit =false
					this.auditForm.pass = true
				}
				this.auditForm.id = obj.id
             	var formData = new FormData();
             	var _this = this
            	formData.append('companyPhone',obj.companyPhone)			    
				apis.getCompanyMessage(formData).then(response =>{
					if(response.data.meta.code == 200) {
						var obj = response.data.data
						_this.auditForm.companyName = obj.companyName
						_this.auditForm.companyWebsite = obj.companyWebsite
						_this.auditForm.companyMarket = obj.companyMarket
						_this.auditForm.companyPeopleNumber = obj.companyPeopleNumber
						_this.auditForm.companyIndustry = obj.companyIndustry
						_this.auditForm.companyContacts = obj.companyContacts
						_this.auditForm.companyPhone = obj.companyPhone
						_this.auditForm.companyEmail = obj.companyEmail
						_this.auditForm.companyAddress = obj.companyAddress
						_this.auditForm.reason = obj.reason
						_this.auditForm.fileId = obj.fileId
						_this.auditForm.companyLicense = userApi.getFileDownloadUrl(obj.fileId)
						_this.auditForm.dialogFormVisible = true						
					}
				})

			},
			getCompanyList (curPage) {
				curPage = curPage ? curPage:1
				var data = {
					pageNo: curPage
				};
				var _this = this
				apis.queryCompanyList(data).then(response =>{
					if(response.data.meta.code == 200) {
						var data = response.data.data;
						_this.tableData = data.list
						_this.size = data.count
					}
				})	
			},
			closeDialog () {

			},
			pass (str) {
				var _this = this;
				var formData =  new FormData();
				if(str == '1') {
					// 通过
					formData.append('id',this.auditForm.id);
					formData.append('companyStatus',1)
				} else if(str == '2') {
					// 不通过
					if(this.auditForm.reason != '') {
						formData.append('id',this.auditForm.id)
						formData.append('companyStatus',2)
						formData.append('reason',this.auditForm.reason)
					} else{
						this.$message({
							type:'error',
							message:'请填写不通过的原因'
						})
						return false;
					}	
				}
				apis.auditCompany(formData).then(response =>{
					if(response.data.meta.code == 200) {
						_this.getCompanyList()
						_this.auditForm.dialogFormVisible = false
						_this.$message({
							type:'success',
							message:'操作成功'
						})
					}
				})
			}
		},
		mounted () {
			this.getCompanyList(this.currentPage)
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.box{
		display:flex;
		align-items:center;
	}
	.companyTitle{
		color:#333;
		font-size:18px;
		font-weight:normal;
	}
	.companywebsite{
		color:#333;
		font-size:12px;
		margin: 5px 0 13px;
	}
	.companyDetial{
		.padding{
		   padding: 0 18px;
	    }
	    span{
	    	color:#333;
	    	font-size:14px;
	    }
	}
	.companyFlex{
		display:flex;
		margin: 5px 0;
		dt{
			width:88px;
			margin-right:5px;
		}
		dd{
			flex:1;
		}
	}
</style>