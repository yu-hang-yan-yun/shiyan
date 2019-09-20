<template>
  <!-- 表格配置项 -->
  <div class="add">
    <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-form-item label="所属应用 :" prop="application">
        <el-select v-model="ruleForm.application" placeholder="请选择所属应用" style=" width:500px ;">
          <el-option
            v-for="item in application"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Grid名称 :">
        <el-input v-model="ruleForm.gridName" style=" width:600px ;"></el-input>
      </el-form-item>
      <el-form-item label="唯一编号 :">
        <el-input v-model="ruleForm.id" style=" width:600px ;"></el-input>
      </el-form-item>
      <el-form-item label="绑定数据源 :" prop="bindingDataOrigin">
        <el-select v-model="ruleForm.bindingDataOrigin" placeholder="请选择数据源" style=" width:600px ;">
          <el-option
            v-for="item in dataOrigin"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <el-badge>
          <el-button size="small">打开</el-button>
          <el-button size="small">新建</el-button>
        </el-badge>
      </el-form-item>
      <el-form-item label="绑定事件规则 :" prop="bindingEventRules">
        <el-select
          v-model="ruleForm.bindingEventRules"
          placeholder="请选择事件规则"
          style=" width:600px ;"
        >
          <el-option
            v-for="item in eventRules"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <el-badge>
          <el-button size="small">打开</el-button>
          <el-button size="small">新建</el-button>
        </el-badge>
      </el-form-item>
      <el-form-item label="绑定数据表单 :" prop="bindingdataForm">
        <el-select v-model="ruleForm.bindingdataForm" placeholder="请选择事件规则" style=" width:600px ;">
          <el-option
            v-for="item in dataForm"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <el-badge>
          <el-button size="small">打开</el-button>
          <el-button size="small">新建</el-button>
        </el-badge>
      </el-form-item>
      <el-form-item label="每页显示 :">
        <el-input v-model="ruleForm.pageSize" style=" width:600px ;"></el-input>
      </el-form-item>
      <el-form-item label="可选分页数 :">
        <el-input v-model="ruleForm.paging" style=" width:600px ;"></el-input>
      </el-form-item>
      <el-form-item label="显示时用此字段分组 :" prop="showFieldGroup">
        <el-select v-model="ruleForm.showFieldGroup" placeholder="请选择字段分组" style=" width:600px ;">
          <el-option
            v-for="item in field"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <!-- <el-form-item label="显示时的排序字段 :" prop="showSortField">
              <el-select
                v-model="ruleForm.showSortField"
                placeholder="请选择排序字段"
                style=" width:600px ;"
              >
                <el-option
                  v-for="item in field"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
              <el-checkbox label="DESC" v-model="ruleForm.DESC"></el-checkbox>
              <el-checkbox label="允许多个字段排序" :checked="Duo"></el-checkbox>
        </el-form-item>-->
        <el-form-item label="显示时的排序字段 :" prop="showSortField">
          <el-select
            v-model="ruleForm.showSortField"
            multiple
            placeholder="请选择字段分组"
            style=" width:600px ;"
          >
            <el-option
              v-for="item in field"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-checkbox label="DESC" v-model="ruleForm.DESC"></el-checkbox>
        </el-form-item>
      </el-row>

      <el-form-item label="双击事件 :">
        <el-input v-model="ruleForm.dblClick" style=" width:600px ;"></el-input>
      </el-form-item>
      <el-form-item label="单击事件 :">
        <el-input v-model="ruleForm.onClick" style=" width:600px ;"></el-input>
      </el-form-item>
      <el-form-item label="右键事件 :">
        <el-input v-model="ruleForm.rightClick" style=" width:600px ;"></el-input>
      </el-form-item>
      <el-form-item label="可选项 :">
        <el-checkbox label="显示复选框" v-model="formConfiguration.selection"></el-checkbox>
        <el-checkbox label="列的宽度是否自动撑开" v-model="formConfiguration.fit"></el-checkbox>
        <el-checkbox label="显示搜索条" v-model="formConfiguration.search"></el-checkbox>
        <el-checkbox label="显示分页条" v-model="formConfiguration.articlePage"></el-checkbox>
        <el-checkbox label="是否有斑马纹" v-model="formConfiguration.stripe"></el-checkbox>
        <el-checkbox label="是否带有纵向边框" v-model="formConfiguration.border"></el-checkbox>
        <el-checkbox label="显示行号" v-model="formConfiguration.index"></el-checkbox>
      </el-form-item>
      <el-form-item label="默认传入数据源参数 :">
        <el-input v-model="ruleForm.dataSourceParameter" style=" width:600px ;"></el-input>
      </el-form-item>

      <el-form-item label="Grid访问权限 :" prop="gridAccessAuthority">
        <el-select
          v-model="ruleForm.gridAccessAuthority"
          multiple
          placeholder="请选择权限角色"
          style=" width:600px ;"
        >
          <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <!-- 底部多选设置 -->
      <el-form-item>
        <el-checkbox v-model="checkList.startUsing">启用</el-checkbox>
        <el-checkbox v-model="checkList.openTheTransaction">开启事务（针对视图数据操作）</el-checkbox>
        <el-checkbox v-model="checkList.cacheConfiguration">缓存配置（针对访问大量的）</el-checkbox>
        <el-checkbox v-model="checkList.ProhibitToUpgrade">禁止升级本设计</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // Duo: true,
      // 表格配置项
      formConfiguration: {
        // 显示复选框
        selection: false,
        // 列的宽度是否自动撑开
        fit: true,
        // 显示搜索条
        search: false,
        // 显示分页条
        articlePage: true,
        // 是否有斑马纹
        stripe: true,
        // 显示边框
        border: false,

        // 显示行号
        index: true
      },

      // 底部多选设置
      checkList: {
        startUsing: true,
        openTheTransaction: false,
        cacheConfiguration: true,
        ProhibitToUpgrade: false
      },
      value: '',
      // 表单数据
      ruleForm: {
        // 唯一id值
        id: 'V_S006_G001',
        // 所属应用
        application: '应用开发（S001）',
        // Grid名称
        gridName: '所有用户列表',
        // 绑定数据源
        bindingDataOrigin: '所有流程规则列表（SD_S010_J001）(D_S010_J001)',
        // 绑定事件规则
        bindingEventRules: '部门管理视图事件（R_S006_E003）',
        // 绑定数据表单
        bindingdataForm: '注册部门（F_S006_A002）',
        // 每页显示多少条
        pageSize: '25',
        // 可选分页数
        paging: '[25,30,45,60,100]',
        // 显示时用此字段分组
        showFieldGroup: 'CompieFlag',
        // 显示时的排序字段
        showSortField: 'CompieFlag',
        DESC: true,
        // 双击事件
        dblClick: 'rowDblClick',
        // 单击事件
        onClick: 'rowClick',
        // 右击事件
        rightClick: 'rowContextmenu',
        // 默认传入数据源参数
        dataSourceParameter: '未定义',
        // Grid访问权限
        gridAccessAuthority: ['测试（RS010）'],
        // 版本号
        versions: '8.0'
      },
      // 应用列表
      application: [
        {
          id: 'BPLM',
          value: '流程体系（BPLM）',
          label: '流程体系（BPLM）'
        },
        {
          id: 'KM',
          value: '知识管理（KM）',
          label: '知识管理（KM）'
        },
        {
          id: 'S001',
          value: '应用开发（S001）',
          label: '应用开发（S001）'
        },
        {
          id: 'S004',
          value: '流程建模（S004）',
          label: '流程建模（S004）'
        },
        {
          id: 'S005',
          value: 'BPM用户端（S005）',
          label: 'BPM用户端（S005）'
        }
      ],
      // 数据源了表
      dataOrigin: [
        {
          value: 'D_S010_J001',
          label: '所有流程规则列表（SD_S010_J001）(D_S010_J001)'
        },
        {
          value: 'D_S010_J002',
          label: '流程规则列表按文件夹（SD_S010_J002）(D_S010_J002)'
        }
      ],
      // 事件规则列表
      eventRules: [
        {
          id: '0',
          value: 'none',
          label: '-No Event-'
        },
        {
          id: 'R_S006_E003',
          value: '部门管理视图事件（R_S006_E003）',
          label: '部门管理视图事件（R_S006_E003）'
        },
        {
          id: 'R_S006_E004',
          value: '用户列表按部门事件（R_S006_E004）',
          label: '用户列表按部门事件（R_S006_E004）'
        }
      ],
      // 数据表单列表
      dataForm: [
        {
          id: 'F_S006_A001',
          value: '注册用户（F_S006_A001）',
          label: '注册用户（F_S006_A001）'
        },
        {
          id: 'F_S006_A002',
          value: '注册部门（F_S006_A002）',
          label: '注册部门（F_S006_A002）'
        },
        {
          id: 'F_S006_A003',
          value: '注册角色（F_S006_A003）',
          label: '注册角色（F_S006_A003）'
        }
      ],

      // 字段
      field: [
        {
          id: '1',
          value: 'CompieFlag',
          label: 'CompieFlag'
        },
        {
          id: '2',
          value: 'Folderid',
          label: 'Folderid'
        },
        {
          id: '3',
          value: 'Roles',
          label: 'Roles'
        }
      ],

      // Graid访问权限  角色列表
      role: [
        {
          id: 'RS010',
          value: '测试（RS010）',
          label: '测试（RS010）'
        },
        {
          id: 'RS007',
          value: '人事（RS007）',
          label: '人事（RS007）'
        },
        {
          id: 'RS003',
          value: '普通用户（RS003）',
          label: '普通用户（RS003）'
        }
      ]
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style>
.demo-ruleForm {
  padding-top: 130px;
  padding-left: 700px;
}
.grid-content el-form-item {
  margin: 0;
}
</style>
