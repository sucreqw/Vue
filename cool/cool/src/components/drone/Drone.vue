<template>
  <PageWapper>
    <div v-if="status==1">
      <PageOptionsWapper>
        <el-button type="primary" @click="add()">发布作品</el-button>
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
            prop="type"
            label="类型"
            width="90"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type==0">图片</el-tag>
              <el-tag v-if="scope.row.type==1">视频</el-tag>
              <el-tag v-if="scope.row.type==2">全景</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="urls"
            label="连接"
          >
          </el-table-column>
          <el-table-column
            prop="likecount"
            label="赞"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
          >
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
    <div v-if="status==2">
      <PageOptionsWapper>
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <el-row>
          <el-col :span="24">
            <el-form ref="" :model="FormData" label-width="100px">
              <el-form-item label="类型">
                <!-- <el-input v-model="FormData.type"></el-input>-->
                <el-select v-model="FormData.type">
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="连接">
                <el-input v-model="FormData.urls"></el-input>
              </el-form-item>
              <el-form-item label="赞">
                <el-input v-model="FormData.likecount"></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input v-model="FormData.content"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>

  import {listPage, create, get, update, remove} from '../../service/droneDO'

  export default {
    name: 'Drone'
    ,
    data () {
      return {
        pageInfo: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        searchFormData: {
          query: ''
        },
        FormData: {
          id: '',
          type: '',
          likecount: '0',
          content: ''
        },
        tableData: [],
        status: 1,
        value: 0,
        options: [{
          value: 0,
          label: '图片'
        }, {
          value: 1,
          label: '视频'
        },
          {
            value: 2,
            label: '全景图'
          }],
      }
    },
    methods: {
      handleSizeChange (pageSize) {
        this.pageInfo.pageSize = pageSize
        this.loadData()
      },
      handleCurrentChange (page) {
        this.pageInfo.page = page
        this.loadData()
      }, loadData () {

        listPage(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
          this.tableData = data.records
          this.pageInfo.total = data.total

        })
      },
      add () {
        this.status = 2
      },
      remove (id) {
        remove(id, (data) => {
          this.loadData()
        })
      },
      clear () {
        this.FormData = {
          id: '',
          detail: ''
        }
      },
      cancel () {
        this.clear()
        this.status = 1
      },
      edit (id) {
        get(id, (data) => {
          this.FormData = data
          this.status = 2
        })
      },
      save () {
        if (this.FormData.id) {
          update(this.FormData.id, this.FormData, (data, error) => {
            this.clear()
            this.status = 1
            this.loadData()
          })
        } else {
          create(this.FormData, (data) => {
            this.clear()
            this.status = 1
            this.loadData()
          })
        }
      }
    },
    mounted () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
