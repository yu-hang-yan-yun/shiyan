<template>
    <div>
        <el-container>       
            <el-main>
                <div class="main-btns" id="main-btns" >
                    <el-badge class="item" v-for="(item , index) in plices" :key="index">
                        <el-button class="item-button" size="small" @click="jump">{{item.appName}}1</el-button>
                    </el-badge>
                    <!-- <el-button class="item-button" type="text" @click="dialog = true">+ 添加应用</el-button> -->
                </div>
                   <div class="block" style="float:right;">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
            </el-main>
            
        </el-container>
<!-- 
      <el-dialog title="添加应用" :visible.sync="dialog">
  <el-form :model="form">
          <el-form-item label="应用名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属分类" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择分类名称">
              <el-option label="分类一" value="shanghai"></el-option>
              <el-option label="分类二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用ID" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="版本" :label-width="formLabelWidth">
            <el-input v-model="form.version" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
  <div  slot="footer" class="dialog-footer">
    <el-button @click="dialog = false">取 消</el-button>
    <el-button type="primary" @click="dialog = false">确 定</el-button>
  </div>
</el-dialog> -->
    </div>
</template>
<script>
import { postallyLog } from "@/api/index.js";
export default {
    data() {
      return {
        plices:[],
         pageSize: 6,
      // 分页所对应的数据
      total: 0,
      currentPage: 1,
      //   当前页码
      page: 1,
      // 每页显示的记录数
        activeIndex2: '1',
        isCollapse: false,
        dialog: false,
        loading: false,
        form: {
          name: '',
          region: '',
          id:'',
          version:'',
          remarks:'',
        },
        formLabelWidth: '80px'
      };
    },
    methods: {
     _postallyLog(){
       postallyLog({pageSize:this.pageSize,page:this.page}).then(res => {
          this.page = res.data.page,
          this.pageSize = res.data.pageSize,
          this.total = res.data.total
          this.plices = res.data.rows
       })
     },
      jump(){
        this.$router.push({path: '/dataSource'});
      }
    },
    mounted(){
       this. _postallyLog()
    }
}
</script>
<style>
.item {
    margin-top: 5px;
    margin-right: 40px;
  }
 .item-button{
   width:100px;
   height: 100px;
   border-radius: 50px;
   
 }
 .main-btns{
   margin-left: 50px;
   margin-top: 50px;
 }
 .aside-boder-r{
    border-right: 1px rgb(250, 233, 233) solid;
 }
</style>