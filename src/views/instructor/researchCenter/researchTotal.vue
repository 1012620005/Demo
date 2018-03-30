<template>
	<div class="container">
		<!--主体模块-->
        <el-row :span="24" class="mainbox">
            <div class="mainnextbox">
                <!--左侧教研-->
                <el-col :span="18" class="create-research">
                    <div class="createicon-top" @click="addAcitvgroup">
                        <i><img src="../../../assets/researchCenter/create.png" alt=""></i>
                        <span>创建教研</span>
                    </div>
                    <div class="createicon-bottom">
                        <el-row :gutter="20" class="listbox" >
                            <el-col :span="6" class="public-list list1" v-for="(activity,index) in page.list" :key="index">
                                <ul class="publist">
                                    <li>
                                        <ul @click="jumpCommen(activity.id)">
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">{{activity.name}}</li>
                                            <li class="list-initiator">发起人：<span>{{activity.createUser}}</span></li>
                                            <li class="list-endtime">结束时间：<span>{{activity.endTime}}</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <i><img src="../../../assets/researchCenter/chat.png" alt=""></i>
                                            <span>{{activity.record}}</span>
                                        </div>
                                        <div v-if="type != '2'" class="dele-right" @click="deReach(activity)">
                                            <span >删除</span>
                                            <i><img src="../../../assets/researchCenter/delet.png" alt=""></i>
                                        </div>
                                    </li>
                                </ul>

                            </el-col>
                            
                        </el-row>
                    </div>
                    <div class="block">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="page.pageNo"
                        :page-size="page.pageSize"
                        layout="prev, pager, next, jumper"
                        :total="page.count">
                        </el-pagination>
                    </div>
                </el-col>
                <!--右侧群组-->
                <el-col :span="6" class="create-group">
                    <div class="my-group">
                        <div class="group-top">
                            <div class="group-name">我的群组</div>
                            <div class="group-icon">
                                <div class="icon-insid">
                                    <span @click="newGroup"><img src="../../../assets/researchCenter/green-add.png" alt=""></span>
									<el-badge :is-dot="newMess"><span @click="showGroupMsg"><img src="../../../assets/researchCenter/news.png" alt=""></span></el-badge>
                                </div>
                            </div>
                        </div>
						<el-collapse accordion class="newt-group">
							<el-collapse-item  v-for="(item,index) in leader" :key="index">
								<template slot="title">
									{{item.groupname}}
									<div class="funtitle">
										<el-tooltip class="item" effect="dark" content="解散群组" placement="bottom-start">
											<div class="disbands" @click.stop="dissolve(item)"></div>
										</el-tooltip>
										<div class="settitle" @click.stop="groupset(item)"></div>
									</div>
								</template>
								<ul>
									<li class="zuzhang"  v-for="member in item.members" ><span><img src="../../../assets/researchCenter/head-portrait.png" alt="">{{member.name}}<span v-if="member.leader === '1'">(组长)</span></span></li>
									<!--<li><span><img src="../../../assets/researchCenter/head-portrait.png" alt=""></span></li>-->
								</ul>
							</el-collapse-item>
							<el-collapse-item  v-for="(g,index) in g_member" :key="index">
								<template slot="title">
									{{g.groupname}}
									<div class="funtitle">
										<div class="closetitle"  @click="open2(g)"></div>
									</div>
								</template>
								<ul>
									<li class="zuzhang"  v-for="member in g.members"><span><img src="../../../assets/researchCenter/head-portrait.png" alt="">{{member.name}}<span v-if="member.leader === '1'">(组长)</span></span></li>
									<!--<li><span><img src="../../../assets/researchCenter/head-portrait.png" alt=""></span></li>-->
								</ul>
							</el-collapse-item>

						</el-collapse>
                    </div>
                </el-col>
            </div>
        </el-row>
	
		<!--弹出新建群组-->
		<el-dialog class="newteach-group" :visible.sync="showNewgroup">
			<div slot="title" class="addclasses-cpm" >
                <!-- <img src="../../../assets/image/addstudent2.png" /> -->
				<p v-if="form.id != ''">修改群组</p>
                <p v-else>新建群组</p>
            </div>
			<div class="newgroup-main">
				<el-form ref="form" :model="form" label-width="82px">
					<el-form-item label="群组名称:" class="name-group">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<div class="fudong">
						<el-form-item label="校区:" class="area">
							<el-select @change="findOffice(group.sid, '2')" v-model="group.sid" placeholder="">
								<el-option v-for="(t,index) in group.slist"  :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="院系:" class="departments">
							<el-select  @change="findOffice(group.deptid, '3')"  v-model="group.deptid" placeholder="">
								<el-option v-for="(t,index) in group.deptlist"  :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="专业:" class="majors">
							<el-select v-model="group.proid" placeholder="">
								<el-option v-for="(t,index) in group.prolist"  :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="search-group">
							<el-input placeholder="请输入教职工姓名" v-model="group.teaname">
								<i slot="suffix" class="el-input__icon el-icon-search" @click="loadteachList"></i>
							</el-input>
						</el-form-item>
					</div>
					<div class="teacher-list">
						<div class="teacherlist-name">老师列表:</div>
						<el-checkbox-group v-model="st1" >
							<el-checkbox :label="t.id"  v-for="t in form.teacherList" :key="t.id">{{t.name}}</el-checkbox>
						</el-checkbox-group>
						<div class="add-teacher" @click="addTeach">
							<i><img src="../../../assets/researchCenter/create.png" alt=""></i>
							<span>添加</span>
						</div>
					</div>
					<div class="added-member">
						<div class="added-name">已添加组员:</div>
						<el-checkbox-group v-model="st2">
							<el-checkbox :label="obj.userid" :name="obj.name" v-for="(obj,index) in form.addedMember" :key="index">{{obj.name}}</el-checkbox>
						</el-checkbox-group>
						<div class="remove-member" @click="removeTeach">
							<i><img src="../../../assets/researchCenter/remove.png" alt=""></i>
							<span>移除</span>
						</div>
					</div>
					<el-button type="primary" class="newgroup-confirm"  @click="queren">确认</el-button>
				</el-form>
			</div>
		</el-dialog>
		<!--弹出创建教研-->
		<el-dialog class="alert-create-rsearch" :visible.sync="showCreatersearch" width="40%">
			<div slot="title" class="addclasses-cpm" >
                <!-- <img src="../../../assets/image/addstudent2.png" /> -->
                <p>创建教研</p>
            </div>
			<div class="createresearch-main">
				<el-form ref="activity" :model="activity" label-width="82px">
					<el-form-item label="活动名称:" class="name-group">
						<el-input v-model="activity.name"></el-input>
					</el-form-item>
					<div class="fudong2">
						<el-form-item label="活动组别:" class="active-group" prop="group">
							<el-select v-model="activity.groupid" placeholder="请选择活动组别">
								<el-option v-for="item in activity.group" :label="item.groupname" :value="item.groupid" :key="item.leader"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="结束时间:" class="end-time">
							<el-date-picker v-model="activity.date" type="datetime" placeholder="选择日期时间" @change="dateChange"></el-date-picker>
						</el-form-item>
					</div>
					<el-form-item label="编辑内容:" class="edit-content">
						<el-input type="textarea" v-model="activity.content"></el-input>
						<!--<quill-editor></quill-editor>-->
					</el-form-item>
					<el-form-item label="上传附件:" class="upload-attachments">
						<el-upload class="upload-demo"  
							:data="filedata" 
							:on-remove="remove" 
							:before-upload="before"
							:on-success="uploadCallBack"  
							:with-credentials="true"  :limit="filenum" 
							name="file" drag :action="uploadurl" multiple>
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<div class="el-upload__tip" slot="tip">提示：上传插件所支持的格式有（视频，音频，图片，文档）上传资源即表示您同意上传服务条款，请勿上传色情、反动等违法违规的内容。</div>
						</el-upload>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="createresearch-confirm" @click="createActivity">确认</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<!--弹出消息通知-->
		<el-dialog class="news" :visible.sync="researchNews">
			<div slot="title" class="addclasses-cpm" >
                <!-- <img src="../../../assets/image/addstudent2.png" /> -->
                <p>消息通知</p>
            </div>
			<ul class="news-main">
				<li v-for="(news,index) in newsgroup">
					<span>{{news.msg}}</span>
					<div class="btn-right">
						<el-button type="primary" @click="agree(news)">同意</el-button>
						<el-button  @click="noagree(news)">忽略</el-button>
					</div>
				</li>
				<!--<li>
					<span>李建斌邀请您加入英语讨论组</span>
					<p>已同意</p>
				</li>-->
			</ul>
		</el-dialog>
	</div>
	
</template>
<script type="text/javascript">
import api from '../../../apis/researchCenter/research.js'
import userApi from '../../../apis/userCenter.js'
import util from '../../../common/js/util.js'

let id=1000;
export default {
	data() {
	  importFileUrl: 'http:dtc.com/cpy/add';

      return {
        activeName: 'first',
		currentPage: 1,
		total:0,
		// 群设置
		showGroupset:false,
		// 新建组
		showNewgroup:false,
		// 新建教研
		showCreatersearch:false,
		// 消息提示
		researchNews:false,
		newMess: false,

 		multipleSelection: [],
		multipleSelection1: [],
		multipleSelection2: [],
		length:'',
		filenum: 3,
		form: {
			id: '',
			name: '',
			group: '',
			date:'',
			edit:'',
			addedMember: [],
			
		},
		activity: {
			group:[],
			groupid:'',
			content:'',
			name:'',
			date:'',
			file:[],
			fileid:[],
		},
		fileid:[],
		uploadurl:'',
		group: {
			sid:'',
			slist:[],
			deptid:'',
			deptlist:[],
			proid:'',
			teaname:'',
			prolist:[],
		},
		st1:[],	//选中教师的列表
		st2:[],	//选中组员的列表
		value1: '',
		leader:'',
		g_member:'',
		alist:'',
		newsgroup:[],
		filedata: {
			entity:'activity',
			type:'file',
			filename:'',
		},
		activityFile:[],
      }
	},
	props:{
		type:'',
		page:{
			list:[],
			pageNo:1,
			pageSize:12,
			count:0,
		}			
	},
	mounted () {
		let _this = this;
		_this.uploadurl = userApi.getFileUploadUrl();
		setInterval(function(){_this.uploadurl = userApi.getFileUploadUrl();}, 4 * 60000);
		this.loadMyGroup();
		// this.paging();
		this.findOffice('1', '4');
		this.groupNews();
	},
	methods: {
		exceed1(files, filelist) {
		},
		remove(file, filelist) {
			let fileids = this.fileid;
			for (let i = 0; i < fileids.length; i ++) {
				if (file.uid == fileids[i].uid) {
					this.fileid.splice(i, 1);
				}
			}
			console.log(file);
			console.log(fileids);
		},
		before(file) {
			this.filedata.filename = file.name;
			return true;
		},
		uploadCallBack(r, file, filelist) {
			// if (filelist && filelist.length > 3) {
			// 	// filelist.splice(file);
			// 	userApi.showTip("最多只能上传3个附件");
			// } else {
			// 	let p = {fileid:r.data[0].id, uid:file.uid};
			// 	this.fileid.push(p);
			// 	console.log(this.fileid);
			// }
			let p = {fileid:r.data.id, uid:file.uid};
			this.fileid.push(p);
		},
		loadMyGroup() {
			api.newteGroup().then(response => {
				if(response.data.meta.code == 200){
					this.leader = response.data.data.leader
					this.g_member = response.data.data.member
				}
			});
		},
		teachange(e, t) {
			console.log(e);
			console.log(t);
		},
		findOffice(id, type) {	//加载机构
			let params = {id:id, type:type};
			userApi.findOffice(params).then(r=>{
				let list = r.data.data;
				if (type == '4') {
					this.group.slist = list;
					this.group.sid = '';
					this.group.proid = '';
					this.group.deptid = '';
					this.group.proid = '';
					this.group.deptlist = [];
					this.group.prolist = [];
				} else if (type == '2') {
					this.group.deptlist = list;
					this.group.prolist = [];
					this.group.deptid = '';
					this.group.proid = '';
				} else if (type == '3') {
					this.group.prolist = list;
					this.group.proid = '';
				}
			});
		},
		//   分页
		handleCurrentChange(val) {
			this.page.pageNo=val;
			this.$emit('handleCurrentChange',val)
		},
		//   弹出群设置
		groupset(item){
			let params= {groupid:item.groupid};
			api.setGroup(params).then(response => {
				this.data = response.data.data;
				console.log('ajlgkasd')
				console.log(response);
				this.form.name = this.data.groupname;
				this.form.id = this.data.groupid;
				this.form.addedMember = this.data.members;
				this.loadteachList();
				// console.log(item);
				let sgroup = {
					groupid:item.groupid
				}
			})
		},
		//   弹出新建群组
		newGroup(){
			this.form.name = '';
			this.form.id = '';
			this.form.addedMember = [];
			this.loadteachList();
		},
		handleIconClick(ev) {
			console.log(ev);
		},
		searchcreaterClose(){
			this.showCreatersearch=false;
		},
		// 解散群组
		dissolve(diss){
			
			this.$confirm('是否确定解散此群组', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let sol = new FormData();
				console.log(diss);
				sol.append('groupid', diss.groupid );
				api.dissolveGroup(sol).then(response => {
					let data = response.data;
					userApi.showMsg(data.meta);
					if (data.meta.status == "success") {
						this.leader.splice(diss,1);
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消'
				});          
			});
			
		},
		//   弹出新建群组加载教师列表
		loadteachList(){
			let params = {pro:this.group.proid,sid:this.group.sid, dept:this.group.deptid, name:this.group.teaname};
			api.loadteachList(params).then(response => {
				this.form.teacherList = response.data.data;
				
				this.length = this.form.teacherList.length;
				this.showNewgroup=true;
				this.st1 = [];
            })
		},
		handleCheckedTeacherChange(val) {
			this.multipleSelection1 = val
			// console.log(this.multipleSelection1)
			// is.multipleSelection = val;
			// console.log('----------')
		},
		handleCheckedTeacherChange2 (val) {
			this.multipleSelection2 = val
			console.log(val)
		},
		uniqueArr(list) {
			let res = [];
			let json = {};
			for(var i = 0; i < list.length; i++){
				if(!json[list[i]]){
					res.push(list[i]);
					json[list[i]] = 1;
				}
			}
			return res;
		},
		uniqueObj(list, key) {
			let res = [];
			let json = {};
			for(var i = 0; i < list.length; i++){
				if(!json[list[i][key]]){
					res.push(list[i]);
					json[list[i][key]] = 1;
				}
			}
			return res;
		},
		// 点击添加老师
		addTeach(){
			// this.form.addedMember = []
			// 判断用户是否选中老师
			if (this.st1.length == 0) {
				userApi.showTip("请选择需要添加的组员");
				return false;
			}
			let list = this.form.teacherList;
			let xz = this.st1;
			for(let i = 0; i < list.length ; i++) {
				for( let j = 0; j < xz.length; j++) {
					if(list[i].id == xz[j]){
						this.form.addedMember.push({
							userid: list[i].id,
							name: list[i].name
						})
					}
				}
			}
			this.form.addedMember = this.uniqueObj(this.form.addedMember, "userid");
		},
		removeArr(arr, val) {
			if (arr && arr.length > 0) {
				for(let i = 0; i < arr.length ; i++) {
					if (arr[i] == val) {
						arr.splice(i,1);
					}
				}
			}
			return arr;
		},
		removeObjArr(arr, key, val) {
			if (arr && arr.length > 0) {
				for(let i = 0; i < arr.length ; i++) {
					if (arr[i][key] == val) {
						arr.splice(i,1);
					}
				}
			}
			return arr;
		},
		// 点击移除老师
		removeTeach () {
			if (this.st2.length == 0) {
				userApi.showTip("请选择需要移除的组员");
				return false;
			}
			let xz = this.st2;
			for (let i = 0; i < xz.length ; i++){
				this.form.addedMember = this.removeObjArr(this.form.addedMember, "userid", xz[i]);
			}
			this.st2 = [];
		},
		// 点击确认
		queren(){
			let list = this.form.addedMember;
			if (!list || list.length <= 0) {
				userApi.showTip("群组成员不能为空");
				return;
			}
			let arr = [];
			for (let i = 0; i < list.length; i++) {
				arr.push(list[i].userid);
			}
			var arrStr = arr.join(',');
			var data = new FormData();
			data.append('name', this.form.name); 
			data.append('memberids', arrStr); 
			data.append('id', this.form.id); 
			console.log('1234')
			console.log(data)
			api.addGroup(data).then(response => {
				userApi.showMsg(response.data.meta);
				if(response.data.meta.code == 200){
					this.showNewgroup = false;
					this.loadMyGroup();
				}
            })
		},
		showGroupMsg() {
			this.groupNews();
			this.researchNews=true;
		},
		// 消息通知
		groupNews(data){
			api.groupNews(data).then(response => {
				console.log('bnm')
				console.log(response.data.data)
				this.newsgroup = response.data.data;
				if( response.data.data.length > 0){
					this.newMess = true;
					console.log(this.newMess)
				}else if(response.data.data.length <= 0){
					this.newMess = false;
				}
				// this.length = this.form.teacherList.length
            })
		},
		// 消息通知点击忽略
		noagree(news){
			// console.log(news)
			let newsing = new FormData();
			newsing.append('msgid', news.msgid);
			newsing.append('type', '2');
			this.newsgroup.splice(news,1);
			api.newSet(newsing).then(response => {
				if (response) {
					userApi.showMsg(response.data.meta);
					this.groupNews();
				}
            })
			// console.log(news);
		},
		// 消息通知点击同意
		agree(news){
			let newsagree = new FormData();
			newsagree.append('msgid', news.msgid);
			newsagree.append('type', '1');
			
			this.newsgroup.splice(news,1);
			api.newSet(newsagree).then(response => {
				// console.log(response);
				// console.log(response.data.data);
			
				if (response){
					userApi.showMsg(response.data.meta);
					this.groupNews();
					this.loadMyGroup();
				}
			})
		},
		// 是否确认退出群组
		open2(mg) {
			this.$confirm('是否确定退出此群组', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
					message: '已退出!'
				});
				let quit = new FormData();
				quit.append('groupid', mg.groupid );
			
				this.g_member.splice(mg,1);
				api.quitGroup(quit).then(response => {
					// console.log(response);
					// console.log(response.data.data);
					this.data = response.data.data;
				})

			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消退出'
				});          
			});
		},
		// 点击创建教研添加活动组别
		addAcitvgroup(data){
			api.activityGroup(data).then(response => {
				let list = response.data.data;
				if (!list || list.length <= 0) {
					userApi.showTip("请先创建群组");
				} else {
					this.activity = {
						group:[],
						groupid:'',
						content:'',
						name:'',
						date:'',
						file:[],
					};
					this.activity.group = response.data.data;
					this.showCreatersearch=true;
				}
            });
		},
		dateChange(val){
			this.form.date = val
			console.log(val);
		},
		// 点击确认创建教研活动
		createActivity(){
			var ginseng = new FormData();
			if (!this.activity.date) {
				userApi.showTip("请填写结束日期");
				return;
			}
			ginseng.append('name',this.activity.name);
			ginseng.append('content',this.activity.content);
			ginseng.append('endTime',util.formatDate.format(this.activity.date, "yyyy-MM-dd hh:mm:ss"));
			ginseng.append('groupid',this.activity.groupid);
			
			let fileids = this.fileid;
			let file= '';
			if (fileids && fileids.length > 0) {
				for (let i = 0; i < fileids.length; i ++) {
					file = file + fileids[i].fileid + ","
				}
			}
			ginseng.append('fileids',file);
			api.save(ginseng).then(response => {
				// console.log(response);
				userApi.showMsg(response.data.meta);
				if(response.data.meta.code == 200){	
					this.showCreatersearch=false;
					this.handleCurrentChange(this.page.pageNo);
				}
				
            })
		},
		// 删除教研
		deReach(dre){
			this.$confirm('是否确定删除此教研', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let quit2 = new FormData();
				quit2.append("activityid", dre.id);
				api.deletResearch(quit2).then(r => {
					if (r) {
						userApi.showMsg(meta);
						if (this.page && this.page.list) {
							this.page.list.splice(dre,1);
						}
					}
				})

			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		// 跳转评论界面
		jumpCommen(id){
			console.log(id)
			this.$router.push({
				name:'groupView',
				query:{
					id:id
				}
			})
		}
    },
	components:{
		
	},
	
}
</script>
<style type="text/css" lang="scss" scoped>
	body{
		font-size: 14px;
		color: #333;
	}
	.container{
		// 主体模块
		.mainbox{
			width:1200px;
			margin: 0 auto;
			margin-top: 20px;
			// color:#333;
			font-size: 14px;
			.mainnextbox{
				width: 100%;
				min-height: 800px;
				background-color: #fff;
				border-radius: 6px;
				// padding: 30px 0;
				margin-bottom: 30px;
				overflow: hidden;
				// 左侧教研
				.create-research{
					padding-left: 20px;
					.createicon-top{
						color:#208af5;
						cursor: pointer;
						i{
							width: 16px;
							height: 16px;
							display: inline-block;
							float: left;
							margin-right: 6px;
						}
						span{
							display: inline-block;
						}
					}
					.createicon-bottom{
						height:814px;
						margin-top: 28px;
						.public-list{
							margin-bottom: 30px;
							.publist{
								height: 100%;
								padding: 10px;
								box-shadow: 0 0 5px #8fc4fa;
								border-radius: 4px;
								overflow: hidden;
								ul{
									cursor: pointer;
								}
								li{
									margin-top: 14px;
								}
								.top-icon{
									text-align: center;
									border-bottom: 1px solid #eee;
								}
								.list-title{
									font-weight: bold;
									color: #222;
								}
								.list-initiator{
									color: #404040;
								}
								.list-endtime{
									color:#999;
									font-size: 12px;
								}
								.list-last{
									height: 16px;
									overflow: hidden;
									.info-left{
										float: left;
										color: #404040;
										// cursor: pointer;
										i{
											float: left;
											margin-right: 6px;
											display: inline-block;
											margin-top: 2px;
										}
										span{
											display: inline-block;
										}
										
									}
									.dele-right{
										float: right;
										color: #999;
										cursor: pointer;
										i{
											display: inline-block;
											float: right;
											margin-left: 6px;
										}
									}
								}
							}
						}
					}
					.block{
						text-align: center;
					}
				}
				// 右侧群组
				.create-group{
					padding: 0 20px;
					.my-group{
						border: 1px solid #eee;
						padding-bottom: 50px;
						height: 770px;
						overflow: hidden;
						.group-top{
							padding: 16px 14px;
							background-color: #dbecac;
							border-radius: 4px;
							text-align: center;
							.group-name{
								display: inline-block;
								font-weight: bold;
								margin-left: 15px;
							}
							.group-icon{
								float: right;
								// overflow: hidden;
								// margin-right: 14px;
								.el-badge{
									float: right;
									margin-left:8px;
								}
								span{
									width: 20px;
									height: 20px;
									display: inline-block;
									cursor: pointer;
									// position: relative;
									// i{
									// 	width: 7px;
									// 	height:7px;
									// 	background-color: #ef0000;
									// 	border-radius: 4px;
									// 	display: block;
									// 	position: absolute;
									// 	top: -3px;
									// 	right: -3px;
									// }
								}
							}
						}
					}
					// 列表
					.newt-group{
						height: 770px;
						overflow: auto;
						ul{
							li{
								height: 30px;
								line-height: 30px;
								margin-bottom: 10px;
								span{
									img{
										width:21px;
										height:21px;
										display: inline-block;
										float: left;
										margin-top: 6px;
										margin-right: 10px;
									}
								}
								// .touxiang{
								// 	width:21px;
								// 	height:21px;
								// 	// background: url('../../../assets/researchCenter/head-portrait.png') 0 0 no-repeat;
								// 	display: inline-block;
								// 	margin-right: 10px;
								// 	float: left;
								// 	margin-top: 6px;
								// }
							}
							.zuzhang{
								color:#208af5;
							}
						}
						.el-collapse-item__header{
							position: relative;
							.funtitle{
								position: absolute;
								top: 0 ;
								right: 0;
								width:80px;
								height: 40px;
								.settitle{
									width:16px;
									height:16px;
									background: url('../../../assets/researchCenter/setting-gry.png') 0 0 no-repeat;
									display: inline-block;
									float: right;
									margin-top: 12px;
									cursor: pointer;
									margin-right: 12px;
								}
								.disbands{
									width:16px;
									height:16px;
									background: url('../../../assets/researchCenter/disband.png') 0 0 no-repeat;
									display: inline-block;
									float: right;
									margin-top: 12px;
									margin-left: 3px;
									margin-right: 12px;
									cursor: pointer;
								}
								.closetitle{
									width:16px;
									height:16px;
									background: url('../../../assets/researchCenter/close-gry2.png') 0 0 no-repeat;
									display: inline-block;
									float: right;
									margin-top: 12px;
									margin-left: 3px;
									margin-right: 12px;
									cursor: pointer;
								}
							}
						}
						
					}
					.el-collapse{
						border: 0;
					}
				}
			}
			
		}
		// 弹出群设置
		.alert-groupset{
			.addclasses-cpm{
                display:inline-block;
                float: left;
            }
            .addclasses-cpm p{
                display:inline-block;
                margin-left:10px;
            }
            .addclasses-cpm img{
                vertical-align: middle;
            }
            .el-dialog__body{
                overflow: hidden;
            }
			.el-dialog--small{
                width:38%;
            }
			.newgroup-main{
				margin-top: 30px;
				.fudong{
					overflow: hidden;
				}
				.el-form-item__label{
					text-align: left;
				}
				.name-group{
					.el-input{
						width: 193px;
					}
				}
				.area{
					float: left;
					overflow: hidden;
					margin-right: 80px;
					.el-input{
						width: 123px;
					}
				}
				.departments{
					float: left;
					overflow: hidden;
					// margin-right: 129px;
					.el-input{
						width: 123px;
					}
				}
				.majors{
					float: left;
					overflow: hidden;
					.el-input{
						width: 123px;
					}
				}
				.search-group{
					float: left;
                    .el-form-item__content{
                        margin-left: 0 !important;
                        width: 80%;
                    }
                    i{
                        width: 16px;
                        height: 16px;
                        margin: 10px;
                        display: inline-block;
                        float: right;
                        cursor: pointer;
                        background: url("../../../assets/researchCenter/search.png") 0 0 no-repeat;
                    }
                    .el-icon-search:before{
                        content:"";
                    }                
                }
				.teacher-list{
					overflow: hidden;
					.teacherlist-name{
						margin-bottom: 22px;
					}
					.el-checkbox-group{
						height: 120px;
						overflow: auto;
					}
					.el-checkbox+.el-checkbox{
						margin-left: 0;
					}
					.el-checkbox__label{
						margin-left: 6px;
					}
					.el-checkbox{
						margin-bottom: 20px;
					}
					.add-teacher{
						float: right;
						overflow: hidden;
						margin-top: 10px;
						color:#208af5;
						cursor: pointer;
						i{
							float: left;
							margin-right: 6px;
						}
					}
				}
				.added-member{
					margin-top: 7px;
					border-top: 1px solid #d2d2d2;
					padding-top: 7px;
					overflow: hidden;
					.added-name{
						margin-bottom: 22px;
					}
					.el-checkbox-group{
						height: 120px;
						overflow: auto;
					}
					.el-checkbox+.el-checkbox{
						margin-left: 0;
					}
					.el-checkbox__label{
						margin-left: 6px;
					}
					.el-checkbox{
						margin-bottom: 20px;
						width: 78px;
					}
					.remove-member{
						float: right;
						overflow: hidden;
						margin-top: 10px;
						color: #ef0000;
						cursor: pointer;
						i{
							float: left;
							margin-right: 6px;
						}
					}
				}
			}
			.newgroup-confirm{
				width: 96px;
				height: 42px;
				background-color: #208af5;
				border-color: #208af5;
				margin-top: 24px;
				float: right;
			}
		}
		// 弹出新建群组
		.newteach-group{
			.addclasses-cpm{
                display:inline-block;
                float: left;
            }
            .addclasses-cpm p{
                display:inline-block;
                margin-left:10px;
            }
            .addclasses-cpm img{
                vertical-align: middle;
            }
            .el-dialog__body{
                overflow: hidden;
            }
			.el-dialog--small{
                width:38%;
            }
			.newgroup-main{
				.fudong{
					overflow: hidden;
				}
				.el-form-item__label{
					text-align: left;
				}
				.name-group{
					.el-input{
						width: 193px;
					}
				}
				.area{
					float: left;
					overflow: hidden;
					margin-right: 80px;
					.el-input{
						width: 123px;
					}
				}
				.departments{
					float: left;
					overflow: hidden;
					// margin-right: 129px;
					.el-input{
						width: 123px;
					}
				}
				.majors{
					float: left;
					overflow: hidden;
					.el-input{
						width: 123px;
					}
				}
				.search-group{
					float: left;
					overflow: hidden;
					margin-left: 80px !important;
                    .el-form-item__content{
                        margin-left: 0 !important;
                        width: 80%;
                    }
                    i{
                        width: 16px;
                        height: 16px;
                        margin: 10px;
                        display: inline-block;
                        float: right;
                        cursor: pointer;
                        background: url("../../../assets/researchCenter/search.png") 0 0 no-repeat;
                    }
                    .el-icon-search:before{
                        content:"";
                    }      
				}
				.teacher-list{
					overflow: hidden;
					.teacherlist-name{
						margin-bottom: 22px;
					}
					.el-checkbox-group{
						height: 120px;
						overflow: auto;
					}
					.el-checkbox+.el-checkbox{
						margin-left: 0;
					}
					.el-checkbox__label{
						margin-left: 6px;
					}
					.el-checkbox{
						margin-bottom: 20px;
						margin-right: 12px;
					}
					.add-teacher{
						float: right;
						overflow: hidden;
						margin-top: 10px;
						color:#208af5;
						cursor: pointer;
						i{
							float: left;
							margin-right: 6px;
						}
					}
				}
				.added-member{
					margin-top: 7px;
					border-top: 1px solid #d2d2d2;
					padding-top: 7px;
					overflow: hidden;
					.added-name{
						margin-bottom: 22px;
					}
					.el-checkbox-group{
						height: 120px;
						overflow: auto;
					}
					.el-checkbox+.el-checkbox{
						margin-left: 0;
					}
					.el-checkbox__label{
						margin-left: 6px;
					}
					.el-checkbox{
						margin-bottom: 20px;
						width: 78px;
					}
					.remove-member{
						float: right;
						overflow: hidden;
						margin-top: 10px;
						color: #ef0000;
						cursor: pointer;
						i{
							float: left;
							margin-right: 6px;
						}
					}
				}
			}
			.newgroup-confirm{
				width: 96px;
				height: 42px;
				background-color: #208af5;
				border-color: #208af5;
				margin-top: 24px;
				float: right;
			}
		}
		// 弹出创建教研
		.alert-create-rsearch{
			.addclasses-cpm{
                display:inline-block;
                float: left;
            }
            .addclasses-cpm p{
                display:inline-block;
                margin-left:10px;
            }
            .addclasses-cpm img{
                vertical-align: middle;
            }
            .el-dialog__body{
                overflow: hidden;
            }
			.el-dialog--small{
                width:38%;
            }
			.createresearch-main{
				.fudong2{
					overflow: hidden;
					.active-group{
						float: left;
					}
					.end-time{
						float: right;
					}
				}
				.el-form-item__label{
					text-align: left;
				}
				.el-textarea__inner{
					height: 180px;
				}
				.name-group{
					.el-input{
						width: 193px;
					}
				}
				.upload-attachments{
					.el-form-item__content{
						line-height: 14px;
						.upload-demo{
							width: 100%;
							.el-upload{
								display: block;
								.el-upload-dragger{
									width: 100%;
									height: 90px;
									.el-icon-upload{
										font-size: 43px;
										margin: 0;
										margin-top: 3px;
									}
									.el-upload__text{
										
									}
								}
							}
							.el-upload__tip{
								color:#ef0000;
								text-align:justify;
							}
						}
					}
				}
			}
			.createresearch-confirm{
				width: 96px;
				height: 42px;
				background-color: #208af5;
				border-color: #208af5;
				float: right;
			}
		}
		// 弹出消息通知
		.news{
			.addclasses-cpm{
                display:inline-block;
                float: left;
            }
            .addclasses-cpm p{
                display:inline-block;
                margin-left:10px;
            }
            .addclasses-cpm img{
                vertical-align: middle;
            }
            .el-dialog__body{
                overflow: hidden;
            }
			.el-dialog--small{
                width:30%;
            }
			.news-main{
				margin-top: 24px;
				height: 520px;
				overflow: auto;
				li{
					height: 90px;
					line-height: 90px;
					overflow: hidden;
					border-bottom: 1px solid #cccccc;
					.btn-right{
						float: right;
						button{
							width: 62px;
							height: 35px;
						}
					}
					p{
						float: right;
						color:#999999;
						margin-right: 18px;
					}
				}
				li:last-child{
					border-bottom: 0;
				}
			}

		}
	}
</style>
<style type="text/css" lang="scss">
	.newteach-group,.alert-create-rsearch,.news{
		.el-dialog__header,.el-dialog__body{
			overflow: hidden;
		}
	}
    .create-group{
        .el-collapse-item__arrow{
            float: left;
		}
		.el-collapse-item__header{
			padding-left:8px;
			position: relative;
		}
		.el-collapse-item__content{
			padding-left:8px;
		}
    }
</style>