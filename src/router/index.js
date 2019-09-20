import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import ApiAdmin from '@/views/ApiAdmin'
import DataSource from '@/views/DataSource'
import CreateTemplate from '@/views/CreateTemplate'
import DatabaseTable from '@/views/DatabaseTable'
import Diction from '@/views/Diction'
import FileAdmin from '@/views/FileAdmin'
import JavaAdmin from '@/views/JavaAdmin'
import Variation from '@/views/Variation'
import Item from '@/views/organize/Item'
import Project from '@/views/organize/Project'
import Home from '@/views/organize/Home'
import Register from '@/views/organize/Register'
import Arguments from '@/views/platform/Arguments'
import Origin from '@/views/platform/Origin'
import Corelate from '@/views/platform/Corelate'
import Journal from '@/views/monitoring/Journal'
import Record from '@/views/monitoring//Record'
import Cache from '@/views/monitoring//Cache'
import Topcoats from '@/views/Formcomponents/Topcoats'
import Btopcoats from '@/views/Formcomponents/Btopcoats'
import Ctopcoats from '@/views/Formcomponents/Ctopcoats'
import ATopcoats from '@/views/Formcomponents/ATopcoats'
import MonacoEditor from '@/views/Formcomponents/MonacoEditor'
import Documental from '@/views/Formcomponents/Documental'
import Measurement from '@/views/Formcomponents/Measurement'
import AdmdataSource from '@/views/Formcomponents/AdmdataSource'
import MyEditorone from '@/views/Formcomponents/MyEditorone'
import Appindex from '@/views/Appindex'
import AppManager from '@/views/AppManager'
// 表格配置项
import DataSet from '@/views/DataSet'
// 表格属性
import TableProperties from '@/views/table/tableProperties'
// 表头配置
import HeaderConfiguration from '@/views/table/headerConfiguration'
// 按钮配置
import Button from '@/views/table/Button'
// Js脚本
import JsScript from '@/views/table/JsScript'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '/dataSource',
          name: 'DataSource',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: DataSource
        },
        {
          path: '/createTemplate',
          name: 'CreateTemplate',
          component: CreateTemplate
        },
        {
          path: '/item',
          name: 'Item',
          component: Item
        },
        {
          path: '/project',
          name: 'Project',
          component: Project
        },
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
        {
          path: '/fileAdmin',
          name: 'FileAdmin',
          component: FileAdmin
        },
        {
          path: '/javaAdmin',
          name: 'JavaAdmin',
          component: JavaAdmin
        },
        {
          path: '/variation',
          name: 'Variation',
          component: Variation
        },
        {
          path: '/diction',
          name: 'Diction',
          component: Diction
        },
        {
          path: '/apiAdmin',
          name: 'ApiAdmin',
          component: ApiAdmin
        },
        {
          path: '/arguments',
          name: 'Arguments',
          component: Arguments
        },
        {
          path: '/origin',
          name: 'Origin',
          component: Origin
        },
        {
          path: '/corelate',
          name: 'Corelate',
          component: Corelate
        },
        {
          path: '/journal',
          name: 'Journal',
          component: Journal
        },
        {
          path: '/record',
          name: 'Record',
          component: Record
        },
        {
          path: '/cache',
          name: 'Cache',
          component: Cache
        },
        {
          path: '/topcoats',
          name: 'Topcoats',
          component: Topcoats
        },
        {
          path: '/btopcoats',
          name: 'Btopcoats',
          component: Btopcoats
        },
        {
          path: '/monacoEditor',
          name: 'MonacoEditor',
          component: MonacoEditor
        },
        {
          path: '/documental',
          name: 'Documental',
          component: Documental
        },
        {
          path: '/measurement',
          name: 'Measurement',
          component: Measurement
        },
        {
          path: '/aTopcoats',
          name: 'ATopcoats',
          component: ATopcoats
        },
        {
          path: '/ctopcoats',
          name: 'Ctopcoats',
          component: Ctopcoats
        },
        {
          path: '/appindex',
          name: 'Appindex',
          component: Appindex
        },
        {
          path: '/appManager',
          name: 'AppManager',
          component: AppManager
        },
        {
          path: '/admdataSource',
          name: 'AdmdataSource',
          component: AdmdataSource
        },
        {
          path: '/myEditorone',
          name: 'MyEditorone',
          component: MyEditorone
        },
        {
          path: '/databaseTable',
          name: 'DatabaseTable',
          component: DatabaseTable
        },
        // 表格配置项
        {
          path: '/dataSet/tableProperties',
          name: 'DataSet',
          component: DataSet,
          children: [
            {
              // 表格配置项
              path: '/dataSet/tableProperties',
              name: 'TableProperties',
              component: TableProperties
            },
            {
              // 表头配置
              path: '/dataSet/headerConfiguration',
              name: 'HeaderConfiguration',
              component: HeaderConfiguration
            },
            {
              // 按钮配置
              path: '/dataSet/button',
              name: 'Button',
              component: Button
            },
            {
              // Js脚本
              path: '/dataSet/jsScript',
              name: 'JsScript',
              component: JsScript
            }
          ]
        }
      ]
    }
  ]
})
