<template>
<view class="page">
   <view class="orders">
        <view bindtap="go2orderDetail" class="order" wx:for="{{orderList}}" wx:key="{{item.id}}" id="{{item.id}}">
            <view class="h">
                <view class="l">订单编号：{{item.order_sn}}</view>
                <view class="r">{{item.order_status_text}}</view>
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
            <view class="b">
                <view class="l">实付：￥{{item.actual_price}}</view>
                <view class="r">
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
      `${api.server}/api/shop/order/list`
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
      wx.navigateTo({ url: "/pages/card/orderdetail?id=" + id });
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

.order .h {
  height: 83.3rpx;
  line-height: 83.3rpx;
  margin-left: 31.25rpx;
  padding-right: 31.25rpx;
  border-bottom: 1px solid #f4f4f4;
  font-size: 30rpx;
  color: #333;
}

.order .h .l {
  float: left;
}

.order .h .r {
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

.order .b {
  height: 103rpx;
  line-height: 103rpx;
  margin-left: 31.25rpx;
  padding-right: 31.25rpx;
  border-top: 1px solid #f4f4f4;
  font-size: 30rpx;
  color: #333;
}

.order .b .l {
  float: left;
}

.order .b .r {
  float: right;
}

.order .b .btn {
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
</style>