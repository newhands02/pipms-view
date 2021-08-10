<template>
  <!-- 项目创建-展示页面 -->
  <div class="formContainer">
    <form-vue :projectParent="project" :beforeList="beforeVideoList"
              :afterList="afterVideoList" :relateList="relateFileList" v-if="dataChange"></form-vue>
    <div class="up" @click="getAccountPorjects()">点击查询</div>
    <div class="create" @click="getInit()">创建新的</div>
    <el-drawer
      title="已创建列表"
      :visible.sync="drawer" :modal="false"
      direction="rtl" size="40%">
      <el-table :data="gridData" height="650px">
        <el-table-column property="projectNumber" label="项目编号" width="150px"></el-table-column>
        <el-table-column property="writeTime" label="填写时间" width="150px"></el-table-column>
        <el-table-column property="updateTime" label="更新时间" width="150px"></el-table-column>
        <el-table-column property="currentState" label="当前状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="matainProject(scope.row.projectNumber)">维护</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-left:15%;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20,60]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next,jumper"
          :total="total" ref="pagination">
        </el-pagination>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import FormVue from '@/components/modules/createProject/form'
import request from '@/utils/request'
export default {
  components:{
    FormVue
  },
  data(){
    return{
      project:{
        writeTime:'',
        updateTime:'',
      },
      gridData:[],
      drawer:false,
      dataChange:true,
      timeId:'',
      beforeVideoList:[],
      afterVideoList:[],
      relateFileList:[],
      pageSize:10,
      currentPage:1,
      total:10,
    }
  },
  mounted(){
    this.getInit();
  },
  methods:{
    getAccountPorjects(){
      this.drawer=true;
      let getData=request.get('project/getProjectByAccount');
      let currentPage=this.currentPage;
      let pageSize=this.pageSize;
      getData({currentPage,pageSize}).then(({data})=>{
        this.gridData=data.list;
        this.total=data.total;
      }).catch(error=>{this.$message.error('系统异常')});
    },
//分页方法
    handleSizeChange(val) {
      this.pageSize=val;
      this.getAccountPorjects();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getAccountPorjects();
    },
    matainProject(projectNumber){
      let getData=request.get('project/getProjectByNumber');
      this.dataChange=false;
      this.cancleCount();
      getData({projectNumber}).then(({data})=>{
        this.project=data.project;
        this.beforeVideoList=data.beforeVideoList;
        this.afterVideoList=data.afterVideoList;
        this.relateFileList=data.relateFileList;
        this.dataChange=true;
      }).catch(error=>{this.$message.error('系统异常')});
    },
//获取初始项目信息
    getInit(){
      let getInit=request.get("project/getInit");
      this.dataChange=false;
      getInit({}).then(({data})=>{
        if(data.code===200){
          this.project=data.project;
          this.startCount();
          this.dataChange=true;
        }else{
          this.$message.warning(data.msg)
        }
      }).catch(error=>{this.$message.error('系统异常')})
    },
    startCount(){
      this.timeId=setInterval(this.getDate,1000);
    },
    getDate(){
      let date=new Date();
      this.project.writeTime=date.toLocaleString();
    },
    cancleCount(){
      clearInterval(this.timeId);
    },
  }
}
</script>

<style scoped>
.formContainer{
  margin-left:40px;
  padding-left: 15px;
  padding-top: 10px;
  border: 2px solid #909399;
  width: 85%;
}
.up{
  height: 50px;
  width: 50px;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0,0,0, .12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
  z-index: 2;
  position: fixed;
  top: 120px;
  right: 80px;
  font-size:20px;
  cursor: pointer;
  line-height: 20px;
}
.create{
  height: 50px;
  width: 50px;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0,0,0, .12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
  z-index: 2;
  position: fixed;
  top: 190px;
  right: 80px;
  font-size:20px;
  cursor: pointer;
  line-height: 20px;
}
</style>
