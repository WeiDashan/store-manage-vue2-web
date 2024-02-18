<template>
	<div>
		<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
			<el-form-item label="登录名" prop="loginName">
				<el-input v-model="form.loginName"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nickyName">
				<el-input v-model="form.nickyName"></el-input>
			</el-form-item>
			<el-form-item v-if="!this.id" label="密码" prop="rawPassword">
				<el-input v-model="form.rawPassword" show-password></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="file">
				<el-upload 
					:file-list="filelist"
					action="http://www.abc.com"
					list-type="picture-card"
					:auto-upload="false"
					:limit="1"
					:on-change="changefile"
					:on-remove="removefile">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" plain @click="save">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'UserEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			if(this.id) {
				this.url.save = '/ums-user/update'
				this.getone()
			} else {
				this.rules.file.push({ required: true, message: '请上传头像', trigger: 'blur' })
			}
		},
		data() {
			const module = '/ums-user'
			return {
				url: {
					save: module + '/add',
					getone: module + '/getone'
				},
				form: {
					loginName: '',
					nickyName: '',
					rawPassword: '',
					phone: '',
					email: '',
					file: null
				},
				filelist: [],
				rules: {
					loginName: [
						{ required: true, message: '请输入登录名', trigger: 'blur' },
						{ min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' }
					],
					nickyName: [
						{ required: true, message: '请输入昵称', trigger: 'blur' },
						{ min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' }
					],
					rawPassword: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ pattern: /^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/,message: '请输入正确的手机号', trigger: 'blur'}
					],
					email: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
						{ min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
						{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
					],
					file: []
				}
			}
		},
		methods: {
			save() {
				this.$refs['myform'].validate((flag) => {
					if(flag) {
						this.post(this.url.save,this.form,() => {
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
					this.filelist.push({
						name: response.icon,
						url: this.img(response.icon)
					})
				})
			},
			changefile(file) {
				this.form.file = file.raw
			},
			removefile() {
				this.form.file = null;
			}
		}
	}
</script>

<style>
</style>
