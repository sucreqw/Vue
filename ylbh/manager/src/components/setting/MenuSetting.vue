<template>
  <PageWapper>
    <!--首次打开，显示列表信息-->
    <div v-if="status==0">
      <page-options-wapper>
        <el-button type="primary" @click="add()">添加页面连接</el-button>
        <el-button type="primary" @click="loadData()">搜索</el-button>

      </page-options-wapper>
      <page-container-wapper>
        <el-form ref="" inline :model="searchFormData" label-width="100px">
          <el-form-item label="内容">
            <el-input v-model="searchFormData.query"></el-input>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">

          <el-table-column
            prop="names"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            prop="urls"
            label="连接"
          >
          </el-table-column>
          <el-table-column
            label="创建时间"
          >
            <template slot-scope="scope">
              {{time2date(scope.row.createTime)}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total">
        </el-pagination>
      </page-container-wapper>
    </div>
    <!--增加/编辑新连接（菜单） 页面-->
    <div v-if="status==1">
      <PageOptionsWapper>
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <el-row>
          <el-col :span="24">
            <el-form ref="" :model="FormData" label-width="100px">
              <el-form-item label="名称">
                <el-input v-model="FormData.names"></el-input>
              </el-form-item>
              <el-form-item label="连接">
                <el-input v-model="FormData.urls"></el-input>
              </el-form-item>
              <el-form-item label="上一级菜单" align="left">
                <!--当添加页面时-->
                <el-select v-model="FormData.pid">
                  <el-option
                    v-for="(item,index) in AllFirstMenu"
                    :key="index"
                    :label="item.names"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>
    import {getFirstMenu,listPage, create, get, update, remove} from '../../service/adRoleLinkDO'

    export default {
        name: "MenuSetting.vue",
        data() {
            return {
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                //
                tableData: [],
                //所有一级菜单
                AllFirstMenu:[],
                //搜索表单
                searchFormData: {query: ''},
                status: 0,
                //提交的表单数据DTO，保存或者新增.
                FormData: {
                    id: '',
                    names: '',
                    urls: '',
                    pid: '',
                    ranking: 100,
                },
                //默认的菜单选项，首级菜单
                defaultMenu:{
                    id: 0,
                    names:'首级菜单',
                }
            }
        },
        methods: {
            //分页条数改变
            handleSizeChange(pageSize) {
                this.pageInfo.pageSize = pageSize
                this.loadData()
            },
            //当前页面改变
            handleCurrentChange(page) {
                this.pageInfo.page = page
                this.loadData()
            },
            //加载数据
            loadData() {
                listPage(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
                    this.tableData = data.records
                    this.pageInfo.total = data.total

                })
            },
            //取权限下的一级菜单
            firstMenu(){
              getFirstMenu((data)=>{
                  this.AllFirstMenu=data;
                  this.AllFirstMenu.push(this.defaultMenu);
              })
            },
            //用户点击了新添按钮
            add() {
                //取权限下的第一级菜单
                this.firstMenu();
                //改变数值，页面自动渲染。
                this.status = 1;
            },
            //用户点击了修改按钮
            edit (id) {
                //取权限下的第一级菜单
                this.firstMenu();
                //服务取该数据，显示在页面上
                get(id, (data) => {
                    //把后台 取到的数据装入变量，自动渲染页面
                    this.FormData = data
                    //改变数值，页面自动渲染。
                    this.status = 1
                })
            },
            //用户点击了删除
            remove(id){
               remove(id,(data)=>{
                   this.loadData()
               })
            },
            //用户点击了保存按钮
            save() {
                //判断新添菜单还是编辑菜单
               if(this.FormData.id ==''){
                   //新添菜单
                   create(this.FormData,(data)=>{
                       this.clear()
                       this.status = 0
                       this.loadData()
                   })
               }else{
                   //编辑菜单
                   update(this.FormData.id,this.FormData,(data)=>{
                       this.clear()
                       this.status = 0
                       this.loadData()
                   })
               }
            },
            //用户点击了取消按钮
            cancel() {
                //清除表单
                this.clear()
                //改变数值，页面自动渲染。
                this.status = 0;
            },
            //点击取消后清除表单数据
            clear(){
                this.FormData={
                    id: '',
                    names: '',
                    urls: '',
                    pid: '',
                    ranking: 100,
                }
            },
            //服务器返回的timestamp转换成年月日的显示模式
            time2date(time) {
                let date = new Date(parseInt(time + "000"));
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        },
        created() {
            this.loadData();
        },

    }
</script>

<style scoped>

</style>
