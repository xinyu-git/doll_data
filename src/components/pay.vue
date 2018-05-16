<template>
    <block wx:if="{{isPaying}}">
        <button class="zan-btn zan-btn--disabled zan-btn--loading zan-btn--large right" disabled>支付中</button>
    </block>
    <block wx:else>
        <button class="zan-btn zan-btn--primary zan-btn--large right" bindtap="joinin">{{text}}</button>
    </block>
</template>
<script>
    /* input 组件，后期考虑支持表情、录音、图片功能 */
    import wepy from 'wepy';
    import api from '../config/api'

    export default class Input extends wepy.component {
    
        props = {
            //默认 placeholder，支持传递参数
            text: {
                type: String,
                default: '确定'
            },
            backDelta:{
                type: Number,
                default: 1
            },
            infoId:{
                type: Number
            },
            enrollId:{
                type: Number
            }
        }

        data = {
            isPaying:false
        };

        methods = {
            async joinin(){
                let that = this;
                let enroll = await this.$parent.$parent.globalData.get(`${api.server}/api/enroll/${that.enrollId}/info`)
                let payFee = parseFloat(enroll.fee);
                let tmp_money = this.$parent.$parent.globalData.enrollConfig.ysPayMoney;
                if(payFee>0){
                    //非免费
                    if((payFee/100)<tmp_money){
                        //微信支付
                        that.isPaying = true;
                        that.$apply();
                        let payJson = {
                            "productName":"activity_enroll",
                            "productId":enroll.id,
                            "price":enroll.fee,
                            "buyNum":1,
                            "fee":(enroll.fee/100),
                            "serviceId":"S01",
                            "description":"english"
                        }
                        that.$parent.$parent.globalData.post(`${api.server}/api/saving/create`, payJson).then((res)=>{
                            console.log("创建订单",res)
                            let transNo = res.transNo;
                            let getPayParamJson = {
                                "transNo":transNo,
                                "payType":"wechat"
                            }
                            that.$parent.$parent.globalData.post(`${api.server}/api/saving/pay`, getPayParamJson).then((respay)=>{
                                if(respay.errorCode){
                                    wx.showModal({
                                        confirmColor: "#7ec792",
                                        content: "支付参数错误",
                                        showCancel: false
                                    })
                                    that.isPaying = false;
                                    that.$apply();
                                }else{
                                    wx.requestPayment({
                                        'timeStamp': respay.timeStamp,
                                        'nonceStr': respay.nonceStr,
                                        'package': respay.packageStr,
                                        'signType': respay.signType,
                                        'paySign': respay.paySign,
                                        'success': async function(res){
                                            console.info("wx 前端支付成功调起,订单号",transNo)
                                            let countdown = 10;
                                            let innerloop = setInterval(async()=>{
                                                countdown--
                                                if (countdown == 0){
                                                    //超时
                                                    wx.showModal({
                                                        confirmColor: "#7ec792",
                                                        content: "支付超时了,请重试",
                                                        showCancel: false
                                                    })
                                                    clearInterval(innerloop);
                                                    that.isPaying = false;
                                                    that.$apply();
                                                }else{
                                                    let enrollCheck = await that.$parent.$parent.globalData.get(`${api.server}/api/saving/checkstatus?transNo=${transNo}`);
                                                    if(enrollCheck.status && enrollCheck.status==1){
                                                        clearInterval(innerloop);
                                                        //支付成功
                                                        wx.showModal({
                                                            confirmColor: "#7ec792",
                                                            content: "支付成功",
                                                            showCancel: false,
                                                            success:function(){
                                                                that.goEnroll(enroll.fee);
                                                            }
                                                        })
                                                    }
                                                }
                                            },1000)
                                        },
                                        'fail':function(res){
                                            that.isPaying = false;
                                            that.$apply();
                                        }
                                    })
                                }
                            })
                        });
                    }else{
                        //需要银行卡支付

                    }
                } else{
                    //免费
                    that.goEnroll(enroll.fee);
                }

                console.log("pay 组件内部enrollId:",this.enrollId);
            }
        };

        goEnroll(feeMoney){
            let that = this;
            that.$parent.$parent.globalData.post(`${api.server}/api/enroll/${that.enrollId}/join`, {
                fee: feeMoney,
                fieldsinfo:'',
                remark: '课程报名',
                signType: 0,
                signCode: "001",
            }).then((res)=>{
                console.error("发送结果res",res)
                if(res.errorCode){
                    wx.showModal({
                        confirmColor: "#7ec792",
                        content: res.errorMsg,
                        showCancel:false
                    })
                    that.isPaying = false;
                    that.$apply();
                }else{
                    wx.showToast({
                        title: '报名成功',
                        icon: "success",
                        duration: 1000,
                        mask: true
                    });
                    setTimeout(function () {
                        that.$parent.$parent.globalData.clipboard = {type:"enroll_update", value:"refresh"}
                        setTimeout(function () {
                            wx.navigateBack({delta: that.backDelta})
                        }, 1000)
                    }, 1000)
                }
            });
        }

        onLoad () {
            this.isPaying = false;
        }
    }
</script>
<style>
    @import '../zanui/btn.wxss';
</style>
