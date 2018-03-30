<template>
	<div class="display">
		  <li :id="data"  class="listItem"><span><span><span class="itemImg"><img src="static/img/workFlow2.png"/></span>
			     <span>{{ dom }}</span></span><i class="delImg" @click="delBox">X</i></span></li>
		   <i   class="arrows"></i>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {

			}
		},
		props:['data','dom','index'],
		methods:{
			delBox () {
				this.$emit('delBox',this.data,this.index)
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.arrows{
		display:inline-block;
		width:16px;
		height:13px;
		margin-top:8px;
		margin-left:5px;
		background:url(../../assets/img/connet/arrow.png) no-repeat;
		
	}
    .listItem{
    	display:inline-block;
		padding: 4px 3px;
		border-radius:5px;
		margin-left:7px;
		background:#fff;
		.itemImg{
			width:12px;
			height:12px;
			img{
				width:12px;
			}
		}
	}
	.delImg{
		display:inline-block;
		width:8px;
		height:8px;
		font-size:8px;
		cursor:pointer;
	}
	.display{
		float:left;
	}
</style>