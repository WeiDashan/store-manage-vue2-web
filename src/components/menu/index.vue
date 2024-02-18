<template>
	<div>
		<el-menu 
			:router="true">
			<!-- <el-submenu v-for="item in menu" :key="item.id" :index="item.frontUrl">
				<template slot="title">{{item.name}}</template>
				<el-menu-item v-for="child in item.children" :key="child.id" :index="child.frontUrl">{{child.name}}</el-menu-item>
			</el-submenu> -->
			<el-submenu index="/ums">
				<template slot="title">用户和权限</template>
				<el-menu-item index="/user">用户管理</el-menu-item>
				<el-menu-item index="/role">角色管理</el-menu-item>
				<el-menu-item index="/resource">资源管理</el-menu-item>
			</el-submenu>
			<el-submenu index="/pms">
				<template slot="title">品牌和商品</template>
				<el-menu-item index="/brand">品牌管理</el-menu-item>
				<el-menu-item index="/category">分类管理</el-menu-item>
				<el-menu-item index="/product">商品管理</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: 'WyMenu',
		data() {
			return {
				menu: []
			}
		},
		created() {
			this.menu = this.$store.getters.GET_MENU
		}
	}
</script>

<style>
</style>
