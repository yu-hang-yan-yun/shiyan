<template>
  <!-- 按钮模块 -->
  <div class="btn">
    <el-table :data="operationButton" class="">
      <el-table-column type="index" width="65" label="序号" ></el-table-column>
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="id" label="按扭编号" ></el-table-column>
      <el-table-column prop="btnName" label="按扭名称" ></el-table-column>
      <el-table-column prop="clickIncident" label="点击事件" sortable></el-table-column>
      <el-table-column prop="bindingRole" label="绑定角色权限" >

      </el-table-column>
      <el-table-column prop="fieldName" label="根据字段隐藏(填字段名)" ></el-table-column>
      <el-table-column prop="icon" label="图标" ></el-table-column>
      <el-table-column prop="sequence" label="排序号" sortable></el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button @click="dialogFormVisible = true,handleClick(scope.row)">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, operationButton)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- -------------------------编辑设置--------------------------------- -->
    <el-dialog title="编辑设置" :visible.sync="dialogFormVisible">
      <el-form :model="fresh" ref="fresh" label-width="220px">
        <el-form-item label="按钮编号 :">
          <el-input v-model="fresh.id" style=" width:600px ;"></el-input>
        </el-form-item>
        <el-form-item label="按钮名称 :">
          <el-input v-model="fresh.btnName" style=" width:600px ;"></el-input>
        </el-form-item>
        <el-form-item label="点击事件 :" prop="clickIncident">
          <el-select v-model="fresh.clickIncident" placeholder="请选择点击事件" style=" width:600px ;">
            <el-option
              v-for="item in clickIncident"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定角色权限 :" prop="rolePrivileges">
          <el-select
            v-model="fresh.rolePrivileges"
            multiple
            placeholder="请选择权限角色"
            style=" width:600px ;"
          >
            <el-option
              v-for="item in role"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="根据字段隐藏(填字段名) :">
          <el-input v-model="fresh.fieldName" style=" width:600px ;"></el-input>
        </el-form-item>
        <el-form-item label="图标 :" prop="icon">
          <el-select v-model="fresh.icon" placeholder="请选择点击事件" style=" width:600px ;">
            <el-option
              v-for="item in icon"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号 :">
          <el-input v-model="fresh.sequence" style=" width:600px ;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      fresh: {
        // 按钮编号唯一值
        id: '',
        // 按键名称
        btnName: '',
        // 点击事件
        clickIncident: '',
        // 绑定角色权限
        rolePrivileges: [],
        // 根据字段隐藏(填字段名)
        fieldName: '',
        // 图标
        icon: '',
        // 排序
        sequence: ''
      },
      operationButton: [
        {
          // 按钮编号唯一值
          id: 'add',
          // 按键名称
          btnName: '新增',
          // 点击事件
          clickIncident: '新增文档',
          // 绑定角色权限
          rolePrivileges: ['测试（RS010）', '测试（RS010）'],
          // 根据字段隐藏(填字段名)
          fieldName: 'CompieFlag',
          // 图标
          icon: 'icon-add',
          // 排序
          sequence: '1'
        },
        {
          // 按钮编号唯一值
          id: 'delete',
          // 按键名称
          btnName: '新增',
          // 点击事件
          clickIncident: '新增文档',
          // 绑定角色权限
          rolePrivileges: ['测试（RS010）'],
          // 根据字段隐藏(填字段名)
          fieldName: 'CompieFlag',
          // 图标
          icon: 'icon-add',
          // 排序
          sequence: '2'
        }
      ],
      clickIncident: [
        {
          value: 'NewDoc',
          label: '新增文档'
        },
        {
          value: 'DeleteDoc',
          label: '删除文档'
        },
        {
          value: 'CopyDoc',
          label: '拷贝文档'
        },
        {
          value: 'lmportDoc',
          label: '倒出到Excel'
        }
      ],
      icon: [
        {
          value: 'icon-down',
          label: '打包下载'
        },
        {
          value: 'icon-add',
          label: '新增'
        },
        {
          value: 'icon-add',
          label: '导入'
        },
        {
          value: 'icon-remove',
          label: '删除'
        }
      ],
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
  methods: {
    handleClick (row) {
      this.fresh = row
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    }
  }
}
</script>

<style>

</style>
