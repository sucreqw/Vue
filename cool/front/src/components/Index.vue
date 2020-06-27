<template>
  <PageWapper :style="bgImg">
    <div style="text-align: center;color: white">
      <br>
      <br>
      <h1>I am Sucre</h1>
      <h2>I like to Code & Think</h2>
      <p>
        <strong>我想,最完美的人生,应该就是能一直做着自己喜欢的事,并能赖以生存.</strong>
      </p>
      <br>
      <el-divider></el-divider>
      <br>
      <p>
        <strong>时光不留人，当年青葱少年慢慢变成油腻大叔</strong>
      </p>
      <p>
        <strong>那些激情，梦想已经走得很远，剩下了各种的生活压力</strong>
      </p>
      <p>
        <strong>时不时的感到迷茫，难过，失望</strong>
      </p>
      <p>
        <strong>找个树洞好好发泄一番，过后你抬头，挺胸，然后继续生活</strong>
      </p>
      <p>
        <strong>生活由不得你任性，毕竟 You've got a family to feed!</strong>
      </p>


    </div>
  </PageWapper>

</template>

<script>
  import defaultImg from '../assets/fate.jpg';

  export default {
    name: "Index",
    data() {
      return {
        bgImg: {
          backgroundImage: "url(" + defaultImg + ")"
        },
      }
    },
    mounted() {
      this.background();
    },
    methods: {
      background() {
        let div = document.querySelector('main');//document.getElementById('main');
        div.style.backgroundImage = '';
      },
    },
  }
</script>

<style scoped>

</style>
