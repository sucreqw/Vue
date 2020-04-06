<template>
    <div class="page-options-wapper" style="text-align: left;">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'PageOptionsWapper'
    }
</script>

<style lang="scss" scoped>
    .page-options-wapper{
        padding: 8px 16px 8px 16px;
        background-color: #f4f4ef;
        border-bottom: 1px solid #ccc;
        height: 32px;
    }
</style>
