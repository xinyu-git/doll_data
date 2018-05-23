<template>
<view class="page">
    <view class="page__hd">
        <view class="page__title">接待列表</view>
    </view>
    <view class="page__bd">
        
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_access" wx:for="{{userlist}}" wx:key="id" bindtap="chat2person" data-url="{{item.id}}">
                <view class="weui-cell__bd">
                    <view style="display: inline-block; vertical-align: middle">{{item.fullname}}</view>
                    <view class="weui-badge" style="margin-left: 5px;">0</view>
                </view>
                <view class="weui-cell__ft weui-cell__ft_in-access"></view>
            </view>
            
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy'
    import config from '../../config/api'
    export default class Chat extends wepy.page {
        config = {"navigationBarTitleText": "咨询"}
        components= {
        }
        data = {
            userlist: [],
            canclick : true,
            showMainpage : false,
            socket : null
        }
        async onLoad(options) {
            let that = this;
            //clearInterval(checkmsg)
            //this.socket = this.$parent.globalData.socket
            this.$parent.globalData.EventBus.removeEventListener('userchage',this.onchatuserchange,this)
            this.$parent.globalData.EventBus.addEventListener('userchage',this.onchatuserchange,this)
            this.key = options.key || options.scene;
        }
        onchatuserchange(evt){
            //console.log('user changes')
            this.userlist = this.$parent.globalData.chatusers
            //console.log(this.userlist)
            this.$apply();
        }
        
        methods = {
            chat2person(e){
                let id = e.currentTarget.dataset.url
                console.log("go 2 chat");
                console.log(id)
                wx.navigateTo({url: `../crm/chat?id=${id}`})
            }
        }
    }
</script>
<style>
   
</style>