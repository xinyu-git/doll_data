<template>
<view class="page" >
  <scroll-view class="container" scroll-y="true">  
  <view wx:if="{{!openAttr}}">
    <swiper class="goodsimgs" indicator-dots="true"  interval="3000" duration="1000">
      <swiper-item wx:for="{{gallery}}" wx:key="{{item.id}}">
        <image src="{{item.img_url}}" background-size="cover"></image>
      </swiper-item>
    </swiper>
    <view class="goods-infoBox">
      <view class="buy_box">
        <text class="goods-name">{{goods.name}}</text>
        <text class="goods-desc">{{goods.goods_brief}}</text>
        <text class="goods-price">￥{{goods.retail_price}}</text>
        <view class="goods-brand" wx:if="{{brand.name}}">
          <navigator url="../brandDetail/brandDetail?id={{brand.brandId}}">
            <text>{{brand.name}}</text>
          </navigator>
        </view>
      </view>
    </view>
    <view class="section-nav section-attr" bindtap="switchAttrPop">
      <view bindtap="addToCart" class="t">请选择规格数量</view>
      <image class="icon" src="../../static/images/address_right.png" background-size="cover"></image>
    </view>
  </view>
  <view class="bottom-btn">
    <view class="ico_box l-collect {{ openAttr ? 'back' : ''}}" bindtap="closeAttrOrCollect">
      <image class="icon" src="../../images/icon_collect.png"></image>
    </view>
    <view class="ico_box l-cart">
      <view class="box">
        <text class="cart-count">{{cartGoodsCount}}</text>
        <image bindtap="openCartPage" class="icon" src="../../images/ic_menu_shoping_nor.png"></image>

      </view>
    </view>
    <view class="buy_box" bindtap="addToCart">立即购买</view>
    <view class="addToCart_btn" bindtap="addToCart">加入购物车</view>
  </view>
  <view class='mark' wx:if="{{mark}}"></view>
  <view wx:if="{{openCard}}" class="attr-pop animated fadeInUp">
    <image class="closeBtn" src="../../images/clear_input.png" bindtap="closeCard"></image>
    <view class="img-info">
      <image class="img" src="http://yanxuan.nosdn.127.net/3af8ff6e7897ebbb3e7d637476077917.jpg?imageView&thumbnail=430x430&quality=95"></image>
      <view class="info">
        <view class="buy_box">
          <view class="p">价格：￥{{goods.retail_price}}</view>
          <view class="a" wx:if="{{productList.length>0}}">已选择：{{checkedSpecText}}</view>
        </view>
      </view>
    </view>
    <view class="number-item">
        <view class="name">数量</view>
        <view class="selnum">
          <view class="cut" bindtap="cutNumber">-</view>
          <input value="{{number}}" class="number" disabled="true" type="number" />
          <view class="add" bindtap="addNumber">+</view>
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
    enablePullDownRefresh: false
  };
  data = {
    mark: false,
    openCard: false,
    number: 1,
    cartGoodsCount: 0,
    goodsid: null,
    goods: {},
    gallery: []
  };
  async onLoad(options) {
    this.goodsid = options.id;
    await this.getGoodsInfo();
    await this.getGoodsCount();
  }
  async getGoodsInfo() {
    //获取商品的详细
    let resulgoods = await this.$parent.globalData.get(
      `${api.server}/api/shop/goods/detail?id=${this.goodsid}`
    );
    if (resulgoods.data.info.length > 0) {
      this.goods = this.$parent.globalData.goods = resulgoods.data.info;
    }
    if (resulgoods.data.gallery.length > 0) {
      this.gallery = this.$parent.globalData.gallery = resulgoods.data.gallery;
    }
    this.$apply();
  }
  async getGoodsCount() {
    //获取购物车的数量
    let resulgoodsCount = await this.$parent.globalData.get(
      `${api.server}/api/shop/cart/goodscount`
    );
    this.cartGoodsCount = this.$parent.globalData.cartGoodsCount =
      resulgoodsCount.data.cartTotal.goodsCount;
  }
  methods = {
    //关闭购物车
    closeCard() {
      this.openCard = false;
      this.mark = false;
    },

    //加入购物车
    async addToCart() {
      if (this.openCard) {
        let resultcard = await this.$parent.globalData
          .post(`${api.server}/api/shop/cart/add`, {
            goodsId: this.goodsid,
            number: this.number
          })
          .complete(function() {
            this.getGoodsCount();
          });
      }

      this.openCard = true;
      this.mark = true;
    },

    cutNumber() {
      this.number = this.number - 1 > 1 ? this.number - 1 : 1;
    },
    addNumber() {
      this.number = this.number + 1;
    }
  };
}
</script>
<style>
view,
text {
  font-size: 29rpx;
  color: #333;
}

.goodsimgs {
  width: 750rpx;
  height: 750rpx;
}

.goodsimgs image {
  width: 750rpx;
  height: 750rpx;
}

.service-policy {
  width: 750rpx;
  height: 73rpx;
  background: #f4f4f4;
  padding: 0 31.25rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.service-policy .item {
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png)
    0 center no-repeat;
  background-size: 10rpx;
  padding-left: 15rpx;
  display: flex;
  align-items: center;
  font-size: 25rpx;
  color: #666;
}

.goods-infoBox {
  width: 750rpx;
  overflow: hidden;
  background: #fff;
}

.goods-infoBox .buy_box {
  display: block;
  width: 718.75rpx;
  height: 100%;
  margin-left: 31.25rpx;
  padding: 38rpx 31.25rpx 38rpx 0;
  border-bottom: 1px solid #f4f4f4;
}

.goods-infoBox .buy_box text {
  display: block;
  width: 687.5rpx;
  text-align: center;
}

.goods-infoBox .goods-name {
  height: 41rpx;
  margin-bottom: 5.208rpx;
  font-size: 41rpx;
  line-height: 41rpx;
}

.goods-infoBox .goods-desc {
  height: 43rpx;
  margin-bottom: 41rpx;
  font-size: 24rpx;
  line-height: 36rpx;
  color: #999;
}

.goods-infoBox .goods-price {
  height: 35rpx;
  font-size: 35rpx;
  line-height: 35rpx;
  color: #b4282d;
}

.goods-infoBox .goods-brand {
  margin-top: 23rpx;
  min-height: 40rpx;
  text-align: center;
}

.goods-infoBox .goods-brand text {
  display: inline-block;
  width: auto;
  padding: 2px 30rpx 2px 10.5rpx;
  line-height: 35.5rpx;
  border: 1px solid #f48f18;
  font-size: 25rpx;
  color: #f48f18;
  border-radius: 4px;
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/detailTagArrow-18bee52dab.png)
    95% center no-repeat;
  background-size: 10.75rpx 18.75rpx;
}

.section-nav {
  width: 750rpx;
  height: 108rpx;
  background: #fff;
  margin-bottom: 36rpx;
  margin-top: 37rpx;
}

.section-nav .t {
  float: left;
  width: 600rpx;
  height: 108rpx;
  line-height: 108rpx;
  font-size: 29rpx;
  color: #333;
  margin-left: 31.25rpx;
}

.section-nav .icon {
  float: right;
  width: 52rpx;
  height: 52rpx;
  margin-right: 16rpx;
  margin-top: 28rpx;
}

.bottom-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 750rpx;
  height: 100rpx;
  display: flex;
  background: #fff;
}

.bottom-btn .ico_box {
  float: left;
  height: 100rpx;
  width: 162rpx;
  border: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-btn .ico_box.l-collect {
  border-right: none;
  border-left: none;
  text-align: center;
}

.bottom-btn .ico_box.l-cart .box {
  position: relative;
  height: 60rpx;
  width: 60rpx;
}

.bottom-btn .ico_box.l-cart .cart-count {
  height: 28rpx;
  width: 28rpx;
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  background: #b4282d;
  text-align: center;
  font-size: 18rpx;
  color: #fff;
  line-height: 28rpx;
  border-radius: 50%;
}

.bottom-btn .ico_box.l-cart .icon {
  position: absolute;
  top: 10rpx;
  left: 0;
}

.bottom-btn .ico_box .icon {
  display: block;
  height: 44rpx;
  width: 44rpx;
}

.bottom-btn .buy_box {
  float: left;
  height: 100rpx;
  line-height: 96rpx;
  flex: 1;
  text-align: center;
  color: #333;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}

.bottom-btn .addToCart_btn {
  border: 1px solid #b4282d;
  background: #b4282d;
  float: left;
  height: 100rpx;
  line-height: 96rpx;
  flex: 1;
  text-align: center;
  color: #fff;
}
.attr-pop {
  width: 100%;
  height: 50%;
  padding: 31.25rpx;
  background: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 998;
}
.closeBtn {
  width: 100rpx;
  height: 100rpx;
  float: right;
  margin-right: 50rpx;
}
.attr-pop .img-info {
  width: 687.5rpx;
  height: 177rpx;
  overflow: hidden;
  margin-bottom: 41.5rpx;
}

.attr-pop .img {
  float: left;
  height: 177rpx;
  width: 177rpx;
  background: #f4f4f4;
  margin-right: 31.25rpx;
}

.attr-pop .info {
  float: left;
  height: 177rpx;
  display: flex;
  align-items: center;
}

.attr-pop .p {
  font-size: 33rpx;
  color: #b4282d;
  height: 33rpx;
  line-height: 33rpx;
  margin-bottom: 10rpx;
}

.attr-pop .a {
  font-size: 29rpx;
  color: #333;
  height: 40rpx;
  line-height: 40rpx;
}
.attr-pop .img-info {
  width: 687.5rpx;
  height: 177rpx;
  overflow: hidden;
  margin-bottom: 41.5rpx;
}

.attr-pop .img {
  float: left;
  height: 177rpx;
  width: 177rpx;
  background: #f4f4f4;
  margin-right: 31.25rpx;
}

.attr-pop .info {
  float: left;
  height: 177rpx;
  display: flex;
  align-items: center;
}

.attr-pop .p {
  font-size: 33rpx;
  color: #333;
  height: 33rpx;
  line-height: 33rpx;
  margin-bottom: 10rpx;
}

.attr-pop .a {
  font-size: 29rpx;
  color: #333;
  height: 40rpx;
  line-height: 40rpx;
}
.number-item .selnum {
  width: 322rpx;
  height: 71rpx;
  border: 1px solid #ccc;
  display: flex;
}

.number-item .cut {
  width: 93.75rpx;
  height: 100%;
  text-align: center;
  line-height: 65rpx;
}

.number-item .number {
  flex: 1;
  height: 100%;
  text-align: center;
  line-height: 68.75rpx;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  float: left;
}

.number-item .add {
  width: 93.75rpx;
  height: 100%;
  text-align: center;
  line-height: 65rpx;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
.mark {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(57, 60, 75, 0.75);
  left: 0;
  top: 0;
  z-index: 99;
}
</style>