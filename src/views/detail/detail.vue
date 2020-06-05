<template>
  <div id="detail">
      <van-nav-bar left-text="返回" left-arrow  @click-left="onClickLeft">
      <template #title>
        <div class="navBar">
          <span @click="click1()">商品</span>
          <span @click="click2()">参数</span>
          <span @click="click3()">评论</span>
          <span @click="click4()">推荐</span>
        </div>
      </template>
    </van-nav-bar>
      <BScroll class="hhh" ref="scroll"   @scroll="contentScroll"
            :probe-type="3">
    <!-- 轮播图区域 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in topImages" :key="index">
        <div class="swiperImg">
          <img v-lazy="item" />
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图区域END -->
    <!-- 商品介绍区域 -->
    <detail-base-info :goods="goods"/>
    <!-- 商品介绍区域END -->
      <detail-shop-info :shop="shop"/>
       <detail-param-info  ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
         <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
      </BScroll>
       <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import { Goods, Shop, GoodsParam } from '../../components/detail.js'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import BScroll from '../../components/scroll/Scroll'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import backTop from '../../components/backTop/BackTop'
export default {
  data () {
    return {
      iid: 0,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTops: [],
      currentIndex: 0,
      isShowBackTop: false
    }
  },
  created () {
    this.iid = this.$route.params.iid
    this.getDetail(this.iid)
    this.getRecommend()
  },
  components: {
    DetailBaseInfo,
    DetailShopInfo,
    BScroll,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    backTop
  },
  updated () {
    this._getOffsetTops()
  },
  methods: {
    imageLoad () {
      this.$refs.scroll.refresh()
    },
    async getDetail (iid) {
      const { data: res } = await this.$http.get('/detail', {
        params: {
          iid
        }
      })
      this.topImages = res.result.itemInfo.topImages
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      )
      this.shop = new Shop(res.result.shopInfo)
      this.detailInfo = res.result.detailInfo
      this.paramInfo = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      )
      if (res.result.rate.list) {
        this.commentInfo = res.result.rate.list[0]
      }
    },
    async getRecommend () {
      const { data: res } = await this.$http.get('/recommend')
      this.recommendList = res.data.list
    },
    addToCart () {
      // 1.创建对象
      const obj = {}
      // 2.对象信息
      obj.iid = this.iid
      obj.imgURL = this.topImages[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc
      obj.newPrice = this.goods.nowPrice
      // 3.添加到Store中
      this.$store.commit('addCart', obj)
    },
    click1 () {
      this.$refs.scroll.scrollTo(0, -this.themeTops[0], 100)
    },
    click2 () {
      this.$refs.scroll.scrollTo(0, -this.themeTops[1], 100)
    },
    click3 () {
      this.$refs.scroll.scrollTo(0, -this.themeTops[2], 100)
    },

    click4 () {
      this.$refs.scroll.scrollTo(0, -this.themeTops[3], 100)
    },
    _getOffsetTops () {
      this.$nextTick(() => {
        this.themeTops = []

        this.themeTops.push(0)

        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)

        this.themeTops.push(Number.MAX_VALUE)
      })
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll (position) {
      this.isShowBackTop = -position.y > 1000
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.navBar {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  align-items: center;
}
.navBar span {
  color: black;
  margin-left: 3px;
  margin-right: 3px;
}
.navBar span:hover {
  color: blue;
}
.swiperImg {
  width: 100%;
  height: 350px;
}
.swiperImg img {
  width: 100%;
  height: 100%;
}
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .hhh {
      height: calc(100vh-93px);
  }
  .test {
    height: 200px;
    width: 100%;
    background-color: red;
  }
</style>
