<template>
  <div>
    <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse">
      <!--菜单栏图标，固定显示，收缩样式，以适应手机端-->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">menu</span>
        </template>
        <el-menu-item-group>
          <!--trgg-->
          <el-submenu :index="router.name" v-for="router in menuList">
            <span slot="title">{{router.name}}</span>
            <el-menu-item :index="router.path+'/'+child.path" v-for="child in router.children">{{child.name}}
            </el-menu-item>

          </el-submenu>
        </el-menu-item-group>

      </el-submenu>

    </el-menu>


  </div>
</template>

<script>
    //服务器取菜单列表
    import {getMenus} from '../service/menu.js'
    import Wapper from '../components/Wapper.vue'
    import Hello from '../components/hello.vue'
    import Setting from '../components/setting/MenuSetting.vue'
    import Role from '../components/setting/role.vue'

    export default {
        name: 'Menu',
        data() {
            return {
                menuList: [],
                menuLists: [{
                    path: '/setting',
                    name: '首页',
                    icon: 'el-icon-s-home',
                    component: Wapper,
                    children:[{
                        path: 'MenuSetting',
                        name: '首页',
                        component: Setting
                    }]
                }],
                isCollapse: true,

            }
        },
        created() {
            this.getMenu();

        },
        methods: {
            //取当前权限内的菜单列表
            getMenu() {
                getMenus((data) => {
                    //把所有菜单信息存入变量
                    this.menuList = data;
                    //取当前路由层级
                    let {routes} = this.$router.options;
                    let routeData = routes.find(r => r.path === this.$route.path);
                    //把服务器返回的菜单数据加入到当前路由的子类中
                    routeData.children = this.formartData(this.menuList);
                    //把路由添加进总路由
                    this.$router.addRoutes([routeData])
                    //页面跳转到欢迎页面。
                    this.$router.push({
                        path: '/setting/MenuSetting'
                    })
                })
            },
            //判断服务器返回的菜单，匹配到对应的component
            formartData(routers){
                let result=[];

                //循环所有菜单
                routers.forEach(item =>{
                    //接收所有的子菜单
                    let child=[];

                    //先把子菜单全部循环出来
                    item.children.forEach(items=>{
                        //根据后台返回的名称 输入对应的component
                        let menuCom='';
                        switch (items.path) {
                            case 'MenuSetting' :
                                menuCom = "/setting/MenuSetting.vue";
                                break;
                            case 'Hello'  :
                                menuCom = "/HardPromo/list.vue";
                                break;
                            case 'Role'  :
                                menuCom = "/setting/role.vue";
                                break;

                        }
                       let childRouter={
                           path: items.path,
                           name: items.name,
                           component :null,
                       }
                       //import不能用变量，所以采用懒加载的形式来加载上面匹配到的页面。
                       childRouter.component=() => import(`@/components${menuCom}`);
                       //把结果添加到子类列表。
                       child.push(childRouter)
                    })
                    let router={
                        path: item.path,
                        name: item.name,
                        component: Wapper,
                        //把循环到所有子菜单添加进来
                        children: child,
                    }
                    //添加到结果集，最后返回。
                    result.push(router)
                })
                return result;
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
