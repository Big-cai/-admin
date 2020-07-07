<template>
    <div class="breadcrumbs">
      <span v-for="(item,index) in $route.matched" :key="index">
        {{item.meta.breadcrumbs}}
        <span v-if="index < $route.matched.length -1"> / </span>
      </span>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .breadcrumbs{
    display: flex;
    justify-content: left;
    padding-left: 10px;
    color: #606266
  }
</style>