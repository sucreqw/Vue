<template>
  <div>
    <Menu active-name="1-2" theme="light" width="auto" class="menuitemClasses">
      <Submenu :name="router.path" v-for="router in menuList">
        <template slot="title">
          <Icon :type="router.icon"/>
          {{router.name}}
        </template>
        <MenuItem :name="subRouter.path" :to="router.path +'/' + subRouter.path" v-for="subRouter in router.children">
          <Icon :type="subRouter.icon" />
          {{subRouter.name}}
        </MenuItem>

      </Submenu>

    </Menu>

  </div>
</template>

<script>
    //服务器取菜单列表
    import {getMenus} from '../service/menu.js'
    import Wapper from '../components/Wapper.vue'
    //import Role from '../components/setting/role.vue'

    export default {
        name: "Menus",
        data() {
            return {
                menuList: [],
                menuLists: [],
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
                    /*this.$router.push({
                        path: '/setting/Role'
                    })*/
                })
            },
            //判断服务器返回的菜单，匹配到对应的component
            formartData(routers) {
                let result = [];

                //循环所有菜单
                routers.forEach(item => {
                    //接收所有的子菜单
                    let child = [];
                    if (item.children != null) {
                        //先把子菜单全部循环出来
                        item.children.forEach(items => {
                                //根据后台返回的名称 输入对应的component
                                let menuCom = '';
                                switch (items.path) {
                                    case 'menuSetting' :
                                        menuCom = "/setting/menuSetting.vue";
                                        break;
                                    case 'User'  :
                                        menuCom = "/setting/user.vue";
                                        break;
                                    case 'Role'  :
                                        menuCom = "/setting/role.vue";
                                        break;
                                    case 'Pass'  :
                                        menuCom = "/setting/pass.vue";
                                        break;
                                     case 'HardPage'  :
                                         menuCom ="/hard/page.vue";
                                         break;
                                    case 'HardProject'  :
                                         menuCom ="/hard/project.vue";
                                         break;
                                    case 'HardProjectType'  :
                                         menuCom ="/hard/projectType.vue";
                                         break;
                                    case 'HardMessage'  :
                                         menuCom ="/hard/message.vue";
                                         break;
                                    case 'HardVisit'  :
                                         menuCom ="/hard/visit.vue";
                                         break;
                                    case 'HardChart'  :
                                         menuCom ="/hard/chart.vue";
                                         break;
                                    case 'HardKey'  :
                                         menuCom ="/hard/key.vue";
                                         break;
                                     case 'SoftPage'  :
                                         menuCom ="/soft/page.vue";
                                         break;

                                }
                                let childRouter = {
                                    path: items.path,
                                    name: items.name,
                                    component: null,
                                }
                                //import不能用变量，所以采用懒加载的形式来加载上面匹配到的页面。
                                childRouter.component = () => import(`@/components${menuCom}`);

                                //把结果添加到子类列表。
                                child.push(childRouter)
                            }
                        )
                        let router = {
                            path: item.path,
                            name: item.name,
                            component: Wapper,
                            //把循环到所有子菜单添加进来
                            children: child,
                        }
                        //添加到结果集，最后返回。
                        result.push(router)
                    }
                })
                return result;
            },

        }
    }
</script>

<style scoped>

</style>
