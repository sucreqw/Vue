<template>
    <PageWapper style="background-color: #343434; color: white">
        <br>
        <div style="margin-left: 10px; ">
            <el-button type="primary" @click="cancel()">返回</el-button>
        </div>

        <div class="wrapper">
            <h1>请联系管理员申请账号</h1>
            <el-form ref="sysUser" :model="sysUser" label-width="100px">
                <el-form-item label="账号">
                    <el-input v-model="sysUser.token"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="sysUser.psd"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left">
                    <el-button type="primary" style="width: 100px" @click="login()">登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align: center" v-if="url!=''">
            <a
                    :href="url"
                    rel="noflow" title="新浪微博快速登录" class="btn-quick-login"><img src="../assets/sina.png"
                                                                               style="width:25px;height:25px; color:#FF0000; ">新浪微博快速登录</a>
        </div>
    </PageWapper>
</template>

<script>
    import {get} from "../service/commonDO";
    import {login} from "../service/UserDO";
    import store from '../service/store.js'

    export default {
        name: "Login",
        data() {
            return {
                url: '',
                sysUser: {
                    token: '',
                    psd: ''
                },
            }
        },
        methods: {
            cancel() {
                this.$router.push({path: '/'});
            },
            loadData() {
                get((data) => {
                    this.url = data;
                })
            },
            login() {

                if (this.sysUser.token != '' && this.sysUser.psd != '') {
                    login(this.sysUser, (data, error) => {
                        if (error) {
                            this.$message({
                                message: error.message,
                                type: 'error'
                            })
                        } else {
                            store.commit('setToken', data);
                            //alert(data);
                            this.$router.push({
                                path: '/index'
                            })
                        }
                    })
                } else {
                    this.$message.error('账号密码不能为空！')
                }

            }
        },
        mounted() {
            this.url = '';
            this.loadData();
        }
    }
</script>

<style scoped>
    .wrapper {
        width: 400px;
        height: 300px;
        position: relative;
        text-align: center;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
</style>
