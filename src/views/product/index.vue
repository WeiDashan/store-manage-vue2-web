<template>
	<div>
		<div class="wy_filter">
			<el-button type="primary" plain icon="el-icon-plus" style="float: right;" @click="add"></el-button>
			<div class="clear"></div>
		</div>
		<el-table 
			:data="tableData.records"
			border>
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="标准价格" prop="price"></el-table-column>
      <el-table-column label="商品图片" prop="img">
        <template slot-scope="scope">
          <el-image
              style="width: 80px; height: 80px"
              :src="img(scope.row.img)"
              fit="contain"></el-image>
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
    <el-pagination
        background
        :current-page.sync="query.pageNo"
        layout="prev, pager, next"
        :page-count="tableData.pages"
        @current-change="getTableData">
    </el-pagination>
		<el-dialog 
			width="750px"
			:title="productDialog.title"
			:visible.sync="productDialog.show"
			:close-on-click-modal="false">
			<component 
				v-if="productDialog.show"
				:is="productDialog.component"
				:show.sync="productDialog.show"
				:id="productDialog.id"
				:categoryId="query.categoryId"
				@getTableData="getTableData"></component>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'ProductList',
		data() {
			const module = '/pms-product'
			return {
				tableData: [],
				url:{
					list: module + '/list',
					del: module +'/del'
				},
				query: {
					pageNo: 1,
					pageSize: 4
				},
				productDialog: {
					show: false,
					title: '',
					component: () => import('./add'),
					id: null
				}
			}
		},
		created() {
			this.query.categoryId = parseInt(this.$route.query.categoryId) 
			this.getTableData()
		},
		methods: {
			getTableData() {
				this.get(this.url.list,this.query, response => {
					this.tableData = response
				})
			},
			add() {
				this.productDialog.id = null
				this.productDialog.show = true
				this.productDialog.title = '添加商品'
			},

      //修改商品
			update(id) {
        console.log("修改："+id)
				this.productDialog.id = id
				this.productDialog.show = true
				this.productDialog.title = '修改商品'
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
