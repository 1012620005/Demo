<template>
   <div class="con_left_tab_con_page">
        <el-pagination
			@current-change="handleCurrentChange"
			:current-page.sync="currentPageFuc"
			:page-size="pageSize"
			layout="prev, pager, next, jumper"
			:total="totalCountFuc">
    	</el-pagination>
    </div>
</template>
<script>
export default {
    props:{
         currentPage:'',
         pageSize: 10,
         totalCount: ''
    },
    methods:{
       handleCurrentChange (val) {
           this.$emit('handleCurrentChange',val)
       } 
    },
    computed:{
        currentPageFuc () {
            return this.currentPage
        },
        totalCountFuc () {
            return this.totalCount 
        }   
    }
}
</script>
<style lang="scss">
    .con_left_tab_con_page{
	    height:53px;
	    line-height:53px;
	    text-align:center;
	    background:#fff;
	    padding-top:10px;
    }
</style>


