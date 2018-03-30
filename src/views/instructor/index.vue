<template>
	<div class="contanier">
		<fc-header></fc-header>
		 <div class="content">
			<div class="con_left">
				<div class="con_left_tab">
					<ul @click="tabChange($event)">
						<li class="active_li">@我的</li>
						<li>学校通知</li>
						<li>班级通知</li>
					</ul>
				</div>
                <div class="con_left_tab_con">
                	<ul class="me_about" id="Loading">
                		<li class="tab_con" v-for="item in userList">
                			<dl>
                				<dt><img :src="item.userLogo"/></dt>
                				<dd>
                				   <p class="name">
                				   		<span v-text="item.name"></span>
                				   		<span class="name_role" v-text="item.nameRole"></span>
                				   </p>
                				   <p class="time" v-text="item.time">
                				   	   
                				   </p>
                				</dd>
                			</dl>
                			<h4 v-text="item.noteTitle"></h4>
                			<p class="tab_text" v-text="item.noteCon"></p>
                			<span class="con_role" v-text="item.con_role"></span>
                		</li>                		
                	</ul>
                </div>
                <div class="con_left_tab_con_page">
                	<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage"
					      :page-size="6"
					      layout="prev, pager, next, jumper"
					      :total="size">
    				</el-pagination>
                </div>
			</div>
			<div class="con_right">
				<div class="con_right_user">
					
				</div>
				<div class="con_right_calendar">
					<fc-calendar :events="fcEvents" lang="en" @dayClick="dayClick"></fc-calendar>
				</div>
			</div>
			<div class="clear"></div>
		</div> 
	   <el-dialog title="校历" :visible.sync="dialogFormVisible" size="tiny" @close="close('form')">
		  <el-form :model="form" :rules="rules" ref="form">
		    <el-form-item :label="form.formTitle"  prop="title">
		      <el-input v-model="form.title" :row="2" auto-complete="off" type="textarea"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="save('form')">保存</el-button>
		  </div>
		</el-dialog> 		
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import fcCalendar from '../common/calendar.vue'
	import { Loading } from 'element-ui'
	export default {
		data () {
			return {
			   fcEvents: [],
			   currentPage: 1,
			   userList:[],
			   size: 0,
			   dialogFormVisible: false,
			   form: {
			   	  id: '',
			   	  title: '',
			   	  formTitle: '新增内容'
			   },
			   rules:{
			   	  title:[
			   	  	{
			   	  		type: 'string', required: true, message: '请填写事件', trigger: 'change' 
			   	  	}
			   	  ]
			   }
			}
		},
		components:{
			fcHeader,
			fcCalendar
		},
		methods:{
			dayClick (day,jsEvent) {
				var len = $(jsEvent.path[1]).find('div.event-box').children.length;
				
				var nowDate = new Date();
				if(day <= nowDate) {
					this.$message.error('请选择今天以后的时间进行编辑');
					return false
				}
				if(len === 0) {
					this.form.formTitle = '新增内容'
				} else {
					this.form.formTitle = '编辑内容'
					var title = $(jsEvent.path[1]).find('span.events-text').text();
					this.form.title = title
				}
				this.dialogFormVisible = true
			},
			save (form) {
				this.$refs[form].validate((valid) =>{
					if (valid) {
						this.$confirm('你确认提交吗?').then(() => {
							if(this.form.id) {
							 // 编辑
							 
							} else {
							 // 新增
							 
							}
							this.dialogFormVisible = false
						})

					}
				})
			},
			close (form) {
				this.$refs[form].resetFields();
				this.form.id = ''
				this.form.title = ''
				this.form.formTitle = ''

			},
			handleSizeChange(){},
			handleCurrentChange() {

			},
			ajax (param, obj) {
			  var _this = this;
			  let loadingInstance = Loading.service({
			  	target: obj
			  })
			  this.$ajax({
			   	 url: '/user/list',
			   	 method:'get',
			   	 data: param
			   }).then(response => {
			   	  var data = response.data.users;
			   	  _this.userList = data;
			   	  _this.size = response.data.len;
			   	  loadingInstance.close()
			   })
			},
			tabChange(event){
			  var param = {}
			  var dom = document.querySelector('#Loading');
			  var domNoww = event.target
			  $(domNoww).addClass('active_li').siblings().removeClass('active_li')
			  this.userList = []
			  this.ajax(param,dom)
			}
		},
		mounted () {
		   var param = {}
		   this.ajax(param, document.body)
		   this.$ajax({
		   		url: '/getEvents',
			   	method:'post',
			   	data: {}
		   }).then(response => {
		   	  this.fcEvents = response.data.events
		   })
		  
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	 @import '../../common/css/common.scss';
	 .content{
	    position:absolute;
	    top:68px;
	    bottom:0;
	    left:0;
	    right:0;
	    margin:10px auto 0 auto;
	    width:1200px;
	    .con_left{
	    	width:870px;
	    	float:left;
	    	margin-right:16px;
	    	.con_left_tab{
	    		height:$navHeight;
	    		background:#fff;
	    		border-radius:5px;
	    		padding-left:36px;
	    		margin-bottom:16px;
	    		li{
	    			float:left;
	    			font-size:$large;
	    			line-height:$navHeight;
	    			margin-right:65px;

	    		}
	    	}
	    	.con_left_tab_con{
	    		background:#fff;
	    		padding:0 20px 0 26px;
	    		height:782px;
	    		overflow:hidden;
	    		.tab_con{
	    			height:130px;
	    			border-bottom: 2px solid #eeeeee;
	    			padding-top:18px;
	    			position:relative;
	    			dl{
	    				display:flex;
	    				dt{
	    					width:40px;
	    					height:40px;
	    					border-radius:50%;
	    				}
	    				dd{
	    					margin-left:10px;
	    					span{
	    						color:#242424;
	    						display:inline-block;
	    						padding-top:8px;
	    					}
	    					p.time{
	    						color:#959595;
	    					}
	    				}
	    			}
	    			h4{
	    				font-size:16px;
	    				line-height:30px;
	    				margin-top:14px;
	    				word-spacing:1px;
	    			}
	    			p.tab_text{
	    			  font-size:14px;
	    			  word-spacing:1px;
	    			  color:#7a7a7a;
	    			  overflow: hidden;
					  text-overflow:ellipsis;
					  white-space: nowrap;
					  width:85%;
	    			}
	    			.con_role{
	    				position:absolute;
	    				right:20px;
	    				top:18px;
	    				padding:2px 3px;
	    				background:#e8f3fe;
	    				border:1px solid #208af5;
	    				font-size:14px;
	    				color:#208af5;
	    				border-radius:2px;
	    			}
	    		}
	    	}
	    	.con_left_tab_con_page{
	    		height:53px;
	    		line-height:53px;
	    		text-align:center;
	    		background:#fff;
	    		padding-top:10px;
	    	}

	    }
	    .con_right{
	    	width:312px;
	    	float:right;
	    	.con_right_user{
	    		height:575px;
	    		background:#fff;
	    	}


	    }
	 }
	 .clear{
	 	clear:both;
	 }
</style>