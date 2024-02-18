<template>
	<div>
		<el-form label-width="100px">
			<el-form-item  v-for="item in skus" :key="item.id" :label="item.name">
				<template v-if="item.addType ===1">
					<el-input v-model="item.addval" style="width: auto;margin-right: 20px;"></el-input> <el-button @click="addItem(item)">添加</el-button>
				</template>
				<el-checkbox-group v-model="item.value" @change="changeCheckbox">
					<el-checkbox v-for="opt in item.inputList.replaceAll('\r','').trim().split('\n')" :key="opt" :label="opt"></el-checkbox>
				</el-checkbox-group>
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
  name: 'SkuForm',
	props: {
		skus: {
			type: Array,
			default: () => {return []}
		},
    stocks:{
      type: Array,
      default: () => {return []}
    }
	},
  data() {
    return {
    }
  },
  methods: {
		prev() {
			this.$emit('prev')
		},
    changeCheckbox(){
      // console.log("------------------")
      this.skus.splice();
      // console.log(target)
      console.log(this.skus)
      console.log(this.stocks)
      //
      // console.log("------------------")
    },

    // 仅限于两个sku的组合
    getSkuCombination(skus, arrayall, tempCom, tempIndex){
      if (tempIndex === skus.length){
        arrayall.push(JSON.parse(JSON.stringify({skuList: tempCom})))
      }
      else{
        for (let i=0;i<skus[tempIndex].value.length;i++){
          let tempCom2 = JSON.parse(JSON.stringify(tempCom))
          tempCom2.push({name: skus[tempIndex].name, value: skus[tempIndex].value[i]})
          this.getSkuCombination(skus, arrayall, tempCom2, tempIndex+1);
        }
      }

    },
		next() {
      // 判断是否选择值
      // console.log("---sku---")
      // console.log(this.skus)

			for(let i = 0; i < this.skus.length; i++) {
				if(this.skus[i].value.length === 0) {
					this.$message.error(this.skus[i].name + '必须选择值')
					return
				}
			}
      //构造数组存储所有sku组合的的stockList
      let arrayall = []
      let tempCom = []
      this.getSkuCombination(this.skus, arrayall, tempCom, 0)

      //将新增的sku组合增加至stock中
      if (this.stocks.length!==0){
        let productId = this.stocks[0].productId
        arrayall.forEach((element)=>{
          let flag = false
          for (let i=0;i<this.stocks.length;i++){
            if (JSON.stringify(element.skuList) === JSON.stringify(this.stocks[i].skuList)){
              flag = true;
              break;
            }
          }
          //如果不在stock中，则需要新增
          if (flag === false){
            let target = element
            target.stock = 0
            target.price = 0
            target.productId = productId
            this.stocks.push(JSON.parse(JSON.stringify(target)))
          }
        })
        this.$emit('setStock',this.stocks)
      }else{
        arrayall.forEach((element)=>{
          element.stock = 0
          element.price = 0
        })
        this.$emit('setStock', arrayall)
      }


      //保存sku
			const skus = []
			for(let i = 0; i < this.skus.length; i++) {
				skus.push(JSON.stringify(this.skus[i]))
			}
			this.$emit('setForm',{skus: skus})
			this.$emit('next')
		},
		query() {
			console.log(this.skus)
		},
		addItem(item){
			item.inputList += '\n' + item.addval
			item.addval = ''
		}
  }
}
</script>
<style scoped lang="less">
</style>
