<template>
<view class="page">
 <view class="weui-cells__title my__title">
    <image class="cover" src="{{cover}}"></image>
    <view class="my__set">
      <view bindtap="setTitle">
        <view class="setTitle">{{title}}</view>
        <view class="setTitle" style="display:{{title?'none':'block'}}">{{titleTip}}</view>
      </view>
      <view class="setMusic">添加音乐</view>
      <view class="setCover" bindtap="setCover">更换封面</view>
    </view>
 </view>
 <view class="addBtn" bindtap="addList" id="0">
   <image src="../../images/icon_add.png"></image>
   <view class="creatBtn {{uhide=='0'?'':'hidden'}}">
        <view class="textBtn" bindtap="go2edit" data-index="0">
          <image src="../../images/ico-text.png"></image>
          <text>文字</text>
        </view>
        <view class="pictureBtn" bindtap="uploadImg">
            <image src="../../images/ico-img.png"></image>
            <text>图片</text>
        </view>
        <view class="videoBtn" bindtap="uploadVideo">
            <image src="../../images/ico-video.png"></image>
            <text>视频</text>
        </view>
    </view>
 </view>
 <view class="addTextList"  wx:for="{{list}}" wx:key>
    <view class="addTextBox">
        <view class="closeBtn" bindtap="deleList" id="{{index}}"><image src="../../images/icon_close.png"></image></view>
        <view class="addImg" bindtap="editImg" data-index="{{index}}" data-status="{{item.status}}"><image src="{{item.media==''?src:item.media}}"></image></view>
        <view class="addText" bindtap="editContent" data-index="{{index}}">
            <text>{{item.content}}</text>
            <text style="display:{{item.content?'none':'block'}}">{{tips}}</text>
        </view>
    </view>
    <view class="addBtn" bindtap="addList" id="{{index+1}}">
      <image src="../../images/icon_add.png"></image>
      <view class="creatBtn {{uhide==index+1?'':'hidden'}}" >
        <view class="textBtn" bindtap="go2edit" data-index="{{index+1}}">
          <image src="../../images/ico-text.png"></image>
          <text>文字</text>
        </view>
        <view class="pictureBtn" bindtap="uploadImg" id="{{index+1}}">
            <image src="../../images/ico-img.png"></image>
            <text>图片</text>
        </view>
        <view class="videoBtn" bindtap="uploadVideo" id="{{index+1}}">
            <image src="../../images/ico-video.png"></image>
            <text>视频</text>
        </view>
    </view>
    </view>
 </view>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = { navigationBarTitleText: "添加段落" };
  components = {};
  data = {
    src: "../../images/article_img2.jpg",
    createToggle: false,
    uhide: 123456,
    list: [],
    itemId: null,
    tips: "",
    cover: "",
    title: "",
    titleTip: "点击设置标题"
  };
  async onLoad(options) {}
  async onShow() {
    this.list = this.$parent.globalData.list;
    console.log(this.$parent.globalData.list);
    console.log(this.title);
    this.$apply();
  }
  async arraySort(media, content, status) {
    let that = this;
    let allList = [];
    let myKey = that.itemId;
    if (myKey == 0) {
      for (let i in media) {
        let obj = { content: content, media: media[i], status: status };
        allList.push(obj);
      }
      if (that.list.length > 0) {
        for (let i in that.list) {
          allList.push(that.list[i]);
        }
      }
    } else {
      for (let i in that.list) {
        allList.push(that.list[i]);
        let m = Number(i) + 1;
        if (myKey == m) {
          for (let i in media) {
            let obj = { content: content, media: media[i], status: status };
            allList.push(obj);
          }
        }
      }
    }
    that.tips = "点击添加文字";
    that.list = that.$parent.globalData.list = allList;
    that.$apply();
  }
  methods = {
    deleList(e) {
      let deleId = e.currentTarget.id;
      let allList = [];
      for (let i in this.list) {
        if (deleId != i) {
          allList.push(this.list[i]);
        }
      }
      this.list = this.$parent.globalData.list = allList;
      this.$apply();
    },
    addList(e) {
      let that = this;
      let toggleBtnVal = that.uhide;
      that.itemId = e.currentTarget.id;
      if (toggleBtnVal == that.itemId) {
        that.uhide = 123456;
      } else {
        that.uhide = that.itemId;
      }
    },
    uploadImg(e) {
      let that = this;
      console.log(this.list);
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          that.arraySort(res.tempFilePaths, "", 1);
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    },
    uploadVideo() {
      let that = this;
      wx.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: "back",
        success: function(res) {
          that.arraySort(res.tempFilePath, "", 0);
          //wx.navigateTo({ url: "/pages/article/paragraph?src="+res.tempFilePath });
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    },
    go2edit(e) {
      wx.navigateTo({
        url: "/pages/article/edit?itemId=" + e.currentTarget.dataset.index
      });
    },
    editContent(e) {
      wx.navigateTo({
        url: "/pages/article/edit?editId=" + e.currentTarget.dataset.index
      });
    },
    editImg(e) {
      console.log(e.currentTarget.dataset.status);
      let status = e.currentTarget.dataset.status;
      let itemId = e.currentTarget.dataset.index;
      if (status === 1) {
        wx.navigateTo({ url: "/pages/article/cover?itemId=" + itemId });
      } else if (status === 2) {
        let that = this;
        wx.chooseImage({
          count: 1, // 最多可以选择的图片张数，默认9
          sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res) {
            let allList = [];
            for (let i in that.list) {
              console.log(i);
              if (itemId == i) {
                that.list[i].media = res.tempFilePaths[0];
                that.list[i].status = 1;
              }
              allList.push(that.list[i]);
            }
            that.$parent.globalData.list = allList;
            wx.navigateBack();
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        });
      }
    },
    setCover() {
      let that = this;
      console.log(this.list);
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          that.cover = res.tempFilePaths[0];
          that.$apply();
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
      console.log(this.cover);
    },
    setTitle() {
      wx.navigateTo({ url: "/pages/article/altertitle?title=" + this.title });
    }
  };
}
</script>
<style>
page {
  background: #f1f2f6;
}
.hidden {
  display: none;
}
.creatBtn {
  width: 246rpx;
  height: 90rpx;
  background: #fff;
  border-radius: 25rpx;
  box-shadow: 6rpx 6rpx 20rpx #ccc;
  position: absolute;
  left: 50%;
  margin-left: -123rpx;
  top: 60rpx;
  z-index: 888;
}
.addBtn .textBtn image,
.addBtn .pictureBtn image,
.addBtn .videoBtn image {
  width: 42rpx;
  height: 42rpx;
  display: block;
  position: absolute;
  left: 30rpx;
  top: 2rpx;
}
.addBtn .pictureBtn image {
  left: 102rpx;
}
.addBtn .videoBtn image {
  left: 174rpx;
}
.my__title {
  height: 280rpx;
  background: #d9d9d9;
  margin-top: 0;
  position: relative;
  font-size: 32rpx;
  color: #303030;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.cover {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.setTitle {
  font-size: 36rpx;
  color: #fff;
  text-shadow: 0px 0px 10px #676262;
  font-weight: bold;
  padding-top: 15rpx;
}
.setMusic,
.setCover {
  width: 178rpx;
  height: 52rpx;
  background: #fff;
  text-align: center;
  line-height: 52rpx;
  border-radius: 20rpx;
  position: absolute;
  left: 40rpx;
  bottom: 20rpx;
}
.setCover {
  position: absolute;
  left: 535rpx;
}
.my__set {
  position: absolute;
  height: 280rpx;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
.addTextBox {
  width: 95%;
  height: 220rpx;
  background: #fff;
  border: solid 1px #e0e1e6;
  border-radius: 20rpx;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.addImg image {
  width: 160rpx;
  height: 160rpx;
  display: block;
  margin: 30rpx 20rpx 30rpx 40rpx;
  float: left;
}
.addText {
  font-size: 32rpx;
  padding: 30rpx 30rpx 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 160rpx;
}
.closeBtn image {
  width: 28rpx;
  height: 28rpx;
  display: block;
  position: absolute;
  top: 10rpx;
  left: 10rpx;
}
.addBtn {
  position: relative;
  width: 60rpx;
  height: 60rpx;
  margin: 5rpx auto;
}
.addBtn image {
  width: 60rpx;
  height: 60rpx;
  display: block;
  margin: 10rpx auto;
}
.creatBtn .textBtn text,
.creatBtn .pictureBtn text,
.creatBtn .videoBtn text {
  display: block;
  font-size: 24rpx;
  float: left;
  width: 50rpx;
  margin-top: 55rpx;
  margin-left: 30rpx;
}
.creatBtn .pictureBtn text {
  margin-left: 22rpx;
}
.creatBtn .videoBtn text {
  margin-left: 21rpx;
}
</style>
