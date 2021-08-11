<template>
  <!-- 表单-添加用户 -->
  <div>
    <el-button type="success" size="medium" @click="openForm()">添加用户</el-button>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :inline="true" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="form.account" @blur="getUserInfo()"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.unit" readonly></el-input>
        </el-form-item><br>
        <el-form-item label="姓名">
          <el-input v-model="form.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" multiple placeholder="请选择">
            <el-option
              v-for="item in roleNames"
              :key="item.value"
              :label="item.label"
              :value="item.value" >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleSubmit()">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data(){
    return{
      form:{
        account:'',
        unit:'',
        name:'',
        role:[8]
      },
      roleNames:[],
      dialogFormVisible:false
    }
  },
  methods:{
    openForm(){
      this.dialogFormVisible = true;
      this.getRoleMap();
    },
    getUserInfo(){
      let getUnit=request.get("userManage/getUserInfo");
      let account=this.form.account;
      getUnit({account}).then(({data})=>{
        if (data) {
          this.form.unit=data.unit;
          this.form.name=data.name;
        }
      }).catch(error=>this.$message.error('获取单位列表异常'));
    },
    getRoleMap(){
      let getRoleMap=request.get('getRoleMap');
      getRoleMap({}).then(({data})=>{
        this.roleNames=data;
      }).catch(error=>{this.$message.errror('获取角色异常')});
    },
    addUser(){
      let addUserM=request.post('userManage/addUser');
      let userInfo=this.form;
      addUserM(userInfo).then(({data})=>{
        if (data&&data.code===200) {
          this.$message.success(data.msg)
        }
      }).catch(error=>{this.$message.error('添加用户异常')});
    },
    cancleSubmit(){
      this.form={
        account:'',
        unit:'',
        name:'',
        role:[8]
      };
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style scoped>

</style>
