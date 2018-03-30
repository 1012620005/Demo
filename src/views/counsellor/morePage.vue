<template>
    <div>
        <fc-header></fc-header>
        <div class="content">
            <return-bar :title="title"></return-bar>
            <div class="sLeave-bottom">
                <div>
                    <div class="con_left_tab">
                        <!-- <ul @click="tabChange($event)">
                            <li data-active='1' class="active_li">@我的</li>
                            <li data-active='2'>学校通知</li>
                            <li data-active='3' v-if="clazzmsg">班级通知</li>
                        </ul> -->
                        <el-tabs type="card"  v-model="tabCur" @tab-click="handleClick">
                            <el-tab-pane label="@我的" name="0"></el-tab-pane>
                            <el-tab-pane label="学校通知" name="2"></el-tab-pane>
                            <el-tab-pane label="班级通知" name="1"></el-tab-pane>
				        </el-tabs>
                    </div>
                    <div class="con_left_tab_con">
                        <ul class="me_about" id="Loading">
                            <li class="tab_con" v-for="item in msg.list" @click="seeDetial(item)">
                                <dl>
                                    <dt >
                                        <img :src="getImg(item.photo)" v-if="item.photo"/>
                                        <img src="../../assets/img/connet/menDefault.png" v-else/>
                                    </dt>
                                    <dd>
                                        <p class="name">
                                            <span v-text="item.createBy"></span>
                                            <!-- <span class="name_role" v-text="item.createBy"></span> -->
                                        </p>
                                        <p class="time" v-text="item.createDate">
                                            
                                        </p>
                                    </dd>
                                </dl>
                                <h4 v-text="item.title"></h4>
                                <p class="tab_text" v-text="item.content"></p>
                                <span class="con_role" v-text="msgTypeList[item.type]"></span>
                            </li>                		
                        </ul>
                    </div>
                    <div class="con_left_tab_con_page">
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="msg.pageNo"
                                :page-size="msg.pageSize"
                                layout="prev, pager, next, jumper"
                                :total="msg.count">
                        </el-pagination>
                    </div>
                </div>                
            </div>
        </div>
        <see-index-detial :form="seeForm" @closeDialog="clearSeeForm"></see-index-detial>	
    </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    import returnBar from '../common/returnBar.vue'
    import userApi from '../../apis/userCenter.js'
    import seeIndexDetial from '../common/seeIndexDetial.vue'
    export default{
        data () {
            return {
                title:'消息通知',
                tabCur: '0',
                msg:{
                   pageNo:1,
                   pageSize:5,
                   count: 1,
                   list:[]
                },
				seeForm:{
					visible: false,
					title: '',
					msgType: '',
					createBy: '',
					createDate: '',
                    content: '',
                    photo: ''
                },
                msgTypeList:['个人通知','班级通知','学校通知','','面试通知']	                
            }
        },
        components:{
            fcHeader,
            returnBar,
            seeIndexDetial
        },
        methods:{
            handleClick (tab,event) {
               var type = tab.name
               this.msg.list = []
               this.msg.pageNo = 1
               this.getMsg(type)
            },
 			seeDetial (obj) {
				this.seeForm.visible = true
				this.seeForm.title = obj.title
				this.seeForm.msgType = obj.type
				this.seeForm.createBy = obj.createBy
				this.seeForm.createDate = obj.createDate
                this.seeForm.content = obj.content
                this.seeForm.photo = obj.photo
			},
			clearSeeForm () {
				this.seeForm.visible = false
				this.seeForm.title = ''
				this.seeForm.msgType = ''
				this.seeForm.createBy = ''
				this.seeForm.createDate = ''
                this.seeForm.content = ''
                this.seeForm.photo = ''			
			},
            getMsg (type) {
                let parmas = {type: type ? type : '0',pageNo: this.msg.pageNo, pageSize:'5'};
    			userApi.findMsg(parmas).then(r=>{
					let page = r.data.data;
                    this.msg.list = page.list;
                    this.msg.count = page.count
				})                
            },
            handleCurrentChange (val) {
                this.msg.pageNo = val
               this.getMsg(this.tabCur)
            },
            getImg(photo){
                return userApi.getCommonShowUrl(photo)
            }
        },
        mounted () {
            this.getMsg()
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../common/css/common.scss';
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
            cursor:pointer;
            dl{
                display:flex;
                dt{
                    width:40px;
                    height:40px;
                    border-radius:50%;
                    overflow:hidden;
                    img{
                        width:100%;
                        height:100%;
                    }
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
</style>
