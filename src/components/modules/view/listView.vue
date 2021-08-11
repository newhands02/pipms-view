<template>
  <!-- 项目查询模块-项目清单列表 -->
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.projectNumber.toLowerCase().includes(search.toLowerCase()))" border
      style="width: 100%;" @row-click="rowChange" highlight-current-row
      row-key="id" :current-row-key="1" max-height="700px">
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入项目编号可模糊查询"/>
        </template>
        <el-table-column
          prop="section"
          label="版块">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="projectNumber"
          label="项目编号">
        </el-table-column>
        <el-table-column
          prop="projectTitle"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="projectSponsor"
          label="提出人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="finishTime"
          label="结题时间">
        </el-table-column>
        <el-table-column
          prop="currentState"
          label="当前状态">
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="margin-left:5%;">
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
import request from '@/utils/request'
export default {
  data(){
    return{
      tableData:[],
      pageSize:10,
      currentPage:1,
      total:100,
      search:''
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    rowChange(row,column,event){
      this.$emit('change',row.projectNumber);
    },
    getList(){
      let getData=request.get("project/getProjectByAccount");
// let account=this.$storage.get('account');
      let currentPage=this.currentPage;
      let pageSize=this.pageSize;
      getData({currentPage,pageSize}).then(({data})=>{
        this.tableData=data.list;
        this.total=data.total;
      }).catch(error=>{this.$message.error('系统异常')});
    },
//分页方法
    handleSizeChange(val) {
      this.pageSize=val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getList();
    },
  }
}
</script>

<style scoped>

</style>
