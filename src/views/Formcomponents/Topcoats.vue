<template>
  <el-row>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <div class="block">
          <p class="section">部门管理</p>
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          ></el-tree>
        </div>
      </div>
    </el-col>
  <div>
      <el-col :span="12" style="padding-top:10px;">
        <el-button round size="mini" @click="logSubmit">返回</el-button>
        <el-button @click="okSubmit" size="mini" round>确定选择</el-button>
        <el-input style="width:200px;float:right" size="mini" placeholder="请输入内容" v-model="input"></el-input>
        <el-table
          :data="data1"
    
          ref="selection"
          @select=" hanClickEdits"
          @selection-change="checkAll"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="所属ID"></el-table-column>
          <el-table-column prop="adminNumber" label="姓名"></el-table-column>
          <el-table-column prop="address" label="职务"></el-table-column>
          <el-table-column prop="addss" label="所属部门"></el-table-column>
        </el-table>
        <div>
          <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>
      </el-col>
      <el-col :span="2" style="padding-top:200px;">
        <div class="opSetting">
          <div @click="handelSelect">
            <el-button
              icon="el-icon-d-arrow-right"
              :disabled="nowSelectData.length?false:true"
              :size="buttonSize"
              type="primary"
            >选中</el-button>
          </div>
          <div class="spacing" @click="handleRemoveSelect">
            <el-button
              icon="el-icon-d-arrow-left"
              :disabled="nowSelectRightData.length?false:true"
              :size="buttonSize"
              type="primary"
            >取消</el-button>
          </div>
        </div>
      </el-col>

      <el-col :span="6" style="padding-top:44px;">
        <el-table
          :data="selectArr"
    
          ref="selection"
          @selection-change="checkRightAll"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="adminNumber"></el-table-column>
        </el-table>
      </el-col>
    </div>
  </el-row>
</template>
<script>
import { constants } from "crypto";
let id = 1000;
export default {
  data() {
    return {
      dialogFormVisible: false,
      scrollHeight: "0px",
      data: [
        {
          id: 1,
          label: "集团",
          children: [
            {
              id: 2,
              label: "总经办"
            },
            {
              id: 3,
              label: "战略发展部"
            },
            {
              id: 4,
              label: "运营管理部"
            },
            {
              id: 5,
              label: "信息管理部",
              children: [
                {
                  id: 10,
                  label: "系统管理部"
                },
                {
                  id: 11,
                  label: "项目管理部"
                },
                {
                  id: 12,
                  label: "软件研发部"
                }
              ]
            },
            {
              id: 6,
              label: "行政管理部"
            },
            {
              id: 7,
              label: "财务管理部"
            },
            {
              id: 8,
              label: "企划管理部"
            },
            {
              id: 9,
              label: "人力资源部"
            }
          ]
        }
      ],
      input: "",
      selectArr: [], // 右边列表
      buttonSize: "mini",
      options: [],
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [], // 右边选中列表数据
      adminpassNumber: [],

      value: "",
      data1: [
        {
          ID: "22",
          adminNumber: "王五",
          department: "信息部",
          duty: "技术"
        },
        {
          ID: "22",
          adminNumber: "张三",
          department: "信息部",
          duty: "技术"
        }
      ],
      activeName: "second",
      defaultProps: {
        children: "children",
        label: "label"
      },
      adminNumber: "",

      form: {
        name: "",
        id: 1
      }
    };
  },
  methods: {
    checkAll(val) {
      this.nowSelectData = val;
    },
    hanClickEdits(val) {
      let array = val.map(item => {
        return item.adminNumber;
      });
      this.adminNumber = array.join("/");
      console.log(this.adminNumber);
    },
    checkRightAll(val) {
      this.nowSelectRightData = val;
    },
    // 选中
    handelSelect() {
      this.selectArr = this.handleConcatArr(this.selectArr, this.nowSelectData);
      this.handleRemoveTabList(this.nowSelectData, this.data1);
      this.nowSelectData = [];
      console.log(this.nowSelectData);
    },
    // 取消
    handleRemoveSelect() {
      this.data1 = this.handleConcatArr(this.data1, this.nowSelectRightData);
      this.handleRemoveTabList(this.nowSelectRightData, this.selectArr);
      this.nowSelectRightData = [];
    },
    handleConcatArr(selectArr, nowSelectData) {
      let arr = [];
      arr = arr.concat(selectArr, nowSelectData);
      return arr;
      console.log(arr, 9999999);
    },
    handleRemoveTabList(isNeedArr, originalArr) {
      console.log(isNeedArr, 22222, originalArr);
      if (isNeedArr.length && originalArr.length) {
        for (let i = 0; i < isNeedArr.length; i++) {
          for (let k = 0; k < originalArr.length; k++) {
            if (
              isNeedArr[i]["adminNumber"] === originalArr[k]["adminNumber"]
            ) {
              originalArr.splice(k, 1);
            }
          }
        }
      }
    },
    okSubmit() {
      this.$store.dispatch("setUserName", this.adminNumber);
      this.$router.push({ name: "Item", params: { isEdit: true } });
      // console.log(this.$store);
      // console.log(this.$store.getters.selectUserName, 111111);
      // console.log(this.$store.state.selectUserName);
    },
    logSubmit() {
      this.$router.push({ name: "Item" });
    },
    handleClick() {},
    // 滚动条
    load() {
      // this.count += 2;
    },
    getCheckedKeys() {},
    onSubmit() {
      console.log("submit!");
    }
  },
  mounted() {
    // this.scrollHeight = window.innerHeight * 0.7 + "px";
  }
};
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.buttons {
  padding: 0px 0px 15px 120px;
}
.block {
  float: left;
  width: 220px;
  padding: 0px 8px;
}

.tabgrid {
  float: right;
}
.section {
  padding: 20px 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-scrollbar {
  height: 90%;
}
.scrollbar-wrap {
  overflow-x: hidden;
}

.spacing {
  margin-top: 12px;
}
.el-button--mini,
.el-button--mini.is-round {
  margin: 5px;
}
.inputfield {
  width: 238px;
  height: 1000px;
}
</style>