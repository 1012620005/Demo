<template>
	<div class="container">
		<employ-header :showNo="true" type="student"></employ-header>
		<div class="studentContent">
			<router-view></router-view>
		</div>
	</div>
</template>
<script type="text/javascript">
	import employHeader from './employComm/employHeader.vue'
	export default {
		data () {
			return {

			}
		},
		components: {
			employHeader
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	
</style>