<template>
  <div id="app">
    <!-- tabbar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" replace to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" replace to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" replace to="/profile">我的</van-tabbar-item>
    </van-tabbar>
    <!-- tabbar END -->

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: ''
    }
  }
}
</script>
<style lang="less" scoped>
@import "./assets/css/base.css";
.van-tabbar {
  height: 49px;
}
</style>
