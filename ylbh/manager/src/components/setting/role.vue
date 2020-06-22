<template>
  <PageWapper>
    <!--首次打开，显示列表信息-->
    <div v-if="status==0">
      <PageOptionsWapper>
        <el-button type="primary" @click="add()">添加新角色</el-button>
        <el-button type="primary" @click="loadData()">搜索</el-button>
      </PageOptionsWapper>
      <PageContainerWapper>
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
            prop="roleName"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            label="创建时间"
          >
            <template slot-scope="scope">
              {{time2date(scope.row.createdAt)}}
            </template>
          </el-table-column>
          <el-table-column
            label="更新时间"
          >
            <template slot-scope="scope">
              {{time2date(scope.row.updatedAt)}}
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
      </PageContainerWapper>
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
                <el-input v-model="FormData.roleName"></el-input>
              </el-form-item>
              <el-form-item label="负责菜单" align="left">
                <!--<el-collapse>
                  <el-checkbox-group v-model="checkList">
                    <el-collapse-item v-for="router in menuList">
                      <template slot="title">
                        <el-checkbox :label="router.id"> {{router.name}}</el-checkbox>
                      </template>
                      <div style="margin-left: 10px" v-for="child in router.children">
                        <el-checkbox :label="child.id"> {{child.name}}</el-checkbox>
                      </div>
                    </el-collapse-item>
                  </el-checkbox-group>
                </el-collapse>-->
                <el-tree
                  :data="menuList"
                  show-checkbox
                  node-key="id"
                  ref="menuTree"
                  :props="defaultProps">
                </el-tree>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>
    import {listPage, create, get, update, remove} from '../../service/adRole.js'
    import {getAllMenu} from '../../service/menu.js'


    export default {
        name: "role.vue",
        data() {
            return {
                //分页设置
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                //接收列表信息
                tableData: [],
                //搜索表单
                searchFormData: {query: ''},
                //页面渲染状态开关
                status: 0,
                //提交的表单数据DTO，保存或者新增.
                FormData: {
                    id: '',
                    roleName: '',
                    menus: '',
                },
                //所有的菜单栏
                menuList: [],
                //接收已经勾选了的菜单
                checkList: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
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
            //用户点击了新添按钮
            add() {
                //改变数值，页面自动渲染。
                this.status = 1;
            },
            //用户点击了修改按钮
            edit(id) {
                //取所有的菜单列表
                this.getAllMenu();
                //服务取该数据，显示在页面上
                get(id, (data) => {
                    //把后台 取到的数据装入变量，自动渲染页面
                    this.FormData = data
                    //改变数值，页面自动渲染。
                    this.status = 1
                    //把数据库返回的字符串转为数组
                    //this.checkList=JSON.parse(this.FormData.menus)
                    this.$nextTick(() => {
                        this.$refs.menuTree.setCheckedKeys(JSON.parse(this.FormData.menus))
                    });
                })
            },
            //用户点击了删除
            remove(id) {
                remove(id, (data) => {
                    this.loadData()
                })
            },
            //用户点击了保存按钮
            save() {

                //判断新添菜单还是编辑菜单
                if (this.FormData.id == '') {
                    //新添菜单
                    create(this.FormData, (data) => {
                        this.clear()
                        this.status = 0
                        this.loadData()
                    })
                } else {
                    //编辑菜单
                    //把勾选的菜单数组转换回string.
                    this.FormData.menus=JSON.stringify(this.$refs.menuTree.getCheckedKeys())
                    //this.FormData.menus=JSON.stringify(this.checkList)
                    //更新数据
                    update(this.FormData.id, this.FormData, (data) => {
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
            clear() {
                this.FormData = {
                    id: '',
                    names: '',
                    urls: '',
                    pid: '',
                    ranking: 100,
                }
            },
            //取所有菜单列表
            getAllMenu() {
                getAllMenu((data) => {
                    this.menuList = data;
                })
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
            this.loadData()
        }
    }
</script>

<style scoped>

</style>
