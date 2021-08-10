<template>
<!--  标签栏-->
  <el-row>
    <el-col :span="24">
      <div>
        <el-tabs type="card" closable @tab-remove="handleClose" @tab-click="navigate">
          <el-tab-pane label="主页" name="home" key="home" :closable="false"></el-tab-pane>
          <!-- <el-tab-pane disabled></el-tab-pane> -->
          <el-tab-pane
            :key="index"
            v-for="(item, index) in targetList"
            :label="item" :name="getName(routeList[index],index)"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props:{
    targetList:{
      type:Array,
      default:()=>[]
    },
    routeList:{
      type:Array
    }
  },
  data(){
    return{
      currentRoute:''
    }
  },
  methods:{
    handleClose(tagName){
      let tag=tagName.split('-')[0];
      let index=this.routeList.indexOf(tag);
      let nameList=this.targetList;
      nameList.splice(index,1);
      let pathList=this.routeList;
      pathList.splice(index,1);
      let tagObject={};
      tagObject.nameList=nameList;
      tagObject.pathList=pathList;
      this.$emit('change',tagObject);
    },
    navigate(tab){
      let tabName=tab.name;
      this.$router.replace({path:`/${tabName.split('-')[0]}`})
    },
    getName(tag,index){
      return tag+'-'+index;
    }
  }

}
</script>

<style scoped>

</style>
