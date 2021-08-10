<template>
  <!-- 审核员审核 -->
  <el-container>
    <el-card shadow="hover" class="cardContainer" v-if="formVisible">
      <project-form :project="project"></project-form>
    </el-card>
    <el-card class="suggestion">
      <div>
        <span>办理意见</span>
        <el-input type="textarea" v-model="comment"></el-input>
      </div><br>
      <div>
        <el-button type="primary" @click="handlePass">通过</el-button>
        <el-button type="danger" @click="handleReject(1)">驳回至管理员</el-button>
        <el-button type="danger" @click="handleReject(2)">驳回至推进人</el-button>
        <br/><br/>
        <operation-list :tableData="nodeList"></operation-list>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import request from '@/utils/request'
import projectForm from '@/components/modules/approveProject/form'
import operationList from '@/components/modules/approveProject/operationList'
export default {
  data(){
    return{
      project:{},
      projectNumber:'',
      formVisible:true,
      comment:'',
      nodeList:[]
    }
  },
  components:{
    projectForm,
    operationList
  },
  mounted(){
    this.projectNumber=this.$route.query.projectNumber;
    this.getProjectInfo(this.projectNumber);
  },
  methods:{
    getProjectInfo(projectNumber){
      this.formVisible=false;
      let getData=request.get('project/getProjectByNumber');
      getData({projectNumber}).then(({data})=>{
        this.project=data.project;
        this.getNodeList(this.project.projectNumber,this.project.currentStateFlag);
        this.formVisible=true;
      }).catch(error=>{this.$message.error('系统异常');this.formVisible=true;});

    },
    getNodeList(projectNumber,currentState){
      let getData=request.get('nodeTrace/getApproveNodes');
      getData({projectNumber,currentState}).then(({data})=>{
        this.nodeList=data.list;
      }).catch(error=>{this.$messge.error('系统异常')});
    },
//通过
    handlePass(){
      let adminPass=request.post("approve/auditorCheckAdopt");
      let comment=this.comment;
      let projectInfo=this.project;
      adminPass({projectInfo,comment}).then(({data})=>{
        if(data&&data.code===200){
          this.$message.success("审核成功");
          this.$router.push({path:'/auditorPage'});
        }
      }).catch(error=>{this.$message.error("系统异常")});
    },
//驳回
    handleReject(flag){
      let url=flag==1?'auditorRejectToAdmin':'auditorRejectToPromoter';
      let adminPass=request.post(`approve/${url}`);
      let comment=this.comment;
      let projectInfo=this.project;
      adminPass({projectInfo,comment}).then(({data})=>{
        if(data&&data.code===200){
          this.$message.success("驳回成功");
          this.$router.push({path:'/auditorPage'});
        }
      }).catch(error=>{this.$message.error("系统异常")});
    }
  }

}
</script>

<style scoped>
.cardContainer{
  margin-left: 15%;
  width: 600px;
}
.suggestion{
  width: 450px;
}
.test{
  width: 100%;
}
</style>
