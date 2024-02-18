<template>
	<div>
		<el-steps :active="flag" align-center>
			<el-step v-for="item in tabs" :title="item.title" :key="item.title"></el-step>
		</el-steps>
		<div style="margin-top: 30px;">
			<component
				v-for="(item,index) in tabs"
				v-show="index === flag"
				:is="item.component"
				:params="params"
				:skus="skus"
				:stocks="stocks"
        :imgUrlForm="imgUrlForm"
        :baseForm="baseForm"
        :spuForm="spuForm"
        :detailContent="detailContent"
				@prev="prev"
				@setStock="setStock"
				@next="next"
				@setSkus="setSkus"
				@setForm="setForm"
				@save="save"
				:key="item.title"></component>
		</div>
	</div>
</template>

<script>
// import Vue from "./../../main"
	export default {
		name: 'addForm',
    props: {
      id: {
        type: Number,
        default: () => { return null}
      }
    },
		created() {

      if(this.id != null) {
        //如果id不为空，说明是修改操作
        this.getOne()
      } else {
        //如果id为空，说明是新增操作
        this.getData()
      }
			// this.getData()
		},
		data() {
			const module = '/pms-product'
			return {
				url: {
					add: module + '/add',
          getOne: module + '/getOne',
					getData: module + '/getData',
          update: module + '/update'
				},
				flag: 0,
				tabs: [
					{ title: '基本资料', component: () => import('./components/base')},
					{ title: '商品图片', component: () => import('./components/img')},
					{ title: '商品属性', component: () => import('./components/spu')},
					{ title: '关联SKU', component: () => import('./components/sku')},
					{ title: 'SKU库存', component: () => import('./components/stock')},
					{ title: '商品详情', component: () => import('./components/detail')}
				],
        //所有response数据
				params: {},
				skus: [],
				stocks: [],
				form: {
				},
        detailContent: '',
        spuForm: {
          categoryId: [],
          spus: []
        },
        baseForm:{
          name: '',
          price: '',
          brandId: null,
          keywords: ''
        },
        imgUrlForm:{
          file: null,
          files: []
        }
			}
		},
		methods: {

      //新增操作
			getData() {
        // console.log("getData")
				this.get(this.url.getData,{},response => {
          // console.log(response)
					this.delChildren(response.categorys)
					this.params = response
				})
			},

      //修改操作
      getOne(){
        // console.log("getOne"+" id:"+this.id)

        this.post(this.url.getOne,{"id": this.id},response => {
          this.delChildren(response.categorys)
          this.params = response
          this.baseForm.name = response.pmsProduct.name
          this.baseForm.price = response.pmsProduct.price
          this.baseForm.brandId = response.pmsProduct.brandId
          this.baseForm.keywords = response.pmsProduct.keywords


          // spu
          let chosenCategoryIds = []
          chosenCategoryIds = response.pmsProduct.categoryId.split(",")
          chosenCategoryIds.forEach((element,index)=>{
            chosenCategoryIds[index] = parseInt(element.trim())
          })
          this.spuForm.categoryId = chosenCategoryIds
          this.spuForm.spus = response.pmsSpuValue

          // sku
          let skuChosen = []
          skuChosen = response.pmsSkuValue
          skuChosen.forEach((element)=>{
            element.value = element.value
                .replace("[","")
                .replace("]","")
                .replaceAll("\"","")
                .replaceAll("\\r","")
                .trim()
                .split(",")
          })
          this.skus = response.skus
          for(let i = 0; i < this.skus.length; i++) {
            this.skus[i].value = skuChosen[i].value
            this.skus[i].addval = ''
          }

          // 图片列表
          this.imgUrlForm.file = {
            name: response.pmsProduct.img,
            url: this.img(response.pmsProduct.img)
          }

          let files = []
          const imgFileNames = response.pmsProduct.pics.replace(/\s+/g, '').split(",")
          imgFileNames.forEach((element)=>{
            files.push({
              name: element,
              url: this.img(element)
            })
          })
          this.imgUrlForm.files = files;
          // console.log(response)

          this.params.stock.forEach((element)=>{
            element.skuList = JSON.parse(element.skuList)
            element.skuList.forEach((element2)=>{
              element2.value = element2.value.replace("\r","")
            })
          })
          this.setStock(this.params.stock)


          //设置 detailContent
          this.detailContent = this.params.pmsProduct.detailHtml
          // console.log(this.detailContent)
          // console.log(this.params)
        })
      },
      delChildren(items) {
				for(let i = 0; i < items.length; i++) {
					if(items[i].children.length === 0) {
						delete items[i].children
					} else {
						this.delChildren(items[i].children)
					}
				}
			},
			save() {
        if(this.id != null) {
          //如果id不为空，说明是修改操作
          // console.log("修改")
          this.setForm({productId: this.id})
          this.post(this.url.update,this.form,() => {
            this.$emit('update:show', false)
            this.$emit('getTableData')
          })
        } else {
          //如果id为空，说明是新增操作
          // console.log("新增")
          this.post(this.url.add,this.form,() => {
            this.$emit('update:show', false)
            this.$emit('getTableData')
          })
        }

			},
			next() {
				this.flag ++
			},
			prev() {
				this.flag --
			},
			setSkus(value) {
				this.skus = value
			},
			setStock(value) {
				this.stocks = value
			},
			setForm(item) {
				for(let key in item) {
					this.form[key] = item[key]
				}
        // console.log(this.form)
			}
		}
	}
</script>

<style>
</style>
