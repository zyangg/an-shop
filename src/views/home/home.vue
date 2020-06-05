<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar class="navBar" title="购物街" />
    <!-- 导航END -->
    <!-- better-scroll区域 -->
    <BScroll
      class="hhh"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img v-lazy="item.image" />
          </a>
        </van-swipe-item>
      </van-swipe>
      <!-- 轮播图End -->
      <!-- 推荐模块 -->
      <div class="recommends">
        <div class="recommendsItem" v-for="(item,index) in recommends" :key="index">
          <van-image round width="2.5rem" height="2.5rem" lazy-load :src="item.image" />
          <div>{{item.title}}</div>
        </div>
      </div>
      <!-- 推荐模块END -->
      <!--特性特点区域-->
      <div class="feature">
        <a href="http://act.mogujie.com/zzlx67">
          <img src="../../assets/img/home/recommend_bg.jpg" alt />
        </a>
      </div>
      <!--特性特点区域END-->
      <!-- tab Control -->
      <van-tabs v-model="activeName" animated color="rgb(25, 137, 250)">
        <van-tab title="流行" name="pop">
          <div class="goods">
            <div
              class="goods-item"
              v-for="(item,index) in goods.pop.list"
              :key="index"
              @click="toDetail(item.iid)"
            >
              <img :src="item.show.img" alt />
              <div class="goods-info">
                <p>{{item.title}}</p>
                <span class="price">￥{{item.price}}</span>
                <span class="collect">{{item.cfav}}</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="新款" name="new">
          <div class="goods">
            <div class="goods-item" v-for="(item,index) in goods.new.list" :key="index"  @click="toDetail(item.iid)">
              <img :src="item.show.img" />
              <div class="goods-info">
                <p>{{item.title}}</p>
                <span class="price">￥{{item.price}}</span>
                <span class="collect">{{item.cfav}}</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="精选" name="sell">
          <div class="goods">
            <div class="goods-item" v-for="(item,index) in goods.sell.list" :key="index"  @click="toDetail(item.iid)">
              <img :src="item.show.img" alt />
              <div class="goods-info">
                <p>{{item.title}}</p>
                <span class="price">￥{{item.price}}</span>
                <span class="collect">{{item.cfav}}</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!-- tab Control END -->
    </BScroll>
    <!-- better-scroll区域END -->
    <!-- 返回顶部区域 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- 返回顶部区域END -->
  </div>
</template>
<script>
import BScroll from '../../components/scroll/Scroll'
import backTop from '../../components/backTop/BackTop'
export default {
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      activeName: 'pop',
      isShowBackTop: false,
      saveY: 0
    }
  },
  components: {
    BScroll,
    backTop
  },
  created () {
    this.getHomeMultidata()
    this.getHomedata('pop')
    this.getHomedata('new')
    this.getHomedata('sell')
  },
  destroyed () {
    console.log('被销毁了')
  },
  methods: {
    async getHomeMultidata () {
      const { data: res } = await this.$http.get('/home/multidata')
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    },
    async getHomedata (a) {
      const b = this.goods[a].page + 1
      const { data: res } = await this.$http.get('/home/data', {
        params: {
          type: a,
          page: b
        }
      })
      this.goods[a].page += 1
      this.goods[a].list.push(...res.data.list)
      this.$refs.scroll.finishPullUp()
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll (position) {
      this.isShowBackTop = -position.y > 1000
    },
    loadMore () {
      this.getHomedata(this.activeName)
      this.$refs.scroll.refresh()
    },
    toDetail (iid) {
      this.$router.push('/detail/' + iid)
    }
  }
}
</script>
<style lang="less" scope>
.van-nav-bar__title {
  color: blue;
}
.navBar {
  height: 44px;
  background-color: #ff699c;
  opacity: 0.7;
}
.my-swipe img {
  width: 100%;
  height: 200px;
}
.recommends {
  width: 100%;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 8px #eee solid;
}
.recommendsItem {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}
.van-image {
  margin-bottom: 10px;
}
.feature img {
  width: 100%;
  height: 300px;
}
.iddddd {
  width: 100%;
  height: 500px;
  background-color: red;
}
.goods {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "☆";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../assets/img/common/collect.svg") 0 0/14px 14px;
}
.hhh {
  height: 560px;
  overflow: hidden;
}
</style>
