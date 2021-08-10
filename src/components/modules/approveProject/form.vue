<template>
  <!-- 签审页面项目详细信息表单 -->
  <table border="1" class="test">
    <tr ><td colspan="6" style="text-align:center"><b>项目编号：</b>{{project.projectNumber}}</td></tr>
    <tr>
      <td colspan="6"><b>所属板块:</b>{{project.section}}
        <b>落地单位:</b>{{project.unit}}
        <b>项目详细落地位置:</b>{{project.projectAddress}}</td>
    </tr>
    <tr>
      <td colspan="6"><b>项目成员:</b>{{project.projectMember}}
        <b>项目类型:</b>{{project.projectType}}
        <b>是否自动化:</b>{{ convertByte(project.automaticFlag)}}</td>
    </tr>
    <tr>
      <td colspan="6"><el-container>
        <b>涉及产品类型:</b>{{project.projectTypeInvolved}}
        <b>项目控员成果:</b><input v-model="project.projectResult" style="width:60px;height:18px;" disabled>
        <b>成果类型:</b>{{project.resultType}}
      </el-container>
      </td>
    </tr>
    <tr>
      <td colspan="4"><b>项目改善前:</b>{{project.projectImprovementBefore}}</td>
      <td colspan="2">
        <video width="100%" height="100%" controls autoplay muted>
          <source :src="getVideoUrl('before')" type="video/mp4" >
          您的浏览器不支持video标签
        </video>
      </td>
    </tr>
    <tr> <td colspan="6"><b>改善方案:</b>{{project.improvePlan}}</td></tr>
    <tr>
      <td colspan="4"><b>项目改善后:</b>{{project.projectImprovementAfter}}</td>
      <td colspan="2">
        <video width="100%" height="100%" controls autoplay muted >
          <source :src="getVideoUrl('after')" type="video/mp4" >
          您的浏览器不支持video标签
        </video>
      </td>
    </tr>
    <tr><td colspan="4">相关附件1： <el-link type="primary" @click="exportData('one')">点击下载</el-link></td><td colspan="3">
      相关附件2： <el-link type="primary" @click="exportData('two')">点击下载</el-link></td></tr>
    <tr>
      <td colspan="4"><b>项目提出人:</b>{{project.projectSponsor}}</td>
      <td colspan="2"><b>结题时间:</b>{{project.finishTime}}</td>
    </tr>
    <tr>
      <td colspan="6">
        <b>项目推进人:</b>{{project.projectPromoter}}
        <b>单位管理员:</b>{{project.unitAdministrator}}
        <b>单位审核员:</b>{{project.unitAuditor}}
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  props:{
    project:{
      type:Object
    }
  },
  methods:{
    getVideoUrl(suffix){
      let num=this.project.projectNumber;
      return `/api/getVideo?projectNumber=${num}&&suffix=${suffix}`;
    },
    convertByte(val){
      if(val){
        return '是'
      }
      return '否'
    },
    exportData(suffix){
      let requestPath=`downLoadRelate/${suffix}`;
      let projectNumber=this.project.projectNumber;
      this.$http({
        url:requestPath,
        params:{projectNumber},
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
