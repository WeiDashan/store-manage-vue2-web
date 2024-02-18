<template>
	<div>
		<el-tree 
			ref="wytree"
			:data="resources"
			node-key="id"
			:default-checked-keys="values"
			default-expand-all
			show-checkbox
			:props="{
				label: 'name',
				children: 'children'
			}"></el-tree>
			<el-button type="primary" plain size="small" style="margin-top: 10px;" @click="save">保存</el-button>
	</div>
</template>

<script>
	export default {
		name: 'RoleResource',
		data() {
			const module = '/ums-role-resource'
			return {
				roleId: null,
				resources: [],
				values: [],
				last: [],
				url: {
					getData: module + '/getData',
					save: module + '/save'
				}
			}
		},
		created() {
			this.roleId = this.$route.query.roleId
			this.getData()
		},
		methods: {
			getData() {
				this.get(this.url.getData,{roleId: this.roleId},response => {
					this.resources = response.resources
					for(let i = 0; i < response.values.length; i++) {
						if(response.last.indexOf(response.values[i]) !== -1) {
							this.values.push(response.values[i])
						}
					}
				})
			},
			save() {
				const resourceIds = this.$refs['wytree'].getHalfCheckedKeys().concat( this.$refs['wytree'].getCheckedKeys())
				this.post(this.url.save,{roleId: this.roleId,resourceIds: resourceIds},() =>{})
			}
		}
	}
</script>

<style>
</style>
