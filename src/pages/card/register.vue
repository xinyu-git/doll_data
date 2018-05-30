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
        <input class="weui-input" type="text" placeholder="请输入姓名"  bindinput="bindInput" data-name="fullname">
      </view>
    </view>
    <!--手机号-->
    <view class="weui-cell my-formBox">
      <view class="weui-cell_hd">
        <label class="weui-label">手机号</label>
      </view>
      <view class="weui-cell_bd weui-cell_primary">
        <input class="weui-input" type="tel" placeholder="请输入手机号"  bindinput="bindInput" data-name="mobile" maxlength="11">
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
        <input class="weui-input" type="text" placeholder="请输入公司" bindinput="bindInput"  data-name="company">
      </view>
    </view>
    <!--职位-->
    <view class="weui-cell my-formBox">
      <view class="weui-cell_hd">
        <label class="weui-label">职位</label>
      </view>
      <view class="weui-cell_bd weui-cell_primary">
        <input class="weui-input" type="text" placeholder="请输入职位" bindinput="bindInput"  data-name="title">
      </view>
    </view>
    <!--保存按钮-->
    <view class="weui-btn-area">
      <button class="weui-btn my-btn_orange" bindtap="createCard">保存</button>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";

import api from "../../config/api";
export default class Register extends wepy.page {
  config = {
    navigationBarTitleText: "新用户注册",
    navigationBarBackgroundColor: "#e67841",
    backgroundColor: "#e67841",
    navigationBarTextStyle: "white"
  };
  components = {};
	data = { 
		fullname : '',
		mobile : '',
		fromcode : '',
		checkcode : '', 
		
		title : "",
		company : "", 
		key: ""
  };
  async createCard(){
	wx.showLoading({title: '请稍后',mask : true})
    let result = await this.$parent.globalData.post(`${api.server}/auth/user/card/registerAndCreate`,
		{fullname : this.fullname, mobile : this.mobile, checkcode : this.checkcode, title: this.title, company: this.company})            
    wx.hideLoading();
	if(!!result.errorCode){
		wx.showModal({
			confirmColor: "#338AF1",
			title: '提示',
			showCancel : false,
			content: result.messasge || '出错了，请重试'
		})
	}else{
		await this.$parent.globalData.refreshUserInfo();
	}
                
  }
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  methods = {
    bindInput(e){
      let key = e.currentTarget.dataset.name;
      this[key] = e.detail.value;
      this.$apply();
  	},
  };
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
