<template>
  <!-- 单位管理界面 -->
  <div>
    <el-container style="margin-left:5%;">
      <el-form :inline="true" :model="queryArgs" class="demo-form-inline">
        <el-form-item label="版块名称">
          <el-input v-model="queryArgs.unitSection" placeholder="输入版块名称"></el-input>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-input v-model="queryArgs.unitSysName" placeholder="输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="单位代码">
          <el-input v-model="queryArgs.unitCode" placeholder="输入单位代码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUnitList()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container><br>
    <unit-table :tableData="unitList"></unit-table>
    <br>
    <!-- 分页 -->
    <div style="margin-left:25%;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,60,100,200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" ref="pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import UnitTable from '@/components/modules/manage/unitTable'
export default {
  components:{
    UnitTable
  },
  data(){
    return{
      unitList:[],
      queryArgs:{
        unitSection:'',
        unitSysName:'',
        unitCode:''
      },
      currentPage:1,
      pageSize:5,
      total:0,
    }
  },
  mounted(){
    this.getUnitList();
  },
  methods:{
    getUnitList(){
      this.$http({
        url:'unitManage/getInfoList',
        method:'post',
        params:{
          currentPage:this.currentPage,
          pageSize:this.pageSize
        },
        data:this.queryArgs
      }).then(({data})=>{
        if (data&&data.code==200) {
          this.unitList=data.list;
          this.total=data.total;
        }
      }).catch(error=>{this.$message.error('系统异常')})
    },
//分页方法
    handleSizeChange(val) {
      this.pageSize=val;
      this.queryUser();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.queryUser();
    },
  }
}
</script>

<style scoped>

</style>
