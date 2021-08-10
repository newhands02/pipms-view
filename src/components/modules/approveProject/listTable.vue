<template>
  <!-- 项目表单数据组件 -->
  <el-table
    :data="tableData" border
    style="width: 100%;">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="section"
      label="所属板块">
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
      prop="projectSponsor"
      label="项目提出人">
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
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="lookInto(scope.row.projectNumber)">查看</el-button>
      </template>
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
    routerPath:{
      type:String
    }
  },
  methods:{
    lookInto(value){
      let str=this.routerPath;
      this.$router.push({
        path:str,
        query:{projectNumber:value}
      });
    }
  }
}
</script>

<style scoped>

</style>
