<template>
  <div class="wrapper">
    <h1>留言后台管理系统</h1>
    <Form ref="sysUser" :model="sysUser">
      <FormItem label="账号">
        <Input v-model="sysUser.account"></Input>
      </FormItem>
      <FormItem label="密码">
        <Input type="password" v-model="sysUser.pass"></Input>
      </FormItem>
      <FormItem label="验证码">
        <Input  v-model="sysUser.verify"></Input>
      </FormItem>
      <FormItem align="left">
        <img
          style="width: 180px; height: 60px;"
          :src="picData"
          :fit="fits" v-on:click="loadPic()">
      </FormItem>

      <FormItem style="text-align: left">
        <Button type="primary" @click="login()">登 录</Button>
      </FormItem>
    </Form>

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
                    account: '',
                    pass: '',
                    verify: '',
                },
                fits: 'fill',
                picData: '',
                createTime:[],
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
                if (this.sysUser.account != '' && this.sysUser.pass != '') {
                    login(this.sysUser, (data, error) => {
                        if (error) {
                            /*this.$message({
                                message: error.message,
                                type: 'error'
                            })*/
                            this.$Message.error(error.message)
                            this.loadPic()
                        } else {
                            //登录成功！
                            store.commit('setToken', data);
                            this.$router.push({
                                path: '/Main'
                            })
                        }
                    })
                } else {

                    this.$Message.error('账号密码不能为空！')
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
