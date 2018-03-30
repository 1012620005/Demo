<template>
	<div class="container">
		<!--主体模块-->
        <!--<el-row :span="24" class="mainbox">-->
            <!--<div class="mainnextbox">-->
                <!--左侧教研-->
                <!--<el-col :span="18" class="create-research">
                    <div class="createicon-top" @click="createrSearch">
                        <i><img src="../../../assets/researchCenter/create.png" alt=""></i>
                        <span>创建教研</span>
                    </div>
                    <div class="createicon-bottom">
                        <el-row :gutter="20" class="listbox">
                            <el-col :span="6" class="public-list list1">
                                <ul class="publist">
                                    <li>
                                        <ul>
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">三角函数讨论</li>
                                            <li class="list-initiator">发起人：<span>崔亚</span></li>
                                            <li class="list-endtime">结束时间：<span>2017-05-02 10:13:48</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <i><img src="../../../assets/researchCenter/chat.png" alt=""></i>
                                            <span>0/1</span>
                                        </div>
                                        <div class="dele-right">
                                            <span>删除</span>
                                            <i><img src="../../../assets/researchCenter/delet.png" alt=""></i>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6" class="public-list list1">
                                <ul class="publist">
                                    <li>
                                        <ul>
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">三角函数讨论</li>
                                            <li class="list-initiator">发起人：<span>崔亚</span></li>
                                            <li class="list-endtime">结束时间：<span>2017-05-02 10:13:48</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <i><img src="../../../assets/researchCenter/chat.png" alt=""></i>
                                            <span>0/1</span>
                                        </div>
                                        <div class="dele-right">
                                            <span>删除</span>
                                            <i><img src="../../../assets/researchCenter/delet.png" alt=""></i>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6" class="public-list list1">
                                <ul class="publist">
                                    <li>
                                        <ul>
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">三角函数讨论</li>
                                            <li class="list-initiator">发起人：<span>崔亚</span></li>
                                            <li class="list-endtime">结束时间：<span>2017-05-02 10:13:48</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <i><img src="../../../assets/researchCenter/chat.png" alt=""></i>
                                            <span>0/1</span>
                                        </div>
                                        <div class="dele-right">
                                            <span>删除</span>
                                            <i><img src="../../../assets/researchCenter/delet.png" alt=""></i>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6" class="public-list list1">
                                <ul class="publist">
                                    <li>
                                        <ul>
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">三角函数讨论</li>
                                            <li class="list-initiator">发起人：<span>崔亚</span></li>
                                            <li class="list-endtime">结束时间：<span>2017-05-02 10:13:48</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <i><img src="../../../assets/researchCenter/chat.png" alt=""></i>
                                            <span>0/1</span>
                                        </div>
                                        <div class="dele-right">
                                            <span>删除</span>
                                            <i><img src="../../../assets/researchCenter/delet.png" alt=""></i>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6" class="public-list list1">
                                <ul class="publist">
                                    <li>
                                        <ul>
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">三角函数讨论</li>
                                            <li class="list-initiator">发起人：<span>崔亚</span></li>
                                            <li class="list-endtime">结束时间：<span>2017-05-02 10:13:48</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <i><img src="../../../assets/researchCenter/chat.png" alt=""></i>
                                            <span>0/1</span>
                                        </div>
                                        <div class="dele-right">
                                            <span>删除</span>
                                            <i><img src="../../../assets/researchCenter/delet.png" alt=""></i>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6" class="public-list list1">
                                <ul class="publist">
                                    <li>
                                        <ul>
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">三角函数讨论</li>
                                            <li class="list-initiator">发起人：<span>崔亚</span></li>
                                            <li class="list-endtime">结束时间：<span>2017-05-02 10:13:48</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <i><img src="../../../assets/researchCenter/chat.png" alt=""></i>
                                            <span>0/1</span>
                                        </div>
                                        <div class="dele-right">
                                            <span>删除</span>
                                            <i><img src="../../../assets/researchCenter/delet.png" alt=""></i>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6" class="public-list list1">
                                <ul class="publist">
                                    <li>
                                        <ul>
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">三角函数讨论</li>
                                            <li class="list-initiator">发起人：<span>崔亚</span></li>
                                            <li class="list-endtime">结束时间：<span>2017-05-02 10:13:48</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <i><img src="../../../assets/researchCenter/chat.png" alt=""></i>
                                            <span>0/1</span>
                                        </div>
                                        <div class="dele-right">
                                            <span>删除</span>
                                            <i><img src="../../../assets/researchCenter/delet.png" alt=""></i>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6" class="public-list list1">
                                <ul class="publist">
                                    <li>
                                        <ul>
                                            <li class="top-icon">
                                                <img src="../../../assets/researchCenter/icon.png" alt="">
                                            </li>
                                            <li class="list-title">三角函数讨论</li>
                                            <li class="list-initiator">发起人：<span>崔亚</span></li>
                                            <li class="list-endtime">结束时间：<span>2017-05-02 10:13:48</span></li>
                                        </ul>
                                    </li>
                                    <li class="list-last">
                                        <div class="info-left">
                                            <i><img src="../../../assets/researchCenter/chat.png" alt=""></i>
                                            <span>0/1</span>
                                        </div>
                                        <div class="dele-right">
                                            <span>删除</span>
                                            <i><img src="../../../assets/researchCenter/delet.png" alt=""></i>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage3"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000">
                        </el-pagination>
                    </div>
                </el-col>-->
                <!--右侧群组-->
                <!--<el-col :span="6" class="create-group">
                    <div class="my-group">
                        <div class="group-top">
                            <div class="group-name">我的群组</div>
                            <div class="group-icon">
                                <div class="icon-insid">
                                    <span @click="newGroup"><img src="../../../assets/researchCenter/green-add.png" alt=""></span>
                                </div>
                            </div>
                        </div>
                        <el-collapse accordion class="newt-group">
							<el-collapse-item>
								<template slot="title">
									组一
									<div class="funtitle">
										<div class="closetitle"></div>
										<div class="settitle" @click="groupset"></div>
									</div>
								</template>
								<ul>
									<li class="zuzhang"><span><img src="../../../assets/researchCenter/head-portrait.png" alt="">刘宇男（组长）</span></li>
									<li><span><img src="../../../assets/researchCenter/head-portrait.png" alt="">往西</span></li>
									<li><span><img src="../../../assets/researchCenter/head-portrait.png" alt="">往西</span></li>
								</ul>
							</el-collapse-item>
						</el-collapse>
                    </div>
                </el-col>-->
            <!--</div>-->
        <!--</el-row>-->
		<!--弹出群设置-->
		<!--<div class="alert-groupset" v-if="showGroupset">
			<div class="newgroup-top">
				<div class="new-cluster">
					<i><img src="../../../assets/researchCenter/newgroup.png" alt=""></i>
					<span>群设置</span>
				</div>
				<div class="newgroup-close" @click="groupClose">
					<img src="../../../assets/researchCenter/close.png" alt="">
				</div>
			</div>
			<div class="newgroup-main">
				<el-form ref="form" :model="form" label-width="82px">
					<el-form-item label="群组名称:" class="name-group">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<div class="fudong">
						<el-form-item label="校区:" class="area">
							<el-select v-model="form.area" placeholder="">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="院系:" class="departments">
							<el-select v-model="form.departments" placeholder="">
								<el-option label="院系一" value="shanghai"></el-option>
								<el-option label="院系二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="专业:" class="majors">
							<el-select v-model="form.majors" placeholder="">
								<el-option label="专业一" value="shanghai"></el-option>
								<el-option label="专业二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="search-group">
							<el-input placeholder="请输入教职工姓名" icon="search" v-model="form.search" :on-icon-click="handleIconClick"></el-input>
						</el-form-item>
					</div>
					<div class="teacher-list">
						<div class="teacherlist-name">老师列表:</div>
						<el-checkbox-group v-model="form.teacherList">
							<el-checkbox label="崔亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚0" name="type"></el-checkbox>
							<el-checkbox label="崔亚1" name="type"></el-checkbox>
							<el-checkbox label="崔亚2" name="type"></el-checkbox>
							<el-checkbox label="崔亚3" name="type"></el-checkbox>
							<el-checkbox label="崔亚4" name="type"></el-checkbox>
							<el-checkbox label="崔亚5" name="type"></el-checkbox>
							<el-checkbox label="崔亚6" name="type"></el-checkbox>
							<el-checkbox label="崔亚7" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚9" name="type"></el-checkbox>
							<el-checkbox label="崔亚10" name="type"></el-checkbox>
							<el-checkbox label="崔亚11" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚4" name="type"></el-checkbox>
							<el-checkbox label="崔亚5" name="type"></el-checkbox>
							<el-checkbox label="崔亚6" name="type"></el-checkbox>
							<el-checkbox label="崔亚7" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚9" name="type"></el-checkbox>
							<el-checkbox label="崔亚10" name="type"></el-checkbox>
						</el-checkbox-group>
						<div class="add-teacher">
							<i><img src="../../../assets/researchCenter/create.png" alt=""></i>
							<span>添加</span>
						</div>
					</div>
					<div class="added-member">
						<div class="added-name">已添加组员:</div>
						<el-checkbox-group v-model="form.addedMember">
							<el-checkbox label="崔亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚0" name="type"></el-checkbox>
							<el-checkbox label="崔亚1" name="type"></el-checkbox>
							<el-checkbox label="崔亚2" name="type"></el-checkbox>
							<el-checkbox label="崔亚3" name="type"></el-checkbox>
							<el-checkbox label="崔亚4" name="type"></el-checkbox>
							<el-checkbox label="崔亚5" name="type"></el-checkbox>
							<el-checkbox label="崔亚6" name="type"></el-checkbox>
							<el-checkbox label="崔亚7" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚9" name="type"></el-checkbox>
							<el-checkbox label="崔亚10" name="type"></el-checkbox>
							<el-checkbox label="崔亚11" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚9" name="type"></el-checkbox>
							<el-checkbox label="崔亚10" name="type"></el-checkbox>
							<el-checkbox label="崔亚11" name="type"></el-checkbox>
						</el-checkbox-group>
						<div class="remove-member">
							<i><img src="../../../assets/researchCenter/remove.png" alt=""></i>
							<span>移除</span>
						</div>
					</div>
					<el-button type="primary" class="newgroup-confirm">确认</el-button>
				</el-form>
			</div>
		</div>-->
		<!--弹出新建群组-->
		<!--<div class="alert-new-group" v-if="showNewgroup">
			<div class="newgroup-top">
				<div class="new-cluster">
					<i><img src="../../../assets/researchCenter/newgroup.png" alt=""></i>
					<span>新建群组</span>
				</div>
				<div class="newgroup-close" @click="newgroupClose">
					<img src="../../../assets/researchCenter/close.png" alt="">
				</div>
			</div>
			<div class="newgroup-main">
				<el-form ref="form" :model="form" label-width="82px">
					<el-form-item label="群组名称:" class="name-group">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<div class="fudong">
						<el-form-item label="校区:" class="area">
							<el-select v-model="form.area" placeholder="">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="院系:" class="departments">
							<el-select v-model="form.departments" placeholder="">
								<el-option label="院系一" value="shanghai"></el-option>
								<el-option label="院系二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="专业:" class="majors">
							<el-select v-model="form.majors" placeholder="">
								<el-option label="专业一" value="shanghai"></el-option>
								<el-option label="专业二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="search-group">
							<el-input placeholder="请输入教职工姓名" icon="search" v-model="form.search" :on-icon-click="handleIconClick"></el-input>
						</el-form-item>
					</div>
					<div class="teacher-list">
						<div class="teacherlist-name">老师列表:</div>
						<el-checkbox-group v-model="form.teacherList">
							<el-checkbox label="崔亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚0" name="type"></el-checkbox>
							<el-checkbox label="崔亚1" name="type"></el-checkbox>
							<el-checkbox label="崔亚2" name="type"></el-checkbox>
							<el-checkbox label="崔亚3" name="type"></el-checkbox>
							<el-checkbox label="崔亚4" name="type"></el-checkbox>
							<el-checkbox label="崔亚5" name="type"></el-checkbox>
							<el-checkbox label="崔亚6" name="type"></el-checkbox>
							<el-checkbox label="崔亚7" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚9" name="type"></el-checkbox>
							<el-checkbox label="崔亚10" name="type"></el-checkbox>
							<el-checkbox label="崔亚11" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚4" name="type"></el-checkbox>
							<el-checkbox label="崔亚5" name="type"></el-checkbox>
							<el-checkbox label="崔亚6" name="type"></el-checkbox>
							<el-checkbox label="崔亚7" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚9" name="type"></el-checkbox>
							<el-checkbox label="崔亚10" name="type"></el-checkbox>
						</el-checkbox-group>
						<div class="add-teacher">
							<i><img src="../../../assets/researchCenter/create.png" alt=""></i>
							<span>添加</span>
						</div>
					</div>
					<div class="added-member">
						<div class="added-name">已添加组员:</div>
						<el-checkbox-group v-model="form.addedMember">
							<el-checkbox label="崔亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚0" name="type"></el-checkbox>
							<el-checkbox label="崔亚1" name="type"></el-checkbox>
							<el-checkbox label="崔亚2" name="type"></el-checkbox>
							<el-checkbox label="崔亚3" name="type"></el-checkbox>
							<el-checkbox label="崔亚4" name="type"></el-checkbox>
							<el-checkbox label="崔亚5" name="type"></el-checkbox>
							<el-checkbox label="崔亚6" name="type"></el-checkbox>
							<el-checkbox label="崔亚7" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚9" name="type"></el-checkbox>
							<el-checkbox label="崔亚10" name="type"></el-checkbox>
							<el-checkbox label="崔亚11" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚亚" name="type"></el-checkbox>
							<el-checkbox label="崔亚9" name="type"></el-checkbox>
							<el-checkbox label="崔亚10" name="type"></el-checkbox>
							<el-checkbox label="崔亚11" name="type"></el-checkbox>
						</el-checkbox-group>
						<div class="remove-member">
							<i><img src="../../../assets/researchCenter/remove.png" alt=""></i>
							<span>移除</span>
						</div>
					</div>
					<el-button type="primary" class="newgroup-confirm">确认</el-button>
				</el-form>
			</div>
		</div>-->
		<!--弹出创建教研-->
		<!--<div class="alert-create-rsearch" v-if="showCreatersearch">
			<div class="creatersearch-top">
				<div class="new-rsearch">
					<i><img src="../../../assets/researchCenter/newgroup.png" alt=""></i>
					<span>创建教研</span>
				</div>
				<div class="newrsearch-close" @click="searchcreaterClose">
					<img src="../../../assets/researchCenter/close.png" alt="">
				</div>
			</div>
			<div class="createresearch-main">
				<el-form ref="form" :model="form" label-width="82px">
					<el-form-item label="活动名称:" class="name-group">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<div class="fudong2">
						<el-form-item label="活动组别:" class="active-group">
							<el-select v-model="form.area" placeholder="请选择活动组别">
								<el-option label="活动一" value="shanghai"></el-option>
								<el-option label="活动二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="结束时间:" class="end-time">
							<el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
						</el-form-item>
					</div>
					<el-form-item label="编辑内容:" class="edit-content">
						<quill-editor></quill-editor>
					</el-form-item>
					<el-form-item label="上传附件:" class="upload-attachments">
						<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<div class="el-upload__tip" slot="tip">提示：上传插件所支持的格式有（视频，音频，图片，文档）上传资源即表示您同意上传服务条款，请勿上传色情、反动等违法违规的内容。</div>
						</el-upload>
					</el-form-item>
					<el-button type="primary" class="createresearch-confirm">确认</el-button>
				</el-form>
			</div>
		</div>-->
		<!--弹出遮罩层-->
		<!--<div class="desk" v-if="showDesk"></div>-->
	</div>
	
</template>
<script type="text/javascript">
// let id=1000;
// export default {
// 	data() {
//       return {
//         activeName: 'first',
// 		currentPage1: 1,
//         currentPage2: 1,
//         currentPage3: 1,
//         currentPage4: 2,
// 		// 群设置
// 		showGroupset:false,
// 		// 新建组
// 		showNewgroup:false,
// 		// 遮罩层
// 		showDesk:false,
// 		// 新建教研
// 		showCreatersearch:false,

// 		form: {
//           name: '',
//           area: '',
//           date1: '',
//           date2: '',
// 		  departments:'',
// 		  majors:'',
//           delivery: false,
//           teacherList: [],
// 		  addedMember:[],
//           resource: '',
//           desc: '',
// 		  search: '',
//         },
// 		value1: '',

//       }
//     },
// 	methods: {
// 	//   右侧群组
// 	  handleNodeClick(data) {
//         console.log(data);
//       },
// 	//   分页
// 	  handleSizeChange(val) {
//         console.log(`每页 ${val} 条`);
//       },
//       handleCurrentChange(val) {
//         console.log(`当前页: ${val}`);
//       },
// 	  handleOpen(key, keyPath) {
//         console.log(key, keyPath);
//       },
//       handleClose(key, keyPath) {
//         console.log(key, keyPath);
//       },
// 	//   右侧群组新建右侧
// 	//   append(store, data) {
//     //     store.append({ id: id++, label: 'testtest', children: [] }, data);
//     //   },
//     //   remove(store, data) {
//     //     store.remove(data);
//     //   },
// 	//   renderContent(h, { node, data, store }) {
//     //     return (
//     //       <span>
//     //         <span>
//     //           <span>{node.label}</span>
//     //         </span>
//     //         <span class="qz-right" style="float: right; margin-right: 20px">
//     //           <span class="shezhi" size="mini" on-click={ () => this.append(store, data) }></span>
//     //           <span class="guanbi" size="mini" on-click={ () => this.remove(store, data) }></span>
//     //         </span>
//     //       </span>
// 	// 	);

//     //   },
// 	//   弹出群设置
// 	  groupset(){
// 		  this.showGroupset=true;
// 		  this.showDesk=true;
// 	  },
// 	  groupClose(){
// 		  this.showGroupset=false;
// 		  this.showDesk=false;
// 	  },
// 	//   弹出新建群组
// 	  newGroup(){
// 		  this.showNewgroup=true;
// 		  this.showDesk=true;
// 	  },
// 	  newgroupClose(){
// 		  this.showNewgroup=false;
// 		  this.showDesk=false;
// 	  },
// 	  onSubmit() {
// 		  console.log('submit!');
// 	  },
// 	  handleIconClick(ev) {
// 		console.log(ev);
// 	  },
// 	  // 弹出创建教研
// 	  createrSearch(){
// 		  this.showCreatersearch=true;
// 		  this.showDesk=true;
// 	  },
// 	  searchcreaterClose(){
// 		  this.showCreatersearch=false;
// 		  this.showDesk=false;
// 	  }
//     },
	
// 	components:{
		
// 	}
// }
</script>
<style type="text/css" lang="scss" scope>
	// body{
	// 	font-size: 14px;
	// 	color: #333;
	// }
	// .container{
	// 	// 主体模块
	// 	.mainbox{
	// 		width:1200px;
	// 		margin: 0 auto;
	// 		margin-top: 20px;
	// 		// color:#333;
	// 		font-size: 14px;
	// 		.mainnextbox{
	// 			width: 100%;
	// 			min-height: 800px;
	// 			background-color: #fff;
	// 			border-radius: 6px;
	// 			padding: 30px 0;
	// 			margin-bottom: 30px;
	// 			overflow: hidden;
	// 			// 左侧教研
	// 			.create-research{
	// 				padding-left: 20px;
	// 				.createicon-top{
	// 					color:#208af5;
	// 					cursor: pointer;
	// 					i{
	// 						width: 16px;
	// 						height: 16px;
	// 						display: inline-block;
	// 						float: left;
	// 						margin-right: 6px;
	// 					}
	// 					span{
	// 						display: inline-block;
	// 					}
	// 				}
	// 				.createicon-bottom{
	// 					margin-top: 28px;
	// 					.public-list{
	// 						margin-bottom: 30px;
	// 						.publist{
	// 							height: 100%;
	// 							padding: 10px;
	// 							box-shadow: 0 0 5px #8fc4fa;
	// 							border-radius: 4px;
	// 							overflow: hidden;
	// 							ul{
	// 								cursor: pointer;
	// 							}
	// 							li{
	// 								margin-top: 14px;
	// 							}
	// 							.top-icon{
	// 								text-align: center;
	// 								border-bottom: 1px solid #eee;
	// 							}
	// 							.list-title{
	// 								font-weight: bold;
	// 								color: #222;
	// 							}
	// 							.list-initiator{
	// 								color: #404040;
	// 							}
	// 							.list-endtime{
	// 								color:#999;
	// 								font-size: 12px;
	// 							}
	// 							.list-last{
	// 								height: 16px;
	// 								overflow: hidden;
	// 								.info-left{
	// 									float: left;
	// 									color: #404040;
	// 									cursor: pointer;
	// 									i{
	// 										float: left;
	// 										margin-right: 6px;
	// 										display: inline-block;
	// 										margin-top: 2px;
	// 									}
	// 									span{
	// 										display: inline-block;
	// 									}
										
	// 								}
	// 								.dele-right{
	// 									float: right;
	// 									color: #999;
	// 									cursor: pointer;
	// 									i{
	// 										display: inline-block;
	// 										float: right;
	// 										margin-left: 6px;
	// 									}
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 				.block{
	// 					text-align: center;
	// 				}
	// 			}
	// 			// 右侧群组
	// 			.create-group{
	// 				padding: 0 20px;
	// 				.my-group{
	// 					border: 1px solid #eee;
	// 					padding-bottom: 50px;
	// 					min-height: 500px;
	// 					.group-top{
	// 						padding: 16px 14px;
	// 						background-color: #dbecac;
	// 						border-radius: 4px;
	// 						text-align: center;
	// 						.group-name{
	// 							display: inline-block;
	// 							font-weight: bold;
	// 							margin-left: 15px;
	// 						}
	// 						.group-icon{
	// 							float: right;
	// 							// overflow: hidden;
	// 							// margin-right: 14px;
	// 							span{
	// 								width: 20px;
	// 								height: 20px;
	// 								display: inline-block;
	// 								cursor: pointer;
	// 								position: relative;
	// 								i{
	// 									width: 7px;
	// 									height:7px;
	// 									background-color: #ef0000;
	// 									border-radius: 4px;
	// 									display: block;
	// 									position: absolute;
	// 									top: -3px;
	// 									right: -3px;
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 				// 列表
	// 				.newt-group{
	// 					ul{
	// 						li{
	// 							height: 30px;
	// 							line-height: 30px;
	// 							margin-bottom: 10px;
	// 							span{
	// 								img{
	// 									width:21px;
	// 									height:21px;
	// 									display: inline-block;
	// 									margin-right: 10px;
	// 									float: left;
	// 									margin-top: 6px;
	// 								}
	// 							}
	// 						}
	// 						.zuzhang{
	// 							color:#208af5;
	// 						}
	// 					}
	// 					.el-collapse-item__header{
	// 						position: relative;
	// 						.funtitle{
	// 							position: absolute;
	// 							top: 0 ;
	// 							right: 0;
	// 							width:80px;
	// 							height: 40px;
	// 							.settitle{
	// 								width:16px;
	// 								height:16px;
	// 								background: url('../../../assets/researchCenter/setting-gry.png') 0 0 no-repeat;
	// 								display: inline-block;
	// 								float: right;
	// 								margin-top: 12px;
	// 								cursor: pointer;
	// 								margin-right: 12px;
	// 							}
	// 							.closetitle{
	// 								width:16px;
	// 								height:16px;
	// 								background: url('../../../assets/researchCenter/close-gry.png') 0 0 no-repeat;
	// 								display: inline-block;
	// 								float: right;
	// 								margin-top: 12px;
	// 								margin-left: 3px;
	// 								margin-right: 12px;
	// 								cursor: pointer;
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
			
	// 	}
	// 	// 弹出群设置
	// 	.alert-groupset{
	// 		width: 620px;
	// 		min-height: 740px;
	// 		background-color: #fff;
	// 		border-radius: 6px;
	// 		z-index: 1000;
	// 		position: fixed;
	// 		top: 50%;
	// 		left: 50%;
	// 		transform:translate(-50%,-50%);
	// 		padding: 18px 20px;
	// 		.newgroup-top{
	// 			height: 32px;
	// 			overflow: hidden;
	// 			.new-cluster{
	// 				float: left;
	// 				overflow: hidden;
	// 				i{
	// 					float: left;
	// 					margin-right: 16px;
	// 				}
	// 				span{
	// 					height: 32px;
	// 					line-height: 32px;
	// 					font-size: 16px;
	// 				}
	// 			}
	// 			.newgroup-close{
	// 				float: right;
	// 				height: 32px;
	// 				line-height: 32px;
	// 			}
	// 		}
	// 		.newgroup-main{
	// 			margin-top: 30px;
	// 			.fudong{
	// 				overflow: hidden;
	// 			}
	// 			.el-form-item__label{
	// 				text-align: left;
	// 			}
	// 			.name-group{
	// 				.el-input{
	// 					width: 193px;
	// 				}
	// 			}
	// 			.area{
	// 				float: left;
	// 				overflow: hidden;
	// 				margin-right: 80px;
	// 				.el-input{
	// 					width: 123px;
	// 				}
	// 			}
	// 			.departments{
	// 				float: left;
	// 				overflow: hidden;
	// 				// margin-right: 129px;
	// 				.el-input{
	// 					width: 123px;
	// 				}
	// 			}
	// 			.majors{
	// 				float: left;
	// 				overflow: hidden;
	// 				.el-input{
	// 					width: 123px;
	// 				}
	// 			}
	// 			.search-group{
	// 				float: left;
	// 				overflow: hidden;
	// 				margin-left: 80px !important;
	// 				// margin-right: 129px;
	// 				.el-form-item__content{
	// 					margin-left: 0 !important;
	// 					.el-input{
	// 						width: 205px;
	// 					}
	// 				}
	// 			}
	// 			.teacher-list{
	// 				overflow: hidden;
	// 				.teacherlist-name{
	// 					margin-bottom: 22px;
	// 				}
	// 				.el-checkbox-group{
	// 					height: 120px;
	// 					overflow: auto;
	// 				}
	// 				.el-checkbox+.el-checkbox{
	// 					margin-left: 0;
	// 				}
	// 				.el-checkbox__label{
	// 					margin-left: 6px;
	// 				}
	// 				.el-checkbox{
	// 					margin-bottom: 20px;
	// 					width: 78px;
	// 				}
	// 				.add-teacher{
	// 					float: right;
	// 					overflow: hidden;
	// 					margin-top: 10px;
	// 					color:#208af5;
	// 					i{
	// 						float: left;
	// 						margin-right: 6px;
	// 					}
	// 				}
	// 			}
	// 			.added-member{
	// 				margin-top: 7px;
	// 				border-top: 1px solid #d2d2d2;
	// 				padding-top: 7px;
	// 				overflow: hidden;
	// 				.added-name{
	// 					margin-bottom: 22px;
	// 				}
	// 				.el-checkbox-group{
	// 					height: 120px;
	// 					overflow: auto;
	// 				}
	// 				.el-checkbox+.el-checkbox{
	// 					margin-left: 0;
	// 				}
	// 				.el-checkbox__label{
	// 					margin-left: 6px;
	// 				}
	// 				.el-checkbox{
	// 					margin-bottom: 20px;
	// 					width: 78px;
	// 				}
	// 				.remove-member{
	// 					float: right;
	// 					overflow: hidden;
	// 					margin-top: 10px;
	// 					color: #ef0000;
	// 					i{
	// 						float: left;
	// 						margin-right: 6px;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		.newgroup-confirm{
	// 			width: 96px;
	// 			height: 42px;
	// 			background-color: #208af5;
	// 			border-color: #208af5;
	// 			margin-top: 24px;
	// 			float: right;
	// 		}
	// 	}
	// 	// 弹出新建群组
	// 	.alert-new-group{
	// 		width: 608px;
	// 		min-height: 684px;
	// 		background-color: #fff;
	// 		border-radius: 6px;
	// 		z-index: 1000;
	// 		position: fixed;
	// 		top: 50%;
	// 		left: 50%;
	// 		transform:translate(-50%,-50%);
	// 		padding: 18px 20px;
	// 		.newgroup-top{
	// 			height: 32px;
	// 			overflow: hidden;
	// 			.new-cluster{
	// 				float: left;
	// 				overflow: hidden;
	// 				i{
	// 					float: left;
	// 					margin-right: 16px;
	// 				}
	// 				span{
	// 					height: 32px;
	// 					line-height: 32px;
	// 					font-size: 16px;
	// 				}
	// 			}
	// 			.newgroup-close{
	// 				float: right;
	// 				height: 32px;
	// 				line-height: 32px;
	// 			}
	// 		}
	// 		.newgroup-main{
	// 			margin-top: 30px;
	// 			.fudong{
	// 				overflow: hidden;
	// 			}
	// 			.el-form-item__label{
	// 				text-align: left;
	// 			}
	// 			.name-group{
	// 				.el-input{
	// 					width: 193px;
	// 				}
	// 			}
	// 			.area{
	// 				float: left;
	// 				overflow: hidden;
	// 				margin-right: 80px;
	// 				.el-input{
	// 					width: 123px;
	// 				}
	// 			}
	// 			.departments{
	// 				float: left;
	// 				overflow: hidden;
	// 				// margin-right: 129px;
	// 				.el-input{
	// 					width: 123px;
	// 				}
	// 			}
	// 			.majors{
	// 				float: left;
	// 				overflow: hidden;
	// 				.el-input{
	// 					width: 123px;
	// 				}
	// 			}
	// 			.search-group{
	// 				float: left;
	// 				overflow: hidden;
	// 				margin-left: 80px !important;
	// 				// margin-right: 129px;
	// 				.el-form-item__content{
	// 					margin-left: 0 !important;
	// 					.el-input{
	// 						width: 205px;
	// 					}
	// 				}
	// 			}
	// 			.teacher-list{
	// 				overflow: hidden;
	// 				.teacherlist-name{
	// 					margin-bottom: 22px;
	// 				}
	// 				.el-checkbox-group{
	// 					height: 120px;
	// 					overflow: auto;
	// 				}
	// 				.el-checkbox+.el-checkbox{
	// 					margin-left: 0;
	// 				}
	// 				.el-checkbox__label{
	// 					margin-left: 6px;
	// 				}
	// 				.el-checkbox{
	// 					margin-bottom: 20px;
	// 					width: 78px;
	// 				}
	// 				.add-teacher{
	// 					float: right;
	// 					overflow: hidden;
	// 					margin-top: 10px;
	// 					color:#208af5;
	// 					i{
	// 						float: left;
	// 						margin-right: 6px;
	// 					}
	// 				}
	// 			}
	// 			.added-member{
	// 				margin-top: 7px;
	// 				border-top: 1px solid #d2d2d2;
	// 				padding-top: 7px;
	// 				overflow: hidden;
	// 				.added-name{
	// 					margin-bottom: 22px;
	// 				}
	// 				.el-checkbox-group{
	// 					height: 120px;
	// 					overflow: auto;
	// 				}
	// 				.el-checkbox+.el-checkbox{
	// 					margin-left: 0;
	// 				}
	// 				.el-checkbox__label{
	// 					margin-left: 6px;
	// 				}
	// 				.el-checkbox{
	// 					margin-bottom: 20px;
	// 					width: 78px;
	// 				}
	// 				.remove-member{
	// 					float: right;
	// 					overflow: hidden;
	// 					margin-top: 10px;
	// 					color: #ef0000;
	// 					i{
	// 						float: left;
	// 						margin-right: 6px;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		.newgroup-confirm{
	// 			width: 96px;
	// 			height: 42px;
	// 			background-color: #208af5;
	// 			border-color: #208af5;
	// 			margin-top: 24px;
	// 			float: right;
	// 		}
	// 	}
	// 	// 弹出创建教研
	// 	.alert-create-rsearch{
	// 		width: 608px;
	// 		height: 610px;
	// 		background-color: #fff;
	// 		border-radius: 6px;
	// 		z-index: 1000;
	// 		position: fixed;
	// 		top: 50%;
	// 		left: 50%;
	// 		transform:translate(-50%,-50%);
	// 		padding:20px 18px;
	// 		.creatersearch-top{
	// 			height: 32px;
	// 			overflow: hidden;
	// 			.new-rsearch{
	// 				float: left;
	// 				overflow: hidden;
	// 				i{
	// 					float: left;
	// 					margin-right: 16px;
	// 				}
	// 				span{
	// 					height: 32px;
	// 					line-height: 32px;
	// 					font-size: 16px;
	// 				}
	// 			}
	// 			.newrsearch-close{
	// 				float: right;
	// 				height: 32px;
	// 				line-height: 32px;
	// 			}
	// 		}
	// 		.createresearch-main{
	// 			margin-top: 35px;
	// 			.fudong2{
	// 				overflow: hidden;
	// 				.active-group{
	// 					float: left;
	// 				}
	// 				.end-time{
	// 					float: right;
	// 				}
	// 			}
	// 			.el-form-item__label{
	// 				text-align: left;
	// 			}
	// 			.name-group{
	// 				.el-input{
	// 					width: 193px;
	// 				}
	// 			}
	// 			.upload-attachments{
	// 				.el-form-item__content{
	// 					line-height: 14px;
	// 					.upload-demo{
	// 						width: 100%;
	// 						.el-upload{
	// 							display: block;
	// 							.el-upload-dragger{
	// 								width: 100%;
	// 								height: 90px;
	// 								.el-icon-upload{
	// 									font-size: 43px;
	// 									margin: 0;
	// 									margin-top: 3px;
	// 								}
	// 								.el-upload__text{
										
	// 								}
	// 							}
	// 						}
	// 						.el-upload__tip{
	// 							color:#ef0000;
	// 							text-align:justify;
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 		.createresearch-confirm{
	// 			width: 96px;
	// 			height: 42px;
	// 			background-color: #208af5;
	// 			border-color: #208af5;
	// 			float: right;
	// 		}
	// 	}
	// 	// 弹出遮罩层
	// 	.desk{
	// 		width: 100%;
	// 		height: 100%;
	// 		background-color: rgba(0, 0, 0, 0.4);
	// 		position: fixed;
	// 		top: 0;
	// 		left: 0;
	// 		z-index: 0;
	// 	}
	// }
</style>