<template>
<view class="page">
  <view class="weui-cell_bd weui-cell_primary">
    <form bindsubmit="formSubmit" >
      <textarea id="textarea" maxlength="5000" bindinput="watchTextarea" value="{{editContent}}" class="weui-textarea my-textarea" placeholder="请输入文本" placeholder-class='placeholdercolor' auto-focus></textarea>
      <view class="weui-textarea-counter my-counter">
          <text id="count">{{sNumber}}</text>/
          <text id="count_max">{{max}}</text>
      </view>
    </form>
  </view>
  <view class="commitBtn" bindtap="btn_success">完成</view>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = { navigationBarTitleText: "编辑文字" };
  components = {};
  data = {
    sNumber: 0,
    max: 5000,
    texts: null,
    list: [],
    itemId: null,
    editId: null,
    editContent: ""
  };
  async onLoad(options) {
    //console.log(options);
    this.list = this.$parent.globalData.list;
    this.itemId = options.itemId;
    this.editId = options.editId;
    if (this.editId) {
      for (let i in this.list) {
        if (this.editId === i) {
          this.editContent = this.list[i].content;
        }
      }
      //console.log(this.editContent);
    }
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  async arraySort(media, content) {
    let that = this;
    let allList = [];
    let myKey = that.itemId;
    if (myKey == 0) {
      let obj = { content: content, media: media, status: 2 };
      allList.push(obj);
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
          let obj = { content: content, media: media, status: 2 };
          allList.push(obj);
        }
      }
      this.$apply();
    }
    that.list = that.$parent.globalData.list = allList;
    that.$apply();
  }
  watchTextarea(event) {
    this.sNumber = event.detail.value.length;
    //this.max = 5000 - event.detail.value.length;
    this.texts = event.detail.value;
    //console.log(this.texts);
  }
  methods = {
    btn_success() {
      if (this.editId) {
        let allList = [];
        for (let i in this.list) {
          if (this.editId === i) {
            this.list[i].content = this.texts;
          }
          allList.push(this.list[i]);
        }
        this.$parent.globalData.list = allList;
      } else {
        console.log(this.texts);
        this.arraySort("", this.texts);
        this.$parent.globalData.list = this.list;
      }
      wx.navigateBack();
    }
  };
}
</script>
<style>
page {
  background: #f1f2f6;
}
.my-textarea {
  background: #fff;
  margin-top: 1rpx;
  width: 690rpx;
  padding: 30rpx;
}
.placeholdercolor {
  color: #ccc;
  font-size: 28rpx;
}
.commitBtn {
  color: #57a7fe;
  position: relative;
  top: -45rpx;
  left: 30rpx;
}
.my-counter {
  margin-right: 20rpx;
  margin-top: 5rpx;
}
</style>
