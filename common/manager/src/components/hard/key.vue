<template>
  <PageWapper>
    <div v-if="status==0">
      <PageOptionsWapper>
        <Button type="primary" @click="add()">添加项目归属</Button>
        <Button type="primary" @click="loadData()">搜索</Button>
      </PageOptionsWapper>
      <PageContainerWapper>
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
        </Form>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>
    import {listPage, create, get, update, remove} from '../../service/hardKeywordDO.js';

    export default {
        name: "key.vue",
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
                },
                FormData: {
                    id: '',
                    name: '',
                },
                columns: [{
                    title: '项目名称',
                    //slot: 'name'
                    key: 'name'
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

        },
    }
</script>

<style scoped>

</style>
