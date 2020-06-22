<template>
  <PageWapper>
    <div v-if="status==0">
      <PageOptionsWapper>
        <Button type="primary" @click="add()">添加页面</Button>
        <Button type="primary" @click="loadData()">搜索</Button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <!--搜索表单-->
        <Row style="padding-bottom: 10px">
          <Col span="24">
            <DatePicker @on-change="queryTimeRange=$event" :transfer="true" type="daterange" format="yyyy-MM-dd"
                        v-model="queryTimeRange" :options="options2" placement="bottom-end"
                        placeholder="选择日期范围" style="width: 200px"></DatePicker>

            <Select v-model="searchFormData.projectId" style="width:200px" placeholder="选择项目" clearable
                    :on-clear="clearSF()">
              <Option v-for="item in allProject" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <!--<Input v-model="searchFormData.url" placeholder="推广域名" style="width: 200px"></Input>-->
            <Input v-model="searchFormData.copyright" placeholder="版权" style="width: 200px"></Input>
            <Input v-model="searchFormData.tel" placeholder="客服电话" style="width: 200px"></Input>
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
        <Form :model="FormData" :label-width="120">
          <FormItem label="项目名称">
            <Select v-model="FormData.projectId" style="width:200px">
              <Option v-for="item in allProject" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="页面标题">
            <Input v-model="FormData.pageTitle" placeholder="页面标题"></Input>
          </FormItem>
          <FormItem label="版权">
            <Input v-model="FormData.copyright" placeholder="版权"></Input>
          </FormItem>
          <FormItem label="客服电话">
            <Input v-model="FormData.tel" placeholder="客服电话"></Input>
          </FormItem>
          <FormItem label="显示图片">
            <Select v-model="FormData.picStatus" style="width:200px">
              <Option v-for="item in picStatusOption" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="屏蔽ip">
            <Select v-model="FormData.blockIp" style="width:200px">
              <Option v-for="item in blockIpOption" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Collapse simple>
              <Panel name="blockIp">
                <div slot="content" >
                  <Button icon="md-add-circle" @click="addBlockIp()"></Button>
                  <Input placeholder="添加ip" style="width: auto;" v-for="(item,index) in blockIp" v-model="item.ip">
                      <Button  slot="append" icon="md-checkmark" @click="saveIP(item)"></Button>
                    <Button style="margin-left: 8px" slot="append" icon="md-close" @click="delIP(index)"></Button>
                  </Input>
                </div>
              </Panel>
            </Collapse>
          </FormItem>
          <FormItem label="屏蔽地区">
            <Select v-model="FormData.blockAddr" style="width:200px">
              <Option v-for="item in blockAddrOption" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Collapse simple>
              <Panel name="blockAddr">
                <div slot="content">
                  <Button icon="md-add-circle" @click="addBlockAddr()"></Button>
                  <div v-for="(item,index) in blockAddr">
                    <v-region v-model="item.selectData" :value="item.selectData" ></v-region>
                    <Button style="margin-left: 1px" icon="md-checkmark" @click="saveAddr(item)"></Button>
                    <Button icon="md-close" @click="delAddr(index)"></Button>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </FormItem>
          <FormItem label="显示留言板">
            <Select v-model="FormData.showMsg" style="width:200px">
              <Option v-for="item in showMsgOption" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="留言板分配">
            <Select v-model="FormData.roleId" style="width:200px">
              <Option v-for="item in allRole" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="上传图片">
            <Collapse simple>
              <Panel name="1">
                <div slot="content" v-for="(timeP,index) in timePlate">
                  <Row>
                    <Col span="24">
                      <div class="demo-upload-list" v-for="(item,listindex) in timeP.uploadList">
                        <template v-if="item.status === 'finished'">
                          <img :src="item.url">
                          <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item,index,listindex)"></Icon>
                          </div>
                        </template>
                        <template v-else>
                          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                      </div>
                      <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="(res)=> handleSuccess(res, index)"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        action="/api/FileUpload/"
                        style="display: inline-block;width:58px;">
                        <div>
                          <Icon type="ios-camera" size="20"></Icon>
                        </div>
                      </Upload>
                      <Modal title="View Image" v-model="visible">
                        <img :src="imgName" v-if="visible" style="width: 100%">
                      </Modal>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <TimePicker v-model="timeP.timeRange" type="timerange" placement="bottom-end" placeholder="时间范围"
                                  style="width: 168px"></TimePicker>
                      <Switch v-model="timeP.allDay"/>
                      <Button type="primary" @click="addTimePlate()">添加时间模块</Button>
                      <Button type="primary" @click="delTimePlate(index)">删除模块</Button>
                    </Col>
                    <Divider/>
                  </Row>
                </div>
              </Panel>
            </Collapse>
          </FormItem>
        </Form>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>
    import {listPage, create, get, update, remove} from '../../service/hardPageDO.js';
    import {listPagePageFile, createPageFile, getPageFile, updatePageFile, removePageFile} from '../../service/hardPageFilesDO.js';
    import {listAllProject, listAllUser} from '../../service/common.js';
    import {listPageIPDO,createIPDO,getIPDO,updateIPDO,removeIPDO} from '../../service/hardBlockIpDO.js';
    import {listPageAddr,createAddr,getAddr,updateAddr,removeAddr} from '../../service/hardBlockAddrDO.js';


    export default {
        name: "page.vue",
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
                    query: '',
                    startTime: '',
                    endTime: '',
                    projectId: '',
                    url: '',
                    copyright: '',
                    tel: '',
                },
                FormData: {
                    id: '',
                    projectId: '',
                    pageTitle: '',
                    copyright: '',
                    tel: '',
                    status: 0,
                    picStatus: 0,
                    blockIp: 0,
                    blockAddr: 0,
                    showMsg: 0,
                    roleId: 0,
                },
                columns: [{
                    title: '页面标题',
                    //slot: 'name'
                    key: 'pageTitle'
                }, {
                    title: '版权',
                    key: 'copyright'
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
                allProject: [],
                allRole: [],
                picStatusOption: [{id: 0, name: '显示服务器图片'}, {id: 1, name: '显示本地图片'}],
                blockIpOption: [{id: 0, name: '不屏蔽ip'}, {id: 1, name: '屏蔽ip'}],
                blockAddrOption: [{id: 0, name: '不屏蔽地区'}, {id: 1, name: '屏蔽地区'}],
                showMsgOption: [{id: 0, name: '不显示留言板'}, {id: 1, name: '显示留言板'}],
                timePlate: [],
                //上传的时间模块
                picForm: {
                    id: '',
                    startTime: '',
                    endTime: '',
                    allDay: true,
                    files: '',
                    pageId: '',
                    uploadList: [],
                    timeRange: '',
                },
                defaultList: [],
                imgName: '',
                visible: false,
                //uploadList: []
                picUrl: '/api/images/',

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
                modal1: false,
                //已设置的要屏蔽的ip
                blockIp:[],
                //已设置要屏蔽的地区
                blockAddr:[],
                province:[],//省份

            }
        },
        created() {
            this.status = 0
            this.loadData()
            this.getAllProject()
            this.getAllRole()
            this.timePlate.push(this.picForm)

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
                if (this.queryTimeRange.length > 0) {
                    this.searchFormData.startTime = this.queryTimeRange[0];
                    this.searchFormData.endTime = this.queryTimeRange[1];
                }
                listPage(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
                    this.tableData = data.records
                    this.pageInfo.total = data.total

                })
            },
            add() {
                this.FormData.id = ''
                this.FormData.projectId = ''
                this.FormData.pageTitle = ''
                this.FormData.copyright = ''
                this.FormData.tel = ''
                this.FormData.status = 0
                this.FormData.picStatus = 0
                this.FormData.blockIp = 0
                this.FormData.blockAddr = 0
                this.FormData.showMsg = 0
                this.FormData.roleId = 0
                this.status = 1
                this.clearTP()
                this.timePlate = []
                this.timePlate.push(this.picForm)
            },
            //把上传的图片列表转换成json 字符串
            getpageFileJson(item) {
                let ret = []
                if (item == null) {
                    return ret;
                }
                item.forEach((items) => {
                    ret.push(items.name)
                })

                return '["' + ret.join('","') + '"]'
            },
            //新增或修改 页面上的各个时间模块的图片
            savePageFile(pageId) {
                this.timePlate.forEach((item) => {
                    item.startTime = item.timeRange[0];
                    item.endTime = item.timeRange[1];
                    item.allDay = item.allDay ? 1 : 0;
                    item.pageId = pageId;
                    item.files = this.getpageFileJson(item.uploadList)
                    //新增
                    if (item.id == '') {
                        createPageFile(item, (data) => {

                        })
                    } else {
                        //修改
                        updatePageFile(item.id, item, (data) => {

                        })
                    }
                });
            },
            save() {

                //新增
                if (this.FormData.id == '') {
                    create(this.FormData, (data) => {
                        let pageId = data;
                        this.savePageFile(pageId);
                    })
                } else {
                    //修改
                    update(this.FormData.id, this.FormData, (data) => {

                    })
                    this.savePageFile(this.FormData.id);
                }
                this.status = 0
                this.loadData()
            },
            edit(id) {
                this.status = 1
                get(id, (data) => {
                    this.FormData = data
                })
                let query = {
                    query: id
                };
                //取出所有时间模块
                listPagePageFile(1, 1000, {params: query}, (data) => {
                    this.timePlate = data.records;
                    //循环把服务器返回的图片列表构建成iview能渲染的格式

                    for (let i = 0; i < this.timePlate.length; i++) {
                        this.$set(this.timePlate[i], 'uploadList', []);
                        this.$set(this.timePlate[i], 'timeRange', [1, 2]);
                        //渲染时间
                        this.timePlate[i].timeRange[0] = this.timePlate[i].startTime
                        this.timePlate[i].timeRange[1] = this.timePlate[i].endTime
                        //switch 组件 数据
                        this.timePlate[i].allDay = this.timePlate[i].allDay == 1 ? true : false;
                        //把图片列表转换成数据
                        let files = [];
                        let f = this.timePlate[i].files;
                        files = JSON.parse(f);
                        //循环图片列表，构建渲染预览格式
                        files.forEach((item) => {
                            let list = {
                                name: item,
                                url: this.picUrl + item,
                                status: 'finished',//让图片显示出来
                            };
                            this.timePlate[i].uploadList.push(list);
                        })

                    }
                })
                //取所有设置的要屏蔽的ip
                this.listAllBlockIp(id)
                //取出所有设置的要屏蔽的地区
                this.listAllBlockAddr(id)
            },
            //取所有设置的要屏蔽的ip
            listAllBlockIp(id){
                let temp={query:id}
                listPageIPDO(1,10000,{params:temp},(data)=>{
                    this.blockIp=data.records;
                })
            },
            //取出所有设置的要屏蔽的地区
            listAllBlockAddr(id){
                let temp={query:id}
               listPageAddr(1,1000,{params:temp},(data)=>{
                   this.blockAddr=data.records

                   //循环构建数据结构，渲染页面
                   for(let i=0;i<this.blockAddr.length;i++){
                       //插入已选选项属性
                       this.$set(this.blockAddr[i],'selectData',{});
                       this.$set(this.blockAddr[i].selectData,'province',this.blockAddr[i].province);
                       this.$set(this.blockAddr[i].selectData,'city',this.blockAddr[i].city);
                       this.$set(this.blockAddr[i].selectData,'area',this.blockAddr[i].county);
                       this.$set(this.blockAddr[i].selectData,'town','');

                   }
               })
            },
            del(id) {
                remove(id, (data) => {
                    this.loadData()
                })
            },
            cancel() {
                this.status = 0
            },
            //取出所有项目，新增修改时用
            getAllProject() {
                listAllProject(1, 1000, null, (data) => {
                    this.allProject = data.records
                })
            },
            //取出所有用户，分配留言板用。
            getAllRole() {
                listAllUser(1, 1000, null, (data) => {
                    this.allRole = data.records
                })
            },
            //上传图片功能
            //查看大图
            handleView(url) {
                this.imgName = url;
                this.visible = true;
            },
            //删除已经上传的图片
            handleRemove(file, index, listIndex) {
                this.timePlate[index].uploadList.splice(listIndex, 1);
            },
            //上传图片成功后回调函数，将后台返回的url,和文件名加入到列表中。
            handleSuccess(res, index) {
                let file = {
                    url: res.data.url,
                    name: res.data.name,
                    status: 'finished',
                }
                this.timePlate[index].uploadList.push(file);

            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload() {
            },
            //添加时间模块
            addTimePlate() {
                this.clearTP()
                this.timePlate.push(this.picForm);
            },
            //重置时间模块信息
            clearTP() {
                this.picForm = {
                    id: '',
                    startTime: '',
                    endTime: '',
                    allDay: true,
                    files: '',
                    pageId: '',
                    uploadList: [],
                    timeRange: '',
                };
            },
            //删除时间模块
            delTimePlate(id) {
                let t = this;
                if (this.timePlate.length > 1) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>此删除操作后不可恢复！</p><p>确定要删除吗？</p>',
                        onOk: () => {
                            //this.$Message.info('Clicked ok');

                            if (t.timePlate[id].id != '') {
                                removePageFile(t.timePlate[id].id, (data) => {
                                    t.timePlate.splice(id, 1);
                                })
                            }

                        },
                        onCancel: () => {
                            //this.$Message.info('Clicked cancel');
                        }
                    });


                }
            },
            //用户清空了搜索框
            clearSF() {
                //this.searchFormData.projectId='';
                if (this.searchFormData.projectId == null) {
                    this.$set(this.searchFormData, 'projectId', '')
                }
            },
            //增加屏蔽ip文本框
            addBlockIp(){
                let temp={id:'',ip:'',pageId:this.FormData.id,status:0}
                this.blockIp.push(temp)
            },
            //保存修改的ip
            saveIP(item){
                if(item.pageId==''){this.$Message.error('请在修改页面添加ip！');return;}
                //新增ip
                if(item.id==''){
                    createIPDO(item,(data)=>{
                        this.$Message.success('提交成功！');
                    })
                }else{
                //修改ip
                    updateIPDO(item.id,item,(data)=>{
                        this.$Message.success('提交成功！');

                    })
                }
            },
            //删除ip数据和文本框
            delIP(index){
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>此删除操作后不可恢复！</p><p>确定要删除吗？</p>',
                    onOk: () => {

                        if(this.blockIp[index].id!=""){
                            //在数据库内，先发请求把数据删除
                            removeIPDO(this.blockIp[index].id,(data)=>{

                            })
                        }
                        //把显示框去掉
                        this.blockIp.splice(index,1)
                    },
                    onCancel: () => {
                        //this.$Message.info('Clicked cancel');
                    }
                });
            },
            //添加屏蔽地区选项框
            addBlockAddr(){
                let temp={id:'',province:'',city:'',county:'',pageId:this.FormData.id,status:0,selectData:[]}
                this.blockAddr.push(temp)
            },
            //保存屏蔽的地区
            saveAddr(item){
                console.log(item.selectData)
                //构建地区DTO
                let addr={
                    id:item.id,
                    province:item.selectData.province,
                    city:item.selectData.city,
                    county:item.selectData.area,
                    pageId:this.FormData.id,
                    status:0,
                }
                //新增地区
                if(item.id==''){
                    createAddr(addr,(data)=>{
                        this.$Message.success('提交成功')
                    })
                }else{
                    //修改地区
                    updateAddr(item.id,addr,(data)=>{
                        this.$Message.success('提交成功')
                    })
                }

            },
            //删除屏蔽地区
            delAddr(index){
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>此删除操作后不可恢复！</p><p>确定要删除吗？</p>',
                    onOk: () => {

                        if(this.blockAddr[index].id!=""){
                            //在数据库内，先发请求把数据删除
                            removeAddr(this.blockAddr[index].id,(data)=>{

                            })
                        }
                        //把显示框去掉
                        this.blockAddr.splice(index,1)
                    },
                    onCancel: () => {
                        //this.$Message.info('Clicked cancel');
                    }
                });            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
