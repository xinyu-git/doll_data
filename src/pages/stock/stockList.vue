<template>
<view class="page">
    <view class="page_container">
        <view class="page-body body-Margin">
            <scroll-view class='body-v' scroll-y >
                <view class="weui-cells dollList">
                    <block wx:for="{{dollListAll}}" wx:for-item="item" wx:key="index">
                        <view class="weui-cell_item"  @tap="stockDetails" data-stockid="{{item.baby_stock_id}}" data-stockname="{{item.name}}" data-size="{{item.size}}">
                            <view class="weui-cell">
                                <view class="weui-cell__hd"><image src="http://img.kongzhong.com/wot/20180817/221fa5a21c_1534487014.jpg" /></view>
                                <view class="weui-cell__bd">
                                    <view><text>{{item.name}}</text></view>
                                    <view style="display:none;">分类：<text>T</text></view>
                                </view>
                                <view class="weui-cell__ft">
                                    库存：<text>{{item.size}}{{item.unit}}</text>
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class stockList extends wepy.page {
        config = {
            navigationBarTitleText: "库房库存",
            navigationBarBackgroundColor:'#f2f2f2',
        };
        //可用于页面模板绑定的数据
        data = {
            dollListAll:[],
            macheid:null,
            type:null
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            stockDetails(e){
                let stockid=e.currentTarget.dataset.stockid;
                let stockname=e.currentTarget.dataset.stockname;
                let size=e.currentTarget.dataset.size;
                wx.navigateTo({ url: `../stock/stockDetails?stockid=${stockid}&stockname=${stockname}&size=${size}` });
            }
        };
        onShow(){
            this.getDollListAll();
        };
        //页面的生命周期函数
        async onLoad() {         
            this.macheid=this.$parent.globalData.macheid;
            this.type=this.$parent.globalData.type;
        };
        async getDollListAll(){
            let that=this;
            let result = await this.$parent.globalData.get(`${api.server1}/kucuns/getCatLog`);
            if(result.code==0){
                that.dollListAll=JSON.parse(result.data);              
            }
            this.$apply();      
        };
        
    }
</script>
<style lang="less">
.body-Margin{top:0rpx;}
.dollList .weui-cell__hd image{width:100rpx;height:100rpx;margin-right: 15rpx;}
.weui-cell_item{position: relative;font-size:30rpx;}
.weui-cell_item:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
}
</style>
