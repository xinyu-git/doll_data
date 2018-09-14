<template>
<view class="page">
    <view class="page_container">
        <view class="page-body body-Margin">
            <scroll-view class='body-v' scroll-y >
                <view class="weui-panel weui-panel_access set-panel_access" >
                    <view class="weui-cell weui-cell_access" style="display:none;">
                        <view class="weui-cell__label">单号：</view>
                        <view class="weui-cell__label">XXXXX</view>
                    </view>
                    <view class="weui-panel__bd">
                        <view class="weui-cell weui-cell_access" style="display:none;">
                            <view class="weui-cell__label">时间：</view>
                            <view class="weui-cell__label">2018.01.10 10：00</view>
                        </view>
                        <view class="weui-cell weui-cell_access">
                            <view class="weui-cell__label">操作人：</view>
                            <view class="weui-cell__label">{{operator}}</view>
                        </view>
                        <view class="weui-cell weui-cell_access">
                            <view class="weui-cell__label">数量：</view>
                            <view class="weui-cell__label">{{totalNum}}</view>
                        </view>
                        <view class="weui-cell weui-cell_access">
                            <view class="weui-cell__label">商品详情</view>
                            <view class="weui-cell__label"></view>
                        </view>
                    </view>
                    <block wx:for="{{replenishArr}}" wx:for-item="item" wx:key="index">
                        <view class="weui-cell weui-cell_access" >
                            <view>{{item.stockname}}</view>
                            <view class="weui-cell__label">{{item.stocknums>0 ?item.stocknums:(-item.stocknums)}}</view>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
        <view class="page-footer">
            <button type="primary" bindtap="back"> 确定 </button>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class editorResult extends wepy.page {
        config = {
            //navigationBarTitleText: "提货成功",
            navigationBarBackgroundColor:'#f2f2f2',
        };
        //可用于页面模板绑定的数据
        data = {
            operator:null,
            replenishArr:[],
            totalNum:null,
            stocktype:null,
            resultMsg:null
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            async back () {
                wx.navigateTo({ url: `../home/index`});
            }
        };
        async onShow(){
            this.total();
            let userInfo=wx.getStorageSync("user:detail");
            this.operator=userInfo.nickname;
        };
        //页面的生命周期函数
        async onLoad(option) {
            this.resultMsg=option.resultMsg;
            if(option.stocktype==1){
                wx.setNavigationBarTitle({
                    title: '提货'+this.resultMsg
                })
            }else if(option.stocktype==3){
                wx.setNavigationBarTitle({
                    title: '退货'+this.resultMsg
                })
            }
            this.stocktype=option.stocktype;
            this.replenishArr=JSON.parse(option.replenishArr);
            //this.operator=this.$parent.globalData.operator;
        };
        async total(){
            let rep=this.replenishArr;
            for(let i=0;i<rep.length;i++){
                if(rep[i].stocknums<0){
                    this.totalNum+=(-rep[i].stocknums);
                }else{
                    this.totalNum+=(rep[i].stocknums);
                }
            }
        }
    }
</script>
<style lang="less">
.body-Margin{margin-top:0rpx;margin-bottom:120rpx;}
.dollList .weui-cell__hd image{width:100rpx;height:100rpx;margin-right: 15rpx;}
.set-panel_access .weui-cell{justify-content: space-between;}
.set-panel_access>.weui-panel__bd{background: #fbfbfb;}
</style>
