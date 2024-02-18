<template>
	<div>
		<el-form ref="form" :rules="rules" :model="form" label-width="100px">
			<el-form-item v-if="imgUrlForm.file==null" label="商品图片" prop="file">
				<uploadone v-model="form.file"></uploadone>
			</el-form-item>
			<el-form-item v-if="imgUrlForm.file==null" label="商品相册" prop="files">
				<uploadmore v-model="form.files"></uploadmore>
			</el-form-item>

      <el-form-item label="商品图片" prop="file" v-if="imgUrlForm.file!=null">
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            >
          <img v-if="imgUrlForm.file.url" :src="imgUrlForm.file.url" class="avatar" style="width: 100px;height: 100px" alt="">
<!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        </el-upload>
      </el-form-item>

      <el-form-item label="商品相册" prop="file" v-if="imgUrlForm.file!=null">
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
        >
          <img v-for="item in imgUrlForm.files" :key="item.name" :src="item.url" class="avatar" alt="" style="width: 100px;height: 100px">
<!--          <i v-if="imgUrlForm.file.url" class="el-icon-plus avatar-uploader-icon"></i>-->
        </el-upload>
      </el-form-item>

			<el-form-item>
				<el-button @click="prev">上一步</el-button>
				<el-button type="primary" size="small" @click="next">下一步</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>

export default {
  props: {
    imgUrlForm: {
      type: Object,
      default: () => { return {
        file: null,
        files: []
      }}
    },
  },
  name: 'ImgForm',
  data() {
    return {
			form: {
				file: null,
				files: []
			},
			rules: {
				file: [
					{required: true, message: '请上传图片', trigger: 'blur'}
				],
				files: [
					{required: true, message: '请上传相册', trigger: 'blur'}
				]
			}
    }
  },
  methods: {
		next() {
      if (this.imgUrlForm.file==null){
        this.$refs['form'].validate(valid => {
          if(valid) {
            this.$emit('setForm',this.form)
            this.$emit('next')
          }
        })
      }else{
        this.$emit('next')
      }
		},
		prev() {
			this.$emit('prev')
		}
  }
}
</script>
<style scoped lang="less">
</style>
