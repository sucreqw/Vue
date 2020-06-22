<template>
  <div style="height: 100%;">

    <Breadcrumb separator=">" style="padding: 8px 16px 8px 16px;background-color: #e4e4ef">
      <BreadcrumbItem v-for="(name,index) in this.$route.matched" v-if="index!=0">{{name.name}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="page-wapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'PageWapper'
    }
</script>

<style scoped>
    .page-wapper {
        /*height:  calc(100% - 30px);*/
        height:  calc(100vh - ( 60px + 24px + 24px ));
    }
</style>
