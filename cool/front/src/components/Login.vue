<template>
  <PageWapper>
    <br>
    <div style="margin-left: 10px">
      <el-button type="primary" @click="cancel()">返回</el-button>
    </div>
    <div style="text-align: center" v-if="url!=''">
      <h1>暂时只支持微博登录！</h1>
      <a
        :href="url"
        rel="noflow" title="新浪微博快速登录" class="btn-quick-login"><img src="../assets/sina.png"
                                                                   style="width:25px;height:25px; color:#FF0000; ">新浪微博快速登录</a>
    </div>
  </PageWapper>
</template>

<script>
  import {get} from "../service/commonDO";

  export default {
    name: "Login",
    data() {
      return {
        url: '',
      }
    },
    methods: {
      cancel() {
        this.$router.push({path: '/'});
      },
      loadData() {
        get((data) => {
          this.url = data;
        })
      }
    },
    mounted() {
      this.url='';
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
