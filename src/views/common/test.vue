<!--子组件-->
<template>
    <ul>
        <li v-for="item in dataList">{{item}}</li>
    </ul>
</template>
<script>
    export default { props : { dataList : [] }}
</script>
<!--父组件-->
<template>
    <component-child v-bind:data-list="dataList"> </component-child>
    <input v-model="dataInput" v-on:keyup.13="addDataItem()" ></input>
</template>
<script>
    import ComponentChild from './child.vue'
    export default {
        data () {
            return { dataInput: "", dataList : [ 'hello world!','welcome to use vue.js' ] }
        },
        components : { ComponentChild },
        methods : {
            addDataItem () {
                let self = this
                if( !(self.dataInput && self.dataInput.length > 0) ) {
                    return
                }
                self.dataList.push( self.dataInput )
                self.dataInput = ""
            }
        }
    }
</script>


