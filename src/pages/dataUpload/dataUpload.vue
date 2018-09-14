<template>
<view class="page">
    <view class="page_container">
        <view class='page-head'>
            <view class="dollName_box">
                <view class="doll_name">机器：<text>{{machename}}</text></view>
            </view>
            <view class="page-cell">
                <view class="page-cell__bd">名称</view>
                <view class="page-cell__ft" style="display:none;">数量</view>
            </view>
        </view>
        <view class="page-body body-Margin">
            <scroll-view class='body-v' scroll-y >
                <view class="dollList">
                    <block  wx:for="{{dollList}}" wx:for-item="item" wx:key="item.id">
                        <view class="weui-cell doll-item">
                            <view class="weui-cell__bd">{{item.name}}</view>
                            <view class="weui-cell__ft" style="display:none;"><input type="number" value="{{item.size}}"/></view>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
        <view class="page-footer">
            <button type="primary" @tap="next"> 下一步 </button>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class dataUpload extends wepy.page {
        config = {
            navigationBarTitleText: "娃娃机抄码表",
            navigationBarBackgroundColor:'#f2f2f2'
        };
        //可用于页面模板绑定的数据
        data = {
            dollList:[],
            macheid:null,
            type:null,
            machename:null,
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            next () {
                wx.navigateTo({ url: `/pages/dataUpload/dollPhoto` });
                //wx.redirectTo({ url: `dollPhoto` });
            }
        };
        onShow(){
            this.getDollList();
        };
        //页面的生命周期函数
        onLoad() {
            this.macheid=this.$parent.globalData.macheid;
            this.type=this.$parent.globalData.type;
            this.machename=this.$parent.globalData.machename;
            
        };
        async getDollList(){
            let that=this;
            let result = await this.$parent.globalData.get(`${api.server1}/inventorys/queryInventory?macheid=${that.macheid}&type=${that.type}`)
            if(result.code==0){
                that.dollList=JSON.parse(result.data);
            }
            this.$apply();
            console.log(that.dollList)
            if(that.dollList.length==0){
                wx.showModal({
                    confirmColor: "#7ec792",
                    title: "提示",
                    content:  "暂无娃娃，请先去补货",
                    showCancel: false,
                    success: function(res) {
                        if (res.confirm) {
                            wx.navigateTo({ url: '../replenishment/index' });
                        }
                    }
                });
            }
        };
    }
</script>
<style lang="less">
    .body-Margin{margin-top:220rpx;margin-bottom:120rpx;}
    .doll-item .weui-cell__ft{color:#000;text-align:left;}
    .doll-item .weui-cell__ft input{border:1px solid #000;width:100rpx;padding:10rpx 10rpx;}
</style>
