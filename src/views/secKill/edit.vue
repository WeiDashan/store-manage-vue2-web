<template>
	<div>
		<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="选择库存" prop="secKillStock">
        <el-cascader
            v-model="form.stockId"
            :options="stockList"
            :props="{label: 'name', value: 'id'}"
            @change="change"></el-cascader>
      </el-form-item>

      <el-form-item label="秒杀数量" prop="saleNum">
        <el-input-number v-model="form.saleAmount" :min="1" :max="chosenStock.stock"></el-input-number>
      </el-form-item>
      <el-form-item label="秒杀时间" prop="startTime">
        <el-date-picker
            v-model="secKillTime"
            value-format="timestamp"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            >
        </el-date-picker>
      </el-form-item>
			<el-form-item>
				<el-button type="primary" plain @click="save">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'SecKillEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			if(this.id) {
				this.getone()
			}else{
        this.get(this.url.getAllStockOrderByProduct,{},response => {
          this.stockList = response
          this.stockList.forEach(item=>{
            item.children.forEach(child=>{
              let arr = JSON.parse(child.skuList);
              let str = ""
              arr.forEach(obj=>{
                str += obj.value+" ";
              })
              child.name = str
            })
          })
        })
      }
		},
		data() {
			const module = '/sec-kill'
			return {
				url: {
					save: module + '/saveSecKill',
					getone: module + '/getone',
          getAllStockOrderByProduct: module + '/getAllStockOrderByProduct',
				},
        chosenProduct:{},
        chosenStock:{
          stock: 1,
        },
        secKillTime: '',
				form: {
          stockId: '',
					productId: '',
          saleAmount: '',
					startTime: '',
					endTime: '',
				},
        stockList:[],
				rules: {
					loginName: [
						{ required: true, message: '请输入登录名', trigger: 'blur' },
						{ min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' }
					],
					nickyName: [
						{ required: true, message: '请输入昵称', trigger: 'blur' },
						{ min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' }
					],
					email: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
						{ min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
						{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
					],
				}
			}
		},
		methods: {
			save() {
        if (this.checkStock() && this.checkTime()){
          this.form.stockId = this.chosenStock.id
          this.form.productId = this.chosenStock.productId
          // this.form.startTime = this.secKillTime[0]
          // this.form.endTime = this.secKillTime[1]
          // console.log(this.form)
          this.$notify.info({
            message: '为了方便展示，设置从现在起的20分钟'
          });
          this.post(this.url.save,this.form,() => {
            this.$emit('update:show', false)
            this.$emit('getTableData')
          })
        }

			},
      checkStock(){
        if (this.chosenStock.id === undefined || this.chosenStock.id === null){
          this.$notify.error({
            title: '错误',
            message: '请选择库存'
          });
          return false
        }
        return true
      },
      checkTime(){
        if (this.secKillTime===null || this.secKillTime===""){
          this.$notify.error({
            title: '错误',
            message: '请选择秒杀时间'
          });
          return false
        }
        if (this.secKillTime[0]===null || this.secKillTime[0]===""){
          this.$notify.error({
            title: '错误',
            message: '请选择秒杀时间'
          });
          return false
        }
        if (this.secKillTime[1]===null || this.secKillTime[1]===""){
          this.$notify.error({
            title: '错误',
            message: '请选择秒杀时间'
          });
          return false
        }
        return true
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
      change(item){
        let pid = item[0];
        let sid = item[1];
        this.stockList.forEach(item=>{
          if (item.id===pid){
            this.chosenProduct = item;
            item.children.forEach(item2=>{
              if (item2.id === sid){
                this.chosenStock = item2;
              }
            })
          }
        })
        // console.log(item)
      }
		},
    // setSecKillTime(item){
    //   console.log("-----")
    //   console.log(item)
    //   console.log(this.secKillTime)
    //   console.log("-----")
    // }
	}
</script>

<style>
</style>
