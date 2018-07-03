<template>
<view class="page" >
      <!--banner-->
  <swiper class="banner" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
    <swiper-item wx:for="{{banner}}" wx:key="{{item.id}}">
      <navigator url="{{item.link}}">
        <image src="{{item.image_url}}" background-size="cover"></image>
      </navigator>
    </swiper-item>
  </swiper>
   <view class="good-gridList">
    <view class="goods_title">
      <view>
        <text>{{goodsName}}</text>
      </view>
    </view>
    <view class="b">
      <block wx:for="{{goodsList}}" wx:key="{{item.id}}">
        <view class="item" bindtap="go2goods" id="{{item.id}}">
            <image class="img" src="{{item.list_pic_url}}" background-size="cover"></image>
            <text class="name">{{item.name}}</text>
            <text class="price">￥{{item.retail_price}}</text>
       </view>
      </block>
   </view> 
    </view>

   </view>

</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class Index extends wepy.page {
  config = {
    //navigationBarTitleText: "袁小员的视频介绍",
    enablePullDownRefresh: false,
    navigationBarTitleText: "商城首页"
  };
  data = {
    banner: [],
    goodsList: [],
    goodsName: null
  };
  async onLoad(options) {
    await this.getIndexData();
    this.goodsid = options.id;
    console.log(options.id);
  }
  async getIndexData() {
    //banner
    let resultindex = await this.$parent.globalData.get(
      `${api.server}/api/shop/index/index`
    );
    if (resultindex.data.banner.length > 0) {
      this.banner = this.$parent.globalData.banner = resultindex.data.banner;
    }
    //goodsList
    //console.log(resultindex.data.categoryList[0].goodsList);
    this.goodsName = this.$parent.globalData.goodsName =
      resultindex.data.categoryList[0].name;
    if (resultindex.data.categoryList[0].goodsList.length > 0) {
      this.goodsList = this.$parent.globalData.goodsList =
        resultindex.data.categoryList[0].goodsList;
    }
    //console.log(this.goodsList);
    this.$apply();
  }

  methods = {
    go2goods(e) {
      let id = e.currentTarget.id;
      console.log(id);
      wx.navigateTo({ url: "/pages/card/goods?id=" + id });
    }
  };
}
</script>
<style>
.banner {
  width: 750rpx;
  height: 417rpx;
}

.banner image {
  width: 100%;
  height: 417rpx;
}
.naver_box {
  display: flex;
  height: 181rpx;
  width: 750rpx;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
}

.naver_box .item {
  flex: 1;
  display: block;
  padding: 20rpx 0;
}

.naver_box image {
  display: block;
  width: 58rpx;
  height: 58rpx;
  margin: 0 auto;
  margin-bottom: 12rpx;
  border-radius: 50%;
}

.naver_box text {
  display: block;
  font-size: 24rpx;
  text-align: center;
  margin: 0 auto;
  line-height: 1;
  color: #333;
}
.a-section {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  background: #fff;
  color: #333;
  margin-top: 20rpx;
  padding-bottom: 180rpx;
}

.a-section .goods_title {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 130rpx;
}
.a-brand .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  position: relative;
}

.a-brand .wrap {
  position: relative;
}

.a-brand .img {
  position: absolute;
  left: 0;
  top: 0;
}
.a-brand .mt {
  position: absolute;
  z-index: 2;
  padding: 27rpx 31rpx;
  left: 0;
  top: 0;
}

.a-brand .mt .brand {
  display: block;
  font-size: 33rpx;
  height: 43rpx;
  color: #333;
}

.a-brand .mt .price,
.a-brand .mt .unit {
  font-size: 25rpx;
  color: #999;
}

.a-brand .item-1 {
  float: left;
  width: 375rpx;
  height: 252rpx;
  overflow: hidden;
  border-top: 1rpx solid #fff;
  margin-left: 1rpx;
}

.a-brand .item-1:nth-child(2n + 1) {
  margin-left: 0;
  width: 374rpx;
}

.a-brand .item-1 .img {
  width: 375rpx;
  height: 253rpx;
}

.good-gridList {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  margin-bottom: 4rpx;
  margin-bottom: 110rpx;
}

.good-gridList .goods_title {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 130rpx;
  font-size: 36rpx;
  color: #333;
}

.good-gridList .b {
  width: 750rpx;
  padding: 0 6.25rpx;
  height: auto;
  overflow: hidden;
}

.good-gridList .b .item {
  float: left;
  background: #fff;
  width: 365rpx;
  margin-bottom: 6.25rpx;
  height: 452rpx;
  overflow: hidden;
  text-align: center;
  margin-right: 7rpx;
}

.good-gridList .b .item .a {
  height: 452rpx;
  width: 100%;
}

.good-gridList .item .img {
  margin-top: 20rpx;
  width: 302rpx;
  height: 302rpx;
}

.good-gridList .item .name {
  display: block;
  padding: 0 20rpx;
  overflow: hidden;
  height: 38rpx;
  margin: 11.5rpx 0 10rpx 0;
  text-align: center;
  font-size: 30rpx;
  color: #333;
}

.good-gridList .item .price {
  display: block;
  width: 365.625rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}

.good-gridList .more-item {
  height: 100%;
  width: 100%;
}

.more-a {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.good-gridList .more-a .txt {
  height: 33rpx;
  width: 100%;
  line-height: 33rpx;
  color: #333;
  font-size: 33rpx;
}

.good-gridList .more-a .icon {
  margin: 60rpx auto 0 auto;
  width: 70rpx;
  height: 70rpx;
}
</style>
