<template>
	<div>
		<div class="wy_filter">
			<el-input v-model="query.name" placeholder="请输入要查询的角色"></el-input>
			<el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button>
			<el-button type="primary" plain icon="el-icon-plus" style="float: right;" @click="add"></el-button>
			<div class="clear"></div>
		</div>
		<el-table 
			:data="tableData"
			border>
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="角色名" prop="name"></el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button size="mini" plain type="primary" @click="users(scope.row.id)">关联用户</el-button>
					<el-button size="mini" plain type="primary" @click="resources(scope.row.id)">关联资源</el-button>
				</template>
			</el-table-column>
			<el-table-column label="是否有效">
				<template slot-scope="scope">
					<span v-if="scope.row.active === 1">有效</span>
					<span v-else>无效</span>
				</template>
			</el-table-column>
			<el-table-column width="150px">
				<template slot-scope="scope">
					<template v-if="scope.row.active === 1">
						<el-button type="primary" plain @click="update(scope.row.id)" size="mini">修改</el-button>
						<el-button type="danger" plain @click="del(scope.row.id,0)" size="mini">删除</el-button>
					</template>
					<template v-else>
						<el-button type="danger" plain @click="del(scope.row.id,1)" size="mini">恢复到有效</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog 
			width="450px"
			:title="userDialog.title" 
			:visible.sync="userDialog.show"
			:close-on-click-modal="false">
			<component 
				v-if="userDialog.show"
				:is="userDialog.component"
				:show.sync="userDialog.show"
				:id="userDialog.id"
				@getTableData="getTableData"></component>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'RoleList',
		data() {
			const module = '/ums-role'
			return {
				tableData: [],
				url:{
					list: module + '/list',
					del: module +'/del'
				},
				query: {
					name: ''
				},
				userDialog: {
					show: false,
					title: '',
					component: () => import('./edit'),
					id: null
				}
			}
		},
		created() {
			this.getTableData()
		},
		methods: {
			getTableData() {
				this.get(this.url.list,this.query, response => {
					this.tableData = response
				})
			},
			add() {
				this.userDialog.id = null
				this.userDialog.show = true
				this.userDialog.title = '添加角色'
			},
			update(id) {
				this.userDialog.id = id
				this.userDialog.show = true
				this.userDialog.title = '修改角色'
			},
			del(id,active) {
				const txt = active === 0 ? '确定真的要删除该数据吗?' : '确定真的要将数据恢复到有效吗?'
				this.$confirm(txt,'提示',{type: 'warning'}).then(()=>{
					this.post(this.url.del,{id: id, active: active}, () => {
						this.getTableData()
					})
				})
			},
			search(){
				this.query.pageNo = 1
				this.getTableData()
			},
			users(roleId) {
				this.$router.push({
					path: '/roleusers',
					query: {
						roleId: roleId
					}
				})
			},
			resources(roleId) {
				this.$router.push({
					path: '/roleresource',
					query: {
						roleId: roleId
					}
				})
			}
		}
	}
</script>

<style>
</style>
