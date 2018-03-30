<template>
		<div>
          
            <div>
                 <el-form :inline="true" :model="formInline" class="demo-form-inline">
                     <div  class="btnS" @click="absence"><span class="btn qingjia"></span>添加车类型</div>
                 </el-form>
 				 <el-table
                 	fit
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号" width="80">
				    </el-table-column>
				    <el-table-column
				      prop="carName"
				      label="车类型"  show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="type"
				      label="车级别" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="plate"
				      label="车牌号" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="vehicle"
				      label="车载人数" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      label="状态" show-overflow-tooltip>
                       <template slot-scope="scope">
                           <span v-if="scope.row.status == 0">
                               库存
                           </span>
                            <span v-else-if="scope.row.status == 1"  style="color:red">
                                已外借
                           </span>
                            <span v-else  style="color:red">
                                已被申请
                           </span>                           
                       </template>
				    </el-table-column>                                                      
				    <el-table-column
				      label="操作"  min-width="180">
				       <template slot-scope="scope">
				           	<div class="box" v-if="scope.row.status == 0">
					           	<span class="btns editor" @click="editorDialog(scope.row)" style="cursor:pointer"></span>
                                <span class="btns delete" @click="deleteDialog(scope.row.id)" style="cursor:pointer"></span>
					        </div>
                            <div class="box" v-else>
					           	<span class="btns editor" style="color:#e4e4e4"></span>
                                <span class="btns delete" style="color:#e4e4e4"></span>
					        </div>        				           
				      </template>
				    </el-table-column>				    			    			    
				  </el-table> 
                  <div class="con_left_tab_con_page">
	                	<el-pagination
						      @current-change="handleCurrentChange"
						      :current-page="formInline.currentPage"
						      :page-size="10"
						      layout="prev, pager, next, jumper"
						      :total="formInline.size">
	    				</el-pagination>
	               </div>                                
            </div>
        <!--添加和编辑用车-->
        <el-dialog :title="form.dialogTitle" :visible.sync="form.dialogFormVisible" size="tiny"  @close="closeDialog('form')" class="dialogImg">
		  <el-form :model="form" :rules="rules" ref="form" id="form" enctype="multipart/form-data">
           <el-form-item label="车级别:" prop="type" class="el-editor">
		    		<div class="vacateReason">
		    			<el-input type="text" v-model="form.type"></el-input>
		    		</div>
		    </el-form-item>
           <el-form-item label="车类型:" prop="carName" class="el-editor">
		    		<div class="vacateReason">
		    			<el-input type="text" v-model="form.carName"></el-input>
		    		</div>
		    </el-form-item>
		    
		    <el-form-item label="车牌号:" prop="plate" class="el-editor">
		    		<div class="vacateReason">
		    			<el-input type="text" v-model="form.plate"></el-input>
		    		</div>
		    </el-form-item>
		    <el-form-item label="车载人数:" prop="vehicle" class="el-editor">
		    		<div class="vacateReason">
		    			<el-input type="text" v-model="form.vehicle"></el-input>
		    		</div>
		    </el-form-item>                        

		  </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="successDialog('form')">提交</el-button>
			</div>
        </el-dialog>
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
                formInline:{
                    currentPage:1,
                    size:1
                },
                tableData:[],
                form:{
                   id: '',
                   dialogTitle: '',
                   carName: '',
                   type:'',
                   plate:'',
                   vehicle:'', 
                   dialogFormVisible:false
                },
                rules:{
                   carName:[{ required: true, message: '请填写车名', trigger: 'change' }],
                   type:[{ required: true, message: '请填写车级别', trigger: 'change' }],
                   plate:[{ required: true, message: '请填写车牌号', trigger: 'change' }],
                   vehicle:[{ required: true, message: '请填写车载人数', trigger: 'change' }],
                },
                userId: ''
            }
        },
        components:{
            fcHeader,
            returnBar
        },
        methods:{
            absence () {
                this.form.dialogTitle = '添加车型'
                this.form.dialogFormVisible = true 
            },
            editorDialog (obj) {
                var id = id
                var _this = this
                this.form.id = obj.id
                this.form.carName = obj.carName
                this.form.type = obj.type
                this.form.plate = obj.plate
                this.form.vehicle = obj.vehicle
                this.form.dialogTitle = '编辑车型'
                this.form.dialogFormVisible = true
            },
            successDialog (form) {
                var _this = this
                this.$refs[form].validate((valid) => {
                    if(valid){
                        var formData = new FormData()
                        formData.append('carName',this.form.carName)
                        formData.append('type',this.form.type)
                        formData.append('plate',this.form.plate)
                        formData.append('vehicle',this.form.vehicle)
                        formData.append('userId',this.userId)
                        if(this.form.id) {
                            // 编辑
                            formData.append('id',this.form.id)
                            apis.editorCar(formData).then(res =>{
                                if(res) {
                                    _this.$message({
                                        type:'success',
                                        message: '编辑成功'
                                    })
                                    formData.delete('carName') 
                                    formData.delete('type') 
                                    formData.delete('plate') 
                                    formData.delete('vehicle')
                                    formData.delete('userId') 
                                    formData.delete('id')
                                    this.getApplyCarList()
                                    _this.form.dialogFormVisible = false
                                }
                            })
                        } else {
                            // 新增
                            apis.addCar(formData).then(res =>{
                                if(res){
                                _this.$message({
                                    type:'success',
                                    message: '添加成功'
                                })
                                formData.delete('carName') 
                                formData.delete('type') 
                                formData.delete('plate') 
                                formData.delete('vehicle')
                                formData.delete('userId')
                                this.getApplyCarList()
                                _this.form.dialogFormVisible = false
                                }
                            })
                        }

                    }
                })
            },
            closeDialog (form) {
                this.$refs[form].resetFields();
            },
            handleCurrentChange (val) {
                this.formInline.currentPage = val
                this.getApplyCarList(val)
            },
            getApplyCarList(pageNo) {
                pageNo =  pageNo ? pageNo : '1'
                var _this = this
                var formData = new FormData();
                formData.append('pageNo',pageNo)
                formData.append('userId',this.userId)
                apis.getAllCarType(formData).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.tableData = data.list
                        _this.formInline.size = data.count
                    }
                })
            },
            deleteDialog (id) {
                var _this = this
                this.$confirm('你确定删除吗？').then(() =>{
                    var formdata = new FormData()
                    formdata.append('id',id)
                    apis.delCar(formdata).then(res =>{
                        if(res) {
                            _this.$message({
                                type:'success',
                                message: '删除成功'
                            })
                            _this.getApplyCarList(this.formInline.currentPage)
                        }
                    })
                }).catch(()=>{

                })
            }
        },
        mounted (){
            // 获取用户的id
            this.userId = this.$Cookies.get('userId')
            // 获取
            this.getApplyCarList ()
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