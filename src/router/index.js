import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainPage from '@/components/index/Container'
import create from '@/components/modules/createProject/createPage'
// import info from '@/components/modules/projectInfo/projectInfo'
import showTrace from '@/components/modules/projectTrace/showTrace'
import preview from '@/components/modules/projectInfo/preview'
import adminFirst from '@/components/modules/approveProject/adminFirst'
import approvePage from '@/components/modules/approveProject/approvePage'
import conclusionPage from '@/components/modules/approveProject/conclusionPage'
import promoterConclusion from '@/components/modules/approveProject/promoterConclusion'
import adminSecond from '@/components/modules/approveProject/adminSecond'
import recheckPage from '@/components/modules/approveProject/recheckPage'
import auditorPage from '@/components/modules/approveProject/auditorPage'
import auditorApprove from '@/components/modules/approveProject/auditorApprove'
import projectList from '@/components/modules/projectQuery/projectInfoList'
import projectSummary from '@/components/modules/projectQuery/projectSummary'
import userManage from '@/components/modules/manage/userManage'
import unitManage from '@/components/modules/manage/unitManage'

Vue.use(Router);
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:"userLogin",
      component:Login
    },
    {
      path: '/home',
      name: 'home',
      component: MainPage,children:[
        {
          path:'/createProject',
          name:'createProject',
          component:create
        },
        {
          path:'/projectList',
          name:'projectList',
          component:projectList
        },
        {
          path:'/projectSummary',
          name:'projectSummary',
          component:projectSummary
        },
        {
          path:'/projectTrace',
          name:'trace',
          component:showTrace
        },
        {
          path:'/projectPreview',
          name:'preview',
          component:preview
        },
        {
          path:'/adminFirst',
          name:'adminFirst',
          component:adminFirst
        },
        {
          path:'/approvePage',
          name:'approvePage',
          component:approvePage
        },
        {
          path:'/conclusionPage',
          name:'conclusionPage',
          component:conclusionPage
        },
        {
          path:'/promoterConclusion',
          name:'promoterConclusion',
          component:promoterConclusion
        },
        {
          path:'/adminSecond',
          name:'adminSecond',
          component:adminSecond
        },
        {
          path:'/recheckPage',
          name:'recheckPage',
          component:recheckPage
        },
        {
          path:'/auditorPage',
          name:'auditorPage',
          component:auditorPage
        },
        {
          path:'/auditorApprove',
          name:'auditorApprove',
          component:auditorApprove
        },
        {
          path:'/userManage',
          name:'userManage',
          component:userManage
        },
        {
          path:'/unitManage',
          name:'unitManage',
          component:unitManage
        }
      ]
    }
  ]
})
