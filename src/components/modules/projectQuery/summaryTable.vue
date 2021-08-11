<template>
  <!-- 汇总成果展示组件 -->
  <el-table
    :data="tableData"
    style="width: 80%;margin-left:5%;"
    max-height="500" border show-summary>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="section"
      label="所属版块">
    </el-table-column>
    <el-table-column
      prop="unit"
      label="单位">
    </el-table-column>
    <el-table-column
      prop="autoResult"
      label="自动化控员成果">
      <template slot-scope="scope">
        {{scope.row.autoResult | nullFilter}}
      </template>
    </el-table-column>
    <el-table-column
      prop="nonAutoResult"
      label="精益革新控员成果">
      <template slot-scope="scope">
        {{scope.row.nonAutoResult | nullFilter}}
      </template>
    </el-table-column>
    <el-table-column
      prop="total"
      label="控员成果小计">
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
  filters:{
    nullFilter(value){
      if (value==null) {
        return 0
      }
      return value;
    }
  }
}
</script>

<style scoped>

</style>
