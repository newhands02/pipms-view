<template>
  <!-- 项目操作历史数据展示列表 -->
  <el-table :data="tableData" height="400px">
    <el-table-column property="" align="center" label="操作列表">
      <el-table-column property="operation" label="操作"></el-table-column>
      <el-table-column property="operator" label="操作人"></el-table-column>
      <el-table-column property="comment" label="审核意见"></el-table-column>
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
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>
