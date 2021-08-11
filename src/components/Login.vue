<template>
  <!-- 登录页面 -->
  <div class="background">
    <div class="loginForm">
      <el-card shadow="always" style="background-color: rgba(0, 0, 0, 0.1);">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <el-form :model="form" inline>
          <el-form-item label="用户名" required label-width="80px">
            <el-input v-model="form.account">
              <i slot="suffix" class="el-input__icon el-icon-user-solid"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" required label-width="80px">
            <el-input type="password" v-model="form.password">
              <i slot="suffix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
          <el-button type="primary" @click="userLogin()">确 定</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        account:'',
        password:'',
        rememberMe:false
      },
    }
  },
  mounted(){
    this.checkRemeber();
  },
  methods:{
    userLogin(){
      this.$http({
        url:'login',
        params:this.form
      }).then(({data})=>{
        if(data && data.code===200){
          this.$router.replace({path:'/home'})
        }else{
          this.$message.warning(data.msg);
        }
      }).catch(error=>{
        this.$message.error('系统异常');
      })
    },
    checkRemeber(){
      if(this.$cookies.isKey('rememberMe')){
        this.$router.replace({path:'/home'});
      }
    }
  }
}
</script>

<style>
.background{
  width: 100%;
  height: 100%;
  background: url("../assets/login-background.jpg") no-repeat;
  background-size: 100%;
  position: fixed;
}
.loginForm{
  width: 400px;
  height: 200px;
  margin: 15% auto;
  text-align: center;
}
</style>
