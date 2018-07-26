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
        <input class="weui-input" placeholder-class="phcolor" type="text" placeholder="请输入姓名"  bindinput="bindInput" data-name="fullname"/>
      </view>
    </view>
    <!--手机号-->
    <view class="weui-cell my-formBox">
      <view class="weui-cell_hd">
        <label class="weui-label">手机号</label>
      </view>
      <view class="weui-cell_bd weui-cell_primary">
        <text >{{mobilelite}}</text>
      </view>
      <view class="weui-cell__ft">
        <button class="weui-vcode-btn my-orange-btn" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取验证码</button>
      </view>
    </view>
    <!--公司-->
    <view class="weui-cell my-formBox">
      <view class="weui-cell_hd">
        <label class="weui-label">公司</label>
      </view>
      <view class="weui-cell_bd weui-cell_primary">
        <input class="weui-input" placeholder-class="phcolor" type="text" placeholder="请输入公司" bindinput="bindInput"  data-name="company"/>
      </view>
    </view>
    <!--职位-->
    <view class="weui-cell my-formBox">
      <view class="weui-cell_hd">
        <label class="weui-label">职位</label>
      </view>
      <view class="weui-cell_bd weui-cell_primary">
        <input class="weui-input" placeholder-class="phcolor" type="text" placeholder="请输入职位" bindinput="bindInput"  data-name="title"/>
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
    navigationBarTitleText: "新用户注册"
  };
  components = {};
  data = {
	allowGetNum : false, 
    fullname: "",
	mobile: "",
	mobilelite : '---',
    fromcode: "",
    checkcode: "",
    title: "",
    company: "",
    key: ""
    };
  	async createCard() {
		if (!this.mobile){
			wx.showModal({
				confirmColor: "#338AF1",
				title: "提示",
				showCancel: false,
				content: '为了更好的服务，请允许获取手机号信息！'
			});
			return ;
		}
		wx.showLoading({ title: "请稍后", mask: true });
		let result = await this.$parent.globalData.post( `${api.server}/auth/user/card/registerAndCreate`,
		{
			fullname: this.fullname,
			mobile: this.mobile,
			checkcode: this.checkcode,
			title: this.title,
			company: this.company
		} );
		wx.hideLoading();
    if (!!result.errorCode) {
      wx.showModal({
        confirmColor: "#338AF1",
        title: "提示",
        showCancel: false,
        content: result.messasge || "出错了，请重试"
      });
    } else {
	  await this.$parent.globalData.refreshUserInfo();
	  wx.navigateTo({ url: "/pages/portal/cardlist" });
    }
  }
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
	this.key = options.key || options.scene;
	if(!this.$parent.globalData.loginInfo.code){
		let login_result = await wepy.login();
    	this.$parent.globalData.loginInfo.code = login_result.code;
	}
  }
  methods = {
    async getPhoneNumber(e) { 
      	if(e.detail.errMsg == "getPhoneNumber:ok"){
			console.info("同意授权", this.$parent.globalData.loginInfo)
			this.allowGetNum = true;
			if(!this.$parent.globalData.loginInfo.code){
				this.allowGetNum = false;
				return;
			}
			let formdata = {
				code: this.$parent.globalData.loginInfo.code,
				iv: e.detail.iv,
				userInfo: this.$parent.globalData.loginInfo.userinfo,
				encryptedData: e.detail.encryptedData
			}
			let res = await this.$parent.globalData.post(`${api.server}/auth/wxa/card/getusermobile`,formdata)
			if(res){
				this.mobile = res.phoneNumber;
				this.mobilelite = this.mobile.substring(0,3) + "****" + this.mobile.substring(7)
				this.$apply();
			}
		}else if(e.detail.errMsg == "getPhoneNumber:fail user deny"){
			console.error("拒绝")
			this.allowGetNum = false;
		}else if(e.detail.errMsg == "getPhoneNumber:fail:cancel to confirm login"){
			console.error("取消")
			this.allowGetNum = false;
		}
		/*
		console.log(e.detail.errMsg)
		console.log(e.detail.errMsg == "getPhoneNumber:ok")
        console.log(e.detail.iv) 
        console.log(e.detail.encryptedData) */
    } ,
    bindInput(e) {
      let key = e.currentTarget.dataset.name;
      this[key] = e.detail.value;
      this.$apply();
    }
  };
}
</script>
<style>
.my-title {
  width: 100%;
  color: #666;
  border-bottom: solid 1px #e0e0e0;
  padding-bottom: 15rpx;
  font-size: 36rpx;
  font-weight: bold;
}
.my-formBox::before {
  border: none;
}
.my-formBox {
  border-bottom: solid 1px #e0e0e0;
  padding: 0 15px;
  color: #333;
}
.my-infoBox label {
  display: inline-block;
  color: #666;
}
.my-btn_orange {
  background: #ff633f;
  color: #fff;
}
.my-orange-btn {
  color: #ff633f;
  font-size: 28rpx;
  border-left: solid 1px #e0e0e0;
  border : none;
}
.phcolor {
  color: #999;
}
</style>
