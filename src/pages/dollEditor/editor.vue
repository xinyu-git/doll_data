<template>
<view class="page">
    <view class="page_container">
        <view class='page-head'>
            <view class="page-head_top">
                <view class="weui_search_bar" style="display:none;">
                    <input type="search" class="search-input" id="search" placeholder="请输入商品名" style="box-sizing:content-box" /><button class="weui_btn weui_btn_mini weui_btn_primary"><icon class="iconfont icon-search" /></button>    
                </view>
                <view class="title" style="display:none;">设置商品</view>
            </view>
        </view>
        <view class="page-body body-Margin">
            <scroll-view class='body-v' scroll-y >
                <view class="weui-cells dollList">
                    <block wx:for="{{dollList}}" wx:for-item="item" wx:key="item.id">
                        <view class="weui-cell">
                            <view class="weui-cell__hd"><image src="http://img.kongzhong.com/wot/20180817/221fa5a21c_1534487014.jpg" /></view>
                            <view class="weui-cell__bd">
                                <view><text>{{item.name}}</text></view>
                                <view>库存：<text>{{item.size}}</text></view>
                            </view>
                            <view class="weui-cell__ft">
                                <view class='stepper'>
                                    <text class='{{item.minusStatus}}' @tap='bindMinus' data-item-index="{{index}}">-</text>
                                    <input @input='bindManual' value='{{item.stocknums}}'  type="number" data-item-index="{{index}}"/>
                                    <text @tap='bindPlus' data-item-index="{{index}}">+</text>
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
        <view class="page-footer">
            <button type="primary" @tap="stockEditor"> 确定 </button>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class dollEditor extends wepy.page {
        config = {
            //navigationBarTitleText: "退货11",
            navigationBarBackgroundColor:'#f2f2f2'
        };
        //可用于页面模板绑定的数据
        data = {
            minusStatus:'disable',
            dollList:[],
            macheid:null,
            type:null,
            replenishArr:[],
            stocktype:null,
            resultMsg:null
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            //减号
            bindMinus(e){
                let that=this;
                let itemIndex=e.target.dataset.itemIndex;
                let dollItem=that.dollList[itemIndex];
                let num=dollItem.stocknums;
                if(num>1){
                    num--;
                }
                let minusStatus=num>1?'normal':'disable';
                dollItem.stocknums=num;
                dollItem.minusStatus=minusStatus;
            },
            //加号
            bindPlus(e){
                let that=this;
                let itemIndex=e.target.dataset.itemIndex;
                let dollItem=that.dollList[itemIndex];
                let num=dollItem.stocknums;
                num++;               
                var minusStatus = num > 1 ? 'normal' : 'disable';
                dollItem.stocknums=num;
                dollItem.minusStatus=minusStatus;
            },
            bindManual(e){
                let that=this;
                let itemIndex=e.target.dataset.itemIndex;
                let dollItem=that.dollList[itemIndex];
                let num=e.detail.value;
                let minusStatus=num>1?'normal':'disable';
                dollItem.stocknums=num;
                that.minusStatus=minusStatus;
            },
            async stockEditor(){
                let that=this; 
                let repArr=that.dollList;
                for(let i=0;i<repArr.length;i++){
                    if(repArr[i].stocknums!=0){
                        that.replenishArr.push({
                            stockid:repArr[i].id,
                            stockname:repArr[i].name,
                            stocktype:that.stocktype,
                            stocknums:repArr[i].stocknums,
                            marks:''
                        })
                    }
                }
                console.log(that.replenishArr);
                let repStr=JSON.stringify(that.replenishArr)
                //return false;
                if(that.replenishArr.length>0){
                    //return false;
                    let result = await this.$parent.globalData.post(
                        `${api.server1}/kucuns/updateBatchKuCun`,
                        {
                            data:JSON.stringify(that.replenishArr)
                        }
                    );
                    console.log(result)
                    if(result.code==0){
                        wx.navigateTo({ url: `editorResult?stocktype=${that.stocktype}&resultMsg=${result.msg}&replenishArr=${repStr}`});
                    }else{
                        wx.showModal({
                             confirmColor: "#7ec792",
                             title: "提示",
                             showCancel: false,
                             content: result.msg || "出错了，请重试"
                         });
                    }
                }else{
                    wx.showModal({
                        confirmColor: "#7ec792",
                        title: "提示",
                        showCancel: false,
                        content: "请选择要补货的娃娃"
                    });
                }
            },
        };
        async onShow(){
            this.getDollList();
            this.$apply();
        };
        //页面的生命周期函数
        async onLoad(option) {
            if(option.stocktype==1){
                wx.setNavigationBarTitle({
                    title: '提货'
                })
            }else if(option.stocktype==3){
                wx.setNavigationBarTitle({
                    title: '退货'
                })
            }
            this.macheid=this.$parent.globalData.macheid;
            this.type=this.$parent.globalData.type;
            this.stocktype=option.stocktype;
            
        };
        async getDollList(){
            let that=this;
            that.dollList=this.$parent.globalData.dollEditorArr;
            this.dataFilter(that.dollList)          
        };
        dataFilter(data){
            for(let i=0;i<data.length;i++){
                data[i].stocknums=0;
                data[i].minusStatus='disable';
            }
            return data;
        }
    }
</script>
<style lang="less">
.page-head{z-index: 10;}
.body-Margin{margin-bottom:120rpx;}
.dollList{font-size:26rpx;}
.dollList .weui-cell__hd image{width:100rpx;height:100rpx;margin-right: 15rpx;}
.title{padding:20rpx 10rpx;font-size:32rpx;}
</style>
