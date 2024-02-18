<template>
	<div class="findpassword">
		<h1 class="title">找回密码</h1>
		<el-form ref="form"  :model="form" label-width="100px" :rules="rules">
			<el-form-item label="登录名" prop="username">
				<el-input v-model="form.username"></el-input>
				<el-button plain @click="getCode">获取验证码</el-button>
			</el-form-item>
			<el-form-item style="margin-top: 80px;">
				<el-button type="primary" plain size="small">确定</el-button>
				<el-button style="float:right" plain size="small" @click="goform">回到登录页</el-button>
			</el-form-item>
		</el-form>
		<el-dialog title="修改密码" 
			:visible.sync="dialogTableVisible"
			:append-to-body="true"
		>
			<el-form ref="pwdform"  :model="form" label-width="100px" :rules="rules">
				<el-form-item label="验证码">
					<el-input v-model="form.code"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.rawPassword"></el-input>
				</el-form-item>
				<el-form-item label="重复密码">
					<el-input v-model="form.rePassword"></el-input>
				</el-form-item>
				<el-form-item> 
					<el-button type="primary" plain>确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
			form: {
				username: '',
				code: '',
				rawPassword: '',
				rePassword: ''
			},
			rules: {
				username: [
					{required: true, message: '请输入用户名/邮箱', trigger: 'blur'}
				]
			},
			dialogTableVisible: false
    }
  },
  methods: {
		goform() {
			this.$emit('update:r',0)
		},
		getCode() {
			// this.dialogTableVisible = true
			this.$refs['form'].validateField(['username'],vaild => {
				if(!vaild) {
					this.post('/ums-user/getcode',{username: this.form.username}, () => {
						this.dialogTableVisible = true
					})
				}
			})
		}
  }
}
</script>
<style scoped lang="less">
	@titleheight: 100px;
	.findpassword{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: rotateY(180deg) translateZ(1px);
		.title{
			text-align: center;
			height:@titleheight;
			line-height: @titleheight;
		}
		.el-form{
			width: 90%;
			.el-input{
				width: auto;
				margin-right: 10px;
			}
		}
	}
</style>
