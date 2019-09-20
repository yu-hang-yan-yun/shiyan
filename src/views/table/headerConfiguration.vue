<template>
  <div>
    <!-- 表单板块 -->
    <el-table :data="HeaderConfiguration">
      <el-table-column type="index" width="70" label="序号"></el-table-column>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="field" label="数据源字段" sortable></el-table-column>
      <el-table-column prop="lineName" label="列名称"></el-table-column>
      <el-table-column prop="lineWidth" label="列宽"></el-table-column>
      <el-table-column prop="align" label="对齐"></el-table-column>
      <el-table-column prop="formatting" label="列格式化"></el-table-column>
      <el-table-column prop="function" label="自定义格式化函数"></el-table-column>
      <el-table-column prop="sortable" label="单击排序" sortable></el-table-column>
      <el-table-column prop="move" label="移动设备" sortable></el-table-column>
      <el-table-column prop="sequence" label="排序号" sortable></el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button @click="dialogFormVisible = true,handleClick(scope.row)">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, HeaderConfiguration)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- -------------编辑弹框------------------>
    <el-dialog title="编辑设置" :visible.sync="dialogFormVisible">
      <el-form :model="fresh" ref="fresh" label-width="220px">
        <el-form-item label="数据源字段 :" prop="showFieldGroup">
          <el-select v-model="fresh.field" placeholder="请选择字段分组" style=" width:600px ;">
            <el-option
              v-for="item in field"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="列名称 :">
          <el-input v-model="fresh.lineName" style=" width:600px ;"></el-input>
        </el-form-item>
        <el-form-item label="列宽(单位px)空为自适应 :">
          <el-input v-model="fresh.lineWidth" style=" width:600px ;"></el-input>
        </el-form-item>
        <el-form-item label="对齐 :">
          <el-select v-model="fresh.align" placeholder="请选择" style=" width:600px ;">
            <el-option label=" 左" value="left"></el-option>
            <el-option label="中" value="center"></el-option>
            <el-option label="右 " value="right"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="格式化 :" prop="formatting">
          <el-select v-model="fresh.formatting" placeholder="请选择字段分组" style=" width:600px ;">
            <el-option
              v-for="item in formatting"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义格式化函数 :">
          <el-input v-model="fresh.function" style=" width:600px ;"></el-input>
        </el-form-item>
        <el-form-item label="排序号 :">
          <el-input v-model="fresh.sequence" style=" width:600px ;"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-checkbox v-model="fresh.sortable" true-label=1 false-label=0>单击排序</el-checkbox>
          <el-checkbox v-model="fresh.move" true-label=1 false-label=0>移动设备</el-checkbox>
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
        // 字段
        field: '',
        // 列名称
        lineName: '',
        // 列宽(单位px)空为自适应
        lineWidth: '',
        // 对齐方式 值 left/center/right 左中右
        align: '',
        // 列格格式化
        formatting: '',
        // 自定义格式化函数
        function: '',
        // 对应列是否可以排序，
        sortable: '',
        move: '',
        // 排序号
        sequence: ''
      },
      // 表头配置
      HeaderConfiguration: [
        {
          id: '1',
          // 字段
          field: 'icon',
          // 列名称
          lineName: '规则名',

          // 列宽(单位px)空为自适应
          lineWidth: '30px',
          // 对齐方式 值 left/center/right 左中右
          align: 'center',
          // 列格格式化
          formatting: 'link',
          // 自定义格式化函数
          function: '',
          // 对应列是否可以排序，
          sortable: 1,
          // 移动设备
          move: 1,
          // 排序号
          sequence: 1
        },
        {
          id: '2',
          // 字段
          field: 'asd',
          // 列名称
          lineName: '规则名',

          // 列宽(单位px)空为自适应
          lineWidth: '30px',
          // 对齐方式 值 left/center/right 左中右
          align: 'center',
          // 列格格式化
          formatting: 'link',
          // 自定义格式化函数
          function: '',
          // 对应列是否可以排序，
          sortable: 1,
          // 移动设备
          move: 0,
          // 排序号
          sequence: 1
        }
      ],
      // 字段数组
      field: [
        {
          value: 'CompieFlag',
          label: 'CompieFlag'
        },
        {
          value: 'Folderid',
          label: 'Folderid'
        },
        {
          value: 'RuleNum',
          label: 'RuleNum'
        },
        {
          value: 'FolderName',
          label: 'FolderName'
        },
        {
          value: 'CompileFlag',
          label: 'CompileFlag'
        }
      ],
      // 格式化数组
      formatting: [
        {
          value: 'link',
          label: '超链接'
        },
        {
          value: 'img',
          label: '图片'
        },
        {
          value: '123',
          label: '数字'
        }
      ]
    }
  },
  mounted () {

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
