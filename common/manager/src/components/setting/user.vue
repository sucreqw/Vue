<template>
  <PageWapper>
    <div v-if="status==0">
      <PageOptionsWapper>
        <Button type="primary" @click="add()">添加用户</Button>
        <Button type="primary" @click="loadData()">搜索</Button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <Table border :columns="columns" :data="tableData">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">View</Button>
            <Button type="error" size="small" @click="del(row.id)">Delete</Button>
          </template>
        </Table>
        <Page @on-page-size-change="handleSizeChange" @on-change="handleCurrentChange" :total="pageInfo.total"
              :page-size-opts="[10, 100, 500, 1000]" size="small" show-elevator show-sizer/>
      </PageContainerWapper>
    </div>
    <div v-if="status==1">
      <PageOptionsWapper>
        <Button type="primary" @click="save()">保存</Button>
        <Button type="primary" @click="cancel()">取消</Button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <Form :model="FormData" :label-width="80">
          <FormItem label="用户名称">
            <Input v-model="FormData.name" placeholder="用户名称"></Input>
          </FormItem>
          <FormItem label="登录账号">
            <Input v-model="FormData.account" placeholder="登录账号"></Input>
          </FormItem>
          <FormItem label="登录密码">
            <Input v-model="FormData.pass" placeholder="登录密码"></Input>
          </FormItem>
          <FormItem label="用户角色">
            <Select v-model="FormData.roleId" style="width:200px">
              <Option v-for="item in role" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否为管理员">
            <Select v-model="FormData.admin" style="width:200px">
              <Option v-for="item in adminList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="负责项目">
            <CheckboxGroup v-model="authProject" >
              <Checkbox border :label="item.id"  v-for="item in allProject">{{item.name}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
      </PageContainerWapper>
    </div>
  </PageWapper>

</template>

<script>
    import {listRole, listPage, create, update, remove, get} from '../../service/userDO.js';
    import {listAllProject,listProjectUser,addProjectUser,updateProjectUser} from '../../service/common.js';

    export default {
        name: "user.vue",
        data() {
            return {
                //页面显示状态
                status: 0,
                tableData: [],
                //所有角色名称
                role: [],
                adminList: [
                    {
                        value: 'false',
                        label: '否'
                    },
                    {
                        value: 'true',
                        label: '是'
                    },
                ],
                //分页设置
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                FormData: {
                    id: '',
                    name: '',
                    roleId: '',
                    account: '',
                    pass: '',
                    pPic: '',
                    admin: 0,
                },
                searchFormData: {
                    query: '',
                    projectId: '',
                    url:'',
                },
                columns: [{
                    title: '用户账号',
                    key: 'account'
                }, {
                    title: '用户名称',
                    slot: 'name'
                }, {
                    title: '用户角色',
                    key: 'roleId',
                    render: (h, params) => {
                        let RoleName = params.row.roleId;
                        let ret = this.getRole(RoleName);
                        // jsx
                        return h('Tag', {
                            props: {
                                color: 'warning'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }, ret);
                    },
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
                allProject:[],
                authProject:[],
                authProjectId:'',
                userId:'',
                project:'',
            }
        },
        created() {
            this.status = 0
            this.loadData()
            this.getAllRole();

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
            getAllRole() {
                listRole(1, 100, {params: this.searchFormData}, (data) => {
                    this.role = data.records;
                })
            },
            loadData() {
                listPage(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
                    this.tableData = data.records
                    this.pageInfo.total = data.total
                })
            },
            edit(id) {
                this.status = 1
                this.getAllProject(id);//取所有项目名称
                get(id, (data) => {
                    this.FormData = data;
                    if(data.admin==true){
                        this.FormData.admin='true'
                    }else{
                        this.FormData.admin='false'
                    }
                })
            },
            del(id) {
                remove(id,(data)=>{
                    this.loadData()
                })
            },
            cancel() {
                this.status = 0
            },
            add() {
                this.FormData.id = '';
                this.FormData.name = '';
                this.FormData.account = '';
                this.FormData.pass = '';
                this.FormData.roleId = '';
                this.FormData.admin = 'false';
                this.FormData.pPic = '';
                this.status = 1;
            },
            save() {
                //新增
                if(this.FormData.id==''){
                    create(this.FormData,(data)=>{
                        let newId=data;
                        this.saveProject(newId,this.authProject,1)
                        this.status=0;
                        this.loadData();
                    })
                }else{
                    //修改
                    //保存权限
                    this.saveProject(this.userId,this.authProject,2)
                    //保存人员
                    update(this.FormData.id,this.FormData,(data)=>{
                        this.status=0;
                        this.loadData();
                    })
                }
            },
            getRole(Rn) {
                let ret = '无匹配'
                this.role.forEach((item) => {
                    if (item.id == Rn) {
                        ret = item.name;
                        return;
                    }
                })
                return ret
            },
            //取出所有的项目，包括没勾权限的
            getAllProject(id){
                listProjectUser(id,(data)=>{
                    if(data.id!=null){
                        this.authProjectId=data.id
                        this.userId=data.userId
                        this.authProject=JSON.parse(data.projectId)
                    }else{
                        this.authProjectId=''
                        this.userId=data.userId=''
                        this.authProject=[]
                    }

                })
                listAllProject(1,1000,{params:this.searchFormData},(data)=>{
                    this.allProject=data.records
                })

            },
            saveProject(id,projects,status){
                let pForm={
                    id: this.authProjectId,
                    userId: id,
                    projectId: '[' + projects.join(",")+ ']',
                }
                //新增
                if(status==1){
                    addProjectUser(pForm,(data)=>{

                    })
                }else{
                    //修改
                    updateProjectUser(this.authProjectId,pForm,(data)=>{

                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>
