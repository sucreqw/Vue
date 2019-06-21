<template>
  <PageWapper>
    <div v-if="status==1">
      <PageOptionsWapper>
        <el-button type="primary" @click="loadData()">搜索</el-button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <el-form ref="" inline :model="searchFormData" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="searchFormData.query"></el-input>
          </el-form-item>
          <el-form-item label="父亲id">
            <el-input v-model="searchFormData.father"></el-input>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
          >
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="wife"
            label="妻子"
          >
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.gender==0">女</el-tag>
              <el-tag v-if="scope.row.gender==1">男</el-tag>

            </template>
          </el-table-column>
          <el-table-column
            prop="father"
            label="父亲"
          >
          </el-table-column>
          <el-table-column
            prop="sons"
            label="子女"
          >
          </el-table-column>
          <el-table-column
            prop="details"
            label="详情"
            width="300"
          >
          </el-table-column>
          <el-table-column
            prop="generation"
            label="代数"
          >
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="出生年月"
          >
          </el-table-column>
          <el-table-column
            prop="avater"
            label="图片"
          >
          </el-table-column>
          <el-table-column
            prop="cookie"
            label="cookie"
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
              <el-form-item label="姓名">
                <el-input v-model="FormData.nickname"></el-input>
              </el-form-item>
              <el-form-item label="妻子">
                <el-input v-model="FormData.wife"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <!--<el-input v-model="FormData.gender"></el-input>-->
                <el-select v-model="FormData.gender">
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="父亲">
                <el-input v-model="FormData.father"></el-input>
              </el-form-item>
              <el-form-item label="子女">
                <el-input v-model="FormData.sons"></el-input>
              </el-form-item>
              <el-form-item label="详情">
                <el-input v-model="FormData.details"></el-input>
              </el-form-item>
              <el-form-item label="代数">
                <el-input v-model="FormData.generation"></el-input>
              </el-form-item>
              <el-form-item label="图片">
                <el-input v-model="FormData.avater"></el-input>
              </el-form-item>
              <el-form-item label="出生年月日">
                <el-input v-model="FormData.birthday"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>

  import {listPage, create, get, update, remove} from '../../service/generationsDO'

  export default {
    name: 'Generations'
    ,
    data () {
      return {
        pageInfo: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        searchFormData: {
          query: '',
          father: '',
        },
        FormData: {
          id: '',
          nickname: '',
          wife: '0',
          gender: '',
          father: '',
          sons: '',
          details: '',
          generation: '',
          birthday: '',
          avater: '',
          cookie: ''
        },
        tableData: [],
        status: 1,
        value: 0,
        options: [{
          value: 0,
          label: '女'
        }, {
          value: 1,
          label: '男'
        },
        ],
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
      loadData () {

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
