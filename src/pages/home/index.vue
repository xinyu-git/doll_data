<template>
  <view class="page">
    <view class="page_container">
        <view class="weui-panel set-panel">
            <view class="weui-grids set-grids">
                <block wx:for="{{items}}" wx:for-item="item" wx:key="index">
                    <navigator url="{{item.url}}" hover-class="navigator-hover" class="weui-grid">
                        <view class="weui-grid__icon">
                            <view class="iconfont {{item.icon}}"></view>
                        </view>
                        <view class="set_label_box">
                            <text class="weui-grid__label">{{item.text}}</text>
                        </view>
                    </navigator>
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
                  text:'机器码表数据上传'
              },{
                  url:'/pages/stock/stockList',
                  icon:'icon-stock',
                  text:'库存管理'
              },{
                  url:'/pages/replenishment/index',
                  icon:'icon-dataUpload',
                  text:'娃娃机补货'
              },{
                  url:'/pages/dollEditor/index?stocktype=1',
                  icon:'icon-pickUpGoods',
                  text:'提货'
              },{
                  url:'/pages/dollEditor/index?stocktype=3',
                  icon:'icon-returnGoods',
                  text:'退货'
              }
          ] 
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            
        };
    }
</script>
<style >
  
</style>