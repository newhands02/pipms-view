<template>
  <!-- 项目信息填写组件 -->
  <el-form ref="projectForm" :model="project" :rules="rules" :inline="true">
    <el-row>
      <el-form-item label="所属板块">
        <el-input v-model="project.section" readonly></el-input>
      </el-form-item>
      <el-form-item label="项目编号">
        <el-input v-model="project.projectNumber" readonly></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectTitle">
        <el-input v-model="project.projectTitle"></el-input>
      </el-form-item>
      <el-form-item label="落地单位">
        <el-input v-model="project.unit" readonly></el-input>
      </el-form-item>

    </el-row>
    <el-row>
      <el-form-item label="项目详细落地位置" prop="projectAddress">
        <el-input v-model="project.projectAddress"></el-input>
      </el-form-item>
      <el-form-item label="项目成员" prop="projectMember">
        <el-input v-model="project.projectMember"></el-input>
      </el-form-item>
      <el-form-item label="项目类型" prop="projectType">
        <el-select v-model="project.projectType" placeholder="请选择">
          <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否自动化" prop="automaticFlag">
        <el-radio-group v-model="project.automaticFlag">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row><br/>
    <el-row>
      <el-form-item label="项目提出人">
        <el-input v-model="project.projectSponsor" readonly></el-input>
      </el-form-item>
      <el-form-item label="项目推进人" prop="projectPromoter">
        <el-autocomplete
          class="inline-input"
          v-model="project.projectPromoter"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @blur="checkPromoterName"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="单位管理员">

        <el-input v-model="project.unitAdministrator" readonly></el-input>
      </el-form-item>
      <el-form-item label="单位审核员">

        <el-input v-model="project.unitAuditor" readonly></el-input>
      </el-form-item>
    </el-row><br/>
    <el-form-item label="项目改善前" prop="projectImprovementBefore" label-width="95px">
      <el-input type="textarea" v-model="project.projectImprovementBefore" style="width:100vh;"></el-input>
    </el-form-item>
    <el-form-item label="改善方案" prop="improvePlan" label-width="95px">
      <el-input type="textarea" v-model="project.improvePlan" style="width:100vh;"></el-input>
    </el-form-item>
    <el-form-item label="项目改善后" prop="projectImprovementAfter" label-width="95px">
      <el-input type="textarea" v-model="project.projectImprovementAfter" style="width:100vh;"></el-input>
    </el-form-item>

    <el-row>
      <el-form-item label="涉及产品类型" prop="projectTypeInvolved">
        <el-input v-model="project.projectTypeInvolved"></el-input>
      </el-form-item>
      <el-form-item label="项目控员成果">
        <el-input v-model="project.projectResult" disabled></el-input>
      </el-form-item>
      <el-form-item label="成果类型" prop="resultType">
        <el-select v-model="project.resultType" placeholder="请选择" clearable>
          <el-option label="直接减员(名称待定)" value="直接减员"></el-option>
          <el-option label="折合减员" value="折合减员"></el-option>
        </el-select>
      </el-form-item>
    </el-row><br/>
    <el-form-item label="改善前视频" prop="beforeList">
      <el-upload class="upload-demo" ref="uploadBeforeVideo"
                 action="#"
                 :http-request="uploadBeforeVideo"
                 :auto-upload="false" :file-list="beforeList" :limit="1">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="改善后视频" prop="afterList">
      <el-upload class="upload-demo" ref="uploadAfterVideo"
                 action="#"
                 :auto-upload="false" :file-list="afterList"
                 :http-request="uploadAfterVideo" :limit="1 ">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="相关附件" prop="relateList">
      <el-upload class="upload-demo" ref="uploadRelateFile"
                 action="#"
                 multiple
                 :http-request="uploadRelateFile"
                 :limit="2" :auto-upload="false"
                 :on-exceed="handleExceed" :file-list="relateList">
        <el-button size="small" type="primary">点击上传</el-button>
        <span slot="tip" class="el-upload__tip">最多只能上传两个附件</span>
      </el-upload>
    </el-form-item>

    <el-row>
      <el-form-item label="预计结题时间" prop="finishTime">
        <el-date-picker v-model="project.finishTime"
                        type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="填写时间">
        <el-input v-model="project.writeTime" readonly></el-input>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="project.updateTime" readonly></el-input>
      </el-form-item>
      <el-form-item label="当前状态">
        <el-input v-model="project.currentState" readonly></el-input>
      </el-form-item>
    </el-row><br/>

    <el-form-item>
      <el-button type="primary" @click="submitProject()" :disabled="project.currentStateFlag>1">提交</el-button>
      <el-button type="primary" @click="saveProject()" :disabled="project.currentStateFlag>1">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import request from '@/utils/request'
export default {
  props:{
    projectParent:{
      type:Object,
      default:()=>{}
    },
    beforeList:{
      type:Array,
      default:()=>[]
    },
    afterList:{
      type:Array,
      default:()=>[]
    },
    relateList:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return{
      typeList:[],
      project:this.projectParent,
      relateCount:2,
      infoList:[],
      resultList:[{"value":'111'}],
      timeout: null,
      tempName:'',
      rules:{
        projectTitle:[{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        projectAddress:[{ required: true, message: '请输入详细项目地址', trigger: 'blur' }],
        projectMember:[{ required: true, message: '请输入项目成员', trigger: 'blur' }],
        projectType:[{ required: true, message: '请输入项目类型', trigger: 'blur' }],
        automaticFlag:[{ required: true, message: '请选择是否自动化', trigger: 'blur' }],
        projectPromoter:[{ required: true, message: '请输入项目推进人', trigger: 'blur' }],
        projectImprovementBefore:[{ required: true, message: '请输入改善前描述', trigger: 'blur' }],
        improvePlan:[{ required: true, message: '请输入改善方案', trigger: 'blur' }],
        projectImprovementAfter:[{ required: true, message: '请输入改善后描述', trigger: 'blur' }],
        projectTypeInvolved:[{ required: true, message: '请输入涉及产品类型', trigger: 'blur' }],
        resultType:[{ required: true, message: '请选择成果类型', trigger: 'blur' }],
        beforeList:[{ required: true, message: '请上传改善前视频', trigger: 'blur' }],
        afterList:[{ required: true, message: '请上传改善后视频', trigger: 'blur' }],
        relateList:[{ required: true, message: '请上传至少一个附件', trigger: 'blur' }],
        finishTime:[{ required: true, message: '请选择预计结题时间', trigger: 'blur' }],
      }
    }
  },
  mounted(){
    this.getProjectTypes();
// this.getNameList('薛宇杰')
// this.project.createAccount=this.$storage.get('account');
  },
  methods:{
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 2个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //获取项目类型
    getProjectTypes(){
      let getdata=request.get("projectTypes");
      getdata({}).then(({data})=>{
        this.typeList=data;
      })
    },
//保存项目
    saveProject(){
      this.$refs["projectForm"].validate((valid) => {
        if (valid) {
          let saveMethod=request.post("project/save");
          saveMethod(this.project).then(({data})=>{
            if(data&&data.code===200){
              this.$message.success('保存成功')
              this.upload();
            }
          }).catch(error=>{this.$message.error('系统异常')});
        } else {
          this.$message.error('必填项不能为空')
        }
      });

    },
//提交项目
    submitProject(){
      let submitData=request.post("project/submitProject");
      submitData(this.project).then(({data})=>{
        if(data&&data.code===200){
          this.$message.success('提交成功');
          this.upload();
        }
      }).catch(error=>{this.$message.error('系统异常')});
    },
    uploadBeforeVideo(params){
      let formData=new FormData();
      this.uploadVideoMethod(params,'beforeVideo',formData);
    },
    uploadAfterVideo(params){
      let formData=new FormData();
      this.uploadVideoMethod(params,'afterVideo',formData);
    },
    uploadRelateFile(params){
      let count=this.relateCount%2;
      let formData=new FormData();
      formData.append("num",count);
      this.uploadVideoMethod(params,'relateFile',formData);
      this.relateCount++;
    },
    uploadVideoMethod(params,url,formData){
      let _file=params.file;
      formData.append("file",_file);
      formData.append("projectNumber",this.project.projectNumber);
      formData.append("account",this.$storage.get('account'));
      let uploadBefore=request.put(`upload/${url}`);
      uploadBefore(formData).then(({data})=>{
        if(data&&data.code===200){
          this.$message.success('上传成功');
        }else{
          this.$message.error(`上传${url}失败`);
        }
      }).catch(error=>{this.$message.error(`${url}系统异常`)});
    },
    getInfoList(){
      let getInfo=request.get('upload/infoList');
      getInfo({}).then(({data})=>{
        this.infoList=data;
        this.$notify.info({
          title: '系统消息',
          message: data.toString()
        });
      }).catch(error=>this.$message.error('系统异常'));
    },
    upload(){
      this.$refs.uploadBeforeVideo.submit();
      this.$refs.uploadAfterVideo.submit();
      this.$refs.uploadRelateFile.submit();
      this.getInfoList();
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
    checkPromoterName(){
      let inputName=this.project.projectPromoter;
      let getDisplayName=request.get('getDisplayName');
      getDisplayName({inputName}).then(({data})=>{
        this.project.projectPromoter=data.displayName;
        this.project.promoterMail=data.mail;
      }).catch(error=>{this.$message.error('获取displayName异常')});

    },
  }

}
</script>
