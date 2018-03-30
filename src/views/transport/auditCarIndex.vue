<template>
		<div>
           
 				 <el-table
                 	fit
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号" width="80">
				    </el-table-column>
                     <el-table-column
				      prop="name"
				      label="申请人"  show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="carName"
				      label="申请车类型"  show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="plate"
				      label="车牌">
				    </el-table-column>                    
				    <el-table-column
				      prop="objective"
				      label="用途" show-overflow-tooltip>
				    </el-table-column>				    
				    <el-table-column
				      prop="startTime"
				      label="开始时间" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="endTime"
				      label="结束时间"show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      label="操作"  min-width="180">
				       <template slot-scope="scope">
				           	<div class="box">
					           <div v-if="scope.row.status == '0'" @click="seeDetial(scope.row,'1')" class="cursor box">
					               <span class="imgScript shenhe"></span>
					           	   待审核 	   
					           </div>
					           <div v-else-if="scope.row.status == '2'" class="box">
					               <span class="imgScript nosussess"></span>
					           	   未通过
					           	    <span class="imgScript seeBtn cursor" @click="seeDetial(scope.row,'0')"></span> 
					           </div>
					           <div v-else-if="scope.row.status == '3'" class="box">
					                <span class="imgScript chexiao"></span>
					           	   已还车
                                    <span class="imgScript seeBtn cursor" @click="seeDetial(scope.row,'0')"></span>   
					           </div>
					           <div v-else-if="scope.row.status == '1'" class="box">
					                <span class="imgScript success"></span>
					           	   已通过
                                    <span class="imgScript seeBtn cursor" @click="seeDetial(scope.row,'0')"></span> 
					           </div>
                               
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
        <!--查看用车详情-->
    <el-dialog title="查看用车详情" :visible.sync="seeForm.dialogFormVisible" size="tiny"  @close="closeDialog('seeForm')" class="dialogImg">
		  <el-form :model="seeForm">
           <el-form-item label="校区:"  class="el-editor">
		    		<div class="vacateReason">
                        <span>{{ seeForm.ssName }}</span>
		    		</div>
		    </el-form-item>
            <el-form-item label="申请人:"  class="el-editor">
		    		<div class="vacateReason">
                        <span>{{ seeForm.name }}</span>
		    		</div>
		    </el-form-item>
           <el-form-item label="车类型:" class="el-editor">
		    		<div class="vacateReason">
                        <span>{{ seeForm.carName }}</span>
		    		</div>
		    </el-form-item>
           <el-form-item label="车牌号:" class="el-editor">
		    		<div class="vacateReason">
                        <span>{{ seeForm.plate }}</span>
		    		</div>
		    </el-form-item>
           <el-form-item label="车级别:" class="el-editor">
		    		<div class="vacateReason">
                        <span>{{ seeForm.type }}</span>
		    		</div>
		    </el-form-item>                        
		    <el-form-item label="开始时间:" >
                <span>{{ seeForm.startTime }}</span>
		    </el-form-item>
		    <el-form-item label="结束时间:"  >
                <span>{{ seeForm.endTime }}</span>
		    </el-form-item>
		    <el-form-item label="申请时间:"  >
                <span>{{ seeForm.createDate }}</span>
		    </el-form-item>            
		    <el-form-item label="用车目的:" class="el-editor">
		    		<div class="vacateReason">
                        <span>{{seeForm.use }}</span>
		    		</div>
		    </el-form-item>
		  </el-form>
          <div slot="footer" class="dialog-footer" v-show="seeForm.flag">
				<el-button type="success" @click="pass('1')">通过</el-button>
				<el-button type="danger" @click="pass('2')">不通过</el-button>
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
                seeForm:{
                   id: '',
                   ssName:'',
                   name:'',
                   carName:'',
                   plate:'',
                   type:'',
                   startTime:'',
                   endTime:'',
                   createDate:'',
                   use:'',
                   carId: '',
                   dialogFormVisible:false,
                   flag: false
                },
                rules:{
                   carType:[{ required: true, message: '请选择用车类型', trigger: 'change' }],
                   startTime:[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
                   endTime:[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
                   use:[{ required: true, message: '请填写用途', trigger: 'change' }]
                },
                userId: ''
            }
        },
        components:{
            fcHeader,
            returnBar
        },
        methods:{
            seeDetial (obj,str) {
                var id = obj.id
                this.seeForm.id = obj.id
                var _this = this
                if(str == '1') {
                    // 审核
                    this.seeForm.flag = true
                    this.seeForm.carId = obj.carId
                } else if(str == '0') {
                    // 查看
                    this.seeForm.flag = false
                }
                var formData = new FormData()
                    formData.append('id',id)
                    apis.seeApplyCar(formData).then(res =>{
                        if(res){
                            var data = res.data.data
                            _this.seeForm.ssName = data.ssName
                            _this.seeForm.name = data.name
                            _this.seeForm.carName = data.carName
                            _this.seeForm.plate = data.plate
                            _this.seeForm.type = data.type
                            _this.seeForm.startTime = data.startTime
                            _this.seeForm.endTime = data.endTime
                            _this.seeForm.createDate = data.createDate
                            _this.seeForm.use = data.objective
                            _this.seeForm.dialogFormVisible = true
                        }
                })
            },
            pass (str) {
                var _this = this
                var formData = new FormData()
                formData.append('id',this.seeForm.id)
                formData.append('carId',this.seeForm.carId)
                if(str == '1') {
                    // 通过
                    formData.append('status','1')
                    apis.auditCar(formData).then(res =>{
                        if (res) {
                            _this.$message({
                                type:'success',
                                message:'提交成功'
                            })
                             _this.getApplyCarList()
                            _this.seeForm.dialogFormVisible = false
                        }
                    })
                } else {
                    // 不通过
                    formData.append('status','2')
                    apis.auditCar(formData).then(res =>{
                        if (res) {
                            _this.$message({
                                type:'success',
                                message:'提交成功'
                            })
                            _this.getApplyCarList()
                            _this.seeForm.dialogFormVisible = false
                        }
                    })
                }
            },
            closeDialog () {
                this.seeForm.id = ''
                this.seeForm.carType = ''
                this.seeForm.startTime = ''
                this.seeForm.endTime = ''
                this.seeForm.use = ''
                this.seeForm.dialogFormVisible = false
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
                apis.findApplyCarList(formData).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.tableData = data.list
                        _this.formInline.size = data.count
                    }
                })
            },
            getAllCar (){
                var _this = this
                apis.getAllCarType().then(res =>{
                    if(res) {
                        _this.form.allCar = res.data.data.list
                    }
                })
            }
        },
        mounted (){
            // 获取用户的id
            this.userId = window.sessionStorage.getItem('stuId')

            // 获取
            this.getApplyCarList ()
            // this.getAllCar ()

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