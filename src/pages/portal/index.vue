<template>
<view class="page">
    <view>
        <image src="../../images/music1.png" class="spin fixbottom" style='width:32px;height:32px;z-index:99;' wx:if="{{hasbackgroundmusic}}"
        bindtap='go2music'/>
    </view>

    <view class="padding-bottom-bar">
        <view  wx:if="{{false}}">
            <input placeholder="搜索" bindconfirm='search' placeholder-style="color:grey;" confirm-type='搜索' 
            style="font-size:12px;border:1px solid #c0d0c0;padding:0 15px;border-left:none;border-right:none;"/>
        </view>
        <!-- 首页 tab 启用后 top 应改为45px -->
        <view >
            <view class="zan-panel zan-panel--without-border">
                test
            </view>
        
        </view>
    </view>
</view>
</template>
<script>
    import auth from '../base/auth'
    import api from '../../config/api'
    import zanTab from '@/components/zan-tab'

    export default class Index extends auth {
        data = {
            hasbackgroundmusic : false,
            fileServer: `${api.fileServer}`,
            bannercourses: [],
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 1000,
            list:[],
            pageSize:8,
            currentPage:0,
            currentTabIndex:0,
            winHeight:0
        }

        components = {
           
        }

        methods ={
            forward(e){
                let id = e.currentTarget.dataset.url
                console.log('go to page ', id )
                if(!!id){
                    //console.log(decodeURIComponent(e.currentTarget.dataset.url))
                    wx.navigateTo({url: `../course/info?id=${id}`})
                }else{
                    console.error("没有配置可以跳转的 wenviewUrl")
                }
            },
            courseimgerror(e){
                
            },
            go2music(e){
                let savedinfoid = wx.getStorageSync('sound:currentbgid');
                wx.navigateTo({url : `../course/info?id=${saveinfoid}`})
            }
        }

        events = {
            
            
        }
        
        async onLoad(options) {

            let that = this;
            let res = wx.getSystemInfoSync()
            this.winHeight = res.windowHeight; // 首页增加 tab 这里要多减掉 45px
            let sup_result = await super.onLoad();
            if (! sup_result) return
            await that.$parent.bindUser(options.uid);
            this.checkbackgroundsound();
            that.$apply();
        }
        checkbackgroundsound(){
            const backgroundAudioManager = wx.getBackgroundAudioManager()
            console.log(backgroundAudioManager)
            this.hasbackgroundmusic = (backgroundAudioManager.paused == false) //当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
            console.log(this.hasbackgroundmusic)
        }

        // async onReachBottom(){
        async scrolltolower(){
            //do something
            this.$apply();
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