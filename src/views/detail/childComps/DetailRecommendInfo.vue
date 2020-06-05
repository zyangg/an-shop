<template>
<div>
<div class="info-header">热门推荐</div>
  <div class="recommend-info">
    <grid-view class="hhhh">
      <goods-list-item v-for="(item, index) in recommendList" :key="index" :goods="item"></goods-list-item>
    </grid-view>
  </div>
  </div>
</template>

<script>
import GridView from '../../../components/gridView/GridView'
import GoodsListItem from '../../../views/home/GoodsListItem'

export default {
  name: 'DetailRecommendInfo',
  components: {
    GridView,
    GoodsListItem
  },
  props: {
    recommendList: {
      type: Array
    }
  }
}
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  .hhhh {
    width: 94%;
  }
  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
    text-align: center;
  }
</style>
