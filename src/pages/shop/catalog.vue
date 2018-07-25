<template>
<view class="page" >
 <view class="container">
  <view class="search">
    <navigator url="/pages/search/search" class="input">
      <image class="icon"></image>
      <text class="txt">商品搜索, 共{{goodsCount}}款好物</text>
    </navigator>
  </view>
  <view class="catalog">
    <scroll-view class="nav" scroll-y="true">
        <view class="item {{ currentCategory.id == item.id ? 'active' : ''}}" wx:for="{{navList}}" wx:key="item.id"  id="{{item.id}}" data-index="{{index}}" bindtap="switchCate">{{item.name}}</view>
    </scroll-view>
    <scroll-view class="cate" scroll-y="true">
        <navigator url="url" class="banner">
            <image class="image" src="{{currentCategory.wap_banner_url}}"></image>
            <view class="txt">{{currentCategory.front_name}}</view>
        </navigator>
        <view class="hd">
            <text class="line"></text>
            <text class="txt">{{currentCategory.name}}分类</text>
            <text class="line"></text>
        </view>
        <view class="bd">
            <view bindtap="go2goods" class="item {{(index+1) % 3 == 0 ? 'last' : ''}}" wx:for="{{currentCategory.subCategoryList}}" wx:key="item.id" id="{{item.id}}">
                <image class="icon" src="{{item.wap_banner_url}}"></image>
                <text class="txt">{{item.name}}</text>
            </view>
        </view>
    </scroll-view>
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
    navigationBarTitleText: "商品分类"
  };
  data = {
    navList: [],
    categoryList: [],
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0,
    currentCategoryId: null
  };
  async onLoad(options) {
    this.currentCategoryId = options.id;
    await this.getCatalog();
  }
  async getCatalog() {
    //获取商品列表
    wx.showLoading({
      title: "加载中..."
    });
    //console.log("===", this.currentCategoryId);
    let resultCatalog = await this.$parent.globalData.get(
      `${api.server}/api/shop/catalog/index?id=${
        this.currentCategoryId
      }&shopId=${this.$parent.globalData.shopId}`
    );
    if (resultCatalog.errno === 0) {
      wx.hideLoading();
      if (resultCatalog.data.categoryList.length > 0) {
        this.navList = resultCatalog.data.categoryList;
        this.currentCategory = resultCatalog.data.currentCategory;
      }
    }
    console.log(resultCatalog);
    let resultGoodsCount = await this.$parent.globalData.get(
      `${api.server}/api/shop/goods/count?shopId=${
        this.$parent.globalData.shopId
      }`
    );
    if (resultGoodsCount.data.goodsCount.length > 0) {
      this.goodsCount = resultCatalog.data.goodsCount;
    }
    //console.log(resultGoodsCount);

    this.$apply();
  }

  async switchCate(event) {
    if (this.currentCategory.id == event.currentTarget.id) {
      return false;
    }
    this.getCurrentCategory(event.currentTarget.id);
  }
  async getCurrentCategory(id) {
    let resultCurrent = await this.$parent.globalData.get(
      `${api.server}/api/shop/catalog/current?id=${id}`
    );

    this.currentCategory = resultCurrent.data.currentCategory;

    this.$apply();
  }

  methods = {
    go2goods(e) {
      let id = e.currentTarget.id;
      console.log(id);
      wx.navigateTo({ url: "/pages/shop/category?id=" + id });
    }
  };
}
</script>
<style>
.search {
  height: 88rpx;
  width: 100%;
  padding: 0 30rpx;
  background: #fff;
  display: flex;
  align-items: center;
}

.search .input {
  width: 690rpx;
  height: 56rpx;
  background: #ededed;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search .icon {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png)
    center no-repeat;
  background-size: 100%;
  width: 28rpx;
  height: 28rpx;
}

.search .txt {
  height: 42rpx;
  line-height: 42rpx;
  color: #666;
  padding-left: 10rpx;
  font-size: 30rpx;
}

.catalog {
  flex: 1;
  width: 100%;
  background: #fff;
  display: flex;
  border-top: 1px solid #fafafa;
}

.catalog .nav {
  width: 162rpx;
  height: 100%;
}

.catalog .nav .item {
  text-align: center;
  line-height: 90rpx;
  width: 162rpx;
  height: 90rpx;
  color: #333;
  font-size: 28rpx;
  border-left: 6rpx solid #fff;
}

.catalog .nav .item.active {
  color: #ab2b2b;
  font-size: 36rpx;
  border-left: 6rpx solid #ab2b2b;
}

.catalog .cate {
  border-left: 1px solid #fafafa;
  flex: 1;
  height: 100%;
  padding: 0 30rpx 0 30rpx;
}

.banner {
  display: block;
  height: 222rpx;
  width: 100%;
  position: relative;
}

.banner .image {
  position: absolute;
  top: 30rpx;
  left: 0;
  border-radius: 4rpx;
  height: 192rpx;
  width: 100%;
}

.banner .txt {
  position: absolute;
  top: 30rpx;
  text-align: center;
  color: #fff;
  font-size: 28rpx;
  left: 0;
  height: 192rpx;
  line-height: 192rpx;
  width: 100%;
}

.catalog .hd {
  height: 108rpx;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.catalog .hd .txt {
  font-size: 24rpx;
  text-align: center;
  color: #333;
  padding: 0 10rpx;
  width: auto;
}

.catalog .hd .line {
  width: 40rpx;
  height: 1px;
  background: #d9d9d9;
}

.catalog .bd {
  height: auto;
  width: 100%;
  overflow: hidden;
}

.catalog .bd .item {
  display: block;
  float: left;
  height: 216rpx;
  width: 144rpx;
  margin-right: 34rpx;
}

.catalog .bd .item.last {
  margin-right: 0;
}

.catalog .bd .item .icon {
  height: 144rpx;
  width: 144rpx;
}

.catalog .bd .item .txt {
  display: block;
  text-align: center;
  font-size: 24rpx;
  color: #333;
  height: 72rpx;
  width: 144rpx;
}
</style>