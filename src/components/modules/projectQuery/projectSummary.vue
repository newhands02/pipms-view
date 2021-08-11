<template>
  <!-- 改善成果汇总展示页面，引用@/components/modules/projectQuery/summaryTable模块 -->
  <div>
    <el-container style="margin-left:5%;">
      <el-form :inline="true" :model="queryArgs" class="demo-form-inline">
        <el-form-item label="所属版块">
          <el-input v-model="queryArgs.section" placeholder="项目版块"></el-input>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-input v-model="queryArgs.unit" placeholder="输入单位名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryData()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportData()">导出</el-button>
        </el-form-item>
      </el-form>
    </el-container><br>
    <summary-table :tableData="queryResult"></summary-table>
  </div>
</template>

<script>
export default {
  name: "projectSummary"
}
</script>

<style scoped>

</style>
