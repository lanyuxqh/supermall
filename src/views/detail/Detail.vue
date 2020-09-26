<template>
  <div class="detail" v-if="Object.keys(detailInfo).length !== 0">
    <detail-navbar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNav"
    ></detail-navbar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :paramInfo="goodsParam"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavbar from "./childComps/DetailNavbar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/contents/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "../.././common/utils.js";
import { backTop } from "../.././common/mixin.js";

export default {
  name: "Detail",
  mixins: [backTop],
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getTitleYs: function () {},
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.id;

    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      //顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      //商品信息数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //店铺信息数据
      this.shop = new Shop(data.shopInfo);
      //商品详情数据
      this.detailInfo = data.detailInfo;
      //参数信息数据
      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    this.getTitleYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getTitleYs();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y;
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex;
        }
      }
      this.listenShowBackTop(position);
    },
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);
      this.$store.dispatch('addToCart',product).then(res=>{
        this.$toast(res);
      });

    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>