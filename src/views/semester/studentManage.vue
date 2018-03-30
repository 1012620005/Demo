<template>
	<div class="container">
	   <fc-header></fc-header>
		<div class="content">
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				 <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <div class="fontColor label_padding">专业:</div>
                        <el-select v-model="formInline.major" placeholder="专业" clearable  @change="findClazz">
                        <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.majorList"></el-option>
                        </el-select>
                        <div class="fontColor label_padding">年级:</div>
                        <el-select v-model="formInline.year" placeholder="年级" clearable >
                            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.yearList"></el-option>
                        </el-select>
                        <div class="fontColor label_padding">班级:</div>
                        <el-select v-model="formInline.clazz" placeholder="班级" clearable >
                            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.clazzList"></el-option>
                        </el-select>
                        <div class="fontColor label_padding">学期:</div>
                        <el-select v-model="formInline.semester" placeholder="学期" clearable >
                            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.semesterList"></el-option>
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
				      prop="campus"
				      label="学生姓名"  show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="OfficeTitle"
				      label="专业" show-overflow-tooltip width="150">
				    </el-table-column>				    
				    <el-table-column
				      prop="OfficeContent"
				      label="年级" show-overflow-tooltip width="150">
				    </el-table-column>
				    <el-table-column
				      prop="OfficeObejct"
				      label="班级"  width="150">
				    </el-table-column>				    
				    <el-table-column
				      prop="loadTime"
				      label="学生综合评语" width="150" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="officeNote"
				      label="提交时间" show-overflow-tooltip width="100">
				    </el-table-column>	
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
                          <el-button type="text" @click="seeDetial(scope.row)" v-show="scope.row.status">查看评语</el-button>
					      <el-button type="text" @click="editor" class="elEditor" v-show="!scope.row.status">编辑评语</el-button>
				      </template>
				    </el-table-column>				    			    			    
	            </el-table>                                 
            </div>
        </div>
        <!--编辑评语-->
        <el-dialog title="查看评语" :visible.sync="form.seeClassNote" size="tiny" @close="closeForm()">
                  
        </el-dialog>        
        <!--查看评语-->
        <see-comment :form="seeForm"></see-comment>
    </div>
</template>
<script type="text/javascript">
    import fcHeader from '../common/header.vue'
    import returnBar from '../common/returnBar.vue'
    import api from '../../apis/semester.js'
    import commonApi from '../../apis/common.js'
    import seeComment from './seeComment.vue'
    export default {
        data () {
            return {
                title: '学生评语管理',
                formInline:{
                   major: '',
                   majorList:[],
                   clazz: '',
                   clazzList: [],
                   year: '',
                   yearList:[],
                   semester: '',
                   semesterList:[]
                },
                tableData:[{
                    status: 0
                },{
                    stauts: 1
                }],
                seeForm:{

                }
            }
        },
        components:{
            fcHeader,
            returnBar,
            seeComment
        },
        methods:{
            editor () {

            },
            seeDetial () {

            },
            findClazz () {
                
            }
        }
    }    
</script>
<style lang="scss" scoped>
   @import '../../common/css/common.scss';
</style>