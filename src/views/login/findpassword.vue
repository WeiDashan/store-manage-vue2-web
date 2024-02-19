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
				<el-form-item label="验证码" prop="code">
					<el-input v-model="form.code"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="rawPassword">
					<el-input v-model="form.rawPassword"></el-input>
				</el-form-item>
				<el-form-item label="重复密码" prop="rePassword">
					<el-input v-model="form.rePassword"></el-input>
				</el-form-item>
				<el-form-item> 
					<el-button type="primary" plain @click="submit">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
  name: '',
  data() {
    const validatePass2 = (rule, value, callback)=>{
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.rawPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
				],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        rawPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        rePassword: [
          {required: true, validator: validatePass2, trigger: 'blur'}
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
			this.$refs['form'].validateField(['username'],valid => {
				if(!valid) {
					this.post('/ums-user/getcode',{loginName: this.form.username}, () => {
						this.dialogTableVisible = true
					})
          this.dialogTableVisible = true
				}
			})
		},

    submit(){
      let checkList = []
      this.$refs['pwdform'].validateField(['code','rawPassword','rePassword'],valid => {
        if(!valid) {
          checkList.push(valid)
          if (checkList.length===3){

            this.post('/ums-user/changePassword',
                {loginName: this.form.username,
                code: this.form.code,
                password: this.form.rawPassword},
                () => {
                  this.dialogTableVisible = false
                  this.form.code = ""
                  this.form.rawPassword = ""
                  this.form.rePassword = ""
            })
          }
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
