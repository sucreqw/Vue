<template>
  <div>

    <el-menu  router :default-active="$route.path"  class="el-menu-demo" mode="horizontal"  style="background-color: #606266">
      <template v-for="router in menuList">
        <el-menu-item v-if="!router.children" :index="router.path" :key="router.path">
          <i :class="router.icon"></i>
          {{router.name}}
        </el-menu-item>
        <el-submenu v-if="router.children" :index="router.path" :key="router.path">
          <template slot="title">
            <i :class="router.icon"></i>
            {{router.name}}
          </template>
          <el-menu-item v-for="subRouter in router.children" :index="router.path+'/'+subRouter.path"
                        :key="router.path+'/'+subRouter.path">
            {{subRouter.name}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    data () {
      return {
        menuList: [],
        //isCollapse: true,

      }
    },
    created () {
      // alert(this.$router.options.routes[1].path);
      this.menuList =  this.$router.options.routes[0].children;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
