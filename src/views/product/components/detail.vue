<template>
	<div>
		<WdsEditor v-model="detailContent" v-if="detailContent!==''"></WdsEditor>
		<div style="margin-top: 20px;">
			<el-button @click="prev" size="small">上一步</el-button>
			<el-button type="primary" size="small" @click="save">保存</el-button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'DetailForm',
  props:{
    detailContent:{
      type: String,
      default: () => {return ''}
    }
  },
  data() {
    return {
			// content: ''
    }
  },
  mounted() {

  },
  methods: {
		prev() {
			this.$emit('prev')
		},
		save() {
			this.$emit('setForm',{detailHtml: this.detailContent})
			this.$emit('save')
		}
  }
}
</script>
<style scoped lang="less">
</style>
