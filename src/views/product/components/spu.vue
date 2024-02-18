<template>
	<div>
		<el-form ref="form" :rules="rules" :model="spuForm" label-width="100px">
			<el-form-item label="商品分类" prop="categoryId">
				<el-cascader 
					v-model="spuForm.categoryId"
					:options="params.categorys"
					:props="{label: 'name', value: 'id'}"
					@change="change"></el-cascader>
			</el-form-item>
			<el-form-item 
				v-for="item in spuForm.spus"
				:key="item.name" 
				:label="item.name">
				<el-input v-model="item.value"></el-input>
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
  name: 'SpuForm',
	props: {
		params: {
			type: Object,
			default: () => { return {}}
		},
    spuForm: {
      type: Object,
      default: () => {
        return {
          categoryId: [],
          spus: []
        }
      }
    }
	},
	created() {
    // console.log(this.params.chosenCategoryIds)
		// if (this.params.chosenCategoryIds!=null){
    //   this.form.categoryId = this.params.chosenCategoryIds
    // }
	},
  data() {
    return {
			// form: {
			// 	categoryId: [],
			// 	spus: []
			// },
			rules: {
				categoryId: [
					{required: true, message: '请选择商品分类', trigger: 'blur'}
				]
			}
    }
  },
  methods: {
		prev() {
			this.$emit('prev')
		},
		next() {
			this.$refs['form'].validate(valid => {
				if(valid) {
					for(let i = 0; i < this.spuForm.spus.length; i++) {
						if(!this.spuForm.spus[i].value) {
							this.$message.error('必须输入所有属性值')
							return
						}
					}
					const spus = []
					for(let i = 0; i < this.spuForm.spus.length; i++) {
						spus.push(JSON.stringify(this.spuForm.spus[i]))
					}
					// console.log(spus)
					this.$emit('setForm',{categoryId: this.spuForm.categoryId, spus: spus})
					this.$emit('next')
				}
			})
		},
		query() {
			
		},
		change(categoryId) {
      console.log(categoryId)
			this.spuForm.spus = []
			this.get('/pms-product/getAttr',{categoryIds: categoryId},response => {
        console.log(response.skus)
				for(let i = 0; i < response.spus.length; i++) {
					this.spuForm.spus.push({name: response.spus[i].name,value: ''})
				}
				for(let i = 0; i < response.skus.length; i++) {
          // console.log(response.skus)
					response.skus[i].value = []
          // response.skus[i].inputList = response.skus[i].inputList.replaceAll("\r","")
					response.skus[i].addval = ''
				}

        console.log(response.skus)

				this.$emit('setSkus',response.skus)
			})
		}
  }
}
</script>
<style scoped lang="less">
	.el-input {
		width: 40%;
	}
</style>
