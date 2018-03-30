 <template>
 	<div>
     <el-dialog title="详情" :visible.sync="form.visible" size="small" custom-class="dialogImg" @close="closeDialog()">
		  <el-form :model="form" :label-position="labelPosition">
		     <el-form-item label="校区:">
		     	   <div>{{ form.campusRegionName }}</div>
		    </el-form-item>
		     <el-form-item label="公文下发:">
		     	   <div>{{ form.receiverName }}</div>
		    </el-form-item>	
		    <el-form-item label="公文标题:" class="el-editor">
		    		<div>{{ form.OfficeTitle }}</div>
		    </el-form-item>  
		    <el-form-item label="公文内容:"  class="el-editor">
		            <div>{{ form.OfficeContent }}</div>
		    </el-form-item>
		    <el-form-item label="备注:" class="el-editor">
		    		<div>{{ form.OfficeNote }}</div>
		    </el-form-item>		    
		    <el-form-item label="上传附件:">
  				   <div>{{ form.OfficeFile }}</div>
		    </el-form-item>
		    <el-form-item label="是否流转:" v-if="!form.isOffice">
		       <div class="label_con">
			    	<el-checkbox class="radio" v-model="form.OfficeFlow">是</el-checkbox>
			    	<!-- <el-input  v-model="OfficeList" placeholder="选择下发公文的对象" style="width:200px;" :disabled="true"></el-input>  -->
			    	<span class="el_input">{{ OfficeList }}</span>	        	
		        </div> 
		        <div class="isFlowObject" style="height:100px;overflow-y:auto">
		        	 <!-- <el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
		        	 
				    <el-checkbox-group v-model="checkList"  @change="handleCheckedCitiesChange">
			     		<el-checkbox :label="item.name" :key="item.id" :value="item.id" v-for="item in officeObjectList"></el-checkbox>
			        </el-checkbox-group>	    		
			    </div>
		    </el-form-item>    
		  </el-form>
			<div slot="footer" class="dialog-footer" v-show="form.OfficeFlow">
				<el-button type="primary" @click="successDialog()">确认</el-button>
			</div>
    </el-dialog> 		
 	</div>
 </template>
 <script type="text/javascript">
 	import apis from '../../apis/officeWork.js'
 	export default {
 		data () {
 			return {
 				dialogFormVisible: false,
 				editLoading: false,
 				labelPosition: 'right',
 				value: '',
 				officeObjectList: [],
 				OfficeList: '',
 				checkList:[]
 			}
 		},
 		props:{
 			form:{
 				id: '',
 				campus: '',
 				campusRegionName:'',
 				receiverName:'',
 				officeObjectList: [],
 				OfficeTitle: '',
 				OfficeContent: '',
 				OfficeNote: '',
 				OfficeFile: '',
 				OfficeFlow: Boolean,
 				visible: Boolean,
 				isOffice: Boolean
 			}
 		},
 		methods:{
 			closeDialog () {
 				this.$emit('closeDialog')
 			},
 			successDialog () {
 				if(this.checkList.length == 0) {
 					this.$message({
 						type:'error',
 						message:'请选择流转对象'
 					})
 					return false
 				}
 				var _this = this
 				var arr = this.officeObjectList.filter(function(n) {
					var name = n.name
					if(_this.checkList.indexOf(name) > -1) {
						return n.id
					}
				})
				var newArr = []
				for(var i = 0, len = arr.length; i < len; i++) {
					newArr.push(arr[i].id)
				}
 				// var data = {
 				// 	oid: this.form.id,
 				// 	tids: newArr
 				// }
 				var formData = new FormData()
 				formData.append('oid',this.form.id)
 				formData.append('tids',newArr.join(','))
 				apis.transmit(formData).then(response =>{
 					if(!response) {
						return false
					}
 					if(response.data.meta.code == 200) {
 						_this.$message({
 							type:'success',
 							message:'转发成功'
 						})
 						this.$emit('successDialog')
 					}
 				})
 				
 			},
 			getObjectList() {
 				var _this = this
 				apis.getAllObject().then(response =>{
 					if(!response) {
						return false
					}
 					if(response.data.meta.code == 200) {
 						var data = response.data.data
 						_this.officeObjectList = data
 					}
 				})
 			},
 			handleCheckedCitiesChange (value) {
 				this.checkList = value
 				console.log(this.checkList)
 				this.OfficeList = value.join(',')
			    
 			}
 		},
 		mounted () {
 			// 获取流转对象
 			this.getObjectList()
 		}

 	}
 </script>
 <style type="text/css" lang="scss">
 	.label_con{
 		display:flex;
 		.radio{
 			margin-right:10px;
 		}
 	}
 </style>
