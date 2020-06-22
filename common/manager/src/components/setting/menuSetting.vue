<template>
  <PageWapper>
    <!--数据展示-->
    <div v-if="status==0">
      <PageOptionsWapper>
        <Button type="primary" @click="add()">添加菜单</Button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <Tree ref="treeMenu" :data="menuList" :render="renderContent"></Tree>
      </PageContainerWapper>
    </div>
    <!--添加菜单，修改菜单 -->
    <div v-if="status==1">
      <PageOptionsWapper>
        <Button type="primary" @click="save()">保存</Button>
        <Button type="primary" @click="cancel()">取消</Button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <Form :model="FormData" :label-width="80">
          <FormItem label="菜单名称">
            <Input v-model="FormData.name" placeholder="菜单名称"></Input>
          </FormItem>
          <FormItem label="菜单图标">
            <Input v-model="FormData.icon" placeholder="菜单图标: ios-construct"></Input>
          </FormItem>
          <FormItem label="菜单路径">
            <Input v-model="FormData.path" placeholder="菜单路径: 首级：/setting 次级：Role"></Input>
          </FormItem>
          <FormItem label="父级菜单">
            <Select v-model="FormData.pid" clearable >
              <Option v-for="item in menuList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Form>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>
    import {getAllMenu,create,update,remove,get} from '../../service/menu.js';

    export default {
        name: "menuSetting.vue",
        data() {
            return {
                //所有菜单列表
                menuList: [],
                //页面显示状态
                status: 0,
                FormData: {
                    id:'',
                    name: '',
                    path: '',
                    icon: '',
                    pid: '0',
                },
            }
        },
        created() {
            this.status = 0
            this.loadData()
        },
        methods: {
            loadData() {
                getAllMenu((data) => {
                    //把所有菜单信息存入变量
                    this.menuList = data;
                })
            },
            save() {
                if(this.FormData.pid==null){this.FormData.pid=0}
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
            add() {
                this.status = 1
            },
            edit(id){
                this.status=1
                get(id,(data)=>{
                    this.FormData=data
                })
            },
            cancel() {
                this.status = 0
            },
            //渲染tree组件
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
                        h('Tag', data.name),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'md-create'
                            }),
                            style: {
                                marginRight: '8px',

                            },
                            on: {
                                click: () => {
                                    this.edit(data.id)
                                }
                            }
                        }),
                    ]),

                ]);
            },
        },
    }
</script>

<style scoped>

</style>
