<template>
<view class="page">
    <view class="page_container">
        <view class='page-head'>
            <view class="page-head_top">
                <view class="weui_search_bar" style="display:none;">
                    <input type="search" class="search-input" id="search" placeholder="请输入商品名" style="box-sizing:content-box" /><button class="weui_btn weui_btn_mini weui_btn_primary"><icon class="iconfont icon-search" /></button>    
                </view>
            </view>
        </view>
        <view class="page-body body-Margin">
            <scroll-view class='body-v' scroll-y >
                <view class="weui-cells dollList">
                    <block wx:for="{{dollListAll}}" wx:for-item="item" wx:key="item.id">
                        <view class="weui-cell" >
                            <view class="weui-cell__hd"><image src="http://img.kongzhong.com/wot/20180817/221fa5a21c_1534487014.jpg" /></view>
                            <view class="weui-cell__bd">
                                <view><text>{{item.name}}</text></view>
                                <view>库存：<text>{{item.size}}{{item.unit}}</text></view>
                            </view>
                            <view class="weui-cell__ft">
                                <checkbox data-id="{{item.id}}" data-index="{{index}}" checked="{{item.checked}}" @tap="toggleSel" />
                            </view>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
        <view class="page-footer">
            <button type="primary" @tap="addDoll"> 确定 </button>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class dollList extends wepy.page {
        config = {
             navigationBarBackgroundColor:'#f2f2f2'
        };
        //可用于页面模板绑定的数据
        data = {
            dollListAll:[],
            dollEditorArr:[],
            existDollId:[],
            stocktype:null
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            async addDoll () {
                //赋值  
                let that=this;
                let dataList=that.dollListAll;//将所有娃娃列表赋值给dataList
                that.dollEditorArr=[];
                let selArr=that.dollEditorArr;//用于存储选中的娃娃赋值给selArr
                this.$parent.globalData.dollEditorArr=this.dollEditorArr;  //
                for(let i=0;i<dataList.length;i++){
                    if(dataList[i].checked){
                        selArr.push(dataList[i]);
                    }
                }
                that.dollEditorArr=selArr;
                wx.navigateTo({ url: `editor?stocktype=${that.stocktype}`});
            },
            toggleSel(e){
                let that=this;         
                let dataList=that.dollListAll;
                let itemIndex=e.target.dataset.index;
                let dollItem=dataList[itemIndex];
                let checked=dollItem.checked;
                dollItem.checked=!checked;
                dataList[itemIndex]=dollItem;
                that.dollListAll=dataList;
                this.$apply();
            }
        };
        async onShow(){
            let that=this;
            //that.dollListAll=[];
            //that.$parent.globalData.dollEditorArr=[];
            //console.log(this.$parent.globalData.dollEditorArr);
        };
        //页面的生命周期函数
        async onLoad(option) {
            if(option.stocktype==1){
                wx.setNavigationBarTitle({
                    title: '请选择提货娃娃'
                })
            }else if(option.stocktype==3){
                wx.setNavigationBarTitle({
                    title: '请选择退货娃娃'
                })
            }
            this.dollEditorArr=this.$parent.globalData.dollEditorArr;
            this.stocktype=option.stocktype;
            this.getDollListAll();
        };
        async getDollListAll(){
            let that=this;
            let result = await this.$parent.globalData.get(`${api.server1}/kucuns/getCatLog`)
            if(result.code==0){
                that.dollListAll=JSON.parse(result.data);
            }
            this.dataFilter(that.dollListAll);   
            console.log(that.dollListAll);  
        };
        dataFilter(data){
            if(data.length>0){
                for(let t=0;t<data.length;t++){
                    data[t].checked=false;
                }
            }           
            return data;
        };
    }
</script>
<style lang="less">
.body-Margin{margin-bottom:120rpx;}
.dollList{font-size:26rpx;}
.dollList .weui-cell__hd image{width:100rpx;height:100rpx;margin-right: 15rpx;}
</style>
