<template>
	<!-- 
		块元素
			标签会占满整行,设置高度和宽度都有效果,如果不设置高度则高度随内容填充,如果不设置宽度则会占100%
				div ul li ol p h1~h6等等
		行元素
			标签不会占满整行,设置了高度和宽度之后都无效,默认高度和宽度都随内容填充
			span b i strong em a 等等 
		行内块
			标签不会占满整行,设置了高度和宽度也有效果,如果不设置,默认高度和宽度都随内容填充
			input  img等等
			display: 改变元素的性质
				inline 将元素转换成行元素
				block 将元素转换成块元素
				inline-block 将元素转换成行内块
				none 隐藏元素并脱离文档流
			visibility:hidden
				隐藏元素但不脱离文档流
	-->
	<el-container class="wrap">
		<el-aside width="200px">
			<WyMenu></WyMenu>
		</el-aside>
		<el-container>
			<el-header>
				欢迎来到东软睿购后台管理系统
			</el-header>
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</el-container>

	
</template>

<script>
	import WyMenu from '@/components/menu'
	export default {
		name: 'Index',
		components: {
			WyMenu
		}
	}
</script>

<style scoped lang="less">
	@wyborder: 1px solid #999999;
	@wyheader: 60px;
	.wrap{
		height: 100vh;
		.el-aside{
			border-right: @wyborder;
		}
		.el-header{
			border-bottom: @wyborder;
			line-height: @wyheader;
		}
	}
	
</style>
