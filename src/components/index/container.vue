<template>
  <!-- 承载组件的容器 -->
  <div style="height:100%;">
    <el-container style="height:100%;">
      <div>
        <index-side :isCollapse="foldMenu" @change="handlerMenu" :realBar="targetBar"></index-side>
      </div>
      <div style="height:100%;width:100%;overflow-x:hidden;">
        <index-header @change="handlerChange"></index-header>
        <target-bar :targetList="nameList" :routeList="pathList" @change="handlerMenu"></target-bar>
        <index-main></index-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import IndexSide from '@/components/index/SideMenu'
import IndexHeader from '@/components/index/MainPageHeader'
import IndexMain from '@/components/index/MainPage'
import TargetBar from '@/components/index/TargetBar'
export default {
  components:{
    IndexSide,
    IndexHeader,
    TargetBar,
    IndexMain
  },
  data(){
    return{
      foldMenu:true,
      targetBar:{
      },
      nameList:[],
      pathList:[],
    }
  },
  methods:{
    async handlerChange(value){
      this.foldMenu=value;
    },
    async handlerMenu(value){
      this.targetBar=value;
      this.nameList=value.nameList;
      this.pathList=value.pathList;
    },
  }
}
</script>

<style>
.side{
  background-color: black;
}
</style>
