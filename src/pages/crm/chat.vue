<template>
<view class="page">
    
    <view class="page__bd page__bd_spacing">
        <view class="content" style="background-color:#ccc">
            <block wx:for="{{messages}}" wx:key="index" wx:for-index="index" wx:for-item="item">
                <view class="msgarea{{item.from === 'me' ? ' fromme' : ' other'}}">
                    <image class="icon" src="{{item.icon}}"></image>
                    <view class="msg">{{item.msg}}</view>
                    <view class="clearfix"></view>
                </view>
            </block>
        </view>
        <view class="weui-footer weui-footer_fixed-bottom" style="bottom:0;">
            
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入文本" style="text-align:left;" 
                    value="{{readyToSend}}" bindinput="bindInputTitle"
                    confirm-type="send" cursor-spacing="10" bindconfirm="send"/>
                </view>
                <button bindtap='sendmsg'>send</button>
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
            key: '',
            messages : [],
            readyToSend : '',
            
            showMainpage : false,
            uid : null
        }
        async onLoad(options) {
            //进入到页面的时候，对告诉服务器，要lock住这个key
            this.uid = options.id;
            console.log('this.uid is ', this.uid)
            console.log(this.$parent.globalData);
            
        }
        methods = {
            bindInputTitle(e){
                this.readyToSend = e.detail.value;
                this.$apply();
            },
            sendmsg(evt) {
                console.log(this.readyToSend);
                if (this.readyToSend) {
                    console.log(this.readyToSend);
                    this.$parent.globalData.socket1.emit('m:msg',{
                        to : this.uid, 
                        msg : this.readyToSend
                    })
                    this.readyToSend = '';
                    this.$apply();
                }
            },
        }
    }
</script>
<style>
   
</style>