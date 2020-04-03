<template>
  <div>
    <!--<el-menu style="border-right: 0" router :default-active="$route.path" >
      <template v-for="router in menuLists">
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
    </el-menu>-->
    <!--<el-menu style="border-right: 0; background-color: rgb(162,236,255)" :collapse="isCollapse" router :default-active="$route.path" mode="horizontal" >
      <el-submenu index="1" v-for="router in menuList">
        <template slot="title" >
          <i class="el-icon-location"></i>
          <span slot="title">{{router.name}}</span>
        </template>

        <el-menu-item-group :index="router.url" v-for="onegrade in router.children" >

          <el-submenu >
            <span slot="title">{{onegrade.name}}</span>
            <el-menu-item index="1-2-1" v-for="children in onegrade.children">{{children.name}}</el-menu-item>
          </el-submenu>
        </el-menu-item-group>


      </el-submenu>
    </el-menu>-->
    <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">menu</span>
        </template>
        <el-menu-item-group>

          <el-submenu :index="router.name" v-for="router in menuList">
            <span slot="title">{{router.name}}</span>
            <el-menu-item :index="router.path+'/'+child.path" v-for="child in router.children">{{child.name}}
            </el-menu-item>

          </el-submenu>
          <!-- <el-submenu index="1-2">
             <span slot="title">hello</span>
             <el-menu-item index="1-3-1">hello</el-menu-item>
           </el-submenu>-->
        </el-menu-item-group>

      </el-submenu>

    </el-menu>


  </div>
</template>

<script>
    //服务器取菜单列表
    import {get} from '../service/menu.js'
    import HardList from '../components/HardPromo/list.vue'
    import Wapper from '../components/Wapper.vue'
    import Hello from '@/components/hello.vue'
    import Main from '@/components/Main.vue'

    export default {
        name: 'Menu',
        data() {
            return {
                menuList: [/*{
                    path: '/hard',
                    name: '首页',
                    icon: 'el-icon-s-home',
                    component: Wapper,
                    children:[{
                        path: 'list',
                        name: '首页',
                        component: HardList
                    }]
                }*/],
                menuLists: [],
                isCollapse: true,

            }
        },
        created() {
            this.getMenu();
            let {routes} = this.$router.options;
            let routeData = routes.find(r => r.path === this.$route.path);
            routeData.children = this.menuList;
            this.$router.addRoutes([routeData])
            //this.$router.options.routes[1].children=this.menuList;
            this.menuLists = this.$router.options.routes[1].children;
            //this.getMenu();
        },
        methods: {
            getMenu() {
                get((data) => {
                    this.menuList = data;
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
