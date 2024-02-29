<template>
	<div class="loginform">
		<h1 class="title">欢迎登录到XXX系统</h1>
		<el-form :model="form" label-width="100px">
			<el-form-item label="登录名">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password" show-password></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" plain size="small" @click="login">登录</el-button>
				<el-button style="float:right" plain size="small" @click="gopwd">找回密码</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
			url: {
				login: '/ums-user/login'
			},
			form: {
				username: '',
				password: ''
			}
    }
  },
  methods: {
		gopwd() {
			this.$emit('update:r',180)
		},
		login() {
			this.post(this.url.login, this.form,response => {
				// console.log(response)
				this.$store.commit('SET_TOKEN',response.token)
				// this.$store.commit('SET_MENU',response.front)
				this.$router.push('/')
			})
		}
  }
}
</script>
<style scoped lang="less">
	@titleheight: 100px;
	.loginform{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: translateZ(1px);
		.title{
			text-align: center;
			height:@titleheight;
			line-height: @titleheight;
		}
		.el-form{
			width: 90%;
		}
	}
	
</style>
