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
            label="预览"
          >
            <template slot-scope="scope">
              <el-image :src="'/weiboimg/'+ scope.row.fileName" lazy
                        style="width: 50px;height: 50px;"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="fileName"
            label="文件名"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row.fileName)">查看修改</el-button>
              <el-button type="text" size="small" @click="remove(scope.row.fileName)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
              <el-form-item label="文件名">
                <el-input v-model="FormData.fileName"></el-input>
              </el-form-item>
              <el-form-item label="新文件名">
                <el-input v-model="FormData.newName"></el-input>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <el-image :src="'/weiboimg/'+ FormData.fileName" lazy></el-image>
          </el-col>
        </el-row>
      </PageContainerWapper>
    </div>
  </PageWapper>
</template>

<script>

  import {get, remove, update} from '../../service/commonDO'

  export default {
    name: 'Picture'
    ,
    data () {
      return {
        searchFormData: {
          query: ''
        },
        FormData: {
          fileName: '',
          newName: '',
        },
        tableData: [],
        status: 1,
      }
    },
    methods: {
      loadData () {
        get((data) => {
          this.tableData = data
        })
      },
      remove (name) {
        this.FormData.fileName = name
        remove(this.FormData, (data) => {
          this.loadData()
        })
      },
      cancel () {
        this.status = 1
      },
      edit (name) {
        this.FormData.fileName = name
        this.status = 2
      },
      save () {
        update(this.FormData, (data) => {
          this.status = 1
          this.loadData()
        })
      }
    },
    mounted () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
