<template>
  <!-- 项目查询，项目数据清单 -->
  <el-table
    :data="tableData"
    style="width: 80%;margin-left:5%;"
    height="500" border>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="section"
      label="所属版块">
    </el-table-column>
    <el-table-column
      prop="projectNumber"
      label="项目编号">
    </el-table-column>
    <el-table-column
      prop="projectTitle"
      label="项目名称">
    </el-table-column>
    <el-table-column
      prop="projectAdress"
      label="落地单位">
    </el-table-column>
    <el-table-column
      prop="projectSponsor"
      label="项目提出人">
    </el-table-column>
    <el-table-column
      prop="projectPromoter"
      label="项目推进人">
    </el-table-column>
    <el-table-column
      prop="projectMemember"
      label="项目成员" show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="unitAdministrator"
      label="单位管理员">
    </el-table-column>
    <el-table-column
      prop="unitAuditor"
      label="单位审核员">
    </el-table-column>
    <el-table-column
      prop="projectType"
      label="项目类型">
    </el-table-column>
    <el-table-column
      prop=""
      label="是否自动化">
      <template slot-scope="scope">
        {{scope.row.automaticFlag | filetBoole}}
      </template>
    </el-table-column>
    <el-table-column
      prop="projectImprovementBefore"
      label="项目改善前" show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="improvePlan"
      label="改善方案" show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="projectImprovementAfter"
      label="项目改善后" show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="projectTypeInvolved"
      label="涉及产品类型">
    </el-table-column>
    <el-table-column
      prop="projectResult"
      label="控员项目成果">
    </el-table-column>
    <el-table-column
      prop="resultType"
      label="成果类型">
    </el-table-column>
    <el-table-column
      prop="writeTime"
      label="填写时间">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间">
    </el-table-column>
    <el-table-column
      prop="finish"
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
  filters:{
    filetBoole(val){
      if (val) {
        return '是';
      }else{
        return '否';
      }
    }
  },
  data(){
    return{
    }
  }
}
</script>

<style scoped>

</style>
