<template>
  <div>
    <h1>hello</h1>
    <p item in items="10"> {{ item.text }}</p>
  </div>

</template>

<script>
    export default {
        name: "hello.vue",
        data () {
            return {
                items: ["dasfdasd","asfdasdfasdf","asdfasdfsaf","dasfdasd","asfdasdfasdf","asdfasdfsaf","dasfdasd","asfdasdfasdf","asdfasdfsaf","dasfdasd","asfdasdfasdf","asdfasdfsaf"],

            }
        },
    }
</script>

<style scoped>

</style>
