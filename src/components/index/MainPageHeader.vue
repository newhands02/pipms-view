<template>
  <!-- 头部导航栏 -->
  <el-menu mode="horizontal"
           background-color="#3c8dbc" text-color="#ffffff">
    <el-button @click="collapse()" class="collapseButton">
      <i class="el-icon-s-fold" style="font-size:25px;margin-top:5px;"></i>
    </el-button>
    <el-submenu index="1" style="float:right;">
      <template slot="title">
        <el-avatar shape="square" :size="40">
          <img src="../.././assets/logo.png">
        </el-avatar>
        <span >{{userInfo.name}}</span>
      </template>
      <el-menu-item @click="logout" index="1-1">
        <i class="el-icon-circle-close"></i>
        <span slot="title">用户登出</span>
      </el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  data(){
    return{
      foldMenu:true,
      userInfo:{}
    }
  },
  mounted(){
    this.getUserInfo();
  },
  methods:{
    collapse(){
      let old=this.foldMenu;
      this.foldMenu=!old;
      this.$emit('change',this.foldMenu);
    },
    logout(){
      this.$storage.removeAll();
      this.$http({
        url:'logout'
      }).then(({data})=>{
        this.$router.replace({path:'/'})
      });
    },
    getUserInfo(){
      this.$http({
        url:'getUserInfo'
      }).then(({data})=>{
        if (data) {
          this.userInfo=data
        }
      })
    }
  }
}
</script>

<style scoped>
.collapseButton{
  height: 100%;
  border: none;
  background-color: #3c8dbc;
  color: #ffffff;
}
.userCenter{
  float: right;
}
.logout{
  float:right;
  /* height:50px; */
  margin-top:-10px;
  font-size:20px;
  margin-right:-5px;
  cursor: pointer;
  background-color: #3c8dbc;
}
</style>
