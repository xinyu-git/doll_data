<template>
<view class="page">
    <view class="order-info">
        <view class="item-time">下单时间：{{orderInfo.add_time}}</view>
        <view class="item-number">订单编号：{{orderInfo.order_sn}}</view>
        <view class="item-price" wx:if="{{orderStatus}}">
            <view class="left">实付：<text class="cost">￥{{orderInfo.actual_price}}</text></view>
            <view class="right">
               <!-- <view class="btn" bindtap="cancelOrder">取消订单</view>-->
                <view class="btn active" bindtap="payOrder">去付款</view>
            </view>
        </view>
    </view>

    <view class="order-goods">
        <view class="goods_title">
            <view class="label">商品信息</view>
            <view class="status">{{orderInfo.order_status_text}}</view>
        </view>
        <view class="goodsBox">
            <view class="item" wx:for="{{orderGoods}}" wx:key="{{item.id}}">
                <view class="img">
                    <image src="{{item.list_pic_url}}"></image>
                </view>
                <view class="info">
                    <view class="info_title">
                        <text class="name">{{item.goods_name}}</text>
                        <text class="number">x{{item.number}}</text>
                    </view>
                    <view class="attr">{{item.goods_specifition_name_value}}</view>
                    <view class="price">￥{{item.retail_price}}</view>
                </view>
            </view>
        </view>
    </view>

    <view class="order-bottom">
        <view class="address">
            <view class="address_title">
                <text class="name">{{orderInfo.consignee}}</text>
                <text class="mobile">{{orderInfo.mobile}}</text>
            </view>
            <view class="address_text">{{orderInfo.full_region + orderInfo.address}}</view>
        </view>
        <view class="total">
            <view class="total_title">
                <text class="label">商品合计：</text>
                <text class="txt">￥{{orderInfo.goods_price}}</text>
            </view>
            <view class="total_title">
                <text class="label">运费：</text>
                <text class="txt">￥{{orderInfo.freight_price}}</text>
            </view>
        </view>
        <view class="pay-fee">
            <text class="label">实付：</text>
            <text class="txt">￥{{orderInfo.actual_price}}</text>
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
    navigationBarTitleText: "订单详情"
  };
  data = {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    handleOption: {},
    orderStatus: false
  };
  async onLoad(options) {
    this.orderId = options.id;
    //console.log(options.id);
    this.getOrderDetail();
  }
  //获取订单详细信息
  async getOrderDetail() {
    let resultorderdetail = await this.$parent.globalData.post(
      `${api.server}/api/shop/order/detail?orderId=${this.orderId}`
    );
    if (resultorderdetail.errno === 0) {
      console.log(resultorderdetail.data);
      this.orderInfo = this.$parent.globalData.orderInfo =
        resultorderdetail.data.orderInfo;
      this.orderGoods = this.$parent.globalData.orderGoods =
        resultorderdetail.data.orderGoods;
      this.handleOption = this.$parent.globalData.handleOption =
        resultorderdetail.data.handleOption;
      if (resultorderdetail.data.orderInfo.order_status === 0) {
        this.orderStatus = true;
      }
    }
    this.$apply();
  }
  async payOrder() {
    let resultpay = await this.$parent.globalData.post(
      `${api.server}/api/shop/pay/prepay?orderId=${this.orderId}`
    );
    if (resultpay.errno === 0) {
      const payParam = resultpay.data;
      wx.requestPayment({
        timeStamp: payParam.timeStamp,
        nonceStr: payParam.nonceStr,
        package: payParam.package,
        signType: payParam.signType,
        paySign: payParam.paySign,
        success: function(resultpay) {
          console.log(resultpay);
        },
        fail: function(resultpay) {
          console.log(resultpay);
        }
      });
    }
  }
  methods = {
    cancelOrder() {
      let resultOrderDel = this.$parent.globalData.post(
        `${api.server}/api/shop/order/cancel?orderId=${this.orderId}`
      );
      if (resultOrderDel.errno === 0) {
        this.order_status = false;
        this.orderInfo = resultorderdetail.data.orderInfo;
      }
      this.$apply();
    }
  };
}
</script>
<style>
.order-info {
  padding-top: 25rpx;
  background: #fff;
  height: auto;
  overflow: hidden;
}

.item-time {
  padding-left: 31.25rpx;
  height: 42.5rpx;
  padding-bottom: 12.5rpx;
  line-height: 30rpx;
  font-size: 30rpx;
  color: #666;
}

.item-number {
  padding-left: 31.25rpx;
  height: 29rpx;
  line-height: 29rpx;
  margin-top: 12.5rpx;
  margin-bottom: 41.5rpx;
  font-size: 30rpx;
  color: #666;
}

.item-price {
  margin-left: 31.25rpx;
  border-top: 1px solid #f4f4f4;
  height: 103rpx;
  line-height: 103rpx;
}

.item-price .left {
  float: left;
}

.item-price .right {
  height: 103rpx;
  float: right;
  display: flex;
  align-items: center;
  padding-right: 16rpx;
}

.item-price .right .btn {
  float: right;
}

.item-price .cost {
  color: #b4282d;
}

.item-price .btn {
  line-height: 66rpx;
  border-radius: 5rpx;
  text-align: center;
  margin: 0 15rpx;
  padding: 0 20rpx;
  height: 66rpx;
}

.item-price .btn.active {
  background: #b4282d;
  color: #fff;
}

.order-goods {
  margin-top: 20rpx;
  background: #fff;
}

.order-goods .goods_title {
  height: 93.75rpx;
  line-height: 93.75rpx;
  margin-left: 31.25rpx;
  border-bottom: 1px solid #f4f4f4;
  padding-right: 31.25rpx;
}

.order-goods .goods_title .label {
  float: left;
  font-size: 30rpx;
  color: #333;
}

.order-goods .goods_title .status {
  float: right;
  font-size: 30rpx;
  color: #b4282d;
}

.order-goods .item {
  display: flex;
  align-items: center;
  height: 192rpx;
  margin-left: 31.25rpx;
  padding-right: 31.25rpx;
  border-bottom: 1px solid #f4f4f4;
}

.order-goods .item:last-child {
  border-bottom: none;
}

.order-goods .item .img {
  height: 145.83rpx;
  width: 145.83rpx;
  background: #f4f4f4;
}

.order-goods .item .img image {
  height: 145.83rpx;
  width: 145.83rpx;
}

.order-goods .item .info {
  flex: 1;
  height: 145.83rpx;
  margin-left: 20rpx;
}

.order-goods .item .info_title {
  margin-top: 8rpx;
  height: 33rpx;
  line-height: 33rpx;
  margin-bottom: 10.5rpx;
}

.order-goods .item .info_title .name {
  display: block;
  float: left;
  height: 33rpx;
  line-height: 33rpx;
  color: #333;
  font-size: 30rpx;
}

.order-goods .item .info_title .number {
  display: block;
  float: right;
  height: 33rpx;
  text-align: right;
  line-height: 33rpx;
  color: #333;
  font-size: 30rpx;
}

.order-goods .item .attr {
  height: 29rpx;
  line-height: 29rpx;
  color: #666;
  margin-bottom: 25rpx;
  font-size: 30rpx;
}

.order-goods .item .price {
  height: 30rpx;
  line-height: 30rpx;
  color: #333;
  font-size: 30rpx;
}

.order-bottom {
  margin-top: 20rpx;
  padding-left: 31.25rpx;
  height: auto;
  overflow: hidden;
  background: #fff;
}

.order-bottom .address {
  height: 128rpx;
  padding-top: 25rpx;
  border-bottom: 1px solid #f4f4f4;
}

.order-bottom .address .address_title {
  height: 35rpx;
  line-height: 35rpx;
  margin-bottom: 20rpx;
}

.order-bottom .address .name {
  display: inline-block;
  height: 35rpx;
  width: 140rpx;
  line-height: 35rpx;
  font-size: 30rpx;
}

.order-bottom .address .mobile {
  display: inline-block;
  height: 35rpx;
  line-height: 35rpx;
  font-size: 30rpx;
}

.order-bottom .address .address_text {
  height: 35rpx;
  line-height: 35rpx;
  font-size: 30rpx;
}

.order-bottom .total {
  height: 106rpx;
  padding-top: 20rpx;
  border-bottom: 1px solid #f4f4f4;
}

.order-bottom .total .total_title {
  height: 30rpx;
  line-height: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
}

.order-bottom .total .label {
  display: inline-block;
  height: 35rpx;
  line-height: 35rpx;
  font-size: 30rpx;
}

.order-bottom .total .txt {
  flex: 1;
  display: inline-block;
  height: 35rpx;
  line-height: 35rpx;
  font-size: 30rpx;
}

.order-bottom .pay-fee {
  height: 81rpx;
  line-height: 81rpx;
}

.order-bottom .pay-fee .label {
  display: inline-block;
  width: 140rpx;
  color: #b4282d;
}

.order-bottom .pay-fee .txt {
  display: inline-block;
  width: 140rpx;
  color: #b4282d;
}
</style>