<template>
  <div id="app">
    <el-container>
      <el-header
        style="width:100%;position: fixed;left: 0;top: 0;z-index: 1500;height:  60px; background-color: rgb(162,236,255);">
        <div>
          <!--<h2>留言后台管理系统</h2>-->
          <div>
            <Menu></Menu>
          </div>


          <img style="border-radius:25px;position: fixed;top:5px;right: 20px;width: 50px" src="../assets/logo.png"
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
      <el-main style="height: 100%;padding: 0">
        <router-view></router-view>
      </el-main>
      <el-footer
        style="height:32px;line-height:32px;text-align: center;background-color:#f4f4ef;width:100%;">
        广州爆点广告策划有限公司
      </el-footer>

    </el-container>
  </div>
</template>

<script>

    import Menu from './Menu.vue'
    import SysUserInfo from './SysUserInfo.vue'

    export default {
        name: 'Main',
        components: {Menu, SysUserInfo},
        data() {
            return {}
        }

    }
</script>

<style>

</style>

