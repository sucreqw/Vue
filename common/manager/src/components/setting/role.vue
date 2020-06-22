<template>
  <PageWapper>
    <!--数据展示-->
    <div v-if="status==0">

      <PageOptionsWapper>
        <Button type="primary" @click="add()">添加角色</Button>
        <Button type="primary" @click="loadData()">搜索</Button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <Row>
          <Col span="24">
            <Form :model="searchFormData" :label-width="80" inline>
              <FormItem label="角色名称">
                <Input v-model="searchFormData.query" placeholder="角色名称"></Input>
              </FormItem>
            </Form>
          </Col>
        </Row>

        <Table border :columns="columns" :data="tableData">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">View</Button>
            <Button type="error" size="small" @click="del(row.id)">Delete</Button>
          </template>
        </Table>
        <Page @on-page-size-change="handleSizeChange" @on-change="handleCurrentChange" :total="pageInfo.total"
              :page-size-opts="[10, 100, 500, 1000]" size="small" show-elevator show-sizer/>
      </PageContainerWapper>

    </div>


    <!--添加数据,修改数据-->
    <div v-if="status==1">

      <PageOptionsWapper>
        <Button type="primary" @click="save()">保存</Button>
        <Button type="primary" @click="cancel()">取消</Button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <Form :model="FormData" :label-width="80">
          <FormItem label="角色名称">
            <Input v-model="FormData.name" placeholder="角色名称"></Input>
          </FormItem>
          <FormItem label="负责菜单">
            <Tree ref="treeMenu" :data="menuList" show-checkbox :render="renderContent"></Tree>
          </FormItem>
        </Form>
      </PageContainerWapper>

    </div>
  </PageWapper>
</template>

<script>
    import {listPage, create, get, update, remove} from '../../service/Role.js';
    import {getAllMenu} from '../../service/menu.js';

    export default {
        name: "role.vue",
        data() {
            return {
                //角色被授权的菜单id
                authMenu: [],
                //页面显示状态
                status: 0,
                menuList: [],
                //分页设置
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],
                searchFormData: {
                    query: '',
                },
                FormData: {
                    id: '',
                    name: '',
                    menu: '',
                },
                columns: [{
                    title: '角色名称',
                    slot: 'name'
                }, {
                    title: '创建时间',
                    key: 'createTime'
                }, {
                    title: '更新时间',
                    key: 'updateTime'
                },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
            }
        },
        created() {
            this.status = 0
            this.loadData()
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
            loadData() {
                listPage(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
                    this.tableData = data.records
                    this.pageInfo.total = data.total

                })
            },
            //取当前权限内的菜单列表
            getMenu() {
                getAllMenu((data) => {
                    //把所有菜单信息存入变量
                    this.menuList = data;
                    if(this.FormData.id!=''){this.checkMenu()}
                })
            },
            edit(id) {
                get(this.tableData[id].id, (data)=>{
                    this.status = 1
                    this.FormData=data
                    this.authMenu = JSON.parse(data.menu);
                    this.getMenu();
                })

                //this.checkMenu()
            },
            //构建数据，根据权限信息把数组加上checked 属性
            checkMenu() {
                for (let i = 0; i < this.menuList.length; i++) {
                    let id = this.menuList[i].id;
                    /*if (this.isExist(id)) {
                        this.$set(this.menuList[i], "checked", true);
                    }else{
                        this.$set(this.menuList[i], "checked", false);
                    }*/
                    for (let k = 0; k < this.menuList[i].children.length; k++) {
                        id = this.menuList[i].children[k].id;
                        if (this.isExist(id)) {
                            this.$set(this.menuList[i].children[k], "checked", true);
                        }else{
                            this.$set(this.menuList[i].children[k], "checked", false);

                        }
                    }
                }
            },
            //判断当前菜单id是否在权限列表里
            isExist(id) {
                let ret = false;
                this.authMenu.forEach((item) => {
                    if (item == id) {
                        ret = true;
                    }
                });
                return ret;
            },
            del(id) {
                remove(id,(data)=>{
                    this.loadData()
                })
            },
            add() {
                this.FormData.id = '';
                this.FormData.name = '';
                this.FormData.menu = '';
                this.status = 1
                this.getMenu()
            },
            save() {
                //取出勾选的菜单列表id
                let choicesAll = this.getAllCheck(this.$refs.treeMenu.getCheckedAndIndeterminateNodes()); //方法的运用 getSelectedNodes也是如此用法
                this.FormData.menu = '[' + choicesAll.join(",") + ']';

                //新增
                if (this.FormData.id == '') {
                     create(this.FormData, (data) => {
                         this.status = 0
                    });
                } else {
                    //修改
                    update(this.FormData.id,this.FormData,(data)=>{
                        this.status=0
                    })
                }
                this.loadData()
            },
            cancel() {

                this.status = 0
            },
            renderContent(h, {root, node, data}) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: data.icon
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.name)
                    ]),

                ]);
            },
            //把所有选中的节目id取出来，放进数组里
            getAllCheck(data) {
                let ret = [];
                data.forEach((item) => {
                    ret.push(item.id);
                })
                return ret
            }
        },
    }
</script>

<style scoped>

</style>
