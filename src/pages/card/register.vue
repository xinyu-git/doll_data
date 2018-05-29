<template>
<view class="page">
  <view class="my-infoBox">
    <view class="weui-cells__title my-title">个人信息</view>
    <!--姓名-->
    <view class="weui-cell my-formBox">
      <view class="weui-cell_hd">
        <label class="weui-label">姓名</label>
      </view>
      <view class="weui-cell_bd weui-cell_primary">
        <input class="weui-input" type="text" placeholder="请输入姓名">
      </view>
    </view>
    <!--手机号-->
    <view class="weui-cell my-formBox">
      <view class="weui-cell_hd">
        <label class="weui-label">手机号</label>
      </view>
      <view class="weui-cell_bd weui-cell_primary">
        <input class="weui-input" type="tel" placeholder="请输入手机号">
      </view>
      <view class="weui-cell__ft">
        <view class="weui-vcode-btn my-orange-btn" bindtap="getCode">获取验证码</view>
      </view>
    </view>
    <!--公司-->
    <view class="weui-cell my-formBox">
      <view class="weui-cell_hd">
        <label class="weui-label">公司</label>
      </view>
      <view class="weui-cell_bd weui-cell_primary">
        <input class="weui-input" type="text" placeholder="请输入公司">
      </view>
    </view>
    <!--职位-->
    <view class="weui-cell my-formBox">
      <view class="weui-cell_hd">
        <label class="weui-label">职位</label>
      </view>
      <view class="weui-cell_bd weui-cell_primary">
        <input class="weui-input" type="text" placeholder="请输入职位">
      </view>
    </view>
    <!--保存按钮-->
    <view class="weui-btn-area">
      <button class="weui-btn my-btn_orange">保存</button>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class Register extends wepy.page {
  config = {
    navigationBarTitleText: "新用户注册",
    navigationBarBackgroundColor: "#e67841",
    backgroundColor: "#e67841",
    navigationBarTextStyle: "white"
  };
  components = {};
  data = {
    key: ""
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  methods = {};
}
</script>
<style>
.my-title {
  width: 100%;
  color: #c76433;
  border-bottom: solid 1px #cd7e57;
  padding-bottom: 15rpx;
  font-size: 36rpx;
  font-weight: bold;
}
.my-formBox::before {
  border: none;
}
.my-formBox {
  border-bottom: solid 1px #cd7e57;
  padding: 0 15px;
  color: #c76433;
}
.my-infoBox label {
  display: inline-block;
  color: #c76433;
}
.my-btn_orange {
  background: #e67841;
  color: #fff;
}
.my-orange-btn {
  color: #e67841;
  font-size: 30rpx;
  border-left: solid 1px #cd7e57;
}
</style>
