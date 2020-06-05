<template>
  <grid-view>
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goods="item"></goods-list-item>
  </grid-view>
</template>

<script>
import GridView from '../../../components/gridView/GridView'
import GoodsListItem from '../../../views/home/GoodsListItem'

export default {
  name: 'TabContentDetail',
  components: {
    GridView,
    GoodsListItem
  },
  props: {
    categoryDetail: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
