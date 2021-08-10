<template>
  <!-- 审核员签审数据展示页 -->
  <div>
    <el-card shadow="hover" class="cardClass">
      <list-table :tableData="list" routerPath="auditorApprove"></list-table>
      <!-- 分页 -->
      <div style="margin-left:30%;">
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
    </el-card>
  </div>
</template>

<script>
import listTable from "@/components/modules/approveProject/listTable"
import request from '@/utils/request'
export default {
  components:{
    listTable
  },
  data(){
    return{
      list:[],
      pageSize:10,
      currentPage:1,
      total:0,
    }
  },
  mounted(){
    this.getDataList();
  },
  methods:{
    getDataList(){
      let getMethod=request.get("approve/getAuditorCheckList");
// let adminName=this.$storage.get('name');
      let currentPage=this.currentPage,pageSize=this.pageSize;
      getMethod({currentPage,pageSize}).then(({data})=>{
        this.list=data.list;
        this.total=data.total;
      }).catch(error=>{this.$message.error("系统异常")});
    },
//分页方法
    handleSizeChange(val) {
      this.pageSize=val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getDataList();
    },
  }
}
</script>

<style>
.cardClass{
  width: 80%;
  margin-left: 5%;
}
</style>
