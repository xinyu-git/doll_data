<template>
<view class="page">
    <view class="page_container">
        <view class='page-head'>
            <view class="page-head_top">
                <view class="weui-cell set-weui-cell">
                    <view class="weui-cell__bd">
                        <view><text> {{stockname}} </text></view>
                        <view>库存：<text>{{size}}</text></view>
                    </view>
                    <view class="weui-cell__ft">
                        <button type="primary" class="btn-stock" @tap="stock"> 盘点 </button>
                    </view>
                </view>
            </view>
        </view>
        <view class="page-body body-Margin">
            <scroll-view class='body-v' scroll-y >
                <block wx:for="{{dollRecord}}" wx:for-item="item" wx:key="item.id">
                    <view class="weui-panel weui-panel_access set-panel_access" >
                        <view class="weui-cell weui-cell_access">
                            <view class="weui-cell__label"> {{(item.stock_type)}} </view>
                            <view class="weui-cell__label">{{item.create_time}}</view>
                        </view>
                        <view class="weui-panel__bd">
                            <view class="weui-cell weui-cell_access">
                                <view class="weui-cell__label">{{item.marks}}</view>
                                <view class="weui-cell__label">{{item.stockMarksStr}} : {{item.stock_nums}}</view>
                            </view>
                        </view>
                        <view class="weui-cell weui-cell_access">
                            <view>操作人：{{operator}}</view>
                            <view class="weui-cell__label"></view>
                        </view>
                    </view>
                </block>
            </scroll-view>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class stockDetails extends wepy.page {
        config = {
            navigationBarTitleText: "库房库存",
            navigationBarBackgroundColor:'#f2f2f2',
        };
        //可用于页面模板绑定的数据
        data = {
            dollRecord:[],
            stockname:null,
            stockid:null,
            size:0,
            type:'querysignle',
            operator:null
        };
        async onShow(){
            this.getDollRecord();
            this.$apply();
        }
        //页面的生命周期函数
        async onLoad(options) {
            this.stockid=options.stockid;
            this.stockname=options.stockname;
            this.size=options.size;
            this.operator=this.$parent.globalData.operator;
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            async stock(){
                wx.navigateTo({ url: `../stock/stockEditor?stockid=${this.stockid}&stockname=${this.stockname}&size=${this.size}&stocktype=2` });
            }
        };
        async getDollRecord(){
            let that=this;
            let result = await this.$parent.globalData.get(`${api.server1}/kucuns/queryKuCun?stock_id=${that.stockid}`)
            if(result.code==0){
                that.dollRecord=JSON.parse(result.data);
            }
            this.dataFilter(that.dollRecord)
            console.log(that.dollRecord)
        };
        dataFilter(data){
            for(let i=0;i<data.length;i++){
                if(data[i].stock_type==0){
                    data[i].stock_type='补货';
                    data[i].stockMarksStr='进';
                }else if(data[i].stock_type==1){
                    data[i].stock_type='提货';
                    data[i].stockMarksStr='出';
                }else if(data[i].stock_type==2){
                    data[i].stock_type='盘货';
                    data[i].stockMarksStr='盈亏';
                }else if(data[i].stock_type==3){
                    data[i].stock_type='退货';
                    data[i].stockMarksStr='进';
                }
            }
            return data;
        }
    }
</script>
<style lang="less">
.body-Margin{margin-top:160rpx;}
.dollList .weui-cell__hd image{width:100rpx;height:100rpx;margin-right: 15rpx;}
.set-panel_access .weui-cell{justify-content: space-between;}
</style>
