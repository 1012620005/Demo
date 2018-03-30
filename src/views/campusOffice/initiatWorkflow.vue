<template>
	<div class="imgBox">
	<el-dialog title="发起工作流设计" :visible.sync="editorForm.dialogFormVisible"  custom-class="dialogImg" @close="closeDialog()">
		<div class="workFlowContent">
			<div class="workFlowLeft">
				<el-form >	
					<div class="workFlow">
					     <el-form-item label="校区:" class="boxflow">
					     	    <el-select v-model="editorForm.campusRegion" placeholder="" style="width:150px;" @change="findCampusName">
							      <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in editorForm.campusList"></el-option>
			    				</el-select>
					    </el-form-item>	
					    <el-form-item label="工作类型" class="boxflow">
			     	    	<el-select v-model="editorForm.workType" placeholder="" style="width:150px;" >
						      <el-option label="学生请假" value="2"></el-option>
						      <el-option label="老师请假" value="1"></el-option>
    						</el-select>
		    		   </el-form-item>					
					</div>
	                <el-form-item label="审核人员/部门:" class="labelHeight">
			     	    	<ul class="auditList">
			     	    		<li  :id="item.id" v-for="(item, index) in auditList" class="listItem" draggable='true' dropzone="dragEndBox" @dragstart='drag($event)'>
			     	    			<span class="itemImg"><img src="static/img/workFlow2.png"/></span>
			     	    			<a class="itemName" :title="item.name">{{ item.name.length > 4 ? (item.name.substr(0,3) + '...') : item.name }}</a>
			     	    		</li>
			     	    	</ul>
		    		</el-form-item>	
		    		<div class="auditCon">
		    			<div class="auditConLeft">
		    				<span class="start" style="margin-bottom:8px;">开始</span>
		    				<div class="btnSWork" @click="addCondition"><span class="btn qingjia"></span>添加流程</div>
		    			</div>
		    			<ul class="auditConCenter" v-show="editorForm.workFlows.length != 0">
		    				<li v-for="(item, index) in editorForm.workFlows" :id="index" class="auditLi" @dragover="liDrop($event)">
		    					<span class="start colorF">{{ item.name }}</span><i class="arrows"></i>
		    					<div class="dragEndBox" :id="'dragCon'+ index" @drop='drop($event,index)' @dragover='allowDrop($event,index)' @dragend="dropend($event,index)">
		    						<!-- <div class="dragFlexAuto"> -->
										<my-card v-for="obj in item.addDom" :key="index" :data="obj.data" :dom="obj.dom" @delBox="delDom" :index="index"></my-card>
		    						<!-- </div> -->
								</div>
		    					<!-- <div class="drag" :class="[item.over?'dragIng': '']" v-show="item.addDom.length == 0">添加区域</div> -->
		    					<span class="start">{{ item.end }}</span>
		    				</li>
		    			</ul>
		    		</div>
				</el-form>			
			</div>
			<div class="workFlowRight" id="conditionBox">
				<p class="color padding">流程条件设置</p>
				   <dl class="conditionDl" v-for="(item, index) in editorForm.conditions" v-show="editorForm.conditions.length != 0">
						<dt>{{ '条件'+ (index +1)}}</dt>
						<dd class="flexBox">
							<span class="inputBox"><input type="number" min="0" v-model="item.condition.pref" class="inputText"onkeydown="return false" onkeyup="return false" oncontextmenu="return false" @input="minLimt(item,index)" step="0.5"/></span>
							<el-select v-model="item.condition.symOne" class="inputBoxSelect" @change="changeConditionOne(item,index)">
									<el-option key="1" label="＜" value="1"></el-option>
									<el-option key="2" label="≤" value="2"></el-option>
									<!-- <el-option key="＞" label="＞" value="＞"></el-option>
									<el-option key="≥" label="≥" value="≥"></el-option> -->
									<el-option key="3" label="＝" value="3"></el-option>
							</el-select>
							<span class="inputTextTip">请假天数</span>
							<el-select v-model="item.condition.symTwo" class="inputBoxSelect" @change="changeConditionTwo(item,index)">
									<el-option key="1" label="＜" value="1"></el-option>
									<el-option key="2" label="≤" value="2"></el-option>
									<!-- <el-option key="＞" label="＞" value="＞"></el-option>
									<el-option key="≥" label="≥" value="≥"></el-option> -->
									<el-option key="3" label="＝" value="3"></el-option>
							</el-select>
						    <span class="inputBox"><input type="number" v-model="item.condition.suf" class="inputText"onkeydown="return false" onkeyup="return false" oncontextmenu="return false" min="0" @input="maxLimt(item,index)" step="0.5"></span>
						    <span style="display:inline-block;line-height:36px;"> 天</span>
						</dd>
				    </dl> 
				<p class="tip"></p>
			</div>
		</div>
		<div slot="footer" class="dialog-footer">
			<div class="centerFooter">
				<el-button type="primary" @click="saveForm()" :loading="loading">保 存</el-button>
			</div>
		</div>
	    </el-dialog>		
	</div>
</template>
<script type="text/javascript">
    import myCard from './addDomWorkFlow.vue'
    import api from '../../apis/campusOffice.js'
	export default {
		data () {
		   return {
		   		auditList: [],
		   		loading: false,
		   		totalConditions: 1,
		   		flag:false,
		   		curOverLi: 0
		   }
		},
		props:{
			editorForm: {
		   		dialogFormVisible: Boolean,
		   		campusRegion: '',
		   		workType: '',
		   		conditions: [],
		   		workFlows:[],
		   		regionName: '',
		   		campusList: []
		    }
		},
		methods:{
			closeDialog () {
				this.$emit('closeDialog')
			},
			addCondition () {
				this.editorForm.workFlows.push({
					'name': '流程' + this.totalConditions,
					'addDom':[],
					'end': '结束',
					'over': false
				});
				this.editorForm.conditions.push({
					'condition': {
						pref: 0,
						symOne: '',
						symTwo:'',
						suf: 0
					}
				})
				this.totalConditions += 1
			},
			liDrop (event) {
				// console.log(event.target)
				// this.curOverLi = event.path[2].id
				// console.log(this.curOverLi)
			},
			drag (event) {
				console.log(event)
				console.log(event.target)
				event.dataTransfer.setData("Text",event.target.id)
				event.dataTransfer.dropEffect = 'copy' 
			},
			dropend (event,index) {
				// console.log(event)
				 event.dataTransfer.clearData("Text");
				 return false;
			},
			drop (event,index) {
				event.preventDefault();
				event.returnValue = false;
               var data=event.dataTransfer.getData("Text");
               var dom = $('#'+data).find('.itemName').html();
               console.log(dom)
               for(var i = 0,len = this.editorForm.workFlows.length; i < len; i++) {
	               	if(i == index) {
	               		this.editorForm.workFlows[i].addDom.push({'data':data,'dom':dom,flag:true});
	               	}
               }
			},
			allowDrop (event,index) {
				event.preventDefault();
				event.returnValue = false;
				for(var i = 0,len = this.editorForm.workFlows.length; i < len; i++) {
					if(i == index) {
						this.editorForm.workFlows[i].over = true
					}else{
						this.editorForm.workFlows[i].over = false
					}
				}
			},
			saveForm () {
				if(this.editorForm.conditions.length == 0) {
					this.$message({
						type:'error',
						message: '请选择流程条件'
					})
					return false
				};
				var _this = this
				var formData = new FormData();
				formData.append('campus_region',this.editorForm.campusRegion);
				formData.append('region_name',this.editorForm.regionName.name);
				formData.append('flow_type',this.editorForm.workType);
				console.log(this.editorForm.conditions)
				for(var i = 0, len = this.editorForm.conditions.length; i < len; i++) {
					formData.append('condition_' + (i+1),'条件'+(i+1))
					formData.append('dayfrom_'+ (i+1),this.editorForm.conditions[i].condition.pref)
					formData.append('comparisonfrom_'+ (i+1),this.editorForm.conditions[i].condition.symOne)
					formData.append('comparisonto_'+ (i+1),this.editorForm.conditions[i].condition.symTwo)
					formData.append('dayto_'+ (i+1),this.editorForm.conditions[i].condition.suf)
				}
				for(let j = 0, len = this.editorForm.workFlows.length; j < len; j++) {
					var dom = this.editorForm.workFlows[j].addDom
					for(let k = 0, len = dom.length; k < len; k++) {
						formData.append('flow_'+(j+1)+'_'+ (k+1),this.editorForm.workFlows[j].addDom[k].data)
					}
				}
				api.saveWorkFlow(formData).then(response =>{
					if(response) {
						_this.$message({
							type:'success',
							message: '保存成功'
						})
						_this.$emit('saveForm')
					}
				})
			},
			getRole () {
				var _this = this
				api.getRoleList().then(response =>{
					if(response) {
						var data = response.data.data
						_this.auditList = data
					}
				})
			},
			findCampusName (value) {
				this.editorForm.regionName = this.editorForm.campusList.find(function (obj) {
				     return  obj.id == value ? obj.name : ''
				})
				console.log(this.editorForm.regionName)
			},
			minLimt (obj,index) {
				if(index == 0) {

				} else {
					console.log(parseFloat(obj.condition.pref))
					console.log(parseFloat(this.editorForm.conditions[index -1].condition.suf))
					if(parseFloat(obj.condition.pref) <= parseFloat(this.editorForm.conditions[index -1].condition.suf)){
						obj.condition.pref = parseFloat(this.editorForm.conditions[index -1].condition.suf) + 0.5
					}
				}
			},
			maxLimt (obj,index) {
				if(obj.condition.pref) {
					if(parseFloat(obj.condition.suf) <= parseFloat(obj.condition.pref)) {
						console.log(obj.condition.suf)
						obj.condition.suf = parseFloat(obj.condition.pref) + 0.5 
					}
				}
			},
			changeConditionOne (obj,index) {
			     var val = obj.condition.symOne
			     console.log(val)
			     if(val == '＜') {
			     	
			     }
			},
			changeConditionTwo (obj,index) {

			},
			delDom (val,index) {
				var arr = this.editorForm.workFlows[index].addDom
				console.log(val)
		        for(let i = 0, len = arr.length; i < len; i++) {
		        	if(arr[i].data == val) {
		        		this.editorForm.workFlows[index].addDom.splice(i,1);
		        	}
		        }
			}
		},
		mounted (){
			this.getRole()
		},
		components:{
			myCard
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
    // input::-webkit-outer-spin-button,
    // input::-webkit-inner-spin-button {
	//     -webkit-appearance: none !important;
	//     margin: 0;
    // }
	.workFlowContent{
		display:flex;
		.workFlowLeft{
			padding: 10px;
			min-height:430px;
			min-width:560px;
			margin-right:38px;
		}
		.workFlowRight{
			width:auto;
			padding: 12px 18px;
			min-height:430px;
			background:#eef1f6;
			box-sizing:border-box;
		}
	}
	.workFlow{
		display:flex;
		.boxflow{
			width:250px;
		}
	}
	.auditList{
		display:flex;
		flex-wrap: wrap;
	}
	.auditCon{
		min-height:263px;
		min-width:560px;
		background:#eef1f6;
		border-radius:5px;
		display:flex;
		padding:10px;
		.auditConLeft{
			width:87px;
			min-height:263px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
		}
	}
	.btnSWork{
		color:#208af5;
		font-size:14px;
		cursor:pointer;
	}
	.start{
		display:inline-block;
		width:59px;
		height:32px;
		background:#bfcbd9;
		border-radius:5px;
		line-height:32px;
		text-align:center;
	}
	.conditionDl{
		display:flex;
		margin-bottom:10px;
		dt{
			width:60px;
			line-height:32px;
		}
		.flexBox{
			display:flex;
		}
	}
	.dragEndBox{
	    width:360px;
		overflow-x:auto;
		overflow-y:hidden;
		height:32px;
		padding-right:10px;
		.listItem{
			margin: 0 20px;
		}
	}
	.drag{
		padding: 4px 3px;
		border:1px dashed #ccc;
		border-radius: 5px;
	}
	.dragIng{
		border:2px dashed #333;
	}
	.auditConCenter{
		flex:1;
	}
	.auditLi{
		display:flex;
		margin-bottom:15px;
	}
	.listItem{
			width:21%;
			text-align:center;
			border:1px solid #bfcbd9;
			border-radius:5px;
			margin: 0 16px 5px 0;
			cursor:move;
			.itemImg{
				width:12px;
				height:12px;
				img{
					width:12px;
				}
			}

	}
		i.arrows{
			display:inline-block;
			width:16px;
			height:13px;
			margin: 0 5px;
			margin-top:8px;
			background:url(../../assets/img/connet/arrow.png) no-repeat;
	    }	
	.colorF{
		background:#fff;
	}	
	.padding{
		margin-bottom:10px;
	}
	.inputBox{
		display:inline-block;
		width:36px;
		height:30px;
		border:1px solid #bfcbd9;
		background:#fff;
		margin-right:8px;
		.inputText{
			display:inline-block;
			width:100%;
			height:100%;
			line-height:30px;
			padding-left:3px;
            box-sizing: border-box;
		}
	}
	.inputBoxSelect{
			width:70px;
			height:30px;
			margin-right:8px;
	}
	.tip{
		min-width:300px;
		height:32px;
		line-height:32px;
		text-indent:12px;
		color:red;
		font-size:12px;
	}
	.inputTextTip{
		display: inline-block;
		color:#333;
		font-size:12px;
		line-height:30px; 
		width:60px;
	}
	.dragFlexAuto{
		width:auto;
		height:32px;
	}
.dragEndBox::-webkit-scrollbar {/*滚动条整体样式*/
    width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.dragEndBox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.dragEndBox::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}	
</style>
<style type="text/css" lang="scss">            
	.centerFooter{
		text-align:center;
	}
	.labelHeight{
		.el-form-item__label{
			line-height:60px;
		}
		.el-form-item__content{
			margin-top:24px;
		}
	}
	.imgBox{
		.el-dialog{
			width:80%;
		}
	}
	.inputBoxSelect {
		.el-input__inner{
			border:1px solid #bfcbd9;
			height:32px;
			border-radius:0;
			width:70px;
		}
	}
</style>