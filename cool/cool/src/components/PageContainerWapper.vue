<template>
    <div class="page-container-wapper">
            <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'PageContainerWapper'
    }
</script>

<style lang="scss" scoped>
    .page-container-wapper{
        padding: 8px 16px 8px 16px;
        height:  calc(100% - 48px - 16px - 1px);
        overflow-y: auto
    }
</style>