<template>
<view class="page">
   <scroll-view class="page__bd"  scroll-y="true">
    <view class="articleDetails ">
      <view class="article-content">
        <view class="article-title">{{articleConBox.title}}</view>
        <view class="article-data">
          <text class="article-time">{{articleConBox.created_at}}</text>
          <text class="article-author">{{articleConBox.author}}</text>
          <text class="article-click">阅读{{articleConBox.clickTimes}}</text>
        </view>
      </view>
      <view class="article-text {{status ? 'height-auto' : ''}}" >
        <view wx:for="{{content.list}}" wx:for-item="item"  wx:key="item.id">
          <text>{{item.content}}</text>
          <video objectFit="cover" wx:if="{{item.status==0}}"  src="{{http+item.media}}" class="addVideo" controls="{{false}}" ></video>
          <image wx:if="{{item.status==1}}" class="" src="{{http+item.media}}"></image>
        </view>
        <view wx:if="{{openArticle}}" class="showText" bindtap="setHeight">
          <text>展开阅读全文</text>
          <view class="bottomIco">
            <view class="bottom-arrow1"></view><view class="bottom-arrow2"></view>  
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = {
    navigationBarTitleText: "文章详情",
    usingComponents: {
      "i-icon": "../../icon/index"
    }
  };
  data = {
    status: false,
    openArticle: true,
    articleConBox: [],
    article_id: null,
    content: "",
    http: null,
    myarticle: false
  };
  async onLoad(options) {
    this.http = `${api.server}`;
    this.article_id = options.id;
    this.getArticleDetail();
  }
  async getArticleDetail() {
    let result = await this.$parent.globalData.get(
      `${api.server}/api/article/info?article_id=${this.article_id}`
    );
    if (result) {
      this.articleConBox = result;
      this.content = JSON.parse(result.content);
      let userInfo = wx.getStorageSync("user:detail");
      if (userInfo.id === this.articleConBox.Creator.id) {
        this.myarticle = true;
      }
      this.$apply();
    }
  }
  methods = {
    setHeight() {
      this.status = true;
      this.openArticle = false;
    },
    editArticle() {
      wx.navigateTo({
        url: "/pages/article/paragraph?id=" + this.article_id
      });
    }
  };
}
</script>
<style>
.articleDetails {
  background: #fff;
}
.article-content {
  padding: 30rpx 40rpx;
  background: #ffffff;
}
.article-content text {
  font-size: 32rpx;
  color: #454545;
  line-height: 44rpx;
}
.article-content image {
  width: 100%;
  margin: 20rpx 0;
}
.article-title {
  margin-top: 32rpx;
  margin-bottom: 10rpx;
  font-size: 32rpx;
  color: #444;
  font-weight: bold;
  line-height: 48rpx;
}
.article-data text {
  font-size: 22rpx;
  color: #a0a0a0;
  display: inline-block;
  margin-right: 15rpx;
}
.article-text {
  width: 688rpx;
  margin: 0 31rpx;
  height: 1500rpx;
  overflow: hidden;
  position: relative;
}
.height-auto {
  height: auto;
}
.article-text text {
  display: block;
  margin-top: 10rpx;
  text-indent: 2em;
  margin-bottom: 10rpx;
}
.article-text image {
  width: 100%;
  margin: 10rpx 0;
}
.showText {
  text-align: center;
  position: absolute;
  bottom: 0rpx;
  width: 100%;
  padding-top: 120px;
  color: #2887f0;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(255, 255, 255, 0)),
    color-stop(70%, #fff)
  );
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0) 0%,
    #fff 70%
  );
}
.showText text {
  display: block;
  margin-bottom: 50rpx;
}
.bottomIco {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 50%;
  bottom: 0;
  z-index: 2; /*兼容ie8-*/
}
.bottom-arrow1,
.bottom-arrow2 {
  width: 0;
  height: 0;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5; /*兼容ie8-*/
  border-bottom: 10px transparent dashed;
  border-left: 10px transparent dashed;
  border-right: 10px transparent dashed;
  border-top: 10px white solid;
  overflow: hidden;
}
.bottom-arrow1 {
  top: 1px; /*重要*/
  border-top: 10px #2887f0 solid;
}
.bottom-arrow2 {
  border-top: 10px white solid;
}
.tipsNav {
  width: 100%;
  height: 80rpx;
  position: relative;
  border-bottom: solid 1px #ccc;
  background: #fff;
}
.navBtn text {
  display: block;
  float: left;
  font-size: 28rpx;
  line-height: 80rpx;
  margin-left: 80rpx;
}
.navBtn text:nth-child(2) {
  float: right;
  margin-right: 50rpx;
  background: #4099ff;
  height: 40rpx;
  padding: 10rpx 30rpx;
  line-height: 40rpx;
  color: #fff;
  margin-top: 6rpx;
}
.icoPage {
  position: absolute;
  top: 10rpx;
  left: 30rpx;
}
.showBox {
  position: absolute;
  width: 116rpx;
  height: 60px;
  right: 50rpx;
  background: #ccc;
  top: 66rpx;
  color: #000;
  z-index: 99;
  border-radius: 0 0 15rpx 15rpx;
  padding-top: 15rpx;
}
.showBox text {
  display: block;
  text-align: center;
  font-size: 28rpx;
}
.commentInp text {
  display: block;
  float: left;
  font-size: 30rpx;
  margin-left: 40rpx;
}
.commentInp text:nth-child(2) {
  float: right;
}
</style>