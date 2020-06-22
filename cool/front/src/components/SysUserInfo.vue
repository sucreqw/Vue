<template>
  <div class="card">
    <img v-if="userInfo.avater==null" src="../assets/logo.png" style="width:100%">
    <img v-if="userInfo.avater!=null" :src="userInfo.avater" style="width:100%">
    <div class="container">
      <p>昵称: {{userInfo.nickname}}</p>

        <div v-if="status==0"><el-button @click="login()" type="primary" plain>登录</el-button></div>
        <div v-if="status==1"><el-button @click="logout()" type="primary" plain>退出登录</el-button></div>
      <p></p>
    </div>
  </div>
</template>

<script>
  import store from '../service/store.js'

  export default {
    name: 'SysUserInfo',
    data() {
      return {
        status: 1,
      }

    },
    methods: {
      logout() {
        store.commit('setToken', null);
        this.$router.push({path: '/'});
      },
      login(){
        this.$router.push({path:'/login'})
      }
    },
    computed: {
      userInfo() {
        var user = store.getters.userInfo;
        if (!user) {
          this.status=0;
          user = {
            nickname: '未登录'
          }
        }
        return user;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    border: 1px solid #cccccc;
    max-width: 220px;
    text-align: center;
    background-color: white;
  }

  .container {
    padding: 0 16px 0 16px;
  }

</style>
