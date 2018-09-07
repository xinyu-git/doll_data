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
            navigationBarTitleText: "娃娃机补货",
             navigationBarBackgroundColor:'#f2f2f2'
        };
        //可用于页面模板绑定的数据
        data = {
            macheid:null,
            machename:null,
            dollListAll:[],
            selectDollList:[],
            existDollId:[]
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            async addDoll () {
                let that=this;
                console.log(that.selectDollList);   
                //return false;
                let result = await this.$parent.globalData.post(
                    `${api.server1}/inventorys/addInventory`,
                    {
                        data:JSON.stringify(that.selectDollList)
                    }
                );
                console.log(result)
                if(result.code==0){
                    wx.navigateTo({ url: `index`});
                }
            },
            toggleSel(e){
                let that=this;
                let selArr=that.selectDollList;            
                let dataList=that.dollListAll;
                let itemIndex=e.target.dataset.index || e.currentTarget.dataset.index
                let dollItem=dataList[itemIndex]
                let checked=dataList[itemIndex].checked;
                checked=!checked
                dataList[itemIndex].checked=checked;
                if (checked) {
                    selArr.push({
                        stockid:dollItem.id,
                        stockname:dollItem.name,
                        macheid:that.macheid
                    });
                } else {
                    selArr.splice(itemIndex, 1)
                }
                that.selectDollList=selArr;
                that.dollListAll=dataList;
                this.$apply();
            }
        };
        async onShow(){
            this.getDollListAll();
            this.$apply();
        };
        //页面的生命周期函数
        async onLoad(options) {
            let that=this;
            let existDollIdTemp=options.id;
            that.idCutt(existDollIdTemp);
            console.log(options)
            this.macheid=this.$parent.globalData.macheid;
            this.machename=this.$parent.globalData.machename;
            
        };
        async getDollListAll(){
            let that=this;
            let result = await this.$parent.globalData.get(`${api.server1}/kucuns/getCatLog`)
            if(result.code==0){
                that.dollListAll=JSON.parse(result.data);
            }
            this.dataFilter(that.dollListAll);          
            console.log(this.dollListAll)
        };
        dataFilter(data){
            if(data.length>0){
                for(let t=0;t<data.length;t++){
                    data[t].checked=false;
                }
                console.log(this.existDollId)
                if(this.existDollId.length){
                    for(let i=0;i<this.existDollId.length;i++){
                        for(let j=0;j<data.length;j++){
                            //删除列表中已有的娃娃
                            if(this.existDollId[i]==data[j].id){
                                data.splice(j,1);
                            }
                        }
                    }
                }
            }           
            return data;
        };
        idCutt(id){
            this.existDollId=id.split(",")
        }
    }
</script>
<style lang="less">
.body-Margin{margin-bottom:120rpx;}
.dollList{font-size:26rpx;}
.dollList .weui-cell__hd image{width:100rpx;height:100rpx;margin-right: 15rpx;}
</style>
