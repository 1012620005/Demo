<template>
  <div class="bookCon">
       <div class="bookSearch">
            <!--老师班级通讯录-->
            <div v-show="userType == '2'" class="teachBook">
                <el-form :inline="true" v-model="formInline" class="demo-form-inline" style="margin-bottom:10px;margin-top:16px;">
                            <div class="fontColor labelPadding">校区:</div>
                            <el-select v-model="formInline.campus" placeholder="校区"  clearable  style="width:140px;" @change="findList(formInline.campus,'','')">
                                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.campusList"></el-option>
                            </el-select>
                            <div class="fontColor labelPadding">院系:</div>
                            <el-select v-model="formInline.depart" placeholder="院系"  clearable  style="width:140px;" @change="findList('' , formInline.depart , '')">
                                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.departList"></el-option>
                            </el-select>
                            <div class="fontColor labelPadding">专业:</div>
                            <el-select v-model="formInline.major" placeholder="专业" clearable  style="width:140px;" @change="findList(formInline.campus,formInline.depart,formInline.major)">
                            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.majorList"></el-option>
                            </el-select>
                            <div class="fontColor labelPadding">年级:</div>
                            <el-select v-model="formInline.grade" placeholder="年级" clearable  style="width:140px;" @change="loadClazz(formInline.grade)">
                            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.gradeList"></el-option>
                            </el-select>
                            <div class="fontColor labelPadding">班级:</div>
                            <el-select v-model="formInline.clazz" placeholder="班级" clearable  style="width:140px;" >
                                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.clazzList"></el-option>
                            </el-select>
                            <el-input
                                placeholder="请输入学生姓名"
                                suffix-icon="el-icon-search"
                                v-model="formInline.keyword"
                                style="width:193px;margin-left:10px;"  @blur="getUserList">
                            </el-input>         
		        </el-form>	
            </div>
            <!--学生班级通讯录-->
            <div v-show="userType == '3'">
                <p class="bookConMsg">
                    <span class="bookName">{{ stuMsg.campus }}</span>
                    <span class="bookPad">》</span>
                    <span class="bookName">{{ stuMsg.depart }}</span>
                    <span class="bookPad">》</span>
                    <span class="bookName">{{ stuMsg.major }}</span>
                    <span class="bookPad">》</span>
                    <span class="bookName">{{ stuMsg.clazz }}</span>
                    <span class="bookName bookPadding">总人数</span>
                    <span class="bookColor">{{ stuMsg.totalCount}}</span>
                    <span class="bookName">人</span>
                    <span class="women bookPadd"></span>
                    <span class="bookName">女</span>
                    <span class="bookColor">{{ stuMsg.women}}</span>
                    <span class="bookName">人</span>
                    <span class="men bookPadd"></span>
                    <span class="bookName">男</span>
                    <span class="bookColor">{{ stuMsg.men }}</span>
                     <span class="bookName">人</span>
                </p>
            </div>
       </div>
       <div class="bookList" >
           <div class="bookListSingle" v-for="(item, index) in bookList">
                <div class="bookListSingleItem" @mouseover="bookSale($event,item.id)" @mouseleave="bookOver($event,item.id)">
                    <p class="listPhoto">
                        <img :src="imgUrl(item.photo)" v-if="item.photo"/>
                        <img src="../../assets/img/connet/menDefault.png" v-else-if="!item.photo && item.sex == 1"/>
                        <img src="../../assets/img/connet/womenDefault.png" v-else-if="item.photo && item.sex == 2"/>
                    </p>
                    <p class="listName">
                        <span class="listNameItem">{{item.name}}</span> 
                        <span class="men" v-show="item.sex == 1"></span>
                        <span class="women" v-show="item.sex == 2"></span>
                    </p>
                    <p class="listTel">
                        <i class="telImg"></i>
                        <span class="telNum">{{ item.mobile == ''? '暂无电话' : item.mobile }}</span>    
                    </p>
                    <div class="hiddenBox" v-show="userType == 2 && itemId == item.id">
                        <p class="ParentName paddingBox"><span>家长姓名:</span><span>{{ item.father }}</span></p>
                        <p class="ParentTel"><span>家长电话:</span><span>{{ item.fatherPhone }}</span></p> 
                    </div>
                    <div class="hiddenBox" v-show="userType == 3 && itemId == item.id ">
                        <p class="paddBox"><span class="tuanyuan">团员</span><span class="namePadding nationname">{{ item.nationname }}</span><span class="zaixioa">在校</span></p>
                        <p class="ParentName paddBox"><span>出生日期:</span><span>{{ item.birthday }}</span></p>
                        <p class="ParentTel"><span>家庭住址:</span><span>{{ item.address }}</span></p>
                    </div>
                </div>
           </div>
       </div>
       <div class="con_left_tab_con_page">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="formInline.currentPage"
                    :page-size="formInline.totalSize"
                    layout="prev, pager, next, jumper"
                    :total="formInline.size">
            </el-pagination>
	    </div>	
  </div>
</template>
<script>
import apis from '../../apis/book.js'
import commonFile from '../../apis/commonFile.js'
import userApi from '../../apis/userCenter.js'
export default {
    data () {
        return {
            userType:'',
            formInline:{
                campus:'',
                campusList:[],
                depart:'',
                departList:[],
                major:'',
                majorList:[],
                grade:'',
                gradeList:[],
                clazz:'',
                clazzList:[],
                keyword:'',
                currentPage: 1,
                size: 1,
                totalSize: 12
            },
            stuMsg:{
                campus:'',
                depart:'',
                major:'',
                clazz:'',
                totalCount:'',
                men:'',
                women:''
            },
            bookList:[],
            itemId:''
        }
    },
    methods:{
        findList (sid,deptid,proid) {
           let params = {sid:sid, deptid:deptid, proid:proid};
				userApi.loadOrgByTea(params).then(r=>{
					let map = r.data.data;
					if (sid) {
						if (map && map.dept) {
							this.formInline.departList = map.dept;
							this.getUserList()
						} else {
							this.formInline.departList = [];
						}
					} else if (deptid) {
						if (map && map.pro) {
							this.formInline.majorList = map.pro;
							this.getUserList()
						} else {
							this.formInline.majorList = [];
						}
					} else {
						if (map && map.s) {
							this.formInline.campusList = map.s;
							this.getUserList()
						} else {
							this.formInline.campusList = [];
						}
					}
				});     
        },
        findGradeList () {
            apis.getGradeList().then(res =>{
                if(res) {
                    var data = res.data.data
                    this.formInline.gradeList = data
                }
            })
        },
        loadClazz (clazzId) {
            if(!this.formInline.major) {
                this.$message({
                    type:'error',
                    message:'请选择专业'
                })
                return false
            }
            var data = {
                proid: this.formInline.major,
                gradeid: clazzId
            }
            apis.getClazzList (data).then(res =>{
                if(res) {
                    var data = res.data.data
                    this.formInline.clazzList = data
                    
                }
            })
        },
        handleCurrentChange (val) {
            this.formInline.currentPage =  val
            this.getUserList()
        },
        bookSale (event,id) {
           this.itemId = id
           var target =  event.target.className
           if(target == 'bookListSingleItem') {
               var  div = event.target
                $(div).css({
                   width:'207px',
                   height:'245px',
                   boxShadow: '0px 0px 20px #deeeff',
                   left:'-20px',
                   top:'-20px',
                   background:'#fff',
                   zIndex:'111111'
               })
           }
        },
        bookOver (event,id) {
         this.itemId = ''
          var target =  event.target.className
           if(target == 'bookListSingleItem') {
               var  div = event.target
                $(div).css({
                   width:'176px',
                   height:'187px',
                   boxShadow:'none',
                   left:'0',
                   top:'0',
                   zIndex:'99'
               })
           }
        },
        getUserList () {
            if(this.userType == '2') {
                var data = {
                    pageSize: 12,
                    pageNo: this.formInline.currentPage,
                    sid: this.formInline.campus,
                    deptid: this.formInline.depart,
                    proid: this.formInline.major,
                    gradeid: this.formInline.grade,
                    clazzid: this.formInline.clazz,
                    name: this.formInline.keyword,
                }
                apis.classBooks(data).then(res =>{
                    if(res) {
                        var data = res.data.data
                        this.formInline.size = data.count
                        this.bookList = data.list
                    }
                })
            } else if(this.userType == '3'){
                var data = {
                    pageSize: 12,
                    pageNo: this.formInline.currentPage
                }
                apis.stuClassBooks(data).then(res =>{
                    if (res) {
                        var data =  res.data.data
                        this.formInline.size = data.count
                        this.stuMsg.campus = data.data.clazz.ssname
                        this.stuMsg.depart = data.data.clazz.proname
                        this.stuMsg.major = data.data.clazz.deptname
                        this.stuMsg.clazz = data.data.clazz.clazzname
                        this.stuMsg.women = data.data.female
                        this.stuMsg.men = data.data.male
                        this.stuMsg.totalCount = data.data.total
                        this.bookList = data.list
                    }
                })
            }
        },
        imgUrl (img) {
            return commonFile.getCommonShowUrl(img)
        }
    },
    mounted () {
        this.userType = this.$Cookies.get('userLogin')
        this.findList()
        this.findGradeList()
        this.getUserList()
    }
}
</script>
<style lang="scss" scoped>
    @import '../../common/css/common.scss';
    .bookCon{
        padding: 0 20px;
    }
    .labelPadding{
        padding:0 6px;
    }
    .bookListSingle{
        width:176px;
        height:212px;
        position:relative;
        display:inline-block;
        margin-right:19px;
            &:nth-child(6n){
                margin-right:0;
            }
    }
    .bookListSingleItem{
        width:176px;
        height:187px;
        border-bottom:1px solid #e5f2ff;
        border-left: 1px solid #f6fbff;
        border-right:1px solid #f6fbff;
        border-radius:5px;
        padding-top:24px;
        text-align:center;
        position:absolute;
        left:0;
        top:0;
        z-index:99;
    }
    .listPhoto{
        width:80px;
        height:80px;
        margin:0 auto 20px auto;
        border-radius:50%;
        img{
            width:100%;
        }
    }
    .listName{
        margin-bottom:14px;
    }
    .listNameItem{
        color:#555;
        font-size:16px;
    }
    .men{
        display:inline-block;
        width:13px;
        height:13px;
        background:url(../../assets/img/connet/men.png) no-repeat center center;
    }
    .women{
        display:inline-block;
        width:9px;
        height:13px;
        background:url(../../assets/img/connet/women.png) no-repeat center center;
    }  
    .telImg{
        display:inline-block;
        width: 15px;
        height:17px;
        background:url(../../assets/img/connet/tel.png) no-repeat center center;
    }  
    .telNum{
        color:#555;
        font-size:14px;
    }
    .ParentName{
        color:#666;
        font-size:12px;
    }
    .paddingBox{
        padding-top:26px;
    }
    .ParentTel{
       padding-top:7px;
       color:#666;
       font-size:12px; 
    }
    .bookConMsg{
        padding: 10px 0 30px;
    }
    .bookName{
        font-size:16px;
        color:#333;
    }
    .bookColor{
        color:#e36d6e;
        font-size:16px;
        font-weight:600;
    }
    .bookPadding{
        padding-left:58px;
    }
    .bookPadd{
        margin-left:10px;
    }
    .nationname{
        display:inline-block;
        width:44px;
        height:18px;
        line-height:18px;
        background:#d5e4ff;
        border-radius:5px;
        color:#7797ff;
        font-size:12px;
        margin:0 5px;
    }
    .tuanyuan{
        display:inline-block;
        width:44px;
        height:18px;
        line-height:18px;
        background:#cbe5ff;
        border-radius:5px;
        color:#5daeff;
        font-size:12px;
    }
     .zaixioa{
        display:inline-block;
        width:44px;
        height:18px;
        line-height:18px;
        background:#c3f1e2;
        border-radius:5px;
        color:#59d5ac;
        font-size:12px;
    } 
    .paddBox{
        padding:14px 0 0;
    }  
</style>
<style lang="scss">
.teachBook{

}
</style>

