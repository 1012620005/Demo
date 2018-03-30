<template>
  <div class="bookCon">
       <div class="bookSearch">
            <div  class="teachBook">
                <el-form :inline="true" v-model="formInline" class="demo-form-inline" style="margin-bottom:10px;margin-top:16px;justify-content:flex-end">
                            <div class="fontColor labelPadding">部门:</div>
                            <el-select v-model="formInline.campus" placeholder=""  clearable  style="width:140px;" @change="getUserList">
                                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.campusList"></el-option>
                            </el-select>
                            <el-input
                                placeholder="请输入教职工姓名"
                                suffix-icon="el-icon-search"
                                v-model="formInline.keyword"
                                style="width:193px;margin-left:10px;" @blur="getUserList">
                            </el-input>         
		        </el-form>	
            </div>
       </div>
       <div class="bookList">
           <div class="bookListSingle" v-for="(item, index) in bookList">
                <div class="bookListSingleItem" @mouseover="bookSale($event,item.id)" @mouseleave="bookOver($event,item.id)">
                    <p class="listPhoto">
                        <img :src="imgUrl(item.photo)" v-if="item.photo" class="imgPhoto"/>
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
                    <div class="hiddenBox" v-show="itemId == item.id">
                        <p class="paddBox"><span class="namePadding nationname">{{ item.positionname }}</span></p>
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
export default {
    data () {
        return {
            userType:'',
            formInline:{
                campus:'',
                campusList:[],
                keyword:'',
                currentPage: 1,
                size: 1,
                totalSize: 12
            },
            bookList:[],
            itemId:''
        }
    },
    methods:{
        findList () {

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
                var data = {
                    pageSize: 12,
                    pageNo: this.formInline.currentPage,
                    deptid: this.formInline.campus,
                    name: this.formInline.keyword,
                }
                apis.teachBooks(data).then(res =>{
                    if (res) {
                        var data = res.data.data
                        this.formInline.size = data.count
                        this.bookList = data.list
                    }
                })
        },
        imgUrl (img) {
            return commonFile.getCommonShowUrl(img)
        }
    },
    mounted () {
        this.userType = this.$Cookies.get('userLogin')
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
    .imgPhoto{
      width: 80px;
      height:80px;
      border-radius:50%;
    } 
</style>
<style lang="scss">
.teachBook{

}
</style>

