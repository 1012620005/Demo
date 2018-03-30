<template>
  <div class="overtime">
    <fc-header></fc-header>
    <div class="container">
        <div class="overtime-hd">
            <h5>教职工工资</h5>
            <div class="back clearfix" @click="returnBtn">
                <span>返回</span>
                <i></i>
            </div>
        </div>
        <div class="overtime-bd" style="padding-top:16px;">
            <!-- 选择时间 -->
            <!-- <div class="grid-time">
                <span>选择时间</span>
                <el-date-picker v-model="startTime" type="datetime" placeholder="开始时间">
                </el-date-picker>
                <el-date-picker v-model="endTime" type="datetime" :picker-options="endDateOpt" placeholder="结束时间">
                </el-date-picker>
                <el-button type="primary">确定</el-button>
            </div> -->
            <!--列表  -->
            <el-table :data="tableData" style="width: 100%;" v-loading="loading">
                <el-table-column type="index" label="序号" width="55" >
                </el-table-column>
                <el-table-column v-for="(item,key) in list_name" :key="key" :prop="item" width="120" :label="item">
                </el-table-column>
            </el-table> 
            <!-- 分页 -->
            <!-- <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10"
            layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
            </el-pagination> -->
        </div>
    </div>
  </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    import api from '../../apis/fina.js'
    export default {
		data () {
			return {
                startTime: '',
                endTime: '',
                endDateOpt: {
                    disabledDate: (time) => {
                        return time.getTime() < this.startTime;   
                    }
                },
                tableData: [],
                list_name:[],
                loading: false,
                // 当前页
                currentPage: 1,
                total:0,
			}
		},
		components:{
            fcHeader
        },
        methods: {
            // 分页方法
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getFacsaList();
            },
            getFacsaList(){
                this.loading = true;
                api.getFacsaList().then(r=>{
                    if(r){
                        let data =  r.data.data;
                        this.list_name = data['-1']
                        this.tableData =Object.keys(data).slice(0,-1).map(r=>{
                            return data[r]
                        })
                        this.loading = false;
                    }
                })
            },
            returnBtn () {
				this.$router.push('/newIndex')
			}
        },
        mounted(){
            this.getFacsaList();
        }
	}
</script>
<style scoped lang="scss">       
.container{
    width:1200px;
    margin:0 auto;
    position: relative;
    .overtime-hd{
        height:50px;
        line-height:50px;
        background:#fff;
        padding-left:24px;
        padding-right:16px;
        border-radius:5px;
        margin-top:12px;
        margin-bottom:16px;
        h5{
            color:#208af5;
            font-size:16px;
            border-bottom:2px solid #208af5;
            float:left;
            font-weight:bold;
        }
        .back{
            float: right;
            cursor: pointer;
            overflow:hidden;
            span{
                float:left;
            }
            i{
                width:9px;
                height: 15px;
                float:left;
                margin-top:18px;
                margin-left:6px;
                background:url("../../assets/img/overtime/arrow-right.png") 0 0 no-repeat;
            }
        }
    }
    .overtime-bd{
        background:#fff;
        padding-left:24px;
        padding-right:16px;
        border-radius:5px;
        height:100%;
        padding-bottom:100px;
        .grid-time{
            padding:18px 0;
            span{
                margin-right:5px;
            }
            .el-input{
                width:180px;
                margin-right:5px;
            }
        }
        .toolbar{
            margin-top:20px;
        }
    }
    // 遮罩
    .mask{
        z-index: 1;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        // display:none;
        background: rgba(0,0,0,.4);
    }
}
</style>

