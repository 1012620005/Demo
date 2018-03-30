<template>
    <div class="contanier">
        <fc-header></fc-header>
		<div class="content">
            <return-bar :title="title"></return-bar>
            <div class="sLeave-bottom">
                 <el-form :inline="true" :model="formInline" class="demo-form-inline">
                     <div  class="btnS" @click="absence"><span class="btn qingjia"></span>添加申请用车</div>
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
				      prop="plate"
				      label="车牌号"  show-overflow-tooltip>
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
					           <div v-if="scope.row.status == '0'">
					               <span class="imgScript shenhe"></span>
					           	   待审核 	   
					           </div>
					           <div v-else-if="scope.row.status == '2'" class="box">
					               <span class="imgScript nosussess"></span>
					           	   未通过
					           	   <span class="btns editor" @click="editorDialog(scope.row.id)" style="cursor:pointer"></span>
					           </div>
					           <div v-else-if="scope.row.status == '3'" class="box">
					                <span class="imgScript chexiao"></span>
					           	   已还车
					           </div>
					           <div v-else-if="scope.row.status == '1'" class="box">
					                <span class="imgScript success"></span>
					           	   已通过
                                    <el-button type="text" @click="returnCar(scope.row)" style="margin:0 10px">还车</el-button> 
					           </div>
                               <span class="imgScript seeBtn" @click="seeDetial(scope.row)"></span> 
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
		</div>
        <!--添加和编辑用车-->
        <el-dialog :title="form.dialogTitle" :visible.sync="form.dialogFormVisible" size="tiny"  @close="closeDialog('form')" class="dialogImg">
		  <el-form :model="form" :rules="rules" ref="form" id="form" enctype="multipart/form-data">
           <el-form-item label="车载人数:" prop="vehicle" class="el-editor">
		    		<div class="vacateReason">
		    			<el-select v-model="form.vehicle" style="width:150px;" @change="findType">
                            <el-option :label="item" :value="item" :key="item" v-for="item in form.VehicleList"></el-option>
    				    </el-select>
		    		</div>
		    </el-form-item>
           <el-form-item label="车级别:" prop="type" class="el-editor">
		    		<div class="vacateReason">
		    			<el-select v-model="form.type" style="width:150px;" @change="findCarName">
                            <el-option :label="item" :value="item" :key="item" v-for="item in form.typeList"></el-option>
    				    </el-select>
		    		</div>
		    </el-form-item>
           <el-form-item label="车类型:" prop="carType" class="el-editor" >
		    		<div class="vacateReason">
		    			<el-select v-model="form.carType" style="width:150px;" @change="findPlate">
                            <el-option :label="item" :value="item" :key="item" v-for="item in form.carTypeList"></el-option>
    				    </el-select>
		    		</div>
		    </el-form-item> 
            <el-form-item label="车牌号:" prop="plate" class="el-editor">
		    		<div class="vacateReason">
		    			<el-select v-model="form.plate" style="width:150px;" >
                            <el-option :label="item" :value="item" :key="item" v-for="item in form.plateList"></el-option>
    				    </el-select>
		    		</div>
		    </el-form-item>                       
		    <el-form-item label="开始时间:"  prop="startTime">
		        <el-date-picker
			      v-model="form.startTime"
			      type="datetime"
			      placeholder="选择开始时间" style="width:180px;">
    			</el-date-picker>
		    </el-form-item>
		    <el-form-item label="结束时间:"  prop="endTime">
		        <el-date-picker
			      v-model="form.endTime"
			      type="datetime"
			      placeholder="选择结束时间" style="width:180px;">
    			</el-date-picker>
		    </el-form-item>
		    <el-form-item label="用途:" prop="use" class="el-editor">
		    		<div class="vacateReason">
		    			<el-input type="textarea" v-model="form.use" :rows="3" resize="none"></el-input>
		    		</div>
		    </el-form-item>
		  </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="successDialog('form')">提交</el-button>
			</div>
        </el-dialog>        
        <!--查看用车详情-->
    <el-dialog title="查看用车详情" :visible.sync="seeForm.dialogFormVisible" size="tiny"  @close="closeDialog" class="dialogImg">
		  <el-form :model="seeForm">
             <el-form-item label="车载人数:"class="el-editor">
		    		<div class="vacateReason">
                        <span>{{ seeForm.vehicle }}</span>
		    		</div>
		    </el-form-item>  
           <el-form-item label="车级别:"class="el-editor">
		    		<div class="vacateReason">
                        <span>{{ seeForm.type }}</span>
		    		</div>
		    </el-form-item>
             <el-form-item label="车类型:"class="el-editor">
		    		<div class="vacateReason">
                        <span>{{ seeForm.carType }}</span>
		    		</div>
		    </el-form-item>
             <el-form-item label="车牌号:"class="el-editor">
		    		<div class="vacateReason">
                        <span>{{ seeForm.plate }}</span>
		    		</div>
		    </el-form-item>
		    <el-form-item label="开始时间:"  >
                <span>{{ seeForm.startTime }}</span>
		    </el-form-item>
		    <el-form-item label="结束时间:"  >
                <span>{{ seeForm.endTime }}</span>
		    </el-form-item>
		    <el-form-item label="用途:"class="el-editor">
		    		<div class="vacateReason">
                        <span>{{seeForm.use }}</span>
		    		</div>
		    </el-form-item>
		  </el-form>
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
                title:'申请用车',
                formInline:{
                    currentPage:1,
                    size:1
                },
                tableData:[],
                form:{
                   id: '',
                   dialogTitle: '',
                   carId:'',
                   carType: '',
                   carTypeList:[],
                   vehicle: '',
                   VehicleList:[],
                   type:'',
                   typeList:[],
                   plate:'',
                   plateList:[],
                   startTime:'',
                   endTime:'',
                   use:'',
                   dialogFormVisible:false,
                   allCar:[]
                },
                seeForm:{
                   id: '',
                   carType: '',
                   vehicle:'',
                   type:'',
                   plate:'',
                   startTime:'',
                   endTime:'',
                   use:'',
                   dialogFormVisible:false
                },
                rules:{
                   carType:[{ required: true, message: '请选择用车类型', trigger: 'change' }],
                   vehicle:[{required: true, message: '请选择车载人数', trigger: 'change' }],
                   type:[{required: true, message: '请选择车级别', trigger: 'change' }],
                   plate:[{required: true, message: '请选择车牌号', trigger: 'change' }],
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
            absence () {
                this.form.dialogFormVisible = true 
                this.form.dialogTitle = '申请用车'
            },
            editorDialog (id) {
                var id = id
                var _this = this
                var formData = new FormData()
                formData.append('id',id)                
                apis.seeApplyCar(formData).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.form.id = data.id
                        _this.form.carType = data.carName
                        _this.form.vehicle = data.vehicle
                        _this.findType(_this.form.vehicle)
                        _this.form.type = data.type
                        _this.findCarName(_this.form.type)
                        _this.form.carType = data.carName
                        _this.findPlate(_this.form.carType)
                        _this.form.plate = data.plate
                        _this.form.startTime = new Date(data.startTime)
                        _this.form.endTime = new Date(data.endTime)
                        _this.form.use = data.objective
                        _this.form.dialogFormVisible = true
                        _this.form.dialogTitle = '编辑用车'
                    }
                })
            },
            seeDetial (obj) {
                var id = obj.id
                var _this = this
                var formData = new FormData()
                formData.append('id',id)
                apis.seeApplyCar(formData).then(res =>{
                    if(res){
                        var data = res.data.data
                        _this.seeForm.carType = data.carName
                        _this.seeForm.vehicle = data.vehicle
                        _this.seeForm.type = data.type
                        _this.seeForm.plate = data.plate
                        _this.seeForm.startTime = data.startTime
                        _this.seeForm.endTime = data.endTime
                        _this.seeForm.use = data.objective
                        _this.seeForm.dialogFormVisible = true
                    }
                })
            },
            successDialog (form) {
                var _this = this
                this.$refs[form].validate((valid) => {
                    if(valid){
                        var formData = new FormData()
                        formData.append('plate',this.form.plate)
                        formData.append('startTime',util.formatDate.format(this.form.startTime,'yyyy-MM-dd hh:mm:ss'))
                        formData.append('endTime',util.formatDate.format(this.form.endTime,'yyyy-MM-dd hh:mm:ss'))
                        formData.append('objective',this.form.use)
                        formData.append('userId',this.userId)
                        if(this.form.id) {
                            // 编辑
                            formData.append('id',this.form.id)
                            apis.editorUserCar(formData).then(res =>{
                                if(res) {
                                    _this.$message({
                                        type:'success',
                                        message: '编辑成功'
                                    })
                                    formData.delete('id')
                                    formData.delete('carId') 
                                    formData.delete('startTime') 
                                    formData.delete('endTime')
                                    formData.delete('objective')
                                    formData.delete('userId')
                                    this.getApplyCarList()
                                    _this.form.dialogFormVisible = false
                                }
                            })
                        } else {
                            // 新增
                            formData.append('status', '0')
                            apis.addApplyCar(formData).then(res =>{
                                if(res){
                                _this.$message({
                                    type:'success',
                                    message: '添加成功'
                                })
                                formData.delete('carId') 
                                formData.delete('startTime') 
                                formData.delete('endTime')
                                formData.delete('objective')
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
                if(form) {
                    this.$refs[form].resetFields();
                } else {
                    this.seeForm.carType = ''
                    this.seeForm.startTime = ''
                    this.seeForm.endTime = ''
                    this.seeForm.use = ''
                    this.seeForm.dialogFormVisible = false
                }
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
                apis.findCurrentCarList(formData).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.tableData = data.list
                        _this.formInline.size = data.count
                    }
                })
            },
            getAllCar (){
                var _this = this
                apis.getAllCarTypeL().then(res =>{
                    if(res) {
                        _this.form.allCar = res.data.data.list
                    }
                })
            },
            returnCar (obj) {
                var _this = this
                this.$confirm('确认还车吗？').then(()=>{
                    var formData = new FormData()
                    formData.append('id',obj.id)
                    formData.append('status','3')
                    formData.append('carId',obj.carId)
                    apis.returnCar(formData).then(res =>{
                        if(res) {
                            _this.$message({
                                type:'success',
                                message:'还车成功'
                            })
                            _this.getApplyCarList()
                        }
                    })
                }).catch(() =>{

                })
                
            },
            getAllCarVehicle () {
                var formData =  new FormData()
                formData.append('userId',this.userId)
                var _this = this
                apis.getAllCarNum(formData).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.form.VehicleList = data
                        formData.delete('userId')
                    }   
                })
            },
            findType (val) {
                if(this.form.type) {
                    this.form.type = ''
                }
                if(this.form.carType) {
                    this.form.carType = ''
                }
                if(this.form.plate) {
                    this.form.plate = ''
                }                                
                var _this = this
                var formData = new FormData()
                formData.append('userId',this.userId)
                formData.append('vehicle',val)
                apis.getAllCarTypeL(formData).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.form.typeList = data
                        formData.delete('userId')
                        formData.delete('vehicle')
                    }
                }) 
            },
            findCarName (val) {
                if(this.form.carType) {
                    this.form.carType = ''
                }
                if(this.form.plate) {
                    this.form.plate = ''
                }
                var _this = this
                var formData = new FormData()
                formData.append('userId',this.userId)
                formData.append('vehicle',this.form.vehicle)
                formData.append('type',val)
                apis.getAllCarName(formData).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.form.carTypeList = data
                        formData.delete('userId')
                        formData.delete('vehicle')
                        formData.delete('type')
                    }
                })
            },
            findPlate (val) {
                 if(this.form.plate) {
                    this.form.plate = ''
                }
                var _this = this
                var formData = new FormData()
                formData.append('userId',this.userId)
                formData.append('vehicle',this.form.vehicle)
                formData.append('type',this.form.type)
                formData.append('carName',val)
                apis.getAllCarPlate(formData).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.form.plateList = data
                        formData.delete('userId')
                        formData.delete('vehicle')
                        formData.delete('type')
                        formData.delete('carName')
                    }
                })
            }
        },
        mounted (){
            // 获取用户的id
            this.userId = this.$Cookies.get('userId')
            // 获取
            this.getApplyCarList ()
            this.getAllCar ()
            // 获取车载人数
            this.getAllCarVehicle ()

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