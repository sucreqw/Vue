<template>
  <PageWapper style="color: white">
    <br>
    <el-form inline style="text-align: center" :model="searchFormData">
      <el-form-item label="内容">
        <el-input v-model="searchFormData.query"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <!--开始展示数据-->
    <div style="margin-left: 10%;margin-right: 10%; " class="infinite-list-wrapper" v-infinite-scroll="load">
      <el-collapse accordion v-for="(item,index) in tableData" >
        <el-collapse-item >
          <template slot="title" >
            <div> {{item.title}}</div>
          </template>
          <div :id="'content_'+item.id">{{formatContent(item.content,item.id)}}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div style="text-align: center">
      <p v-if="nomore!=true">加载中...</p>
      <p v-if="nomore">没有更多了</p>
    </div>

  </PageWapper>
</template>

<script>
  import defaultImg from '../../assets/fate.jpg';
  import {listPage} from "../../service/shareDO";

  export default {
    name: "Share",
    data() {
      return {
        bgImg: {
          backgroundImage: "url(" + defaultImg + ")"
        },
        pageInfo: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        searchFormData: {
          query: '',
        },
        tableData: '',
        loading: false,
        nomore: false,
      }
    },
    mounted() {
      this.background();
      this.tableData = [];
      this.loadData();
    },
    methods: {
      loadData() {
        listPage(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
          if (data.records.length > 0) {
            for (let i = 0; i < data.records.length; i++) {
              this.tableData.push(data.records[i]);
            }
            this.pageInfo.total = data.total
            this.loading = true;
          } else {
            this.pageInfo.page = '1';
            this.nomore = true;
          }
        });
      },
      search() {
        this.tableData = [];
        this.loadData();
      },
      load() {
        //this.FormData.content+=1;
        if (this.loading) {
          this.loading = false;
          this.pageInfo.page++;
          this.loadData();
        }
      },
      background() {
        let div = document.querySelector('main');//document.getElementById('main');
        div.style.backgroundImage = this.bgImg.backgroundImage;;
      },
      formatContent(content,id){
        //alert(content)
        this.$nextTick(function () {
          let newContent = this.convert(content);
          let div = document.getElementById('content_' + id.toString());
          div.innerHTML = newContent;
        });
      },
      convert(content){
        //alert(content);
        return content//.replace('<p>','<br>');
      },
    }
  }
</script>

<style>
  .el-collapse-item__header {
 background-color: #343434;
    color: white;
  }
  .el-collapse-item__content{
    background-color: #343434;
    color: white;
  }
</style>
