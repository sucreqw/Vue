<template>
  <PageWapper>
    <div v-if="status==1">
      <PageOptionsWapper>
        <el-button type="primary" @click="add()">添加付款记录</el-button>
        <el-button type="primary" @click="loadData()">搜索</el-button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <el-form ref="" inline :model="searchFormData" label-width="100px">
          <el-form-item label="名称">
            <el-select v-model="searchFormData.cardId">
              <el-option
                v-for="(item,index) in allCardData"
                :key="index"
                :label="item.cardName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间">
            <el-date-picker
              v-model="searchFormData.startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="searchFormData.endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="searchFormData.query"></el-input>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          :summary-method="getSummaries"
          show-summary
          style="width: 100%">

          <el-table-column
            prop="cardId"
            label="名称"
            width="90"
          >
            <template slot-scope="scope">
              {{ getCardName(scope.row.cardId) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="payDate"
            label="日期"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.payDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额"
          >
          </el-table-column>
          <el-table-column
            prop="currency"
            label="货币"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.currency==0">人民币</el-tag>
              <el-tag v-if="scope.row.currency==1">美金</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="detail"
            label="备注"
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
          :page-sizes="[10, 20, 30, 40,100,200]"
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
                <el-select v-model="FormData.cardId">
                  <el-option
                    v-for="(item,index) in allCardData"
                    :key="index"
                    :label="item.cardName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期">
                <!--<el-input v-model="FormData.payDate"></el-input>-->
                <el-date-picker
                  v-model="FormData.payDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="金额">
                <el-input v-model="FormData.amount"></el-input>
              </el-form-item>
              <el-form-item label="币种">
                <!-- <el-input v-model="FormData.currency"></el-input>-->
                <el-select v-model="FormData.currency">
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="FormData.detail"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>
  import {listPagePay, create, get, update, remove} from '../../service/payRecordDO'
  import {listPage} from '../../service/cardDO'

  export default {
    name: 'PayRecord.vue',
    data () {
      return {
        pageInfo: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        searchFormData: {
          cardId: '',
          startTime: '',
          endTime: ''
        },
        FormData: {
          id: '',
          cardId: '',
          payDate: '',
          amount: '',
          currency: '',
          detail: ''
        },
        tableData: [],
        allCardData: [],
        status: 1,
        value: 0,
        options: [{
          value: 0,
          label: '人民币'
        }, {
          value: 1,
          label: '美金'
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
      },
      loadCardData () {
        listPage(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
          this.allCardData = data.records
          //this.pageInfo.total = data.total

        })
      },
      loadData () {
        listPagePay(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
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
            //this.clear()
            //this.status = 1
            //this.loadData()
            this.$message.info('操作完成！')
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
          if (index === 2) {
            const values = data.map(item => Number(item[column.property]))
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {

                return this.additive(prev, curr);
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
      },
      time2date (time) {
        return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, ' ')
      },
      getCardName (id) {
        for (var i = 0; i < this.allCardData.length; i++) {
          if (this.allCardData[i].id == id) {
            return this.allCardData[i].cardName
          }
        }
      },
      additive (arg1, arg2) {
        let r1, r2, m, n;
        try {
          r1 = arg1.toString().split(".")[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = arg2.toString().split(".")[1].length
        } catch (e) {
          r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m + arg2 * m) / m).toFixed(n);
      }
    },
    mounted () {
      this.loadData()
      this.loadCardData()
    }

  }
</script>

<style scoped>

</style>
