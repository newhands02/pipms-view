<template>
  <!-- 侧面导航栏 -->
  <div style="height:101%;background-color: #2f4050">
    <el-menu class="el-menu-vertical-demo"
             @select="handleSelect" :collapse="isCollapse"
             background-color="#2f4050" text-color="#a7b1c2">
      <div style="margin-left:20%;margin-top:5%;">
        <el-avatar shape="circle">
          <img src="../.././assets/logo.png">
        </el-avatar>
      </div>
      <el-submenu index="#">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">流程签审</span>
        </template>
        <el-menu-item index="1" route="approvePage"
                      >管理员审核</el-menu-item>
<!--        v-if="menuArray[4]==1||menuArray[0]==1"-->
        <el-menu-item index="2" route="recheckPage"
                      >管理员复核</el-menu-item>
<!--        v-if="menuArray[4]==1||menuArray[0]==1"-->
        <el-menu-item index="3" route="auditorPage"
                      >审核员审核</el-menu-item>
<!--        v-if="menuArray[5]==1||menuArray[0]==1"-->
      </el-submenu>
      <el-menu-item index="4" route="conclusionPage"
                   >
<!--        v-if="menuArray[6]==1||menuArray[0]==1"-->
        <i class="el-icon-menu"></i>
        <span slot="title">推进人结题</span>
      </el-menu-item>
      <el-menu-item index="5" route="createProject">
<!--        v-if="menuArray[7]==1||menuArray[0]==1"-->
        <i class="el-icon-menu"></i>
        <span slot="title">项目创建</span>
      </el-menu-item>
      <el-submenu index="##">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">项目查询</span>
        </template>
        <el-menu-item index="6" route="projectPreview">项目预览</el-menu-item>
        <el-menu-item index="7" route="projectList">项目清单</el-menu-item>
        <el-menu-item index="8" route="projectSummary">项目汇总</el-menu-item>
      </el-submenu>
      <el-menu-item index="9" route="projectTrace">
        <i class="el-icon-menu"></i>
        <span slot="title">流程跟踪</span>
      </el-menu-item>
      <el-submenu index="###">
<!--        v-if="menuArray[1]==1||menuArray[0]==1"-->
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="10" route="/userManage">用户管理
<!--          v-if="menuArray[1]==1||menuArray[0]==1"-->
        </el-menu-item>
        <el-menu-item index="11" route="/unitManage">单位信息管理
<!--          v-if="menuArray[1]==1||menuArray[0]==1"-->
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data(){
    return{
      path:['管理员审核','管理员复核','审核员审核','推进人结题','项目创建','项目预览','项目清单','项目汇总','流程跟踪','用户管理','单位信息管理'],
      routeName:['approvePage','recheckPage','auditorPage','conclusionPage','createProject','projectPreview','projectList','projectSummary','projectTrace','userManage','unitManage'],
      targetBar:this.realBar,
      pathList:[],
      nameList:[],
      menuArray:[],
    }
  },
  mounted(){
    // this.getRoleType()
  },
  props:{
    isCollapse:{
      type:Boolean,
      default:false
    },
    realBar:{ type:Object} },
  methods:{
    handleSelect(index, indexPath) {
      let routePath=this.routeName[index-1];
      this.pathList.push(routePath);
      this.targetBar.pathList=this.pathList;
      this.$router.push({path:`/${routePath}`});
      let pathName=this.path[index-1];
      this.nameList.push(pathName);
      this.targetBar.nameList=this.nameList;
      this.$emit('change',this.targetBar);
    },
    getRoleType(){
      this.$http({
        url:'getRoleType'
      }).then(({data})=>{
        if(data && data.code===200){
          this.menuArray=data.menuList;
        }
      }).catch(error=>this.$message.error("获取角色信息异常"));
    }
  }
}
</script>
