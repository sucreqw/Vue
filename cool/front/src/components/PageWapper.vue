<template>
  <div style="height: 100%;">
    <!--        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 8px 16px 8px 16px;background-color: #e4e4ef">
                <el-breadcrumb-item v-for="(name,index) in this.$route.meta.routeList" :key="index">{{name}}
                </el-breadcrumb-item>
            </el-breadcrumb>-->
    <div class="page-wapper" ref="page">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageWapper',
    updated() {
      this.scrollToBottom();
    },
    methods:{
      //窗体滚到最底
      scrollToBottom: function () {
        this.$nextTick(function () {
          var div = this.$refs.page;//this.$el.querySelector("div.page-wapper");
          // container.scrollTop = container.scrollHeight;
          div.scrollTop=div.scrollHeight;
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .page-wapper {
    height: calc(100% - 30px);
  }
</style>
