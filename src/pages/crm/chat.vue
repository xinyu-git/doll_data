<template>
<view class="page">
    
    <view class="page__bd page__bd_spacing">
        <view class="content" style="background-color:#ccc">
            <block wx:for="{{messages}}" wx:key="index" wx:for-index="index" wx:for-item="item">
                <view>
                    <view class="msg" wx:if="{{item.from=='me'}}" style="text-align:right">{{item.content}}</view>
                    <view class="msg" wx:else>{{item.content}}</view>
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
            this.$parent.globalData.EventBus.removeEventListener('m:msg',this.onmsgchange,this)
            this.$parent.globalData.EventBus.addEventListener('m:msg',this.onmsgchange,this)
            this.uid = options.id;
            //console.log('this.uid is ', this.uid)
            //console.log(this.$parent.globalData);
            this.onmsgchange();
        }
        onmsgchange(evt){
            this.messages = this.$parent.globalData.chatmsg.filter((item)=>{
                return item.from == this.uid || item.to == this.uid
            })
            console.log(this.messages)
            this.$apply();
        }
        methods = {
            bindInputTitle(e){
                this.readyToSend = e.detail.value;
                this.$apply();
            },
            sendmsg(evt) {

                //{from: 19904, to: "19901", content: "我", msgTime: "2018-05-23 08:55:07", type: "text"}
                if (this.readyToSend) {
                    
                    this.$parent.globalData.socket1.emit('m:msg',{
                        to : this.uid, 
                        msg : this.readyToSend
                        
                    })
                    this.$parent.globalData.chatmsg.push({
                        from: "me",
                        to : this.uid,
                        content:this.readyToSend,
                        type: "text"
                    })
                    this.readyToSend = '';
                    this.onmsgchange();
                    this.$apply();
                }
            },
        }
    }
</script>
<style>
   
</style>