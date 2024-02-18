<template>
	<VueEditor useCustomImageHandler @image-added="handleImageAdded" v-model="content"></VueEditor>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'WdsEditor',
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	created() {
		this.content = this.value
	},
	components: {
		VueEditor 
	},
	watch: {
		content: {
			handler(newval) {
				this.$emit('input',newval)
			}
		}
	},
  data() {
    return {
			content: ''
    }
  },
  methods: {
		handleImageAdded(file, Editor, cursorLocation, resetUploader) {
			const formData = new FormData()
			formData.append('file',file)
			this.axios.request('/img/upload',{
				method: 'post',
				data: formData
			}).then(response => {
				Editor.insertEmbed(cursorLocation, "image", this.img(response.data));
				resetUploader()
			})
		}
  }
}
</script>
<style scoped lang="less">
</style>
