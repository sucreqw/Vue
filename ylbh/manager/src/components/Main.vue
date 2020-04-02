<template>
  <div id="app">
    <el-container>
      <el-header
        style="width:100%;position: fixed;left: 0;top: 0;z-index: 1500;height:  80px; background-color: rgb(64, 158, 255);">
        <div>
          <h1>广州爆点广告留言后台管理系统</h1>
            <img style="border-radius:25px;position: fixed;top:15px;right: 20px;width: 50px" src="../assets/logo.png"
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


  <el-container style="padding: 80px 0 0 0;">
    <el-aside width="150px"
              style="height: 100%;overflow-y: auto;overflow-x: hidden;border-right: 1px solid #ccc">
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-main style="height: 100%;padding: 0">
        <router-view></router-view>
      </el-main>
      <el-footer
        style="height:32px;line-height:32px;text-align: right;background-color:#f4f4ef;width:100%;">
        广州爆点广告策划有限公司
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

    import Menu from './Menu.vue'
    import SysUserInfo from './SysUserInfo.vue'
    export default {
        name: 'Main',
        components: {Menu, SysUserInfo},
        data () {
            return {
            }
        }

    }
</script>

<style>

</style>

