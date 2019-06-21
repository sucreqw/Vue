<template>
  <PageWapper>
    <br>
    <div style="margin-left: 10px">
      <el-button type="primary" @click="cancel()">返回</el-button>
    </div>
    <div style="text-align: center">
      <h1>正在登录微博，请耐心等候！</h1>
    </div>
  </PageWapper>
</template>

<script>
  import {callBack} from "../service/UserDO";
  import  store from '../service/store.js'

  export default {
        name: "SinaCallBack",
    data(){
          return{
            code:'',
          }
    },
      mounted() {
        let code = this.$route.query.code;
        if(code!=null){
          this.code=code;
          this.callback();
        }else{
          this.$message({
            message: '授权参数出错！',
            type: 'error'
          })
         this.cancel();
        }
      },
      methods:{
          cancel(){
            this.$router.push({path:'/'});
          },
          callback(){
            callBack(this.code,(data,error)=>{
              if (error) {
                this.$message({
                  message: error.message,
                  type: 'error'
                })
                this.cancel();
              } else {
                //登录成功
                store.commit('setToken',data);
                //alert(data);
                this.$router.push({
                  path: '/'
                })
              }
            })
          },
      }
    }
</script>

<style scoped>

</style>
