<template>
  <!-- 用户数据列表 -->
  <el-table
    :data="tableData" height="500px"
    style="width: 80%;margin-left:5%;" border>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="unit"
      label="单位">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="userAccount"
      label="账号">
    </el-table-column>
    <el-table-column
      prop="lastLoginTime"
      label="上次登录时间">
    </el-table-column>
    <el-table-column
      prop=""
      label="用户状态">
      <template slot-scope="scope">
        {{scope.row.onlineStatus | statusFilter}}
      </template>
    </el-table-column>
    <el-table-column
      prop=""
      label="账号状态">
      <template slot-scope="scope">
        <el-switch
          :value="scope.row.accountStatus==='0'"
          active-color="#13ce66" active-text="正常"
          inactive-color="#ff4949" inactive-text="停用">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      prop="roleNames"
      label="角色"
      width="200"
      :filters="roleArrays"
      :filter-method="filterRoles"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag v-for="(role,index) in getRoles(scope.row.roleNames)" :key="index"
                :color="tagColor[index]"
                disable-transitions>{{role | filterRoles}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="270px;;">
      <template slot-scope="scope">
        <el-button
          size="mini" type="warning" @click="foreLogout(scope.row.userAccount)"
        >强制下线</el-button>
        <el-button
          size="mini"
          type="danger" @click="deactiveAccount(scope.row.userAccount)"
        >停用</el-button >
        <el-popover
          placement="right"
          width="600"
          trigger="click">
          <el-transfer v-model="selectRoles" :data="allRoles"
                       :titles="['角色列表', '已选列表']">
            <el-button class="transfer-footer" slot="right-footer" size="small" type="primary"
                       @click="submitSelect(scope.row.userAccount)">分配</el-button>
          </el-transfer>
          <el-button
            size="mini" slot="reference"
            type="primary" @click="allocateRole(scope.row.roleNames)"
          >角色分配</el-button>
        </el-popover>

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
      roleArrays:[
        {text:'超级管理员',value:'super_admin'},
        {text:'公司级管理员',value:'company_admin'},
        {text:'系统管理员',value:'sys_admin'},
        {text:'高级协作',value:'pre_collaborator'},
        {text:'单位审核员',value:'unit_auditor'},
        {text:'单位管理员',value:'unit_admin'},
        {text:'推进人',value:'promoter'},
        {text:'提出人',value:'sponsor'}],
      tagColor:['#ecf5ff','#f0f9eb','#E6A23C','#F56C6C','#909399',
        '#409EFF','#DCDFE6','#E487B7'],
      selectRoles:[],
      allRoles:[],
      roleNames:[],
    }
  },
  filters:{
    filterRoles(value){
      let role_ch="普通用户";
      switch(value){
        case 'super_admin':role_ch="超级管理员";break;
        case 'company_admin':role_ch="公司级管理员";break;
        case 'sys_admin':role_ch="系统管理员";break;
        case 'pre_collaborator':role_ch="高级协作";break;
        case 'unit_auditor':role_ch="单位审核员";break;
        case 'unit_admin':role_ch="单位管理员";break;
        case 'promoter':role_ch="推进人";break;
        case 'sponsor':role_ch="提出人";break;
        default:break;
      }
      return role_ch;
    },
    statusFilter(value){
      return value==='on_line'?'在线':'离线';
    }
  },
  mounted(){
    this.getRoleNames();
  },
  methods:{
    filterRoles(value,row){
      return row.roleNames.includes(value);
    },
    getRoles(value){
      return value.split(",");
    },
    foreLogout(userAccount){
      let forceRequest=request.get('userManage/forceLogout');
      forceRequest({userAccount}).then(({data})=>{
        if (data && data.code===200) {
          this.$message.success(data.msg);
        }
      }).catch(error=> this.$message.error("用户下线异常"));
    },
    allocateRole(roleNames){
      this.allRoles=[];
      this.selectRoles=[];
      let roleArray=this.roleNames;
      roleArray.forEach(element => {
        this.allRoles.push({
          key:element.value,
          label:element.label
        })
      });
      let currentArray=roleNames.split(',');
      currentArray.forEach(element=>{
        let type=this.changeNameToType(element);
        this.selectRoles.push(type);
      })
    },
    changeNameToType(value){
      let roleType=8;
      switch(value){
        case 'super_admin':roleType=1;break;
        case 'company_admin':roleType=3;break;
        case 'sys_admin':roleType=2;break;
        case 'pre_collaborator':roleType=4;break;
        case 'unit_auditor':roleType=5;break;
        case 'unit_admin':roleType=6;break;
        case 'promoter':roleType=7;break;
        case 'sponsor':roleType=8;break;
        default:break;
      }
      return roleType;
    },
    getRoleNames(){
      let array=[]
      this.$http({
        url:'getRoleMap'
      }).then(({data})=>{
        this.roleNames=data;
      }).catch(error=>{this.$message.errror('获取角色异常')});
    },
    deactiveAccount(userAccount){
      let deactiveRequest=request.get('userManage/deactiveAccount');
      deactiveRequest({userAccount}).then(({data})=>{
        if (data && data.code===200) {
          this.$message.success(data.msg);
        }
      }).catch(error=> this.$message.error("停用账号异常"));
    },
    submitSelect(userAccount){
      let submitMethod=request.post("userManage/allocateRole");
      let params={
        userAccount:userAccount,
        typeList:this.selectRoles
      };
      submitMethod(params).then(({data})=>{
        if (data&&data.code===200) {
          this.$message.success(data.msg);
          this.$emit('change',true);
        }else{
          this.$message.error(data.msg);
        }
      }).catch(error=>this.$message.error('分配角色异常'));
    }
  }
}
</script>

<style scoped>
.transfer-footer {
  margin-left:40%;;
  /* padding: 6px 5px; */
}
</style>
