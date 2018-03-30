<template>
  <div class="contanier">
      <fc-header></fc-header>
		<div class="content">
            <return-bar :title="title"></return-bar>
            <div class="sLeave-bottom">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	  	  <div  class="btnS" @click="absence" style="cursor:pointer"><span class="btn qingjia"></span>添加文章</div>
				  	  	  
				  	  	  <span class="label">类别</span>
				          <el-select v-model="formInline.articleType" clearable placeholder="" class="select_width" @change="getUserList">
                              <el-option :label="item.label" :value= "item.value" v-for="item in formInline.typeList"></el-option>
                              
                         </el-select>
                         <span class="label">微信Banner</span>
				          <el-select v-model="formInline.slideshowStatus" clearable placeholder="" class="select_width" @change="getUserList">
                              <el-option :label="item.label" :value= "item.value" v-for="item in formInline.statusList"></el-option>
                              
                         </el-select>
				</el-form>
				  <el-table
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;">
					    <el-table-column
					      type="index"
					      label="序号" width="80">
					    </el-table-column>
					    <el-table-column
					      label="文章类别" >
                           <template scope="scope">
                              <span v-show="scope.row.articleType == 1">学校介绍</span>
                              <span v-show="scope.row.articleType == 2">校园新闻</span>
                              <span v-show="scope.row.articleType == 3">政务公开</span>
                           </template>
					    </el-table-column>
					    <el-table-column
					      prop="articleTitle"
					      label="文章标题" >
					    </el-table-column>
					    <el-table-column
					      prop="articleSubhead"
					      label="文章副标题" >
					    </el-table-column>
                        <el-table-column
					      label="是否推送微信banner">
                          <template scope="scope">
                              <span>{{ scope.row.slideshowStatus == 1 ? '是' : '否'}}</span>
                          </template>
					    </el-table-column>
					    <el-table-column
					      prop="publishName"
					      label="发布人">
					    </el-table-column>	
					    <el-table-column
					      prop="updateDate"
					      label="发布时间" >
					    </el-table-column>	
					    <el-table-column
					      label="操作" width="180">
					       <template scope="scope">
					       	  <div class="box">
                                  <span class="imgScript seeBtn cursor" @click="seeDetial(scope.row.id)"></span>  
                                  <span class="btns editor" @click="editorDialog(scope.row.id)" style="cursor:pointer"></span>
					           	  <span class="btns delete" @click="deleteDialog(scope.row.id)" style="cursor:pointer"></span>
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
        <!--编辑和添加文章-->
        <el-dialog :title="form.dialogTitle" :visible.sync="form.dialogFormVisible"  class="dialogImg" label-position="right" @close="closeDialog('form')">
             <el-form :model="form" :rules="rules" ref="form" id="form">
                  <el-form-item label="文章类别:" prop="articleType">
		     	    <el-select v-model="form.articleType" placeholder="" style="width:150px;" >
				        <el-option :label="item.label" :value = "item.value" v-for="item in form.typeList" ></el-option>
    				</el-select>
		          </el-form-item>
                  <el-form-item label="文章标题:" prop="articleTitle" class="editorFloat">
		    		    <el-input type="input" v-model="form.articleTitle" :minlength="2" :maxlength="15"></el-input>
		         </el-form-item>
                 <el-form-item label="文章缩略图:" prop="smallPhoto" class="editorFloat">
                       <div class="avatar" v-if="form.imageUrl">
                                <img :src="form.imageUrl">
                                <span class="delImg" @click="delImg"><img src="../../assets/del.jpg"/></span>
                        </div>
		    		    <el-upload
                            class="upload-demo"
                            :action="action_java"
                            :data="fileData"
                            :auto-upload="true"
                            :on-success="handleAvatarSuccess" 
                            :show-file-list="false" v-else
                            >
                            <el-button size="small" type="text">点击添加</el-button>
                        </el-upload>
                        
		         </el-form-item>
                <el-form-item label="文章摘要:" prop="articleSubhead" class="editorFloat">
		    		    <el-input type="input" v-model="form.articleSubhead" :minlength="2" :maxlength="15"></el-input>
		         </el-form-item>
                 <el-form-item label="推送微信Banner">
                    <el-radio-group v-model="form.slideshowStatus">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="文章内容:" class="paddingLeave editorFloat" prop="articleContent">
                    <div class="vacateReason">
		    			<el-input type="textarea" resize="none" v-model="form.articleContent" :rows="3"></el-input>
		    		</div> -->
               <!--  <input type="file"  @change="getFile($event)" id="files" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx"  multiple="multiple"/> -->
		       <!-- </el-form-item> -->
                <div class="editor-container" style="position: relative" >
                     <UE  :config='config' :id='ue1' ref="ue"></UE>
                </div>
                 <!-- <el-form-item label="上传附件:" class="paddingLeave editorFloat">
                            <el-upload :action="action_java" ref="upload" class="upload-demo"  :data="fileData"
                                    :on-success="handleAvatarSuccess"  drag :auto-upload="true" :multiple="false" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx" :on-remove="removeList"  :file-list="form.vacateFile"> 
                                <i class="el-icon-upload"></i> 
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> 
                            </el-upload>
                    <input type="file"  @change="getFile($event)" id="files" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx"  multiple="multiple"/> 
		          </el-form-item>	 -->
             </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialog('form')" class="textColor">取消</el-button>
				<el-button type="primary" @click="successDialog('form')">确认发布</el-button>
			</div>
        </el-dialog>
        <!--查看文章-->
        <el-dialog title="文章详情" :visible="seeForm.dialogFormVisible" size="tiny" class="dialogImg" label-position="right" @close="closeDialog()">
             <el-form >
                  <el-form-item label="文章类别:">
                      {{ arrList[seeForm.articleType] }}
		          </el-form-item>
                  <el-form-item label="文章标题:" class="editorFloat">
		    		    {{ seeForm.articleTitle }}
		         </el-form-item>
                 <el-form-item label="文章缩略图:" class="editorFloat">
                       <div class="avatar" >
                        <img :src="seeForm.imageUrl">
                        </div>
		         </el-form-item>
                <el-form-item label="文章摘要:" class="editorFloat">
		    		    {{ seeForm.articleSubhead}}
		         </el-form-item>
                 <el-form-item label="推送微信Banner">
                   {{ seeForm.slideshowStatus == 1 ? '是': '否' }}
                </el-form-item>
                <el-form-item label="文章内容:">
                    <p v-html="seeForm.articleContent"></p>
               <!--  <input type="file"  @change="getFile($event)" id="files" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx"  multiple="multiple"/> -->
		       </el-form-item>
               <el-form-item label="发布人员:" class="editorFloat">
		    		    {{ seeForm.publishName}}
		         </el-form-item>
                 <el-form-item label="发布时间:" class="editorFloat">
		    		    {{ seeForm.updateDate}}
		         </el-form-item>
                 
                 <!-- <el-form-item label="上传附件:" class="paddingLeave editorFloat">
                            <el-upload :action="action_java" ref="upload" class="upload-demo"  :data="fileData"
                                    :on-success="handleAvatarSuccess"  drag :auto-upload="true" :multiple="false" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx" :on-remove="removeList"  :file-list="form.vacateFile"> 
                                <i class="el-icon-upload"></i> 
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> 
                            </el-upload>
                    <input type="file"  @change="getFile($event)" id="files" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx"  multiple="multiple"/> 
		          </el-form-item>	 -->
             </el-form>
        </el-dialog>        
  </div>
</template>
<script>
    import UE from '../../components/ue/ue.vue';
   import fcHeader from '../common/header.vue'
   import returnBar from '../common/returnBar.vue'
   import api from '../../apis/weixinArticle.js'
   import commonFile from '../../apis/commonFile.js'
   let qs = require('querystring')
   export default {

       data () {
           return {
               title:'文章管理',
               formInline:{
                   articleType:'',
                   typeList:[],
                   statusList:[],
                   slideshowStatus:'',
                   currentPage:1,
                   size: 1
               },
               fileList:[],
               fileData:{
                  entity:'weixinArtcle',
				  type:'banner' 
               },
               tableData:[],
               form:{
                  id:'',
                  dialogTitle:'',
                  dialogFormVisible:false,
                  articleType:'',
                  typeList:[],
                  articleTitle:'',
                  smallPhoto:'',
                  articleSubhead:'',
                  slideshowStatus: 0,
                  articleContent:'',
                  imageUrl:'',
               },
               seeForm:{
                   id:'',
                   dialogTitle:'',
                   dialogFormVisible:false,
                   articleType:'',
                   articleTitle:'',
                   smallPhoto:'',
                   articleSubhead:'',
                   slideshowStatus: 0,
                   articleContent:'',
                   imageUrl:'', 
                   publishName:'',
                   updateDate:''
               },
               rules:{
                   articleTitle:[{ required: true, message: '请填写文章标题', trigger: 'change' }],
                   articleType:[{ required: true, message: '请选择文章类别', trigger: 'change' }],
                   smallPhoto:[{required: true, message: '请上传文章缩略图', trigger: 'change', type: 'string'}],
                   articleSubhead:[{ required: true, message: '请填写文章标题', trigger: 'change' }],
                   articleContent:[{ required: true, message: '请填写文章内容', trigger: 'change' }]

               },
               action_java:'',
               access_tocken:'',
               arrList:['','学校介绍','校园新闻','政务公开'],
               
                defaultMsg:'',
                config:{
                   
                },
                dialogMinutes:false,
                ue1: "ue3", // 不同编辑器必须不同的id
           }
       },
       components:{
          fcHeader,
          returnBar,
          UE
       },
       methods:{
           absence () {
               this.form.dialogTitle = '新增文章'
               this.form.dialogFormVisible = true;
               this.form.id = "";
               let _this = this
                setTimeout(function() {
                    _this.$refs.ue.setUEContent(_this.defaultMsg)
                }, 500);
            //    this.$refs.ue.setUEContent(this.defaultMsg)
           },
           closeDialog (form) {
               this.$refs[form].resetFields();
               this.form.dialogFormVisible = false
               this.form.imageUrl = ''
           },
           getUserList () {
               var data ={
                   pageNo: this.formInline.currentPage,
                   articleType: this.formInline.articleType,
                   slideshowStatus: this.formInline.slideshowStatus
               }
               api.getAllList(data).then(res =>{
                   if(res) {
                       var data = res.data.data
                       this.tableData = data.list
                       this.formInline.size = data.count
                   }
               })
           },
           handleCurrentChange (val) {
               this.formInline.currentPage =  val
               this.getUserList()
           },
           seeDetial (id) {
               var data = {id: id}
               api.getOneDetial(data).then(res =>{
                   if(res) {
                       var data = res.data.data
                       this.seeForm.dialogFormVisible = true
                       this.seeForm.articleTitle = data.articleTitle
                       this.seeForm.articleSubhead = data.articleSubhead
                       this.seeForm.articleType = data.articleType
                       this.seeForm.slideshowStatus = data.slideshowStatus
                       this.seeForm.articleContent = data.articleContent
                    //    this.defaultMsg = data.articleContent
                       this.seeForm.publishName = data.publishName
                       this.seeForm.updateDate = data.createDate
                       this.seeForm.smallPhoto = data.smallPhoto
                       this.seeForm.imageUrl = this.imgUrl(data.smallPhoto)
                   }
               })
           },
           imgUrl (id) {
               return commonFile.getFileDownloadUrl(id)
           },
           editorDialog (id) {
               var data = {id: id}
               api.getOneDetial(data).then(res =>{
                   if(res) {
                       var data = res.data.data
                       this.form.dialogTitle = '编辑文章'
                       this.form.dialogFormVisible = true
                       this.form.id = data.id
                       this.form.articleTitle = data.articleTitle
                       this.form.articleSubhead = data.articleSubhead
                       this.form.articleType = data.articleType
                       this.form.slideshowStatus = Number(data.slideshowStatus)
                    //    this.defaultMsg = data.articleContent\
                        let _this = this
                        setTimeout(function() {
                            _this.$refs.ue.setUEContent(data.articleContent)
                        },500);
                       
                       this.form.smallPhoto = data.smallPhoto
                       this.form.imageUrl = this.imgUrl(data.smallPhoto)
                   }
               })
           },
           deleteDialog (id) {
               var data = qs.stringify({id:id})
               this.$confirm('你确认删除吗？').then(() => {
					api.delArt(data).then(res =>{
                        if(res) {
                            this.$message({
                                type:'success',
                                message:'删除成功'
                            })
                            this.getUserList()
                        }
                    })	
				}).catch(()  => {
					console.log('失败')
				})
           },
           successDialog (form) {
               this.$refs[form].validate((valid) => {

                   if (valid) {
                       var data = {
                           articleTitle:this.form.articleTitle,
                           articleType:this.form.articleType,
                           smallPhoto:this.form.smallPhoto,
                           articleSubhead:this.form.articleSubhead,
                           slideshowStatus:this.form.slideshowStatus,
                           articleContent:this.$refs.ue.getUEContent()
                       }
                       
                       //编辑
                       if(this.form.id) {
                           data.id = this.form.id
                           var dataBox= qs.stringify(data)
                           api.editorArt(dataBox).then(res =>{
                               if(res) {
                                   this.$message({
                                        type: 'success',
                                        message: '编辑成功'
                                   }) 
                                   this.form.dialogFormVisible = false
                                   this.getUserList()
                               }
                           })
                       } else {
                         var dataBox= qs.stringify(data)
                        // 新增学校介绍之前要判断是否新增过
                        if(this.form.articleType == 1) {
                            api.isHasSchoolTntro({access_token: this.access_tocken}).then(res =>{
                                if(res) {
                                    var data = res.data.data
                                    if(data) {
                                        this.$message({
				                       		type: 'error',
				                       		message: '不能重复提交学校介绍'
                                        })
                                        return false
                                    }
                                } 
                            })
                        }
                        api.addArticle(dataBox).then(res =>{
                            if(res) {
                                this.$message({
				                    type: 'success',
				                    message: '保存成功'
                                })
                                this.form.dialogFormVisible = false
                                this.form.imageUrl = ''
                                this.getUserList()
                            }
                        })
                       }
                   }
               })
           },
           handleAvatarSuccess (res,file) {
				if(res.meta.code == 200) {
					var data = res.data
                    var fileId = data.id
                    this.form.smallPhoto = fileId
                    this.form.imageUrl = URL.createObjectURL(file.raw);
				}
           },
           delImg () {
               var formData = new FormData()
               formData.append('fileid',this.form.smallPhoto)
               commonFile.deleteFile(formData).then(res =>{
                   if(res) {
                        this.$message({
				           type: 'success',
				            message: '删除成功'
				        })
                       this.form.smallPhoto = ''
                       this.form.imageUrl = ''
                   }
               })
           },
           getCondetion () {
               api.getartType().then(res =>{
                   if(res) {
                       var data = res.data.data
                       this.formInline.typeList = data
                       this.form.typeList =  data
                   }
               })
               api.getBannerList().then(res =>{
                   if(res) {
                       var data = res.data.data
                       this.formInline.statusList = data
                   }
               })
           }
       }, 
       mounted () {
           this.getUserList()
           this.getCondetion()
           this.action_java = commonFile.getFileUploadUrl()
           this.access_tocken = this.$Cookies.get('sessionid')
           var _this = this
		   setInterval(function(){_this.action_java = commonFile.getFileUploadUrl();}, 4 * 60000);
       }
   }
</script>
<style lang='scss' scoped>
    .textColor{
        background:#d6d6d6;
        border-color:#d6d6d6;
    }
    .avatar{
        width:200px;
        height:100px;
        position: relative;
        img{
            width:100%;
            height:100%;
        }
        .delImg{
            position: absolute;
            width:20px;
            height: 20px;
            right:-2px;
            top:-5px;
            img{
                width:100%;
                height:100%;
            }
        }
    }
    .label{
        color:#333;
        padding-right:8px;
        padding-left:4px;

    }
</style>



