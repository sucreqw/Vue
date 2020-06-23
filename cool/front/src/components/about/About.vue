<template>
  <PageWapper :style="bgImg">
    <div style="text-align: center">
      <br>
      <br>
      <p>
        <strong>2019年6月16日</strong>
      </p>
      <p>
        <strong>这是第二次更新，离第一个版本已经一年的时间</strong>
      </p>
      <p>
        <strong>本房的族谱基本收集完成，接下来应该是全村的数据。</strong>
      </p>
      <p>
        <strong>这次更新除了数据库外，重构了整个框架，采用了前后分离，restful接口的风格</strong>
      </p>
      <p>
        <strong>前端：vue + element-ui</strong>
      </p>
      <p>
        <strong>后端：spring + mybatis-plus+tomcat+mysql</strong>
      </p>


    </div>
  </PageWapper>

</template>

<script>
  import defaultImg from '../../assets/imageproxy.jpg';

  export default {
    name: "About",
    data() {
      return {
        bgImg: {
          backgroundImage: "url(" + defaultImg + ")"
        },
      }
    }
  }
</script>

<style scoped>

</style>
