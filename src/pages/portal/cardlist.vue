<template>
<view class="page">
    <!--附近的名片列表-->
  <view class="my-listbox">
    <view class="weui-cell my-titlebox">
      <view class="my-icon1">
        <image src="../../images/myicon1.png"></image>
      </view>
      <view class="weui-cell__bd my-list-title">附近的名片</view>
      <view  class="my-change-btn" bindtap="changeList">换一批</view>
    </view>
    <view class="weui-cell my-list-picbox">
      <block wx:for="{{msg}}" wx:for-item="item" wx:if="{{index<3}}" wx:key="item.id">
        <view class="my-picbox">
          <image src="{{item.url}}"></image>
          <view class="my-mark"></view>
          <view class="my-card-info">
            <text>{{item.name}}</text>
            <text>{{item.game}}</text>
            <text>{{item.type}}</text>
          </view>
        </view>
      </block>
    </view>
  </view>
  <!--名片夹-->
  <view class="my-cardcase-box">
    <view class="weui-cell my-titlebox">
      <view class="my-icon2">
        <image src="../../images/myicon2.png"></image>
      </view>
      <view class="weui-cell__bd my-list-title">名片夹</view>
    </view>
    <view class="my-list-cardbox">
      <block wx:for="{{cardlist}}" wx:for-item="item"  wx:key="item.id">
        <view class="my-cardboxes" bindtap="go2card" data-cardid="{{item.id}}">
          <view class="weui-cell">
            <view class="weui_cell_hd">
              <image src="{{item.url}}"></image>
            </view>
            <view class="weui-cell__bd weui-cell_primary">
              <text>{{item.name}}</text>
              <text>{{item.tip}}</text>
            </view>
            <view class="weui-cell__ft my-status" wx:if="{{item.status==1}}">新动态</view>
          </view>
        </view>
      </block>
    </view>
  </view>
  <!--创建专属名片-->
  <view class="createCard-box" wx:if="{{createCard}}">
    <view class="my-createCard" bindtap='go2register'>
      <image src="../../images/myicon3.png"></image>
      <text>创建专属名片</text>
    </view>
  </view>
  <!--底部固定导航-->
  <view class="weui-bottombar weui-cell noline2" wx:else>
    <view class="weui-cell__ft  nav-icon1">
      <button class="nav-btn">
      <image src="../../images/myicon6.png"></image>
      <text>名片夹</text>
      </button>
    </view>
    <view class="weui-cell__ft  nav-icon4" bindtap='go2chatlist'>
      <button class="nav-btn">
      <image src="../../images/myicon5.png"></image>
      <text>消息</text>
      </button>
    </view>
    <view class="weui-cell__ft  nav-icon2">
      <button class="nav-btn" >
      <image src="../../images/myicon4.png"></image>
      </button>
    </view>
    <view class="weui-cell__ft  nav-icon5">
      <button class="nav-btn">
      <image src="../../images/myicon7.png"></image>
      <text>销售</text>
      </button>
    </view>
    <view class="weui-cell__ft  nav-icon3">
      <button class="nav-btn"  bindtap='go2myprofile'>
      <image src="../../images/iconuser.png"></image>
      <text>我的</text>
      </button>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";

import api from "../../config/api";
export default class Mycard extends wepy.page {
  config = {
    navigationBarTitleText: "我的名片",
    navigationBarBackgroundColor: "#e67841",
    backgroundColor: "#e67841",
    navigationBarTextStyle: "white"
  };
  components = {};
  data = {
    key: "",
    list: [
      {
        url: "../../images/pic1.jpg",
        id:'5b0e85ce185d7b34f985ad99',
        name: "张益君",
        game: "坦克世界",
        type: "VIP运营经理"
      },
      {
        url: "../../images/pic2.jpg",
        name: "任建斌",
        id:2,
        game: "坦克世界",
        type: "VIP运营经理"
      },
      {
        url: "../../images/pic3.jpg",
        id:3,
        name: "孙奇",
        game: "坦克世界",
        type: "VIP运营经理",
        status: "0"
      },
      {
        url: "../../images/pic4.jpg",
        id:4,
        name: "尹平辉",
        game: "坦克世界",
        type: "VIP运营经理"
      },
      {
        url: "../../images/pic5.jpg",
        name: "王小王",
        game: "坦克世界",
        type: "VIP运营经理"
      },
      {
        url: "../../images/pic6.jpg",
        name: "李小李",
        game: "坦克世界",
        type: "VIP运营经理"
      }
    ],
    msg: "",
    cardlist: [
      {
          id:'5b0e85ce185d7b34f985ad99',
        name: "孙奇",
        tip: "坦克世界VIP运营经理",
        url: "../../images/person1.png",
        status: "1"
        
      },
      {
          id:'5b0e864c185d7b34f985ad9a',
        name: "张益君",
        tip: "坦克世界VIP运营经理",
        url: "../../images/person1.png",
        status: "1"
      },
      {
          id:'5b0e864e185d7b34f985ad9b',
        name: "任建斌",
        tip: "坦克世界VIP运营经理",
        url: "../../images/person1.png",
        status: "0"
      },
      {
          id:'5b0e86a8185d7b34f985ad9c',
        name: "尹平辉",
        tip: "坦克世界VIP运营经理",
        url: "../../images/person1.png",
        status: "0"
      }
    ],
    uid: null,
    createCard: true,
    usrCardbar: false
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
    this.msg = this.list;
    this.uid = options.id;
    this.usercard = this.$parent.globalData.usercard || wx.getStorageSync("user:card");
    console.log(this.usercard)
    if(!this.usercard){
      let result = await this.$parent.globalData.get(`${api.server}/auth/user/card/myowncards`);
	  console.log(result)
	  if (result.length > 0){
		  this.createCard = false
		  this.usercard  = this.$parent.globalData.usercard = result
		  this.$apply();
		  //wx.setStorageSync("user:card",result.rows);
	  }
    }else{
		this.createCard = false
		this.usrCardbar = true;
		this.$apply();
	}

    if (this.uid) {
      this.usrCardbar = true;
    }
  }
  go2chatlist(){
	  wx.navigateTo({url:"/pages/card/chatlist"})
  }
  go2card(e){
      let id = e.currentTarget.dataset.cardid;
      wx.navigateTo({url:"/pages/portal/index2?id=" + id})
  }
  go2register(){
      wx.navigateTo({url : "/pages/card/register"})
  }
  methods = {
    changeList() {
      if (this.data.list.length > 3) {
        let dataThree = new Array();
        for (var k = 0; k < 3; k++) {
          var i = Math.ceil(Math.random() * (this.data.list.length - 1));
          if (dataThree.indexOf(this.data.list[i]) === -1) {
            dataThree.push(this.data.list[i]);
          } else {
            k = k - 1;
            continue;
          }
        }
        this.msg = dataThree;
      } else {
        this.msg = this.list;
      }
    }
  };
}
</script>
<style>
.my-picbox::before {
  border: 0;
}
.clearfloat:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
}
.my-listbox {
  position: relative;
}
.my-icon1,
.my-icon2 {
  position: absolute;
  top: 30rpx;
}
.my-icon1 image {
  width: 29rpx;
  height: 38rpx;
  display: inline-block;
  margin-right: 15rpx;
}
.my-list-title {
  margin-left: 50rpx;
  font-size: 34rpx;
  margin-top: 5rpx;
}
.my-change-btn {
  position: absolute;
  right: 40rpx;
  top: 35rpx;
  font-size: 30rpx;
  color: #e67841;
}
.my-list-picbox {
  padding: 0 15px;
}
.my-picbox {
  width: 230rpx;
  height: 302rpx;
  float: left;
  position: relative;
}
.my-picbox image {
  width: 230rpx;
  height: 302rpx;
}
.my-card-info {
  position: absolute;
  left: 32rpx;
  bottom: 17rpx;
  color: #fff;
}
.my-card-info text {
  display: block;
  font-size: 28rpx;
}
.my-card-info text:nth-child(1) {
  font-size: 36rpx;
  border-bottom: solid 1px #858d83;
  padding-bottom: 3rpx;
  margin-bottom: 10rpx;
}
.my-mark {
  width: 230rpx;
  height: 302rpx;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
}
.my-icon2 image {
  width: 51rpx;
  height: 38rpx;
}
.my-cardcase-box .my-list-title {
  margin-left: 75rpx;
}
.my-cardboxes {
  height: 165rpx;
  width: 95%;
  background: #ffaa2f;
  border-radius: 10rpx;
  margin: 0 auto;
  color: #fff;
  box-shadow: 0 -10px 20px #e58823 inset;
  margin-top: -5rpx;
}
.my-cardboxes image {
  width: 118rpx;
  height: 118rpx;
}
.my-cardboxes text {
  display: block;
  margin-left: 30rpx;
  font-size: 28rpx;
}
.my-cardboxes text:nth-child(1) {
  font-size: 34rpx;
}
.my-status {
  color: #fff;
  font-size: 30rpx;
  background: #fc2930;
  padding: 5rpx 30rpx;
  border-radius: 50rpx;
  border: solid 2px #fffcf8;
  margin-top: -70rpx;
  margin-right: -10rpx;
}
.createCard-box {
  background: #e67841;
  height: 140rpx;
  width: 95%;
  margin: 0 auto;
  color: #fff;
  text-align: center;
  line-height: 140rpx;
  position: relative;
  margin-top: 10rpx;
}
.createCard-box text {
  float: left;
  display: block;
}
.createCard-box image {
  width: 29rpx;
  height: 29rpx;
  display: block;
  float: left;
  margin: 55rpx 40rpx;
}
.my-createCard {
  margin-left: 160rpx;
}
.fixbottom {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.weui-bottombar {
  width: 100%;
  height: 80rpx;
  background: #e67841;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
}
.nav-btn {
  background: rgba(0, 0, 0, 0);
  color: #fff;
  line-height: 40rpx;
  font-size: 30rpx;
  padding: 0;
}
.nav-btn text {
  display: block;
  color: #fff;
}
.nav-icon1 {
  position: absolute;
  left: 30rpx;
}
.nav-icon2 {
  height: 158rpx;
  position: absolute;
  top: -44rpx;
  left: 294rpx;
}
.nav-icon3 {
  position: absolute;
  right: 110rpx;
}
.nav-icon4 {
  position: absolute;
  left: 180rpx;
}
.nav-icon5 {
  position: absolute;
  left: 510rpx;
}
.nav-icon1 image {
  width: 52rpx;
  height: 38rpx;
}
.nav-icon2 image {
  width: 156rpx;
  height: 158rpx;
}
.nav-icon3 image {
  width: 37rpx;
  height: 48rpx;
}
.nav-icon4 image {
  width: 45rpx;
  height: 42rpx;
}
.nav-icon5 image {
  width: 52rpx;
  height: 52rpx;
}
button::after {
  border: 0;
}
.weui-cells-btpd {
  padding-bottom: 160rpx;
}
.noline::before,
.noline2::before {
  border: none;
}
</style>
