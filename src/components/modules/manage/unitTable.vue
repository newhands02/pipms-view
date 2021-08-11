<template>
  <!-- 表单-单位数据 -->
  <el-table
    :data="tableData" max-height="500px"
    style="width: 80%;margin-left:5%;" border>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop=""
      label="版块">
      <template slot-scope="scope">
        <el-input v-model="scope.row.unitSection"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop=""
      label="单位(系统)">
      <template slot-scope="scope">
        <el-input v-model="scope.row.unitSysName"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="unitRealName"
      label="单位(实际)">
    </el-table-column>
    <el-table-column
      prop=""
      label="单位代码">
      <template slot-scope="scope">
        <el-input v-model="scope.row.unitCode"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop=""
      label="单位管理员">
      <template slot-scope="scope">
        <el-autocomplete
          class="inline-input"
          v-model="scope.row.unitAdmin"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @blur="checkAdminName(scope.row.unitAdmin,scope.$index)"
        ></el-autocomplete>
      </template>
    </el-table-column>
    <el-table-column
      prop="adminMail"
      label="管理员邮箱" width="170px">
    </el-table-column>
    <el-table-column
      prop=""
      label="单位审核员">
      <template slot-scope="scope">
        <el-autocomplete
          class="inline-input"
          v-model="scope.row.unitAuditor"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @blur="checkAuditorName(scope.row.unitAdmin,scope.$index)"
        ></el-autocomplete>
      </template>
    </el-table-column>
    <el-table-column
      prop="auditorMail"
      label="审核员邮箱" width="170px">
    </el-table-column>
    <el-table-column
      prop="lastMaintainUser"
      label="最近维护人">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="small">
          更新
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import request from '@/utils/request'
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
    checkAdminName(inputName,rowIndex){
      let getDisplayName=request.get('getDisplayName');
      getDisplayName({inputName}).then(({data})=>{
        this.tableData[rowIndex].unitAdmin=data.displayName;
      }).catch(error=>{this.$message.error('获取displayName异常')});
    },
    checkAuditorName(inputName,rowIndex){
      let getDisplayName=request.get('getDisplayName');
      getDisplayName({inputName}).then(({data})=>{
        this.tableData[rowIndex].unitAuditor=data.displayName;
      }).catch(error=>{this.$message.error('获取displayName异常')});
    },
    querySearch(queryName,cb) {
      let getdata=request.get("getDisplayNames");
      getdata({queryName}).then(({data})=>{
        this.resultList=data;
      });
      clearTimeout(this.timeout);
      let that=this;
      this.timeout = setTimeout(() => {
        cb(that.resultList);
      }, 3000 * Math.random());
    },
  }
}
</script>

<style scoped>

</style>
