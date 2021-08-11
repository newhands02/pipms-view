<template>
  <!-- 操作详情表 -->
  <el-table :data="tableData" height="400px">
    <el-table-column property="" align="center" label="操作列表">
      <el-table-column prop="projectNumber" label="项目编号"></el-table-column>
      <el-table-column property="currentState" label="所在节点">
        <template slot-scope="scope">
          {{scope.row.currentState | convertCurrentNode}}
        </template>
      </el-table-column>
      <el-table-column property="operation" label="操作"></el-table-column>
      <el-table-column property="operator" label="操作人"></el-table-column>
      <el-table-column property="operateTime" label="操作时间"></el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props:{
    tableData:{
      type:Array,
      default:()=>[]
    },
  },
  filters:{
    convertCurrentNode:function(value){
      let text='节点未找到';
      switch(value){
        case 0:text="项目创建";break;
        case 1:text="项目保存，待提交";break;
        case 2:text="项目提交，待管理员审核";break;
        case 3:text="审核通过，待推进人结题";break;
        case 4:text="已结题，待管理员审核";break;
        case 5:text="审核通过，待审核员审核";break;
        case 6:text="审核通过，项目完结";break;
        default:break;
      }
      return text;
    }
  },
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
