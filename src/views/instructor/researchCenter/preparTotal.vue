<template>
	<div class="container">
		<!--主体模块-->
        <el-row :span="24" class="mainbox">
            <div class="mainnextbox">
                <!--左侧教研-->
                <el-col :span="18" class="create-research">
                    <div class="createicon-top" v-if="type=='1'">
						<div class="cretatbk" @click="addAcitvgroup">
							<i><img src="../../../assets/researchCenter/create.png" alt=""></i>
                        	<span>创建备课</span>
						</div>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
							<el-form-item label="科目">
								<el-select v-model="formInline.subject">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="章节">
								<el-select v-model="formInline.chapter">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
                    </div>
                    <div class="createicon-bottom">
                        <el-row :gutter="20" class="listbox" >
                            <el-col :span="6" class="public-list list1" v-for="(activity,index) in page.list" :key="index">
                                <ul class="publist">
                                    <li>
                                        <ul @click="jumpCommen">
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">{{activity.title}}</li>
                                            <li class="list-initiator">备课老师：<span>{{activity.createBy}}</span></li>
                                            <li class="list-endtime">备课时间：<span>{{activity.createDate}}</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <ul>
												<li v-if="curTab == 'a'">
													<div @click="switclose(activity)" class="switclo clearfix" :class="[activity.publicflag==0 ? '':'clo']">
														<i></i>
														<span v-if="activity.publicflag==0">共享</span>
														<span v-if="activity.publicflag==1">关闭</span>
													</div>
												</li>
												<li v-if="curTab == 'b'">
													<div @click="loadload(activity)"><img src="../../../assets/img/orientation/load.png" alt=""></div>
												</li>
											</ul>
                                        </div>
                                        <div class="dele-right" >
											<ul>
												<li>
													<div v-if="activity.publicflag==0" @click="pubMod(activity)"><img src="../../../assets/img/orientation/modfi.png" alt=""></div>
                                            		<div v-if="activity.publicflag!=1 || curTab == 'b'" class="delet" @click="dePubDel(activity)"><img src="../../../assets/researchCenter/delet.png" alt=""></div>
												</li>
												<li v-show="activity.publicflag==1 && curTab == 'c'">
													<span class="unfav" :class="[activity.collectiontype!=0 ? '':'fav']" @click="postFavPub(activity)"></span>
												</li>
											</ul>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="block">
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="page.pageNo"
                        :page-size="page.pageSize" layout="prev, pager, next, jumper" :total="page.count">
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
									<li class="zuzhang"  v-for="(member,index) in item.members" :key="index"><span><img src="../../../assets/researchCenter/head-portrait.png" alt="">{{member.name}}<span v-if="member.leader === '1'">(组长)</span></span></li>
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
									<li class="zuzhang"  v-for="(member,index) in g.members" :key="index"><span><img src="../../../assets/researchCenter/head-portrait.png" alt="">{{member.name}}<span v-if="member.leader === '1'">(组长)</span></span></li>
									<!--<li><span><img src="../../../assets/researchCenter/head-portrait.png" alt=""></span></li>-->
								</ul>
							</el-collapse-item>

						</el-collapse>
                    </div>
                </el-col>
            </div>
        </el-row>
	
		<!--新建群组-->
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
		<!--创建备课-->
		<el-dialog class="alert-create-rsearch" :visible.sync="showCreatersearch" width="35%">
			<div slot="title" class="addclasses-cpm" >
                <p>创建备课</p>
            </div>
			<div class="createresearch-main">
				<el-form :rules="rules" ref="activity" :model="activity" label-width="82px">
					<el-form-item label="科目:" class="active-group" prop="sub">
						<el-select v-model="activity.sub">
							<el-option v-for="item in activity.group" :label="item.groupname" :value="item.groupid" :key="item.leader"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="章节:" class="end-time" prop="chap">
						<el-select v-model="activity.chap">
							<el-option v-for="item in activity.group" :label="item.groupname" :value="item.groupid" :key="item.leader"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="备课名称:" class="name-group" prop="name">
						<el-input v-model="activity.name"></el-input>
					</el-form-item>
					<el-form-item label="备课内容:" class="rich" prop="content">
						<el-input type="textarea" v-model="activity.content" placeholder="备课内容"></el-input>
					</el-form-item>
					<el-form-item class="rchbtn">
						<el-button type="primary" class="rch" @click="cancel">取消</el-button>
						<el-button type="primary" class="rch rch-confirm" @click="createActivity('activity')">确认</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<!--消息通知-->
		<el-dialog class="news" :visible.sync="researchNews">
			<div slot="title" class="addclasses-cpm" >
                <!-- <img src="../../../assets/image/addstudent2.png" /> -->
                <p>消息通知</p>
            </div>
			<ul class="news-main">
				<li v-for="(news,index) in newsgroup" :key="index">
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
		<!--详情-->
		<el-dialog class="bk-detail" :visible.sync="bkdetail" width="30%">
			<div slot="title" class="addclasses-cpm" >
                <p>详情</p>
            </div>
			<div class="de-box">
				<div>备课名称：备课名称备课名称备课名称备课名称</div>
				<div>备课内容：备课名称备课名称备课名称备课名称</div>
			</div>
		</el-dialog>
		<!--加载-->
		<el-dialog class="bk-load" :visible.sync="bkload" width="40%">
			<div slot="title" class="addclasses-cpm" >
                <p>加载</p>
            </div>
			<el-form ref="formload" :model="formload" label-width="80px">
				<el-form-item label="科目:">
					<el-select v-model="formload.km">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="章节:">
					<el-select v-model="formload.zj">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备课名称:">
					<el-input v-model="formload.bkname"></el-input>
				</el-form-item>
				<el-form-item label="备课内容:" class="rich">
					<el-input type="textarea" v-model="formload.cont" placeholder="备课内容"></el-input>
				</el-form-item>
				<el-form-item label="教案感悟:" class="rich">
					<el-input type="textarea" v-model="formload.less" placeholder="教案感悟"></el-input>
				</el-form-item>
				<el-form-item class="bkbtn">
					<el-button class="bkqx" @click="bkcancel">取消</el-button>
					<el-button class="bkcreate" @click="creat('formload')">创建</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
	
</template>
<script type="text/javascript">
import api from '../../../apis/researchCenter/research.js'
import userApi from '../../../apis/userCenter.js'
import util from '../../../common/js/util.js'
const qs = require('querystring')
let id=1000;
export default {
	data() {
	  importFileUrl: 'http:dtc.com/cpy/add';

      return {
		swit:true,
        activeName: 'first',
		currentPage: 1,
		total:0,
		// 群设置
		showGroupset:false,
		// 新建组
		showNewgroup:false,
		// 创建备课
		showCreatersearch:false,
		// 消息提示
		researchNews:false,
		newMess: false,
		// 详情
		bkdetail:false,
		// 加载
		bkload:false,
 		multipleSelection: [],
		multipleSelection1: [],
		multipleSelection2: [],
		length:'',
		filenum: 3,
		formInline:{
			subject:'',
			chapter:''
		},
		form: {
			id: '',
			name: '',
			group: '',
			date:'',
			edit:'',
			addedMember: [],
		},
		// 备课中心列表
		// prepall:[],
		activity: {
			id: '',
			sub:'',
			chap:'',
			name:'',
			content:'',
		},
		rules:{
			sub: [{ required: true, message: "请选择科目", trigger: "change" }],
			chap: [{ required: true, message: "请选择章节", trigger: "change" }],
			name: [{ required: true, message: "请填写备课名称", trigger: "blur" }],
			content: [{ required: true, message: "请填写备课内容", trigger: "blur" }]
      	},
		formload:{
			km:'',
			zj:'',
			bkname:'',
			cont:'',
			less:'',
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
		curTab:String,
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
			this.showCreatersearch=true;
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
				}
            });
		},
		dateChange(val){
			this.form.date = val
		},
		// 创建备课
		createActivity(formName){
      		this.$refs[formName].validate(valid => {
				if (valid) {
					var ginseng = new FormData();
					ginseng.append('subjectid',this.activity.sub);
					ginseng.append('zid',this.activity.chap);
					ginseng.append('title',this.activity.name);
					ginseng.append('content',this.activity.content);
					if(!this.activity.id){
						// 保存
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							api.postSavePrep(ginseng).then(r => {
								if(r.data.meta.code == 200){	
									this.showCreatersearch=false;
									this.$emit("paging");
								}
							})
						}).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消添加'
                            });          
                        });
					}else{
						ginseng.append('id',this.activity.id);
						// 修改
						this.$confirm('确认修改吗？', '提示', {}).then(() => {
							api.postSavePrep(ginseng).then(r => {
								if(r.data.meta.code == 200){	
									this.showCreatersearch=false;
									this.$emit("paging");
								}
							})
						}).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消修改'
                            });          
                        });
					}
				}
			});
		},
		// 修改备课
		pubMod(row){
			this.activity.id=row.id;
			this.activity.sub=row.subjectid;
			this.activity.chap=row.zid;
			this.activity.name=row.title;
			this.activity.content=row.content;
			this.showCreatersearch=true;
		},
		// 共享或者关闭
		switclose(row){
			
			var statu = row.publicflag
			let data={
				lessonid:row.id
			}
			let datax = qs.stringify(data);
			
			if(this.statu=='0'){
				// 关闭
				data.publicflag=1
				let datac = qs.stringify(data);
				this.$confirm('确认关闭吗？', '提示', {}).then(() => {
					api.postPubLes(datac).then(r => {	
						if(r.data.meta.code == '200') {
							this.$message({
								message: '关闭成功',
								type: 'success'
							});
							this.$emit("paging");
						}else{
							return false;
						}  
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消关闭'
					});          
				});
				console.log(row);
			console.log(statu);
			console.log("共享或者关闭")
			}else{
				// 共享
				data.publicflag=0
				let datas = qs.stringify(data);
				this.$confirm('确认共享吗？', '提示', {}).then(() => {
					api.postPubLes(datas).then(r => {	
						if(r.data.meta.code == '200') {
							this.$message({
								message: '共享成功',
								type: 'success'
							});
							this.$emit("paging");
						}else{
							return false;
						}   
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消共享'
					});          
				});
			}
		},
		// 删除备课
		dePubDel(dre){
			this.$confirm('是否确定删除此备课', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let quit2 = new FormData();
				quit2.append("lessonid", dre.id);
				api.postPubDel(quit2).then(r => {
					if (r) {
						if (this.page && this.page.list) {
							this.page.list.splice(dre,1);
						}
						this.$emit("paging");
					}
				})

			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		// 收藏、取消教案
		postFavPub(row){
			// 查看该项是否为收藏状态 如果是则走取消收藏 如果不是 则走收藏
			var statu = row.collectiontype
			let para={
				lessonid:row.id
			}
			
			var qs = require('querystring');
			let datax = qs.stringify(para);
			var _this = this
			if(statu=='0'){
				// 取消收藏
				api.postFavPub(datax).then(r =>{						
					if(r) {
						_this.$message({
							type:'success',
							message: '取消收藏'
						})
						this.$emit("paging");
					}else{
						return false
					}			
				})			
			}else{
				// 收藏
				api.postFavPub(datax).then(r =>{						
					if(r) {
						_this.$message({
							type:'success',
							message: '收藏成功'
						})
						this.$emit("paging");
					}else{
						return false
					}
				})
			}
		},
		// 详情
		jumpCommen(){
			this.bkdetail = true;	
		},
		// 加载
		loadload(row){
			this.bkload = true;
			this.formload.km=row.subjectid;
			this.formload.zj=row.zid;
			this.formload.bkname=row.title;
			this.formload.cont=row.content;
		},
		// 加载时创建备课
		creat(formName){
      		this.$refs[formName].validate(valid => {
				if (valid) {
					var ginseng = new FormData();
					ginseng.append('subjectid',this.formload.km);
					ginseng.append('zid',this.formload.zj);
					ginseng.append('title',this.formload.bkname);
					ginseng.append('content',this.formload.cont);
					ginseng.append('note',this.formload.less);
					// 创建
					this.$confirm('确认创建吗？', '提示', {}).then(() => {
						api.postSavePrep(ginseng).then(r => {
							if(r.data.meta.code == 200){	
								this.bkload=false;
								this.$emit("paging");
							}
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消创建'
						});          
					});
				}
			});
		},
		// 取消
		cancel(){
			this.showCreatersearch = false
		},
		bkcancel(){
			this.bkload = false
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
		// 顶部标签
		.tabbox{
			width:1200px;
			margin:0 auto;
			.tabtop{
				height: 55px;
				margin-top: 7px;
				background-color: #fff;
				border-radius: 6px;
				// padding: 0 24px;
				.tableft{
					float: left;
					.el-tabs__header{
						margin: 0;
						height: 55px;
						border-bottom: 0;
						.el-tabs__nav{
							height: 55px;
							line-height: 55px;
							margin-left: 20px;
							.el-tabs__item{
								color: #333;
							}
							.el-tabs__item.is-active{
								color: #208af5;
							}
						}
					}
				}
				.tabright{
					float: right;
					height: 18px;
					// line-height: 55px;
					margin-top: 7px;
					cursor: pointer;
					overflow: hidden;
					margin-top: 18px;
					margin-right: 20px;
					span{
						display: inline-block;
						// float: right;
					}
					i{	
						width: 9px;
						height: 15px;
						background:url("../../../assets/researchCenter/return.png") 0 0 no-repeat; 
						display: inline-block;
						float: right;
						margin-left: 6px;
						margin-top: 2px;
					}
				}
			}
		}
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
						overflow: hidden;
						height: 40px;
						line-height: 40px;
						.cretatbk{
							color:#208af5;
							cursor: pointer;
							float: left;
							margin-right: 20px;
							i{
								width: 16px;
								height: 16px;
								display: inline-block;
								float: left;
								margin-right: 6px;
								margin-top: 4px;
							}
							span{
								display: inline-block;
							}
						}
						.el-form{
							float: left;
						}
					}
					.createicon-bottom{
						height:814px;
						margin-top: 28px;
						.public-list{
							margin-bottom: 26px;
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
									// height: 16px;
									overflow: hidden;
									.info-left{
										float: left;
										li{
											margin-top: 0;
											i{
												width:14px;
												height:16px;
												float:left;
												background:url('../../../assets/researchCenter/sha.png') 0 0 no-repeat;
											}
											span{
												float: left;
												color:#91c604;
												margin-left:6px;
											}
											.clo{
												i{
													background:url('../../../assets/researchCenter/clo.png') 0 0 no-repeat;
												}
												span{
													color:#999;
												}
											}
										}
										// color: #404040;
										// cursor: pointer;
									}
									.dele-right{
										float: right;
										color: #999;
										cursor: pointer;
										ul{
											li{
												margin-top: 0;
												div{
													float: left;
												}
												.delet{
													margin-left:8px;
												}
												.unfav{
													width:16px;
													height:16px;
													float:left;
													background:url('../../../assets/img/orientation/starc.png')
												}
												.fav{
													width:16px;
													height:16px;
													float:left;
													background:url('../../../assets/img/orientation/star.png')
												}
											}
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
				.rich{
					textarea{
						height: 190px;
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
			.rchbtn{
				text-align: center;
			}
			.rch{
				width: 96px;
				height: 42px;
				background-color: #d6d6d6;
				border-color: #d6d6d6;
			}
			.rch-confirm{
				background-color: #208af5;
				border-color: #208af5;
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
		// 弹出加载
		.bk-load{
			.bkbtn{
				text-align: center;
				button{
					width:96px;
					height:42px;
					color:#fff;
					border:0;
				}
				.bkqx{
					background-color: #d6d6d6;
				}
				.bkcreate{
					background-color: #208af5;
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
	.alert-create-rsearch,.bk-load{
		.rich{
			.el-textarea__inner{
				height:190px;
			}
		}
	}
	
	.bk-load{
		.el-form-item__content{
			width:28%;
		}
		.rich{
			.el-form-item__content{
				width:87%;
			}
		}
		.bkbtn{
			.el-form-item__content{
				width:77%;
			}
		}
	}
	.alert-groupset{

	}
</style>