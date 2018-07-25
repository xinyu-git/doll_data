<template>
<view class="page" >
  <view class="cate-nav">
        <scroll-view scroll-x="true" class="cate-nav-body" style="width: 750rpx;" scroll-left="{{scrollLeft}}">
            <view  wx:for="{{navList}}" class="item {{ id == item.id ? 'active' : ''}}" id="{{item.id}}" data-index="{{index}}" wx:key="item.id" bindtap="switchCate">
                <view class="name">{{item.name}}</view>
            </view>
        </scroll-view>
    </view>
    <scroll-view scroll-y="true" scroll-top="{{scrollTop}}" style="height:{{scrollHeight}};">
    <view class="cate-item">
        <view class="h">
            <text class="name">{{currentCategory.name}}</text>
            <text class="desc">{{currentCategory.front_name}}</text>
        </view>
        <view class="b">
            <view class="item {{(iindex + 1) % 2 == 0 ? 'item-b' : ''}}" bindtap="go2goods"   id="{{iitem.id}}" wx:for="{{goodsList}}" wx:for-item="iitem" wx:for-index="iindex" wx:key="item.id">
                <image class="img" src="{{iitem.list_pic_url}}" background-size="cover"></image>
                <text class="name">{{iitem.name}}</text>
                <text class="price">￥{{iitem.retail_price}}</text>
            </view>
        </view>
    </view>
    </scroll-view>
</view>

</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class Index extends wepy.page {
  config = {
    enablePullDownRefresh: false,
    navigationBarTitleText: "商品列表"
  };
  data = {
    navList: [],
    goodsList: [],
    id: 0,
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000
  };
  async onLoad(options) {
    if (options.id) {
      this.id = parseInt(options.id);
    }
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.scrollHeight = res.windowHeight;
      }
    });
    this.getCategoryInfo();
  }

  async getCategoryInfo() {
    //获取商品列表title
    let resultCategory = await this.$parent.globalData.get(
      `${api.server}/api/shop/goods/category?id=${this.id}`
    );
    if (resultCategory.errno == 0) {
      this.navList = resultCategory.data.brotherCategory;
      this.currentCategory = resultCategory.data.currentCategory;
    }
    this.getGoodsList();
    //console.log(resultCategory);
    this.$apply();
  }

  async getGoodsList() {
    let resultGoodsList = await this.$parent.globalData.get(
      `${api.server}/api/shop/goods/list?categoryId=${this.id}&page=${
        this.page
      }&size=${this.size}&shopId=${this.$parent.globalData.shopId}`
    );
    this.goodsList = resultGoodsList.data.goodsList;
    //console.log(resultGoodsList);

    this.$apply();
  }

  methods = {
    go2goods(e) {
      let id = e.currentTarget.id;
      //console.log(id);
      wx.navigateTo({ url: "/pages/shop/goods?id=" + id });
    },
    switchCate(e) {
      if (this.id == e.currentTarget.id) {
        return false;
      }
      var that = this;
      this.id = e.currentTarget.id;
      this.getCategoryInfo();
    }
  };
}
</script>
<style>
.cate-nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.cate-nav-body {
  height: 84rpx;
  white-space: nowrap;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.cate-nav .item {
  display: inline-block;
  height: 84rpx;
  min-width: 130rpx;
  padding: 0 15rpx;
}

.cate-nav .item .name {
  display: block;
  height: 84rpx;
  padding: 0 20rpx;
  line-height: 84rpx;
  color: #333;
  font-size: 30rpx;
  width: auto;
}

.cate-nav .item.active .name {
  color: #ab2b2b;
  border-bottom: 2px solid #ab2b2b;
}

.cate-item {
  margin-top: 94rpx;
  height: auto;
  overflow: hidden;
}

.cate-item .h {
  height: 145rpx;
  width: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cate-item .h .name {
  display: block;
  height: 35rpx;
  margin-bottom: 18rpx;
  font-size: 30rpx;
  color: #333;
}

.cate-item .h .desc {
  display: block;
  height: 24rpx;
  font-size: 24rpx;
  color: #999;
}

.cate-item .b {
  width: 750rpx;
  padding: 0 6.25rpx;
  height: auto;
  overflow: hidden;
}

.cate-item .b .item {
  float: left;
  background: #fff;
  width: 365rpx;
  margin-bottom: 6.25rpx;
  padding-bottom: 33.333rpx;
  height: auto;
  overflow: hidden;
  text-align: center;
}

.cate-item .b .item-b {
  margin-left: 6.25rpx;
}

.cate-item .item .img {
  width: 302rpx;
  height: 302rpx;
}

.cate-item .item .name {
  display: block;
  height: 35rpx;
  line-height: 35rpx;
  margin: 11.5rpx 0 22rpx 0;
  text-align: center;
  overflow: hidden;
  padding: 0 20rpx;
  font-size: 30rpx;
  color: #333;
}

.cate-item .item .price {
  display: block;
  width: 365.625rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}
</style>