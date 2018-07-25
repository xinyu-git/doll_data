<template>
<view class="page">
  <scroll-view class="page__bd"  scroll-y="true">
    <view class="articleDetails ">
      <view class="article-content" wx:for="{{articleTitBox}}" wx:for-item="item"  wx:key="item.id">
        <view class="article-title">{{item.articleTitle}}</view>
        <view class="article-data">
          <text class="article-time">{{item.articleTime}}</text>
          <text class="article-author">{{item.articleAuthor}}</text>
          <text class="article-click">阅读{{item.clickTimes}}</text>
        </view>
      </view>
      <view class="article-text {{status ? 'height-auto' : ''}}" >
        <view wx:for="{{articleConBox}}" wx:for-item="item"  wx:key="item.id">
          <text>{{item.text1}}</text>
          <image class="" src="{{item.image1}}"></image>
          <text>{{item.text2}}</text>
          <image class="" src="{{item.image2}}" ></image>
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
import config from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = { navigationBarTitleText: "文章详情" };
  data = {
    status: false,
    openArticle: true,
    articleTitBox: [
      {
        articleTitle: "活动 • 献礼八一，致敬军人！美篇军旅主题征稿开启",
        articleTime: "2018.07.16",
        articleAuthor: "小美",
        clickTimes: "44.0w"
      }
    ],
    articleConBox: [
      {
        text1:
          "每当听到这首歌，小美就会忍不住热泪盈眶。他们为了国家的建设，浴血在战场上。只因穿上的军装，与家人天各一方，承担起保家卫国的重担！在第91个建军节来临之际，让我们一起用美篇，为穿过军装的他们，写下最美的篇章吧！",
        image1: "../../images/article_img1.jpg",
        image2: "../../images/article_img2.jpg",
        text2:
          "可以描绘自己充满温情的军旅生活，抒写最值得珍藏的战友情，晒出最帅最美的军装照，演唱最嘹亮的军旅歌曲，还可以用诗歌和朗诵的形式，献礼八一，致敬军人！文章内容和形式不限！"
      },
      {
        text1:
          "每当听到这首歌，小美就会忍不住热泪盈眶。他们为了国家的建设，浴血在战场上。只因穿上的军装，与家人天各一方，承担起保家卫国的重担！在第91个建军节来临之际，让我们一起用美篇，为穿过军装的他们，写下最美的篇章吧！",
        image1: "../../images/article_img1.jpg",
        image2: "../../images/article_img2.jpg",
        text2:
          "可以描绘自己充满温情的军旅生活，抒写最值得珍藏的战友情，晒出最帅最美的军装照，演唱最嘹亮的军旅歌曲，还可以用诗歌和朗诵的形式，献礼八一，致敬军人！文章内容和形式不限！"
      }
    ]
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  methods = {
    setHeight() {
      this.status = true;
      this.openArticle = false;
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
</style>
