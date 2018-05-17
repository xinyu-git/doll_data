<template>
<view class="page">
   <view class="page__hd">
        <view class="page__title">Button</view>
        
    </view>
    <view class="page__bd page__bd_spacing">
        <button class="weui-btn" type="primary" open-type="contact"
        send-message-title='销售代表任建斌'
        bindcontact='ongo2contact'
        >去客服</button>
        <button class="weui-btn" type="primary"></button>

        <button class="weui-btn" type="default">页面次要操作 Normal</button>
        <button class="weui-btn" type="default" >页面次要操作 Disabled</button>

        <button class="weui-btn" type="warn">警告类操作 Normal</button>
        <button class="weui-btn" type="warn" >警告类操作 Disabled</button>

       
    </view>
</view>
</template>
<script>
    import auth from '../base/auth'
    import api from '../../config/api'
    export default class Index extends auth {
        config = {
            "navigationBarTitleText": "咨询列表",
        }
        data = {
            hasbackgroundmusic : false,
            fileServer: `${api.fileServer}`,
        }

        components = {
           
        }

        methods ={
            courseimgerror(e){
                
            },
            go2music(e){
                let savedinfoid = wx.getStorageSync('sound:currentbgid');
                wx.navigateTo({url : `../course/info?id=${saveinfoid}`})
            }
        }

        events = {
            ongo2contact(e){

            }
        }
        
        async onLoad(options) {

           
        }
        

        async onPullDownRefresh(){
            this.$apply();
            wx.stopPullDownRefresh()
        }
    }
</script>
<style>
    .mybadge {
        position: absolute;  
        top:50px;
        right:-10px;
        height: 1.6em;
        min-width: 1.6em;
        line-height: 1.6;
        padding: 0 0.4em;
        font-size: 20px;
        /*border-radius: 0.8em;*/
        /*background: #ff4444;*/
        color: #fff;
        text-align: center;
        white-space: nowrap;
        /*
        transform: translateX(50%) scale(0.5);
        transform-origin: center;*/
        z-index: 10;
        /*box-shadow: 0 0 0 2px #fff;
        box-sizing: border-box;*/
    }
    .mybadge image{
        width:16px;
        height:16px;
    }
    .spin{
        
        background-color: #0CB1C4;
        animation-name: spin;
        animation-duration: 5000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
    }
    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
    .fixbottom{
        position:absolute; 
        bottom:10px;
        right:10px;
    }
    @import '../../zanui/badge.wxss';
    @import '../../zanui/icon.wxss';
    @import '../../zanui/panel.wxss';
    @import '../../zanui/card.wxss';
    @import '../../zanui/color.wxss';
    @import '../../zanui/tag.wxss';
</style>