<template>
<view class="page" >
  <!--视频播放  bindtouchstart="handletouchtart" bindtouchmove="handletouchmove"-->
  <view class="videoBox" wx:if="{{custombg}}">
    <view class="my-videoBox1">
      <video id="myVideo" class="myVideo" src="{{source}}" autoplay="true"  loop="true" controls></video>
    </view>
  </view>
  <view class="hitImg" wx:else>请去上传视频</view>
  <!--名片信息-->
  <view class="my-cardBox1" wx:if="{{mycard1}}">
    <view class="weui-cell my-cardCon">
      <view class="my-colorLump"></view>
      <view class="weui-cell_primary my-avaterBox">
        <text>{{cardinfo.name}}</text>
        <text>{{cardinfo.title}}</text>
      </view>
      <view class="weui-cell__ft my-btn_wx">
        <button class='my-btn_news' open-type="contact" session-from="{{uid}}"></button>
        <image src="../../images/ico_wx.png"></image>
      </view>
      <view class="my-btn_call" bindtap="callmeTap" >
        <image  src="../../images/ico_call.png"></image>
      </view>
      <view class="my-border-r"></view>
      <view class="my-addressBox">
        <text>公司：{{cardinfo.corp}}</text>
        <text>地址：{{cardinfo.address}}</text>
        <text>手机：{{cardinfo.mobile}}</text>
      </view>
       <button wx:if="{{hasShop}}" class="goShopBtn" bindtap="go2shop">我的商城</button>
    </view>
  </view>
  <!--小视频列表-->
  <view class="my-videoList">
    <view class="weui-cells__title my_title">视频</view>
    <view class="myVideoBoxes clearfloat">
    <view class="weui-grids my-sVideoBox" wx:for="{{videolist}}" wx:key="">
      <view class="weui-grid my-small-video" id="{{index}}" bindtap="playVideo">
        <image src="{{item.cover}}"></image>
      </view>
    </view></view>
  </view>
  <!--企业信息文章-->
  <view class="my-articleList">
  <view class="weui-cells__title my_title">最新动态</view>
    <view class="articleList" wx:for="{{articleList}}" wx:for-item="item" wx:if="{{index<3}}"  wx:key="item.id" id="{{item.id}}" bindtap="go2article">
          <view class="articleBox" >
            <view class="article-title">{{item.title}}</view>
          </view>
          <view class="article-banner" wx:if="{{item.content.cover}}">
            <image class="bannerImg" src="{{http+item.content.cover}}" alt="" mode="aspectFill" />
          </view>
          <view class="article_cont" wx:else>{{item.coverText}}</view>
        <view class="page__bd-foot  clearfloat">
            <view class="weui-media-box weui-media-box_appmsg avaterBox">
              <view class="weui-media-box__hd">
                <image class="weui-media-box__thumb" src="{{item.Creator.headimg}}"></image>
              </view>
              <view class="weui-media-box__bd">
                <text class="weui-media-box__title">{{item.author}}</text>
              </view>
            </view>
            <view class="weui-flex my_dataStats">
              <view class="weui-flex__item">{{item.clickTimes}}阅读</view>
              <!--<view class="weui-flex__item">{{item.commentTimes}}评论</view>-->
              <view class="weui-flex__item">{{item.likeTimes}}点赞</view>
            </view>
          </view>
      </view>
  </view>
  <!--底部固定导航-->
  <view class="weui-cell weui-bottombar noline">
    <view class="weui-cell__ft ico_bt_share">
      <button class="ico_bt_btn" open-type="share" data-name="pageShare" >
      <image src="../../images/ico_bt_share.png"></image>
      <text>推荐</text>
      </button>
    </view>
    <view class="weui-cell__ft ico_bt_news2">
      <button class="ico_bt_btn" open-type="contact" session-from="{{uid}}">
      <image src="../../images/ico_bt_news2.png"></image>
      <text>联系</text>
      </button>
    </view>
     <view class="weui-cell__ft  ico_bt_my2" wx:if="{{my}}">
      <button class="ico_bt_btn"  bindtap='go2my'>
      <image src="../../images/ico_bt_my2.png"></image>
      <text>我的</text>
      </button>
    </view>
    <view class="weui-cell__ft  ico_bt_my2" wx:else>
      <button class="ico_bt_btn"  bindtap='go2shop'>
      <image src="../../images/ico_bt_my2.png"></image>
      <text>商城</text>
      </button>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class Index extends wepy.page {
  config = {
    //navigationBarTitleText: "袁小员的视频介绍",
    enablePullDownRefresh: false
  };

  data = {
    cardinfo: null,
    uid: null,
    cardid: null,
    hasbackgroundmusic: false,
    custombg: true,
    mycard1: true,
    medias: [],
    mycard2: false,
    posterurl: "",
    source: "",
    videolist: [],
    articleList: [],
    content: "",
    my: true,
    http: null,
    arry: [],
    hasShop: false
  };

  async onLoad(options) {
    this.http = `${api.server}`;
    this.cardid = options.id;
    this.article_id = this.cardid;
    this.loadCard();
    let userInfo = wx.getStorageSync("user:detail");
    this.userInfo = userInfo;
    //console.log(this.$parent.globalData.usercard[0].id);
    if (this.cardid != this.$parent.globalData.usercard[0].id) {
      this.my = false;
    }
  }
  async onShow() {
    this.getArticleList();
    this.getHasShop();
  }
  //判断商城数据
  async getHasShop() {
    let resultindex = await this.$parent.globalData.get(
      `${api.server}/api/shop/goods/list?shopId=${this.cardid}`
    );
    console.log(resultindex);
    if (!resultindex.data.goodsList) {
      wx.setStorageSync("has_shop", false); //是没有
    } else {
      wx.setStorageSync("has_shop", true); //是有
    }
    if (wx.getStorageSync("has_shop") == true) {
      this.hasShop = true;
    } else if (wx.getStorageSync("has_shop") == false) {
      this.hasShop = false;
    } else {
      this.getHasShop();
    }
    this.$apply();
  }
  //获取名片的Info
  async loadCard() {
    let that = this;
    wx.showNavigationBarLoading();
    this.cardinfo = await this.$parent.globalData.get(
      `${api.server}/auth/user/card/info?card_id=${this.cardid}`
    );
    let medias = this.cardinfo.medias;
    try {
      this.medias = JSON.parse(medias);
    } catch (e) {
      this.medias = [];
    }
    if (this.medias.length == 0) {
      this.custombg = false;
    } else {
      for (var i = 0; i < this.medias.length; i++) {
        if (this.medias[i].isDefault) {
          this.source = this.medias[i].source;
        } else {
          this.videolist.push(this.medias[i]);
        }
      }
    }
    //console.log(this.cardinfo.medias)
    //console.log(this.medias)
    this.uid = this.cardinfo.User.id;
    //console.log(this.uid);
    this.$apply();
    wx.setNavigationBarTitle({ title: that.cardinfo.name });
    wx.hideNavigationBarLoading();
    this.createFavorite();
    //console.log(this.cardinfo);
  }
  //对个人信息名片收藏
  async createFavorite() {
    let result = await this.$parent.globalData.post(
      `${api.server}/api/favorite/create`,
      {
        target_id: this.cardid,
        target_type: "card",
        description: this.cardinfo.description,
        category: "",
        cover_img: "",
        title: this.cardinfo.title
      }
    );
    //console.log(result);
  }
  //获取文章最新动态
  async getArticleList() {
    console.log(123123);
    let resultArticle = await this.$parent.globalData.get(
      `${api.server}/api/article/list`
    );
    console.log(typeof this.articleList);
    if (resultArticle.rows.length > 0) {
      for (let i = 0; i < resultArticle.rows.length; i++) {
        resultArticle.rows[i].content = JSON.parse(
          resultArticle.rows[i].content
        );
        //如果cover不存在 设置文章里的第一张图做为封面。
        if (!resultArticle.rows[i].content.cover) {
          for (let j in resultArticle.rows[i].content.list) {
            if (resultArticle.rows[i].content.list[j].status == 1) {
              resultArticle.rows[i].content.cover =
                resultArticle.rows[i].content.list[j].media;
              break;
            }
          }
        }
        //如果图片也不存在 显示第一段文字
        if (!resultArticle.rows[i].content.cover) {
          for (let m in resultArticle.rows[i].content.list) {
            if (resultArticle.rows[i].content.list[m].content) {
              resultArticle.rows[i]["coverText"] =
                resultArticle.rows[i].content.list[m].content;
              break;
            }
          }
        }
        //console.log(resultArticle.rows[i]);
        if (this.uid == resultArticle.rows[i].Creator.id) {
          this.arry.push(resultArticle.rows[i]);
        }
      }
      this.articleList = this.arry;
      // console.log(this.uid);
    }
  }
  methods = {
    async playVideo(e) {
      this.videoContext = wx.createVideoContext("myVideo");
      //if (e.currentTarget.id == 1) {
      //  this.vCoverBox1 = false;
      //}
      //if (e.currentTarget.id == 2) {
      //  this.vCoverBox2 = false;
      //}
      //console.log(e.currentTarget.id);
      for (var i = 0; i < this.videolist.length; i++) {
        if (e.currentTarget.id == i) {
          this.source = this.videolist[i].source;
        }
      }
      //this.custombg = false;
      //this.box = true;
      //this.videoContext.play();
      this.videoContext.requestFullScreen({ direction: 90 });
    },
    playVideo2() {
      this.videoContext.requestFullScreen({ direction: 90 });
    },
    go2my() {
      wx.navigateTo({ url: "/pages/card/my" });
    },
    go2shop() {
      wx.navigateTo({ url: "/pages/shop/index1?id=" + this.cardid });
    },
    callmeTap() {
      wx.makePhoneCall({
        phoneNumber: this.cardinfo.mobile
      });
    },
    go2article(e) {
      let id = e.currentTarget.id;
      //console.log(id);
      wx.navigateTo({ url: "/pages/article/article?id=" + id });
    }
  };
}
</script>
<style>
.my-videoBox1 .myVideo {
  width: 100%;
  height: 568rpx;
}
.my-cardBox1 {
  color: #ff6434;
  border-bottom: solid 1px #e0e0e0;
}
.my-cardCon {
  position: relative;
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
}
.my-avaterBox text {
  display: inline-block;
  color: #ff6434;
  font-size: 56rpx;
  font-weight: bolder;
}
.my-avaterBox text:nth-child(2) {
  font-size: 32rpx;
  margin-left: 20rpx;
  padding-bottom: 10rpx;
  color: #ffa285;
}
.my-avaterBox {
  position: absolute;
  top: 50rpx;
}
.call-btn {
  position: absolute;
  top: 158rpx;
  right: 35rpx;
  width: 120rpx;
  height: 60rpx;
  padding: 0;
  font-size: 30rpx;
  line-height: 56rpx;
  z-index: 4;
}
.my-addressBox {
  color: #666;
  margin-top: 125rpx;
  margin-left: 8rpx;
}
.my-addressBox text {
  display: block;
  font-size: 32rpx;
}
.myVideoBoxes {
  padding: 0 32rpx;
}
.noline::before,
.my-smallVideo::before,
.myVideoBoxes::before {
  border: none;
}
.my-btn_call {
  position: absolute;
  top: 60rpx;
  right: 142rpx;
}
.my-btn_call image,
.my-btn_wx image {
  width: 72rpx;
  height: 72rpx;
}
.my-btn_wx {
  position: absolute;
  top: 60rpx;
  right: 10rpx;
}
.my-border-r {
  border-right: solid 1px #ff6434;
  position: absolute;
  top: 80rpx;
  right: 108rpx;
  width: 1px;
  height: 40rpx;
}
.my-colorLump {
  background: #ffa285;
  width: 20rpx;
  height: 52rpx;
  position: absolute;
  top: 20%;
  left: -2.5%;
}
.my-btn_news {
  position: absolute;
  top: 0;
  right: 0;
  width: 72rpx;
  height: 72rpx;
  padding: 0;
  z-index: 4;
  opacity: 0;
}
.my-small-video image {
  width: 230rpx;
  height: 230rpx;
  display: inline-block;
}

.my-small-video {
  padding: 0;
  border: 0;
  width: 230rpx;
  height: 230rpx;
  overflow: hidden;
}

.my-sVideoBox {
  border: 0;
  width: 229rpx;
  height: 229rpx;
  float: left;
}
.my_title {
  font-size: 36rpx;
  color: #666;
}
.my-videoList {
  padding-bottom: 40rpx;
  border-bottom: solid 1px #e0e0e0;
}
.my-introBox {
  padding-bottom: 180rpx;
}
.my-introBox text {
  display: block;
  padding: 5px 15px 0;
  color: #333;
  font-size: 32rpx;
  text-indent: 2em;
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

.ico_bt_share {
  position: absolute;
  left: 105rpx;
}
.ico_bt_share image {
  width: 41rpx;
  height: 40rpx;
}
.ico_bt_news2 {
  position: absolute;
  left: 351rpx;
}
.ico_bt_news2 image {
  width: 48rpx;
  height: 45rpx;
}
.ico_bt_my2 {
  position: absolute;
  left: 604rpx;
}
.ico_bt_my2 image {
  width: 42rpx;
  height: 47rpx;
}
button::after {
  border: 0;
}
.clearfloat:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
}
.goShopBtn {
  position: absolute;
  bottom: 35rpx;
  right: 15rpx;
  color: #fff;
  background: #ff6434;
  font-size: 32rpx;
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
  margin-top: 24rpx;
}

.my_article {
  margin-bottom: 75rpx;
}
.article_cont {
  text-indent: 60rpx;
  height: 100rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.my-articleList {
  padding-bottom: 150rpx;
}
.hitImg {
  width: 100%;
  height: 568rpx;
  background: #ccc;
  text-align: center;
  line-height: 568rpx;
  font-size: 48rpx;
  color: #444;
}
</style>
