<template>
  <!-- 用户管理页面 -->
  <div>
    <el-container style="margin-left:5%;">
      <el-form :inline="true" :model="queryArgs" class="demo-form-inline">
        <el-form-item label="单位名称">
          <el-input v-model="queryArgs.unit" placeholder="输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="queryArgs.userName" placeholder="输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input v-model="queryArgs.userAccount" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryUser()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container><br>
    <el-container style="margin-left:5%;">
      <add-user></add-user>
    </el-container><br>
    <user-table :tableData="userList" @change="handleTableChange" v-if="reloadTable"></user-table>
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
import UserTable from '@/components/modules/manage/userTable'
import AddUser from '@/components/modules/manage/addUserForm'
export default {
  components:{
    UserTable,
    AddUser
  },
  data(){
    return{
      userList:[],
      queryArgs:{
        unit:'',
        userName:'',
        userAccount:''
      },
      currentPage:1,
      pageSize:5,
      total:0,
      dialogFormVisible: false,
      reloadTable:true
    }
  },
  mounted(){
    this.queryUser();
  },
  methods:{
    queryUser(){
      this.$http({
        url:'userManage/getViewList',
        method:'post',
        params:{
          currentPage:this.currentPage,
          pageSize:this.pageSize
        },
        data:this.queryArgs
      }).then(({data})=>{
        if (data&&data.code==200) {
          this.userList=data.list;
          this.total=data.total;
        }
      }).catch(error=>{this.$message.error('系统异常')})
    },
//分页方法
    handleSizeChange(val) {
      this.pageSize=val;
      this.queryUser();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.queryUser();
    },
    handleTableChange(value){
      if (value) {
        this.queryUser();
        this.reloadTable=false;
        this.$nextTick(()=>{
          this.reloadTable=true;
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
