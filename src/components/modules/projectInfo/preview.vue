<template>
  <!-- 项目信息预览页面 -->
  <div>
    <el-col :span="10">
      <el-card shadow="hover" class="listContainer">
        <list-view @change="handleRowChange"></list-view>
      </el-card>
    </el-col>
    <el-col :span="13">
      <el-card shadow="hover" class="cardContainer">
        <show-page :project="project" v-if="dataChange"></show-page>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import showPage from '@/components/modules/view/projectView'
import listView from '@/components/modules/view/listView'
import request from '@/utils/request'
export default {
  components:{
    showPage,
    listView
  },
  data(){
    return{
      project:{},
      dataChange:true,
    }
  },
  mounted(){
// this.getList();
  },
  methods:{
    getProject(projectNumber){
      this.dataChange=false;
      let getData=request.get('project/getProjectByNumber');
      getData({projectNumber}).then(({data})=>{
        this.project=data.project;
        this.dataChange=true;
      }).catch(error=>{this.$message.error('系统异常')});

    },
    handleRowChange(val){
      this.getProject(val);
    }
  }
}
</script>

<style scoped>
.cardContainer{
  /* width: 800px; */
  height: 94vh;
  overflow-y: scroll;

}
.listContainer{
  margin-left: 20px;
  height: 100%;
}
</style>
