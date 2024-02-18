<template>
	<div>
		<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
			<el-form-item label="角色名" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" plain @click="save">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'RoleEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			if(this.id) {
				this.getone()
			} else {
				this.rules.file.push({ required: true, message: '请上传头像', trigger: 'blur' })
			}
		},
		data() {
			const module = '/ums-role'
			return {
				url: {
					add: module + '/add',
					update: module + '/update',
					getone: module + '/getone'
				},
				form: {
					name: ''
				},
				rules: {
					name: [
						{ required: true, message: '请输入角色', trigger: 'blur' },
						{ min: 1, max: 10, message: '不能超过10个字符', trigger: 'blur' }
					],
				}
			}
		},
		methods: {
			save() {
				this.$refs['myform'].validate((flag) => {
					if(flag) {
						this.post(this.id ? this.url.update : this.url.add,this.form,() => {
							this.$emit('update:show', false)
							this.$emit('getTableData')
						}) 
					}
				})
			},
			getone(){
				this.get(this.url.getone,{id: this.id},response => {
					for(let key in this.form) {
						this.form[key] = response[key]
					}
					this.form.id = response.id
				})
			}
		}
	}
</script>

<style>
</style>
