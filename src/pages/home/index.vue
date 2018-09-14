<template>
  <view class="page">
    <view class="page_container">
        <view class="weui-panel set-panel">
            <view class="weui-grids set-grids">
                <block wx:for="{{items}}" wx:for-item="item" wx:key="index">
                    <view  class="weui-grid" data-url="{{item.url}}" data-codetype="{{item.codeType}}" @tap="flickJump">
                        <view class="weui-grid__icon">
                            <view class="iconfont {{item.icon}}"></view>
                        </view>
                        <view class="set_label_box">
                            <text class="weui-grid__label">{{item.text}}</text>
                        </view>
                    </view>
                </block>
            </view>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        </view>
    </view>
  </view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    import auth from "../base/auth";
    export default class Index extends auth {
        config = {
            navigationBarTitleText: "娃娃"
        };
        async onShow(){
            let userInfo=wx.getStorageSync("user:detail");
            this.operator=userInfo.nickname;
        };
        //页面的生命周期函数
        async onLoad() {
            let result = await super.onLoad();
            if (!result) {
              return;
            }
        };
        //可用于页面模板绑定的数据
        data = {
          items:[
              {
                  url:'/pages/dataUpload/dataUpload',
                  icon:'icon-dataUpload',
                  text:'娃娃机抄码表',
                  codeType:1
              },{
                  url:'/pages/replenishment/index',
                  icon:'icon-replenishment',
                  text:'娃娃机补货',
                  codeType:1
              },{
                  url:'/pages/stock/stockList',
                  icon:'icon-stock',
                  text:'库存管理',
                  codeType:2
              },{
                  url:'/pages/dollEditor/index?stocktype=1',
                  icon:'icon-pickUpGoods',
                  text:'提货',
                  codeType:2
              },{
                  url:'/pages/dollEditor/index?stocktype=3',
                  icon:'icon-returnGoods',
                  text:'退货',
                  codeType:2
              }
          ],
          operator:null
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            flickJump(e){
                let that=this;
                //跳转链接
                let dataUrl=e.currentTarget.dataset.url;
                //二维码类型：娃娃机--1  库房--2
                let codeType=e.currentTarget.dataset.codetype;
                that.flick(dataUrl,codeType);
            }
        };
        resolveUrl(url){
            let obj = {};
            let reg = /[?&][^?&]+=[^?&%]+/g;
            let arr = url.match(reg);
            if(arr!=null){
                arr.forEach((item) => {
                    let tempArr = item.substring(1).split('=');
                    let key = decodeURIComponent(tempArr[0]);
                    let val = decodeURIComponent(tempArr[1]);
                    obj[key] = val;
                })
            }
            return obj;
        };
        flick(entryUrl,codeType) {
            wx.scanCode({
                onlyFromCamera:true,
                success:(res)=>{
                    let url=res.result;
                    let machineInfo=this.resolveUrl(url);
                    this.$parent.globalData.macheid=machineInfo.macheid;
                    this.$parent.globalData.machename=machineInfo.machename;
                    console.log(res)
                    if( (machineInfo.macheid && codeType==1) || (machineInfo.codetype=="warehouse" && codeType==2) ){
                        wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 2000,
                            success:function(){
                                wx.navigateTo({ url: entryUrl });
                            }
                        })
                    }else{
                        wx.showModal({
                            confirmColor: "#7ec792",
                            title: "提示",
                            showCancel: false,
                            content: "二维码不符"
                        });
                    }
                    
                },
                fail:(res)=>{
                    wx.showToast({
                        title: '失败',
                        icon: 'success',
                        duration: 2000
                    })
                }
            })
        }
    }
</script>
<style >
  
</style>