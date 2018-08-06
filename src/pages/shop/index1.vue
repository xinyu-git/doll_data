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
  <!--居家列表-->
  <view class="good-gridList">
    <view class="goods_title">
     <text>{{goodsName}}</text>
    </view>
    <view class="goodsBox">
      <block wx:for="{{goodsList}}" wx:key="{{item.id}}">
        <view class="item" bindtap="go2goods" id="{{item.id}}">
          <image class="img" src="{{item.list_pic_url}}" background-size="cover"></image>
          <text class="name">{{item.name}}</text>
          <text class="price">￥{{item.retail_price}}</text>
        </view>
      </block>
      <!--more-->
      <view class="item item-b item-more">
        <navigator url="/pages/shop/catalog?id={{goodsid}}" class="more-a">
          <view class="txt">{{'更多'+goodsName+'好物'}}</view>
          <image class="icon" src="../../static/images/icon_go_more.png" background-size="cover"></image>
        </navigator>
      </view>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class Index extends wepy.page {
  config = {
    enablePullDownRefresh: false,
    navigationBarTitleText: "商城首页"
  };
  data = {
    banner: [],
    goodsList: [],
    goodsName: null,
    goodsid: null,
    lotteryNum: true
  };
  async onLoad(options) {
    //console.log(options);
    this.$parent.globalData.shopId = options.id;
    await this.getIndexData();
  }
  async getIndexData() {
    //banner
    let resultindex = await this.$parent.globalData.get(
      `${api.server}/api/shop/index/index?shopId=${
        this.$parent.globalData.shopId
      }`
    );
    if (resultindex.data.banner.length > 0) {
      this.banner = this.$parent.globalData.banner = resultindex.data.banner;
    }
    //goodsList
    //console.log(resultindex.data.categoryList[0].goodsList);
    this.goodsName = this.$parent.globalData.goodsName =
      resultindex.data.categoryList[0].name;
    this.goodid = resultindex.data.categoryList[0].id;
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
      wx.navigateTo({ url: "/pages/shop/goods?id=" + id });
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
  height: 100rpx;
  font-size: 36rpx;
  color: #333;
}
.good-gridList .b {
  width: 750rpx;
  padding: 0 6.25rpx;
  height: auto;
  overflow: hidden;
}
.good-gridList .goodsBox .item {
  float: left;
  background: #fff;
  width: 365rpx;
  margin-bottom: 6.25rpx;
  height: 452rpx;
  overflow: hidden;
  text-align: center;
  margin-right: 7rpx;
}
.good-gridList .goodsBox .item .a {
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
