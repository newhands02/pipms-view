<template>
  <!-- 项目清单展示页面，引入@/components/modules/projectQuery/dataTable模块-->
  <div>
    <el-container style="margin-left:5%;">
      <el-form :inline="true" :model="queryArgs" class="demo-form-inline">
        <el-form-item label="所属版块">
          <el-input v-model="queryArgs.section" placeholder="项目版块"></el-input>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-input v-model="queryArgs.unit" placeholder="输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="立项时间">
          <el-date-picker
            v-model="queryArgs.createTime"
            type="date"
            placeholder="选择立项时间"
            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item><br>
        <el-form-item label="结题时间">
          <el-date-picker
            v-model="queryArgs.finishTime"
            type="date"
            placeholder="选择结题时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="成果类型">
          <el-select v-model="queryArgs.resultType" placeholder="请选择" clearable>
            <el-option label="直接减员" value="直接减员"></el-option>
            <el-option label="折合减员" value="折合减员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否自动化">
          <el-radio-group v-model="queryArgs.automaticFlag">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryData()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportData()">导出</el-button>
        </el-form-item>
      </el-form>
    </el-container><br>
    <data-table :tableData="queryResult"></data-table>
    <!-- 分页 -->
    <div style="margin-left:25%;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,60,100,200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" ref="pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/modules/projectQuery/dataTable'
import request from '@/utils/request'
export default {
  components:{
    DataTable
  },
  data(){
    return{
      queryArgs:{

      },
      currentPage:1,
      pageSize:5,
      total:0,
      queryResult:[]
    }
  },
  methods:{
    queryData(){
      this.$http({
        url:'project/getList',
        method:'post',
        params:{
          currentPage:this.currentPage,
          pageSize:this.pageSize
        },
        data:this.queryArgs
      }).then(({data})=>{
        this.queryResult=data.data;
        this.total=data.total;
      }).catch(error=>{this.$message.error('系统异常')})
    },
//分页方法
    handleSizeChange(val) {
      this.pageSize=val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getList();
    },
//文件导出,传入参数：请求路径，this对象
    exportData(){
      this.$http({
        url:'exportProjectList',
        method:'post',
        data:this.queryArgs,
        responseType:'blob'
      }).then(res=>{
        const link=document.createElement("a");
        let blob=new Blob([res.data],{type:"application/vnd.ms-excel"});
        link.style.display="none";
        link.href=URL.createObjectURL(blob);
        link.setAttribute("download",decodeURI(res.headers['filename']));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(error=>{
        this.$message.error('导出文件失败');
      })
    },
  }
}
</script>

<style scoped>

</style>
