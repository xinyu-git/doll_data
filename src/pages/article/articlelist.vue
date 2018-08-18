<template>
<view class="page">
  <view class="page__bd my_article">
    <scroll-view class="list" style="height: 1208rpx" scroll-y="true" bindscrolltoupper="refresh" bindscrolltolower="loadMore"> 
    <view class="articleList" wx:for="{{articleList}}" wx:for-item="item"  wx:key="item.id" id="{{item.id}}" bindtap="go2article">
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
              <view class="weui-flex__item">{{item.commentTimes}}评论</view>
              <view class="weui-flex__item">{{item.likeTimes}}点赞</view>
            </view>
          </view>
      </view>
     </scroll-view>
     <view class="bottom" hidden="{{hideBottom}}">
        <view>{{loadMoreData}}</view>
      </view>
    </view>
    <view class="weui-cell weui-bottombar noline">
    <view class="weui-cell__ft ico_bt_card" bindtap=''>
      <button class="ico_bt_btn">
      <image src="../../images/ico_bt_card.png"></image>
      <text>发现</text>
      </button>
    </view>
   <view class="weui-cell__ft ico_bt_add">
      <button class="ico_bt_btn" bindtap='go2paragraph'>
      <image src="../../images/ico_bt_add.png"></image>
      <text>开始创作</text>
      </button>
    </view>
   <view class="weui-cell__ft ico_bt_my">
      <button class="ico_bt_btn">
      <image src="../../images/ico_bt_my.png"></image>
      <text>我的</text>
      </button>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = { navigationBarTitleText: "文章列表" };
  components = {};
  data = {
    articleList: [],
    http: null,
    hideHeader: true,
    hideBottom: true,
    allPages: "", // 总页数
    currentPage: 1, // 当前页数  默认是1
    loadMoreData: "加载更多……",
    content: ""
  };
  async onLoad(options) {
    this.http = `${api.server}`;
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
    this.article_id = options.id;
    this.getArticleList(1);
  }
  //获取文章列表信息
  async getArticleList(pageIndex) {
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
      }
      console.log(resultArticle.rows);
      //下拉刷新
      if (pageIndex == 1) {
        //this.allPages = resultArticle.allPages;//to--do
        this.articleList = resultArticle.rows;
        this.hideHeader = true;
      } else {
        //加载更多
        console.log("加载更多");
        let tempArray = this.articleList;
        tempArray = tempArray.concat(resultArticle.rows);
        this.allPages = resultArticle.allPages; //to--do
        this.articleList = tempArray;
        this.hideBottom = true;
      }
      this.$apply();
    }
  }
  // 下拉刷新
  refresh(e) {
    let that = this;
    setTimeout(function() {
      console.log("下拉刷新");
      (that.currentPage = 1), (that.hideHeader = false);
      that.getData();
    }, 300);
  }
  getData() {
    let that = this;
    let pageIndex = that.currentPage;
    this.getArticleList(pageIndex);
  }
  // 上拉加载更多
  loadMore() {
    var that = this;
    // 当前页是最后一页
    if (that.currentPage == that.allPages) {
      that.loadMoreData = "已经到顶";
      return;
    }
    setTimeout(function() {
      console.log("上拉加载更多");
      let tempCurrentPage = that.currentPage;
      tempCurrentPage = tempCurrentPage + 1;
      (that.currentPage = tempCurrentPage), (that.hideBottom = false);
      that.getData();
    }, 300);
  }
  methods = {
    go2paragraph() {
      wx.navigateTo({ url: "/pages/article/paragraph" });
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
  margin-top: 24rpx;
}

.my_article {
  margin-bottom: 75rpx;
}
.weui-bottombar {
  width: 100%;
  height: 90rpx;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  border-top: solid 1px #e0e0e0;
}
.ico_bt_btn {
  line-height: 40rpx;
  font-size: 30rpx;
  padding: 0;
}
.ico_bt_btn text {
  display: block;
  color: #666;
  font-size: 24rpx;
}
.ico_bt_card {
  position: absolute;
  left: 100rpx;
  top: 37rpx;
}
.ico_bt_add {
  position: absolute;
  left: 330rpx;
}
.ico_bt_add .ico_bt_btn text {
  position: relative;
  top: -12rpx;
}
.ico_bt_my {
  position: absolute;
  right: 149rpx;
  top: 35rpx;
}

.ico_bt_card image {
  width: 36rpx;
  height: 30rpx;
}

.ico_bt_add image {
  width: 74rpx;
  height: 74rpx;
}
.ico_bt_my image {
  width: 28rpx;
  height: 32rpx;
}

.noline::before,
button::after {
  border: none;
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
button {
  background: none;
}
</style>
