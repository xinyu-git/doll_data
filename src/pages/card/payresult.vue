<template>
<view class="page">
 <view class="pay-result">
    <view class="success" wx:if="{{status == true}}">
      <view class="msg">付款成功</view>
      <view class="btns">
        <navigator class="btn" url="/pages/ucenter/order/order" open-type="redirect">查看订单</navigator>
        <navigator class="btn" url="/pages/index/index" open-type="switchTab">继续逛</navigator>
      </view>
    </view>
    <view class="error" wx:if="{{status != true}}">
      <view class="msg">付款失败</view>
      <view class="tips">
        <view class="p">请在 <text class="time">1小时</text> 内完成付款</view>
        <view class="p">否则订单将会被系统取消</view>
      </view>
      <view class="btns">
        <navigator class="btn" url="/pages/ucenter/order/order" open-type="redirect">查看订单</navigator>
        <view class="btn" bindtap='payOrder'>重新付款</view>
      </view>
    </view> 
  </view>

</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
import pay from "../../services/pay.js";
export default class Index extends wepy.page {
  config = {
    enablePullDownRefresh: false
  };
  data = {
    status: false,
    orderId: 0
  };
  async onLoad(options) {
    this.orderId = options.orderId || 24;
    this.status = options.status;
  }
  methods = {
    payOrder() {
      pay
        .payOrder(parseInt(this.orderId))
        .then(res => {
          this.status = true;
        })
        .catch(res => {
          wx.showToast({
            title: "支付失败",
            icon: "none",
            duration: 2000
          });
        });
    }
  };
}
</script>
<style>
.pay-result .msg {
  text-align: center;
  margin: 100rpx auto;
  color: #2bab25;
  font-size: 36rpx;
}

.pay-result .btns {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pay-result .btn {
  text-align: center;
  height: 80rpx;
  margin: 0 20rpx;
  width: 200rpx;
  line-height: 78rpx;
  border: 1px solid #868686;
  color: #000000;
  border-radius: 5rpx;
}

.pay-result .error .msg {
  color: #b4282d;
  margin-bottom: 60rpx;
}

.pay-result .error .tips {
  color: #7f7f7f;
  margin-bottom: 70rpx;
}

.pay-result .error .tips .p {
  font-size: 24rpx;
  line-height: 42rpx;
  text-align: center;
}

.pay-result .error .tips .p {
  line-height: 42rpx;
  text-align: center;
}
</style>
