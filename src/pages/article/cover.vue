<template>
<view class="page">
    <view><image src="{{src}}" mode="widthFix"></image></view>
    <text bindtap="updateImg">更新</text>
    <text bindtap="deleImg">删除</text>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = {
    navigationBarTitleText: "编辑图片"
  };

  data = {
    list:[],
    itemId:null,
    src:null,
    content:"",
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    //this.key = options.key || options.scene;
    this.list = this.$parent.globalData.list;
    this.itemId = options.itemId;
    for (let i in this.list) {
          if(this.itemId===i){
            this.src = this.list[i].media;
            this.content = this.list[i].content;
          }
      }
  }
  methods = {
    deleImg(){
      let allList = [];
      if(this.content){
        for (let i in this.list) {
          if(this.itemId===i){
            this.list[i].media = "";
            this.list[i].status =2
          }
          allList.push(this.list[i]);
        }
      }
      else{
        for (let i in this.list) {
          if(this.itemId!=i){
            allList.push(this.list[i]);
          }
        }
      }
      console.log(allList)
      this.$parent.globalData.list = allList;
      wx.navigateBack()
    },
    updateImg(){
      let that = this;
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          let allList = [];
          for (let i in that.list) {
            if(that.itemId===i){
              that.list[i].media = res.tempFilePaths[0];
              that.list[i].status =1
            }
            allList.push(that.list[i]);
          }
          that.$parent.globalData.list = allList;
          wx.navigateBack()
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
}
</script>
<style>
page {
  background: #f1f2f6;
}
page image{
  width: 100%;
}
.addImg_btn {
  width: 180rpx;
  height: 180rpx;
  display: block;
  background: #57a7fe;
  margin: 10rpx;
  color: #fff;
  text-align: center;
  line-height: 180rpx;
  font-size: 26rpx;
  float: left;
}
.addImg_box image {
  width: 180rpx;
  height: 180rpx;
  float: left;
  display: block;
  margin: 10rpx 10rpx 10rpx 0;
}
</style>
