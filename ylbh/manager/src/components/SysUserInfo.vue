<template>
    <div class="card">
        <img src="../assets/logo.png" style="width:100%">
        <div class="container">
            <p>账号: {{userInfo.uname}}</p>
            <p>名称: {{userInfo.rname}}</p>
            <p>
                <el-button @click="logout()">退出登录</el-button>
            </p>
        </div>
    </div>
</template>

<script>
    import store from '../service/store.js'

    export default {
        name: 'SysUserInfo',
        methods: {
            logout() {
                store.commit('setToken', null);
                this.$router.push({path: '/'});
            }
        },
        computed: {

            userInfo() {
              var user=store.getters.userInfo;
              if(!user){
                this.$router.push({path: '/'});
              }
                return user;
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        border: 1px solid #cccccc;
        max-width: 220px;
        text-align: center;
        background-color: white;
    }

    .container {
        padding: 0 16px 0 16px;
    }

</style>
