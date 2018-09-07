<template>
<view class="page">
    <view class="page_container">
        <view class="page-head_top">
            <view class="weui-cell set-weui-cell">
                <view class="weui-cell__bd">
                    <view><text>{{stockname}}</text></view>
                    <view>库存：<text>{{size}}</text></view>
                </view>
            </view>
        </view>
        <view class="page-body">
            <view class="weui-form-preview check_preview">
                <view class="weui-form-preview__hd">
                    <view class="weui-form-preview__item">
                        <label class="weui-form-preview__label">实际数</label>
                        <input  type="number" class="number_input" @input="bindInput"  data-name="stocknums"/>
                    </view>
                </view>
                <view class="weui-form-preview__bd">
                    <view class="weui-form-preview__item">
                        <label class="weui-form-preview__label">备注</label>
                        <input  type="text"  class="text_input" @input="bindInput"  data-name="marks" />
                    </view>
                </view>
                <view class="weui-form-preview__ft">
                    <button type="primary" class="btn-save" @tap="stockSave">保存</button>
                </view>
            </view>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class stockEditor extends wepy.page {
        config = {
            navigationBarTitleText: "盘点",
            navigationBarBackgroundColor:'#f2f2f2',
        };
        //可用于页面模板绑定的数据
        data = {
            stockname:null,
            stockid:null,
            stocktype:null,
            stocknums:null,
            marks:'',
            size:0,
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            async stockSave(){
                let that=this;
                let inventory=[{
                    stockid:that.stockid,
                    stockname:that.stockname,
                    stocktype:that.stocktype,
                    stocknums:that.stocknums,
                    marks:that.marks
                }]
                console.log()
                //return false
                let result = await this.$parent.globalData.post(
                    `${api.server1}/kucuns/updateBatchKuCun`,
                    {
                        data:JSON.stringify(inventory)
                    }
                );
                console.log(result)
                if(result.code==0){
                    wx.showModal({
                        confirmColor: "#7ec792",
                        title: "提示",
                        showCancel: false,
                        content: result.msg || "出错了，请重试"
                    });
                    wx.navigateTo({ url: `../stock/stockDetails?stockid=${this.stockid}&stockname=${this.stockname}&size=${this.stocknums}`});
                }else{
                    wx.showModal({
                        confirmColor: "#7ec792",
                        title: "提示",
                        showCancel: false,
                        content: result.msg || "出错了，请重试"
                    });
                }
            },
            bindInput(e) {
                let key = e.currentTarget.dataset.name;
                this[key] = e.detail.value;
                this.$apply();
            },
        };
    
        //页面的生命周期函数
        onLoad(options) {
            this.stockid=options.stockid;
            this.stockname=options.stockname;
            this.size=options.size;
            this.stocktype=options.stocktype;
        };
    }
</script>
<style lang="less">
.check_preview{font-size:30rpx;}
.check_preview .weui-form-preview__hd,.check_preview .weui-form-preview__bd{padding:10rpx 15px;text-align: left;}
.check_preview .number_input,.check_preview .text_input{border:1px solid #ccc;}
.check_preview .number_input{width:120rpx;margin-top:10rpx;float:right;}
.check_preview .text_input{flex:1;}
.btn-save{width:95%;font-size:26rpx;margin:20rpx auto;}
.check_preview .weui-form-preview__label{color:#000;}
</style>
