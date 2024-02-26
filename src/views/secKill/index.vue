<template>
  <div>
    <div class="wds_filter">
<!--      <el-input v-model="query.name" placeholder="请输入要查询的昵称"></el-input>-->
<!--      <el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button>-->
      <el-button type="primary" plain icon="el-icon-plus" style="float: right;" @click="add"></el-button>
      <div class="clear"></div>
    </div>
    <el-table
        :data="tableData.records"
        border>
      <el-table-column label="秒杀id" prop="id"></el-table-column>
      <el-table-column label="库存id" prop="stockId"></el-table-column>
      <el-table-column label="商品名称" prop="productName"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <el-image
              style="width: 80px; height: 80px"
              :src="img(scope.row.icon)"
              fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品样式" prop="skuList"></el-table-column>
      <el-table-column label="剩余数量" prop="saleAmount"></el-table-column>
      <el-table-column label="未支付数量" prop="lockAmount"></el-table-column>
      <el-table-column label="成功数量" prop="successAmount"></el-table-column>
      <el-table-column label="秒杀开始时间" prop="startTime"></el-table-column>
      <el-table-column label="秒杀结束时间" prop="endTime"></el-table-column>
    </el-table>
    <el-pagination
        background
        :current-page.sync="query.pageNo"
        layout="prev, pager, next"
        :page-count="tableData.pages"
        @current-change="getTableData">
    </el-pagination>
    <el-dialog
        width="450px"
        :title="secKillDialog.title"
        :visible.sync="secKillDialog.show"
        :close-on-click-modal="false">
      <component
          v-if="secKillDialog.show"
          :is="secKillDialog.component"
          :show.sync="secKillDialog.show"
          :id="secKillDialog.id"
          @getTableData="getTableData"></component>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SecKill',
  data() {
    const module = '/sec-kill'
    return {
      tableData: [],
      url:{
        list: module + '/list',
        del: module +'/del'
      },
      query: {
        pageNo: 1,
        pageSize: 4,
      },
      secKillDialog: {
        show: false,
        title: '',
        component: () => import('./edit'),
        id: null
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.get(this.url.list,this.query, response => {
        this.tableData = response.secKills
        this.tableData.records.forEach((item,index)=>{
          item.productName = response.pmsProducts[index].name
          item.icon = response.pmsProducts[index].img
          let arr = JSON.parse(response.stocks[index].skuList);
          let str = ""
          arr.forEach(obj=>{
            str += obj.value+" ";
          })
          item.skuList = str
        })
      })
    },
    add() {
      this.secKillDialog.id = null
      this.secKillDialog.show = true
      this.secKillDialog.title = '添加用户'
    },
    update(id) {
      this.secKillDialog.id = id
      this.secKillDialog.show = true
      this.secKillDialog.title = '修改用户'
    },
    del(id,active) {
      const txt = active === 0 ? '确定真的要删除该数据吗?' : '确定真的要将数据恢复到有效吗?'
      this.$confirm(txt,'提示',{type: 'warning'}).then(()=>{
        this.post(this.url.del,{id: id, active: active}, () => {
          this.getTableData()
        })
      })
    },
    search(){
      this.query.pageNo = 1
      this.getTableData()
    }
  }
}
</script>

<style>
</style>
