<template>
  <PageWapper>
    <div v-if="status==1">
      <PageOptionsWapper>
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
            prop="token"
            label="账号"
          >
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称"
          >
          </el-table-column>
          <el-table-column
            prop="postday"
            label="评论时间"
          >
          </el-table-column>
          <el-table-column
            prop="postip"
            label="评论ip"
          >
          </el-table-column>
          <el-table-column
            prop="avater"
            label="头像"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
          >
          </el-table-column>
          <el-table-column
            prop="mid"
            label="mid"
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
              <el-form-item label="内容">
                <el-input v-model="FormData.query"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>

  import {listPage, create, get, update, remove} from '../../service/dronecommentDO'

  export default {
    name: 'DroneComment'
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
          mid: '',
          token: '',
          avater: '',
          nickname: '',
          content: '',
          postip: '',
          postday: ''
        },
        tableData: [],
        status: 1,
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
