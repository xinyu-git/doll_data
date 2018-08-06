<template>
<view class="page">
  <view class="createBox">
      <text>开始创作</text>
      <text>支持图文视频~</text>
      <view class="addBtn">
          <i-icon type="add" size="24" color="#f9fafc" />
          </view>
      <view class="creatBtn">
      <view class="textBtn" bindtap="go2edit">
         <i-icon type="createtask" size="24" color="#41a3ff" />
         <text>文字</text>
      </view>
      <view class="pictureBtn" bindtap="uploadImg">
        <i-icon type="picture" size="24" color="#41a3ff" />
        <text>图片</text>
      </view>
      <view class="videoBtn" bindtap="uploadVideo">
        <i-icon type="playon" size="24" color="#41a3ff" />
        <text>视频</text>
      </view>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = {
    navigationBarTitleText: "文章创建",
    usingComponents: {
      "i-icon": "../../icon/index"
    }
  };
  components = {};
  data = {
    src: null
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  methods = {
    uploadImg() {
      let that = this;
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          wx.navigateTo({
            url: "/pages/article/paragraph?src=" + res.tempFilePaths
          });
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
          wx.navigateTo({
            url: "/pages/article/paragraph?src=" + res.tempFilePath
          });
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    }
  };
  go2edit() {
    wx.navigateTo({ url: "/pages/article/edit" });
  }
}
</script>
<style>
page {
  background: #f1f2f6;
}
.createBox {
  padding-top: 50rpx;
}
.createBox text {
  display: block;
  color: #363636;
  font-size: 36rpx;
  text-align: center;
  line-height: 50rpx;
}
.createBox text:nth-child(2) {
  font-size: 26rpx;
}
.creatBtn {
  width: 40%;
  margin: 0 auto;
  height: 90rpx;
  background: #fff;
  border-radius: 25rpx;
  box-shadow: 6rpx 6rpx 20rpx #ccc;
  padding-left: 5rpx;
}
.textBtn,
.pictureBtn,
.videoBtn {
  display: inline-block;
  width: 33%;
  text-align: center;
}

.addBtn {
  margin-top: 80rpx;
}
.addBtn {
  width: 60rpx;
  height: 60rpx;
  display: block;
  margin: 10rpx auto;
  background: #dfe0e5;
  text-align: center;
  border-radius: 50%;
}
.creatBtn text {
  line-height: 0;
  margin-top: 15rpx;
  font-size: 26rpx;
}
</style>
