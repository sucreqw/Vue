<template>
  <div id="app">

    <el-container>

      <el-header style="background-color: #606266">
        <div >

          <Menu></Menu>
        </div>
        <img src="../assets/mylogo2.png" style="position: fixed;top:15px;right: 50%;">
        <div>
          <img v-if="userInfo.avater==null" style="border-radius:25px;position: fixed;top:15px;right: 20px;width: 50px"
               src="../assets/logo.png"
               alt="user"
               v-popover:popover1>
          <el-popover
            ref="popover1"
            width="200"
            trigger="hover">
            <SysUserInfo></SysUserInfo>
          </el-popover>
          <img v-if="userInfo.avater!=null" style="border-radius:25px;position: fixed;top:15px;right: 20px;width: 50px"
               :src="userInfo.avater"
               alt="user"
               v-popover:popover1>
          <el-popover
            ref="popover1"
            width="200"
            trigger="hover">
            <SysUserInfo></SysUserInfo>
          </el-popover>
        </div>
      </el-header>


      <el-container>
        <el-main style="height: 100%;padding: 0;">
          <router-view></router-view>
        </el-main>

        <el-footer
          style="height:32px;line-height:32px;text-align: center; width:100%; background-color: #606266">
          Copyright &copy; sucre
        </el-footer>

      </el-container>

    </el-container>
  </div>
</template>


<script>

  import Menu from "./Menu";
  import SysUserInfo from "./SysUserInfo";
  import store from '../service/store.js'

  export default {

    name: 'Main',
    components: {Menu, SysUserInfo},
    data() {
      return {}
    },
    methods: {},
    mounted() {

      let index = this.$route.path;
      if (index == '/') {
        this.$router.push("/index");
      }
    },
    computed: {
      userInfo() {
        var user = store.getters.userInfo;
        if (!user) {
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

</style>
