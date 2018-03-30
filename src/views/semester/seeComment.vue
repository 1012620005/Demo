<template>
    <div>
        <el-dialog title="查看评语" :visible.sync="form.seeClassNote" size="tiny" @close="closeForm()">
                
        </el-dialog>
    </div>
</template>
<script type="text/javascript">
    export default{
        props:{
            form:{
                seeClassNote: Boolean
            }
        },
        methods:{
            closeForm () {

            }         
        }
    }
</script>
<style lang="scss"></style>