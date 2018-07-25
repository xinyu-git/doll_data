<template>
<view class="page">
  <scroll-view class="page__bd"  scroll-y="true">
    <view class="articleList" wx:for="{{articleList}}" wx:for-item="item"  wx:key="item.id">
        <navigator url="article">
          <view class="articleBox">
            <view class="article-title">{{item.articleTitle}}</view>
          </view>
          <view class="article-banner">
            <image class="bannerImg" src="{{item.bannerImg}}" alt="" mode="aspectFill" />
          </view>
          <view class="page__bd-foot  clearfloat">
            <view class="weui-media-box weui-media-box_appmsg avaterBox">
              <view class="weui-media-box__hd">
                <image class="weui-media-box__thumb" src="{{item.headingImg}}"></image>
              </view>
              <view class="weui-media-box__bd">
                <text class="weui-media-box__title">{{item.articleAuthor}}</text>
              </view>
            </view>
            <view class="weui-flex my_dataStats">
              <view class="weui-flex__item">{{item.clickTimes}}阅读</view>
              <view class="weui-flex__item">{{item.commentTimes}}评论</view>
              <view class="weui-flex__item">{{item.likeTimes}}点赞</view>
            </view>
          </view>
        </navigator>
      </view>
    </scroll-view>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = { navigationBarTitleText: "文章列表" };
  components = {};
  data = {
    articleList: [
      {
        articleTitle: "活动 • 献礼八一，致敬军人！美篇军旅主题征稿开启",
        bannerImg: "../../images/article_img1.jpg",
        headingImg: "../../images/head_img1.jpg",
        articleAuthor: "小美",
        clickTimes: "503",
        commentTimes: "118",
        likeTimes: "231"
      },
      {
        articleTitle: "童年的梦想,科罗拉多高原沙漠追星之旅",
        bannerImg: "../../images/article_img2.jpg",
        headingImg: "../../images/pic_card2.jpg",
        articleAuthor: "昨日夏雪",
        clickTimes: "503",
        commentTimes: "118",
        likeTimes: "231"
      },
      {
        articleTitle: "南美之南的疯狂之美！好想去撒野",
        bannerImg: "../../images/article_img3.jpg",
        headingImg: "../../images/pic_card1.jpg",
        articleAuthor: "冬日暖阳wlk",
        clickTimes: "503",
        commentTimes: "118",
        likeTimes: "231"
      }
    ]
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }

  methods = {};
}
</script>
<style>
page {
  background: #f1f2f6;
}

.article-banner image {
  width: 688rpx;
  height: 302rpx;
  border-radius: 15rpx;
}
.articleBox {
  width: 688rpx;
}

.articleBox .article-title,
.articleBox .article-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.articleBox .article-title {
  margin-top: 32rpx;
  margin-bottom: 20rpx;
  font-size: 32rpx;
  color: #444;
  font-weight: bold;
  line-height: 40rpx;
}
.articleBox .article-content {
  font-size: 32rpx;
  color: #7f7f7f;
  margin-bottom: 28rpx;
}
.page__bd-foot {
  height: 72rpx;
  padding-top: 20rpx;
}

.avaterBox {
  float: left;
  width: 39%;
  padding: 0;
}
.my_dataStats {
  float: right;
  width: 60%;
  font-size: 22rpx;
  color: #a0a0a0;
  margin-right: 1%;
  height: 50rpx;
  line-height: 50rpx;
  padding-top: 5rpx;
}
.avaterBox image {
  width: 50rpx;
  height: 50rpx;
  display: block;
  border-radius: 50%;
}
.avaterBox text {
  font-size: 22rpx;
  color: #a0a0a0;
  margin-left: 10rpx;
}
.articleList {
  background: #fff;
  padding: 5rpx 31rpx 0 31rpx;
  margin-top: 30rpx;
}
</style>
