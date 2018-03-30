 <template>
	<div class="container">
		<employ-header :showNo="showNo" type="company"></employ-header>
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
		
	</div>
</template>
<script type="text/javascript">
   import employHeader from './employComm/employHeader'
	export default {
		data () {
			return {
              showNo: true
			}
		},
		components:{
			employHeader
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.container{
		position:absolute;
		left:0;
		top:0;
		bottom:0;
		right:0;
		background:#f5f5f5;
}
</style>