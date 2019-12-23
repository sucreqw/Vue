<template>
  <PageWapper>
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
        prop="monthCount"
        label="上月次数"
      >
      </el-table-column>
      <el-table-column
        prop="monthSum"
        label="上月金额"

      >
        <template slot-scope="scope">
          <el-tag style="width: 100px">人民币: {{scope.row.monthSum.RMB}}</el-tag>

          <el-tag style="width: 100px">美金: {{scope.row.monthSum.USD}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="yearCount"
        label="本年次数"
      >
      </el-table-column>
      <el-table-column
        prop="yearSum"
        label="本年金额"
      >
        <template slot-scope="scope">
          <el-tag style="width: 100px">人民币: {{scope.row.yearSum.RMB}}</el-tag>

          <el-tag style="width: 100px">美金: {{scope.row.yearSum.USD}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </PageWapper>
</template>

<script>
  import {get} from '../../service/cardGatherDO'
  export default {
    name: 'cardGather',
    data () {
      return {
        tableData:[],
      }
    }
    ,
    methods: {
      loadData () {
        get((data) => {
          this.tableData = data;
        })
      },
    }
    ,
    mounted () {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
