<template>
  <div class="wrapper">
    <h1>cool's Manager</h1>
    <el-form ref="sysUser" :model="sysUser" label-width="100px">
      <el-form-item label="账号">
        <el-input v-model="sysUser.token"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="sysUser.psd"></el-input>
      </el-form-item>
      <el-form-item style="text-align: left">
        <el-button type="primary" style="width: 100px" @click="login()">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>


<script>
  import {login} from '../service/UserDO.js'
  import  store from '../service/store.js'

  export default {
    name: 'Login.vue',
    data () {
      return {
        sysUser: {
          token: '',
          psd: ''
        }
      }
    }
    ,
    mounted () {
    }
    ,
    methods: {
      login () {
        if (this.sysUser.token != '' && this.sysUser.psd != '') {
          login(this.sysUser, (data, error) => {
            if (error) {
              this.$message({
                message: error.message,
                type: 'error'
              })
            } else {
              store.commit('setToken',data);
              //alert(data);
              this.$router.push({
                path: '/Main'
              })
            }
          })
        } else {
          this.$message.error('账号密码不能为空！')
        }
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 400px;
    height: 300px;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>
