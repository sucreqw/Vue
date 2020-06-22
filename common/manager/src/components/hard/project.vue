<template>
  <PageWapper>
    <div v-if="status==0">
      <PageOptionsWapper>
        <Button type="primary" @click="add()">添加项目</Button>
        <Button type="primary" @click="loadData()">搜索</Button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <Row style="padding-bottom: 10px">
          <Col span="24">
            <Select v-model="searchFormData.projectId" style="width:200px" placeholder="选择项目" clearable :on-clear="clearSF()">
              <Option v-for="item in allProject" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Input v-model="searchFormData.url" placeholder="推广域名" style="width: 200px"></Input>
          </Col>
        </Row>
        <Table border :columns="columns" :data="tableData">
          <!--<template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>-->
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
          <FormItem label="项目名称">
            <Input v-model="FormData.name" placeholder="项目名称"></Input>
          </FormItem>
          <FormItem label="推广连接">
            <Input v-model="FormData.url" placeholder="推广连接"></Input>
          </FormItem>
          <FormItem label="动态js">
            <Input type="textarea" v-model="FormData.js" placeholder="动态js"></Input>
          </FormItem>
          <FormItem label="后台JS文件">
            <Upload action="/api/FileUpload/" :on-success="upload" :show-upload-list="false">
              <Button icon="ios-cloud-upload-outline">{{jsData.jsName}}</Button>
            </Upload>
          </FormItem>
          <FormItem label="51客服">
            <Input v-model="FormData.link51" placeholder="51客服连接"></Input>
          </FormItem>
          <FormItem label="辅助连接">
            <Input v-model="FormData.subLink" placeholder="辅助连接"></Input>
          </FormItem>
          <FormItem label="项目归属">
            <Select v-model="FormData.projectType" style="width:200px">
              <Option v-for="item in projectTypes" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Form>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>
    import {listPage, create, get, update, remove} from '../../service/hardProjectDO.js';
    import {listPageJS, createJS, getJS, updateJS, removeJS, getJSByProjectId} from '../../service/hardJsDO.js';
    import {listProjectType,listAllProject} from '../../service/common.js';

    export default {
        name: "project.vue",
        data() {
            return {
                //页面显示状态
                status: 0,
                //分页设置
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],
                searchFormData: {
                    query: '',
                    projectId:'',
                    url:'',
                },
                FormData: {
                    id: '',
                    name: '',
                    url: '',
                    js: '',
                    link51: '',
                    subLink: '',
                    projectType: '',
                },
                //接收js文件名
                jsData: {
                    id: '',
                    jsName: 'Upload files',
                    projectId: '',
                },
                columns: [{
                    title: '项目名称',
                    //slot: 'name'
                    key: 'name'
                }, {
                    title: '推广连接',
                    key: 'url'
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
                projectTypes: [],
                file: null,
                loadingStatus: false,
                allProject:[],
            }
        },
        created() {
            this.status = 0
            this.loadData()
            this.getProjectType()
            this.getAllProject()
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
            edit(id) {
                this.status = 1
                get(id, (data) => {
                    this.FormData = data
                })
                getJSByProjectId(id, (data) => {
                    this.jsData = data
                })
            },
            add() {
                this.FormData.id = ''
                this.FormData.name = ''
                this.FormData.url = ''
                this.FormData.js = ''
                this.FormData.link51 = ''
                this.FormData.subLink = ''
                this.FormData.projectType = ''
                this.status = 1
                this.jsData = {
                    id: '',
                    jsName: 'Upload files',
                    projectId: '',
                }
            },
            save() {

                //新增
                if (this.FormData.id == '') {
                    create(this.FormData, (data) => {
                        this.status = 0;
                        this.jsData.projectId = data;
                        createJS(this.jsData, (data) => {

                        })
                    })

                } else {
                    //修改
                    update(this.FormData.id, this.FormData, (data) => {
                        this.status = 0;
                        updateJS(this.jsData.id, this.jsData, (data) => {

                        })
                    })
                }
                this.loadData()
            },
            cancel() {
                this.status = 0
            },
            del(id) {
                remove(id, (data) => {
                    this.loadData()
                })

            },
            getProjectType() {
                listProjectType(1, 200, null, (data) => {
                    this.projectTypes = data.records
                })
            },
            //上传文件
            upload(response, file, fileList) {
                this.jsData.jsName = response.data.name
            },
            //取出所有项目，新增修改时用
            getAllProject() {
                listAllProject(1, 1000, null, (data) => {
                    this.allProject = data.records
                })
            },
            //用户清空了搜索框
            clearSF(){
                //this.searchFormData.projectId='';
                if(this.searchFormData.projectId==null){
                    this.$set(this.searchFormData,'projectId','')
                }

            },
        }
    }
</script>

<style scoped>

</style>
