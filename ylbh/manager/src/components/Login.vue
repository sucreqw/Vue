<template>
  <div class="wrapper">
    <h1>留言后台管理系统</h1>
    <el-form ref="sysUser" :model="sysUser" label-width="100px">
      <el-form-item label="账号">
        <el-input v-model="sysUser.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="sysUser.upass"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input  v-model="sysUser.verfy"></el-input>
      </el-form-item>
      <el-form-item align="left">
        <el-image
          style="width: 180px; height: 60px;"
          :src="picData"
          :fit="fits" v-on:click="loadPic()"></el-image>
      </el-form-item>

      <el-form-item style="text-align: left">
        <el-button type="primary" style="width: 100px" @click="login()">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>


<script>
    import {login} from '../service/login.js'
    import {get} from '../service/Kaptcha.js'
    import store from '../service/store.js'

    export default {
        name: 'Login.vue',
        data() {
            return {
                sysUser: {
                    token: '',
                    uname: '',
                    upass: '',
                    verfy: '',
                },
                fits: 'fill',
                picData: '',
            }
        }
        ,
        mounted() {

            /*this.$router.push({
                path: '/Main'
            })*/
            this.loadPic()
        }
        ,
        methods: {
            login() {
                if (this.sysUser.uname != '' && this.sysUser.upass != '') {
                    login(this.sysUser, (data, error) => {
                        if (error) {
                            this.$message({
                                message: error.message,
                                type: 'error'
                            })
                            this.loadPic()
                        } else {
                            store.commit('setToken', data);
                            //alert(data);
                            this.$router.push({
                                path: '/Main'
                            })
                        }
                    })
                } else {
                    this.$message.error('账号密码不能为空！')
                }
            },
            //加载验证码
            loadPic() {
                get((data) => {
                    this.picData = data;
                })
            },
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
