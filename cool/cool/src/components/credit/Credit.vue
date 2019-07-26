<template>
  <PageWapper>
    <div v-if="status==1">
      <PageOptionsWapper>
        <el-button type="primary" @click="add()">添加信用卡</el-button>
        <el-button type="primary" @click="loadData()">搜索</el-button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <el-form ref="" inline :model="searchFormData" label-width="100px">
          <el-form-item label="名称">
            <el-input v-model="searchFormData.query"></el-input>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">

          <el-table-column
            prop="cardName"
            label="名称"
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="cardNum"
            label="卡号"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            prop="cardDate"
            label="有效期"
          >
          </el-table-column>
          <el-table-column
            prop="cardCode"
            label="code"
          >
          </el-table-column>
          <el-table-column
            prop="billDate"
            label="账单日期"
          >
          </el-table-column>
          <el-table-column
            prop="payDate"
            label="还款日期"
          >
          </el-table-column>
          <el-table-column
            prop="minUseCount"
            label="免年费次数"
          >
          </el-table-column>
          <el-table-column
            prop="cardDetail"
            label="详情"
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
              <el-form-item label="名称">
                <el-input v-model="FormData.cardName"></el-input>
              </el-form-item>
              <el-form-item label="卡号">
                <el-input v-model="FormData.cardNum"></el-input>
              </el-form-item>
              <el-form-item label="有效期">
                <el-input v-model="FormData.cardDate"></el-input>
              </el-form-item>
              <el-form-item label="code">
                <el-input v-model="FormData.cardCode"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="FormData.phone"></el-input>
              </el-form-item>
              <el-form-item label="账单日">
                <el-input v-model="FormData.billDate"></el-input>
              </el-form-item>
              <el-form-item label="还款日">
                <el-input v-model="FormData.payDate"></el-input>
              </el-form-item>
              <el-form-item label="免年费次数">
                <el-input v-model="FormData.minUseCount"></el-input>
              </el-form-item>
              <el-form-item label="详情">
                <el-input v-model="FormData.cardDetail"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>
  import {listPage, create, get, update, remove} from '../../service/cardDO'

  export default {
    name: 'Credit.vue',
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
          cardName: '',
          cardNum: '',
          phone: '',
          cardDate: '',
          cardCode: '',
          billDate: '',
          payDate: '',
          minUseCount: '',
          cardDetail: ''
        },
        tableData: [],
        status: 1,
        value: 0,
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
      },
      getSummaries (param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 4) {
            const values = data.map(item => Number(item[column.property]))
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = 'N/A'
          }

        })
        return sums
      }
    },
    mounted () {
      this.loadData()
    }

  }
</script>

<style scoped>

</style>
