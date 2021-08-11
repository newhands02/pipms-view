<template>
  <!-- 表格-项目清单 -->
  <el-table
    :data="tableData" border
    style="width: 100%;" @row-click="testRow" highlight-current-row
    row-key="id" :current-row-key="1" height="300px">
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
  </el-table>
</template>

<script>
export default {
  props:{
    tableData:{
      type:Array
    }
  },
  data(){
    return{

    }
  },
  methods:{
    testRow(row,column,event){
      this.$emit('change',row.projectNumber);
    }
  }
}
</script>

<style scoped>

</style>
