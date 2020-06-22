<template>
  <PageWapper>
    <PageOptionsWapper>
      <Button type="primary" @click="loadData()">搜索</Button>
      <Button type="primary" @click="exports()">导出</Button>
    </PageOptionsWapper>
    <PageContainerWapper>
      <Row style="padding-bottom: 10px">
        <Col span="24">
          <DatePicker @on-change="queryTimeRange=$event" :transfer="true" type="daterange" format="yyyy-MM-dd"
                      v-model="queryTimeRange" :options="options2" placement="bottom-end"
                      placeholder="选择日期范围" style="width: 200px"></DatePicker>
          <Select v-model="searchFormData.projectId" style="width:200px" placeholder="选择项目" clearable
                  :on-clear="clearSF()">
            <Option v-for="item in allProject" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <Input v-model="searchFormData.source" placeholder="来源平台" style="width: 200px"></Input>
          <Input v-model="searchFormData.keyword" placeholder="关键字" style="width: 200px"></Input>
          <Input v-model="searchFormData.url" placeholder="页面连接" style="width: 200px"></Input>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData">
        <!--<template slot-scope="{ row }" slot="joinArea">
          <strong>{{ row.province }}{{ row.city }}{{ row.area }}</strong>
        </template>-->
        <template slot-scope="{ row, index }" slot="action">
          <!--<Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">View</Button>-->
          <Button type="error" size="small" @click="del(row.id)">Delete</Button>
        </template>
      </Table>
      <Page @on-page-size-change="handleSizeChange" @on-change="handleCurrentChange" :total="pageInfo.total"
            :page-size-opts="[10, 100, 500, 1000]" size="small" show-elevator show-sizer/>
    </PageContainerWapper>
  </PageWapper>
</template>

<script>
    import {listPage, create, get, update, remove} from '../../service/hardVisitDO.js';
    import {listAllProject} from '../../service/common.js';
    import {exportVisit} from '../../service/excelExport.js';

    export default {
        name: "visit.vue",
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
                queryTimeRange: [],
                searchFormData: {
                    startTime: '',
                    endTime: '',
                    query: '',
                    projectId: '',
                    url: '',
                    keyword: '',
                    source: '',
                },
                FormData: {
                    id: '',
                    name: '',
                },
                columns: [{
                    title: '时间',
                    //slot: 'name'
                    width: 170,
                    key: 'createTime'
                }, {
                    title: 'ip',
                    //slot: 'name'
                    key: 'ip'
                }, {
                    title: 'ip所在地',
                    //slot: 'name'
                    key: 'ipArea'
                }, {
                    title: '页面标题',
                    //slot: 'name'
                    key: 'pageTitle'
                }, {
                    title: '关键字',
                    //slot: 'joinArea'
                    key: 'keyword'
                }, {
                    title: '来源',
                    //slot: 'name'
                    key: 'source'
                }, {
                    title: '页面连接',
                    //slot: 'name'
                    key: 'url'
                },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                split1: 0.5,
                //接收所有的项目
                allProject: [],
                //日期选择器
                options2: {
                    shortcuts: [
                        {
                            text: '昨天',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                return [start, end];
                            }
                        }, {
                            text: '最近三天',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                                return [start, end];
                            }
                        }, {
                            text: '最近一周',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
            }
        },
        created() {
            this.status = 0
            this.loadData()
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
                this.checkTime()
                listPage(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
                    this.tableData = data.records
                    this.pageInfo.total = data.total

                })
            },
            del(id) {
                remove(id, (data) => {
                    this.loadData()
                })
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
                                type: data.projectId
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.userId)
                    ]),

                ]);
            },
            //取出所有项目，查询时用
            getAllProject() {
                listAllProject(1, 1000, null, (data) => {
                    this.allProject = data.records
                })
            },
            //用户清空了搜索框
            clearSF() {
                //this.searchFormData.projectId='';
                if (this.searchFormData.projectId == null) {
                    this.$set(this.searchFormData, 'projectId', '')
                }

            },
            //导出到excel
            exports() {
                this.checkTime()
                this.searchFormData.query = 'export'
                exportVisit(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {

                });
            },
            checkTime() {
                if (this.queryTimeRange.length > 0) {
                    this.searchFormData.startTime = this.queryTimeRange[0];
                    this.searchFormData.endTime = this.queryTimeRange[1];
                }
            }
        }
    }
</script>

<style scoped>

</style>
