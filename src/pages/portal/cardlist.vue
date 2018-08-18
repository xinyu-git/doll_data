<template>
<view class="page">
  <!--附近的名片列表-->
  <view class="my-cardBox">
    <view class="weui-cell my-cardTitle">
      <view class="weui-cell__bd weui-cell_primary">
        <image class="ico_nearby_card" src="../../images/ico_nearby_card.png"></image>
        <text>推荐的名片</text>
      </view>
    </view>
    <view class="weui-flex my-cardList">
      <block wx:for="{{msg}}" wx:for-item="item" wx:if="{{index<3}}" wx:key="item.id">
        <view class="weui-flex__item my-picCard" bindtap="go2card" data-cardid="{{item.id}}">
          <image mode="aspectFill" src="{{item.User.headimg}}"></image>
          <view class="my-mark"></view>
          <view class="my-card-info">
            <text>{{item.name}}</text>
            <text>{{item.title}}</text>
          </view>
        </view>
      </block>
    </view>
  </view>
  <!--名片夹列表-->
  <view class="my-cardCaseList">
    <view class="weui-cell my-cardCaseTitle">
      <view class="weui-cell__bd weui-cell_primary">
        <image class="ico_cardcase" src="../../images/ico_cardcase.png"></image>
        <text>名片夹</text>
      </view> 
    </view>
    <block wx:for="{{cardlist}}" wx:for-item="item"  wx:key="item.id">
      <view class="weui-cell my-caseBox{{index%4}} noline" bindtap="go2card" data-cardid="{{item.id}}">
        <view class="weui-cell__ft my-lumpBox"></view>
        <view class="weui-cell_hd">
          <image class="my-headImg" src="{{item.User.headimg}}"></image>
        </view>
        <view class="weui-cell__bd weui-cell_primary">
          <text>{{item.name}}</text>
          <text>{{item.title}}</text>
        </view>
        <view class="weui-cell__ft my-status" wx:if="{{item.status==1}}">新动态</view>
      </view>
    </block>
  </view>
  <!--创建专属名片-->
  <view class="createCard-box" bindtap='go2register' wx:if="{{createCard}}">
    <view class="my-createCard" >
      <image src="../../images/ico_add_card.png"></image>
      <text>创建专属名片</text>
    </view>
  </view>
  <!--编辑我的名片-->
  <view class="editCard-box" bindtap='go2my' wx:else>
    <view class="my-editCard" >
      <image src="../../images/ico_add_card.png"></image>
      <text>编辑我的名片</text>
    </view>
  </view>
  </view>
</template>
<script>
//import wepy from "wepy";

import api from "../../config/api";
import auth from "../base/auth";
export default class Cardlist extends auth {
  config = {
    navigationBarTitleText: "我的名片"
  };
  components = {};
  data = {
    key: "",
    msg: [],
    cardlist: [],
    uid: null,
    createCard: true,
    usrCardbar: false,
    card_ids: ""
  };

  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    let result = await super.onLoad();
    if (!result) {
      return;
    }
    let userinfo = (this.userinfo = this.$parent.globalData.userInfo);
    this.key = options.key || options.scene;
    this.uid = options.id;
    this.usercard =
      this.$parent.globalData.usercard || wx.getStorageSync("user:card");
  }
  async onShow() {
    this.getFavorite();
    this.getRecommond();
    this.checkCreate();
  }
  async checkCreate() {
    //验证是否已经创建名片
    let result = await this.$parent.globalData.get(
      `${api.server}/auth/user/card/myowncards`
    );
    //console.log(result);
    if (result.length > 0) {
      this.createCard = false;
      this.usercard = this.$parent.globalData.usercard = result;
      this.$apply();
      //wx.setStorageSync("user:card",result.rows);
    }
  }
  //获取推荐名片列表
  async getRecommond() {
    let resultinfo = await this.$parent.globalData.get(
      `${api.server}/auth/user/card/recommond`
    );
    //console.log(resultinfo);
    if (resultinfo.length > 0) {
      this.msg = this.$parent.globalData.msg = resultinfo;
      this.$apply();
    }
  }
  //获取收藏夹列表
  async getFavorite() {
    let resultlist = await this.$parent.globalData.get(
      `${api.server}/api/favorite/mylist`
    );
    let _cardarray = [];
    for (var i = 0; i < resultlist.rows.length; i++) {
      _cardarray.push(resultlist.rows[i].target_id);
    }
    this.card_ids = _cardarray.join(",");
    this.$apply();
    //获取名片夹列表信息
    let resultcard = await this.$parent.globalData.get(
      `${api.server}/auth/user/card/getcardbyids?card_ids=${this.card_ids}`
    );
    //console.log(resultcard);
    if (resultcard.length > 0) {
      this.cardlist = this.$parent.globalData.cardlist = resultcard;
      this.$apply();
    }
  }
  go2my() {
    wx.navigateTo({ url: "/pages/card/my" });
  }
  go2card(e) {
    let id = e.currentTarget.dataset.cardid;
    wx.navigateTo({ url: "/pages/portal/index2?id=" + id });
  }
  go2register() {
    wx.navigateTo({ url: "/pages/card/register" });
  }
  methods = {};
}
</script>
<style>
.my-cardTitle,
.my-cardCaseTitle {
  position: relative;
}
.my-cardTitle .ico_nearby_card {
  width: 36rpx;
  height: 26rpx;
  position: absolute;
  top: 50%;
  margin-top: -13rpx;
  left: 50rpx;
}
.my-cardTitle .ico_change_btn {
  width: 28rpx;
  height: 26rpx;
  position: absolute;
  top: 50%;
  margin-top: -13rpx;
  left: 35rpx;
}
.my-cardCaseTitle .ico_cardcase {
  width: 36rpx;
  height: 30rpx;
  position: absolute;
  top: 50%;
  margin-top: -15rpx;
  left: 50rpx;
}

.my-btnBox text {
  margin-left: 0;
  color: #666;
  font-size: 30rpx;
  text-decoration: underline;
  margin-right: 10rpx;
}
.my-cardCaseTitle {
  margin-bottom: 15rpx;
}
.my-btnBox {
  position: relative;
}
.my-cardList {
  padding: 0px 15px;
  margin-left: 10rpx;
}
.my-cardList image {
  width: 216rpx;
  height: 260rpx;
  border-radius: 10rpx;
}
.my-picCard {
  position: relative;
}
.my-mark {
  width: 216rpx;
  height: 260rpx;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10rpx;
}
.my-card-info {
  position: absolute;

  bottom: 20rpx;
  color: #fff;
  padding: 0 15rpx;
}

.my-card-info text {
  display: block;
  font-size: 28rpx;
}
.my-cardCaseList {
  margin-bottom: 130rpx;
}
.my-card-info text:nth-child(1) {
  font-size: 34rpx;
}
.my-headImg {
  width: 120rpx;
  height: 120rpx;
  border: solid 1px #e2e2e2;
  border-radius: 50%;
  margin-left: 15rpx;
}
.my-caseBox0,
.my-caseBox1,
.my-caseBox2,
.my-caseBox3 {
  border: solid 1px #ab00fa;
  width: 80%;
  margin: 0 auto;
  border-radius: 20rpx;
  position: relative;
  margin-top: -15rpx;
  box-shadow: 0 -10px 20px #eaeaea inset;
  background: #fff;
  height: 148rpx;
}
.my-cardCaseList text {
  display: block;
  margin-left: 25rpx;
  color: #666;
}
.my-cardCaseList text:nth-child(1) {
  font-size: 40rpx;
  color: #333;
  font-weight: bolder;
}
.my-caseBox0 .my-lumpBox,
.my-caseBox1 .my-lumpBox,
.my-caseBox2 .my-lumpBox,
.my-caseBox3 .my-lumpBox {
  width: 18rpx;
  height: 54rpx;
  background: #ab00fa;
  position: absolute;
  left: 0;
}
.my-caseBox1 {
  border: solid 1px #fada00;
}
.my-caseBox1 .my-lumpBox {
  background: #fada00;
}
.my-caseBox2 {
  border: solid 1px #00d4fa;
}
.my-caseBox2 .my-lumpBox {
  background: #00d4fa;
}
.my-caseBox3 {
  border: solid 1px #fa2c00;
}
.my-caseBox3 .my-lumpBox {
  background: #fa2c00;
}
.my-status {
  color: #ff6434;
  font-size: 30rpx;
  padding: 5rpx 30rpx;
  border-radius: 40rpx;
  border: solid 1px #ff6434;
  top: 20rpx;
  right: 30rpx;
  position: absolute;
}
.my-cardTitle text,
.my-cardCaseTitle text {
  margin-left: 70rpx;
  color: #333;
}
.createCard-box,
.editCard-box {
  background: #ff6434;
  height: 120rpx;
  width: 88%;
  margin: 0 auto;
  color: #fff;
  text-align: center;
  line-height: 120rpx;
  position: relative;
  margin-top: 10rpx;
  border-radius: 10rpx;
  border: solid 2px #cc502a;
}
.createCard-box text,
.editCard-box text {
  float: left;
  display: block;
  font-size: 38rpx;
}
.createCard-box image,
.editCard-box image {
  width: 52rpx;
  height: 52rpx;
  display: block;
  float: left;
  margin: 32rpx 20rpx 32rpx 35rpx;
}
.my-createCard,
.my-editCard {
  margin-left: 140rpx;
}

.weui-bottombar {
  width: 100%;
  height: 80rpx;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  border-top: solid 1px #e0e0e0;
}

.ico_bt_btn {
  background: rgba(0, 0, 0, 0);
  color: #fff;
  line-height: 40rpx;
  font-size: 30rpx;
  padding: 0;
}

.ico_bt_btn text {
  display: block;
  color: #666;
}

.ico_bt_card {
  position: absolute;
  left: 50rpx;
}

.ico_bt_add {
  position: absolute;
  left: 337rpx;
}

.ico_bt_my {
  position: absolute;
  right: 110rpx;
}

.ico_bt_news {
  position: absolute;
  left: 210rpx;
}

.ico_bt_sell {
  position: absolute;
  left: 505rpx;
}

.ico_bt_card image {
  width: 36rpx;
  height: 30rpx;
}

.iconBox-three .ico_bt_card {
  top: 20rpx;
  left: 50rpx;
}

.iconBox-three .ico_bt_card image {
  width: 44rpx;
  height: 47rpx;
}

.ico_bt_add image {
  width: 98rpx;
  height: 98rpx;
}

.ico_bt_my image {
  width: 28rpx;
  height: 32rpx;
}

.ico_bt_news image {
  width: 32rpx;
  height: 29rpx;
}

.ico_bt_sell image {
  width: 38rpx;
  height: 36rpx;
}

button::after {
  border: 0;
}

.weui-cells-btpd {
  padding-bottom: 160rpx;
}

.noline::before {
  border: none;
}
</style>
