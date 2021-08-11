<template>
  <!-- 节点信息展示页面 -->
  <div>
    <div style="margin-left:10px;">
      <el-row :gutter="30">
        <el-col :span="10">
          <time-line :activities="timeline"></time-line>
        </el-col>
        <el-col :span="14">
          <detail-table :tableData="nodeList"></detail-table>
        </el-col>
      </el-row><br/>
      <el-row>
        <div>
          <table-data :tableData="projectList" @change="projectNumberChange"></table-data>
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
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import TimeLine from '@/components/modules/projectTrace/timeline'
import DetailTable from '@/components/modules/projectTrace/detailTable'
import TableData from '@/components/modules/projectInfo/infoTable'
import request from '@/utils/request'
export default {
  components:{
    TimeLine,
    DetailTable,
    TableData
  },
  data(){
    return{
      projectList:[],
      timeline:[],
      nodeList:[],
      projectNumber:'',
      pageSize:10,
      currentPage:1,
      total:0,
    }
  },
  mounted(){
    this.getProjectNumber();
    this.getProjectList();
  },
  methods:{
    getProjectNumber(){
      let getInit=request.get('nodeTrace/getInitProjectNumber');
// let account=this.$storage.get('account');
      getInit({}).then(({data})=>{
        this.projectNumber=data.projectNumber;
        this.getTraceData(this.projectNumber);
      }).catch(error=>{this.$message.error('系统异常')});
    },
    getTraceData(projectNumber){
      let getTrace=request.get('nodeTrace/getTraceData');
      getTrace({projectNumber}).then(({data})=>{
        this.nodeList=data.nodeList;
        this.timeline=data.nodeTimeLine;
      }).catch(error=>{this.$message.error('系统异常')});
    },
    getProjectList(){
      let getList=request.get('project/getProjectListByAccount');
      let currentPage=this.currentPage;
      let pageSize=this.pageSize;
      getList({currentPage,pageSize}).then(({data})=>{
        this.projectList=data.list;
        this.total=data.total;
      })
    },
    projectNumberChange(val){
      this.getTraceData(val);
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize=val;
      this.getProjectList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getProjectList();
    },
  }
}
</script>

<style scoped>

</style>
