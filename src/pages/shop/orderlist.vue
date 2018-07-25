<template>
<view class="page">
   <view class="no-cart" wx:if="{{orderList.length <= 0}}">
    <view class="c">
      <image src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png" />
      <text>去添加点什么吧</text>
    </view>
  </view>
   <view class="orders" wx:if="{{orderList.length > 0}}">
        <view bindtap="go2orderDetail" class="order" wx:for="{{orderList}}" wx:key="{{item.id}}" id="{{item.id}}">
            <view class="orders_title">
                <view class="left">订单编号：{{item.order_sn}}</view>
                <view class="right">{{item.order_status_text}}</view>
            </view>
            <view class="goods" wx:for="{{item.goodsList}}" wx:key="{{gitem.id}}" wx:for-item="gitem">
                <view class="img">
                    <image src="{{gitem.list_pic_url}}"></image>
                </view>
                <view class="info">
                    <text class="name">{{gitem.goods_name}}</text>
                    <text class="number">共{{gitem.number}}件商品</text>
                </view>
                <view class="status"></view>
            </view>
            <view class="pay-fee">
                <view class="left">实付：￥{{item.actual_price}}</view>
                <view class="right">
                    <button class="btn" data-order-index="{{index}}" catchtap="payOrder" wx:if="{{item.handleOption.pay}}">去付款</button>
                </view>
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
    navigationBarTitleText: "我的订单"
  };
  data = {
    orderList: []
  };
  async onLoad(options) {
    this.getOrderList();
  }
  //获取订单列表信息
  async getOrderList() {
    let resultorder = await this.$parent.globalData.post(
      `${api.server}/api/shop/order/list?shopId=${
        this.$parent.globalData.shopId
      }`
    );
    console.log(resultorder);
    if (resultorder.errno === 0) {
      this.orderList = this.$parent.globalData.orderList =
        resultorder.data.data;
    }

    this.$apply();
  }
  methods = {
    go2orderDetail(e) {
      let id = e.currentTarget.id;
      //console.log(id);
      wx.navigateTo({ url: "/pages/shop/orderdetail?id=" + id });
    }
  };
}
</script>
<style>
.orders {
  height: auto;
  width: 100%;
  overflow: hidden;
}

.order {
  margin-top: 20rpx;
  background: #fff;
}

.order .orders_title {
  height: 83.3rpx;
  line-height: 83.3rpx;
  margin-left: 31.25rpx;
  padding-right: 31.25rpx;
  border-bottom: 1px solid #f4f4f4;
  font-size: 30rpx;
  color: #333;
}

.order .orders_title .left {
  float: left;
}

.order .orders_title .right {
  float: right;
  color: #b4282d;
  font-size: 24rpx;
}

.order .goods {
  display: flex;
  align-items: center;
  height: 199rpx;
  margin-left: 31.25rpx;
}

.order .goods .img {
  height: 145.83rpx;
  width: 145.83rpx;
  background: #f4f4f4;
}

.order .goods .img image {
  height: 145.83rpx;
  width: 145.83rpx;
}

.order .goods .info {
  height: 145.83rpx;
  flex: 1;
  padding-left: 20rpx;
}

.order .goods .name {
  margin-top: 30rpx;
  display: block;
  height: 44rpx;
  line-height: 44rpx;
  color: #333;
  font-size: 30rpx;
}

.order .goods .number {
  display: block;
  height: 37rpx;
  line-height: 37rpx;
  color: #666;
  font-size: 25rpx;
}

.order .goods .status {
  width: 105rpx;
  color: #b4282d;
  font-size: 25rpx;
}

.order .pay-fee {
  height: 103rpx;
  line-height: 103rpx;
  margin-left: 31.25rpx;
  padding-right: 31.25rpx;
  border-top: 1px solid #f4f4f4;
  font-size: 30rpx;
  color: #333;
}

.order .pay-fee .left {
  float: left;
}

.order .pay-fee .right {
  float: right;
}

.order .pay-fee .btn {
  margin-top: 19rpx;
  height: 64.5rpx;
  line-height: 64.5rpx;
  text-align: center;
  padding: 0 20rpx;
  border-radius: 5rpx;
  font-size: 28rpx;
  color: #fff;
  background: #b4282d;
}
.no-cart {
  width: 100%;
  height: auto;
  margin: 0 auto;
}

.no-cart .c {
  width: 100%;
  height: auto;
  margin-top: 200rpx;
}

.no-cart .c image {
  margin: 0 auto;
  display: block;
  text-align: center;
  width: 258rpx;
  height: 258rpx;
}

.no-cart .c text {
  margin: 0 auto;
  display: block;
  width: 258rpx;
  height: 29rpx;
  line-height: 29rpx;
  text-align: center;
  font-size: 29rpx;
  color: #999;
}
</style>