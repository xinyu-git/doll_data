<template>
<view class="page" >
<scroll-view class="container" scroll-y="true" >
  <view wx:if="{{!openAttr}}">
    <swiper class="goodsimgs" indicator-dots="true"  interval="3000" duration="1000" autoplay="true">
      <swiper-item wx:for="{{gallery}}" wx:key="{{item.id}}">
        <image src="{{item.img_url}}" background-size="cover"></image>
      </swiper-item>
    </swiper>
    <view class="goods-infoBox">
      <view class="buy_box">
        <text class="goods-name">{{goods.name}}</text>
        <text class="goods-desc">{{goods.goods_brief}}</text>
        <text class="goods-price">￥{{goods.retail_price}}</text>
       </view>
    </view>
    <view class="section-nav section-attr"  bindtap="addToCart">
      <view class="t">{{choice}}{{checkedSpecText}}</view>
      <image class="icon" src="../../static/images/address_right.png" background-size="cover"></image>
    </view>
  </view>
  <view class="bottom-btn" wx:if="{{bttomBtn}}">
    <view class="ico_box l-collect {{ openAttr ? 'back' : ''}}" bindtap="closeAttrOrCollect">
      <image class="icon" src="{{collectBackImage}}"></image>
    </view>
    <view class="ico_box l-cart">
      <navigator url="../shop/cart" >
        <view class="box">
          <text class="cart-count">{{cartGoodsCount}}</text>
          <image  class="icon" src="../../images/ic_menu_shoping_nor.png"></image>
        </view>
      </navigator>
    </view>
    <view class="buy_box" bindtap="goToBuy">立即购买</view>
    <view class="addToCart_btn" bindtap="addToCart">加入购物车</view>
  </view>
  <view class='mark' wx:if="{{mark}}"></view>
  <view  wx:if="{{openCard}}" class="attr-pop animated fadeInUp">
    <image class="closeBtn" src="../../images/clear_input.png" bindtap="closeCard"></image>
    <view class="img-info">
      <image class="img" src="{{goods.primary_pic_url}}"></image>
      <view class="info">
        <view class="buy_box">
          <!--<text class="goods-name">{{goods.name}}</text>-->
          <view class="p">价格：￥{{goods.retail_price}}</view>
          <view class="a" wx:if="{{productList.length>0}}">{{choice}}{{checkedSpecText}}</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y="true" class="scrollBox {{onlyNumber ? 'noScrollBox' : ''}}">
      <view class="spec-con">
        <view class="spec-item" wx:for="{{specificationList}}" wx:key="{{item.specification_id}}">
          <view class="name">{{item.name}}</view>
          <view class="values">
          <view class="value {{vitem.checked ? 'selected' : ''}}" bindtap="clickSkuValue" wx:for="{{item.valueList}}" wx:for-item="vitem" wx:key="{{vitem.id}}" data-value-id="{{vitem.id}}" data-name-id="{{vitem.specification_id}}" data-imgUrl="{{vitem.pic_url}}">{{vitem.value}}</view>
          </view>
        </view>
      </view>
        <view class="number-item">
        <view class="name">数量</view>
        <view class="selnum">
          <view class="cut" bindtap="cutNumber">-</view>
          <input value="{{number}}" class="number" disabled="true" type="number" />
          <view class="add" bindtap="addNumber">+</view>
        </view>
      </view>
    </scroll-view>
  </view>
   <view class="detail">
       <rich-text nodes="{{goods.goods_desc}}" />
</view>
    </scroll-view>
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class Index extends wepy.page {
  config = {
    enablePullDownRefresh: false,
    navigationBarTitleText: "商品详情"
  };
  data = {
    choice: "",
    checkedSpecText: "请选择规格属性",
    mark: false,
    openCard: false,
    bttomBtn: true,
    number: 1,
    cartGoodsCount: 0,
    goodsid: null,
    productId: null,
    goods: {},
    gallery: [],
    specificationList: [],
    openAttr: false,
    userHasCollect: 0,
    collectBackImage: "/static/images/icon_collect.png",
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    id: 0,
    onlyNumber: true,
    productList: [],
    retail_price: 0,
    primary_pic_url: 0
  };
  async onLoad(options) {
    //console.log(options);
    this.goodsid = options.id;
    this.getGoodsInfo();
  }
  onShow() {
    this.getGoodsCount();
    this.openCard = false;
    this.mark = false;
  }
  async getGoodsInfo() {
    //获取商品的详细
    let resulgoods = await this.$parent.globalData.get(
      `${api.server}/api/shop/goods/detail?id=${this.goodsid}&shopId=${
        this.$parent.globalData.shopId
      }`
    );
    //console.log(resulgoods.data);
    this.goods = this.$parent.globalData.goods = resulgoods.data.info;
    this.retail_price = resulgoods.data.info.retail_price;
    this.primary_pic_url = resulgoods.data.info.primary_pic_url;

    this.goods.goods_desc = this.goods.goods_desc.replace(
      /\<img/gi,
      '<img style="width:100%;height:auto; display:block" '
    );
    this.productId = this.$parent.globalData.productId =
      resulgoods.data.productList[0].id;

    if (resulgoods.data.gallery.length > 0) {
      this.gallery = this.$parent.globalData.gallery = resulgoods.data.gallery;
    }
    if (resulgoods.data.specificationList.length > 0) {
      this.specificationList = resulgoods.data.specificationList;
      this.onlyNumber = false;
    }

    this.productList = resulgoods.data.productList;

    if (resulgoods.data.userHasCollect == 1) {
      this.collectBackImage = this.hasCollectImage;
    } else {
      this.collectBackImage = this.noCollectImage;
    }
    this.$apply();
  }

  async getGoodsCount() {
    //获取购物车的数量
    let resulgoodsCount = await this.$parent.globalData.get(
      `${api.server}/api/shop/cart/goodscount?shopId=${
        this.$parent.globalData.shopId
      }`
    );

    this.cartGoodsCount = this.$parent.globalData.cartGoodsCount =
      resulgoodsCount.data.cartTotal.goodsCount;
    //console.log(this.cartGoodsCount);
    this.$apply();
  }
  changeSpecInfo() {
    let checkedNameValue = this.getCheckedSpecValue();
    //设置选择的信息
    let checkedValue = checkedNameValue
      .filter(function(v) {
        if (v.valueId != 0) {
          return true;
        } else {
          return false;
        }
      })
      .map(function(v) {
        return v.valueText;
      });
    if (checkedValue.length > 0) {
      this.choice = "已选择：";
      this.checkedSpecText = checkedValue.join("　");
    } else {
      this.choice = "";
      this.checkedSpecText = "请选择";
    }
  }
  //获取选中的规格信息
  getCheckedSpecValue() {
    let checkedValues = [];
    let _specificationList = this.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        nameId: _specificationList[i].specification_id,
        valueId: 0,
        valueText: ""
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;
  }
  //判断规格是否选择完整
  isCheckedAllSpec() {
    return !this.getCheckedSpecValue().some(function(v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  }
  getCheckedProductItem(key) {
    return this.productList.filter(function(v) {
      if (v.goods_specification_ids == key) {
        return true;
      } else {
        return false;
      }
    });
  }
  getCheckedSpecKey() {
    let checkedValue = this.getCheckedSpecValue().map(function(v) {
      return v.valueId;
    });

    return checkedValue.join("_");
  }
  methods = {
    //关闭购物车
    closeCard() {
      this.openCard = false;
      this.mark = false;
    },

    //加入购物车
    async addToCart() {
      if (this.openCard) {
        //提示选择完整规格
        if (!this.onlyNumber) {
          if (!this.isCheckedAllSpec()) {
            return false;
          }
        }
        //根据选中的规格，判断是否有对应的sku信息getCheckedProductItem
        let checkedProduct = this.getCheckedProductItem(
          this.getCheckedSpecKey()
        );

        if (!checkedProduct || checkedProduct.length <= 0) {
          //找不到对应的product信息，提示没有库存
          return false;
        }

        //验证库存
        if (checkedProduct[0].goods_number < this.number) {
          //找不到对应的product信息，提示没有库存
          wx.showToast({
            title: "库存不足",
            image: "/static/images/icon_error.png",
            duration: 2000
          });
          return false;
        }
        console.log(checkedProduct);
        let resultcard = await this.$parent.globalData.post(
          `${api.server}/api/shop/cart/add`,
          {
            goodsId: this.goodsid,
            productId: checkedProduct[0].id,
            number: this.number,
            shopId: this.$parent.globalData.shopId
          }
        );
        if (resultcard.errno === 0) {
          wx.showToast({
            title: "成功加入购物车",
            icon: "success",
            duration: 2000
          });
        } else {
          wx.showToast({
            title: resultcard.errmsg,
            image: "/static/images/icon_error.png",
            duration: 2000
          });
        }

        let res1 = await this.getGoodsCount();
      }

      this.openCard = true;
      this.mark = true;
      this.$apply();
    },

    cutNumber() {
      this.number = this.number - 1 > 1 ? this.number - 1 : 1;
    },
    addNumber() {
      this.number = this.number + 1;
    },
    goToBuy() {
      if (this.openCard) {
        //根据选中的规格，判断是否有对应的sku信息getCheckedProductItem
        let checkedProduct = this.getCheckedProductItem(
          this.getCheckedSpecKey()
        );

        if (!checkedProduct || checkedProduct.length <= 0) {
          //找不到对应的product信息，提示没有库存
          return false;
        }

        //验证库存
        if (checkedProduct[0].goods_number < this.number) {
          //找不到对应的product信息，提示没有库存
          wx.showToast({
            title: "库存不足",
            image: "/static/images/icon_error.png",
            duration: 2000
          });
          return false;
        }
        wx.navigateTo({
          url:
            "/pages/shop/checkout?goodsid=" +
            this.goodsid +
            "&number=" +
            this.number +
            "&retail_price=" +
            checkedProduct[0].retail_price +
            "&pic_url=" +
            this.goods.primary_pic_url +
            "&productId=" +
            checkedProduct[0].id
        });
      }

      this.openCard = true;
      this.mark = true;
      this.$apply();
    },
    clickSkuValue(e) {
      let that = this;
      let specNameId = e.target.dataset.nameId;
      let specValueId = e.target.dataset.valueId;
      let imgurl = e.target.dataset.imgurl;
      //判断是否可以点击
      //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
      let _specificationList = this.specificationList;
      for (let i = 0; i < _specificationList.length; i++) {
        if (_specificationList[i].specification_id == specNameId) {
          for (let j = 0; j < _specificationList[i].valueList.length; j++) {
            if (_specificationList[i].valueList[j].id == specValueId) {
              if (imgurl != "") {
                if (_specificationList[i].valueList[j].checked) {
                  _specificationList[i].valueList[j].checked = false;
                  this.goods.primary_pic_url = this.primary_pic_url;
                } else {
                  _specificationList[i].valueList[j].checked = true;
                  this.goods.primary_pic_url = imgurl;
                }
              } else {
                //如果已经选中，则反选
                if (_specificationList[i].valueList[j].checked) {
                  _specificationList[i].valueList[j].checked = false;
                } else {
                  _specificationList[i].valueList[j].checked = true;
                }
              }
            } else {
              _specificationList[i].valueList[j].checked = false;
            }
          }
        }
      }

      //提示选择完整规格
      if (!this.onlyNumber) {
        if (!this.isCheckedAllSpec()) {
          return false;
        }

        //根据选中的规格，判断是否有对应的sku信息getCheckedProductItem
        let checkedProduct = this.getCheckedProductItem(
          this.getCheckedSpecKey()
        );
        if (!checkedProduct || checkedProduct.length <= 0) {
          this.goods.retail_price = this.retail_price;
          //找不到对应的product信息，提示没有库存
          return false;
        }
        this.goods.retail_price = checkedProduct[0].retail_price;
      }
      this.specificationList = _specificationList;

      //重新计算spec改变后的信息
      this.changeSpecInfo();

      //重新计算哪些值不可以点击
    }
  };

  async closeAttrOrCollect() {
    if (this.openAttr) {
      this.openAttr = false;
      if (this.userHasCollect == 1) {
        this.collectBackImage = this.hasCollectImage;
      } else {
        this.collectBackImage = this.noCollectImage;
      }
    } else {
      //添加或是取消收藏
      let resultaddordelete = await this.$parent.globalData.post(
        `${api.server}/api/shop/collect/addordelete`,
        {
          typeId: 0,
          valueId: this.goodsid
        }
      );
      if (resultaddordelete.errno === 0) {
        if (resultaddordelete.data.type == "add") {
          this.collectBackImage = this.hasCollectImage;
        } else {
          this.collectBackImage = this.noCollectImage;
        }
      } else {
        wx.showToast({
          image: "/static/images/icon_error.png",
          title: resultaddordelete.errmsg,
          mask: true
        });
      }
      this.$apply();
    }
  }
}
</script>
<style>
.container {
  margin-bottom: 100rpx;
}
.goodsimgs {
  width: 750rpx;
  height: 750rpx;
}

.goodsimgs image {
  width: 750rpx;
  height: 750rpx;
}
.scrollBox {
  height: 450rpx;
}
.noScrollBox {
  height: auto;
}
.service-policy {
  width: 750rpx;
  height: 73rpx;
  background: #f4f4f4;
  padding: 0 31.25rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.service-policy .item {
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png)
    0 center no-repeat;
  background-size: 10rpx;

  padding-left: 15rpx;
  display: flex;
  align-items: center;
  font-size: 25rpx;
  color: #666;
}

.goods-infoBox {
  width: 750rpx;
  overflow: hidden;
  background: #fff;
}

.goods-infoBox .buy_box {
  display: block;
  width: 718.75rpx;
  height: 100%;
  margin-left: 31.25rpx;
  padding: 38rpx 31.25rpx 38rpx 0;
  border-bottom: 1px solid #f4f4f4;
}

.goods-infoBox .buy_box text {
  display: block;
  width: 687.5rpx;
  text-align: center;
}

.goods-name {
  height: 41rpx;
  margin-bottom: 5.208rpx;
  font-size: 41rpx;
  line-height: 41rpx;
}

.goods-infoBox .goods-desc {
  height: 43rpx;
  margin-bottom: 41rpx;
  font-size: 28rpx;
  line-height: 36rpx;
  color: #999;
  margin-top: 10rpx;
}

.goods-price {
  height: 35rpx;
  font-size: 40rpx;
  line-height: 35rpx;
  color: #b4282d;
}

.goods-infoBox .goods-brand {
  margin-top: 23rpx;
  min-height: 40rpx;
  text-align: center;
}

.goods-infoBox .goods-brand text {
  display: inline-block;
  width: auto;
  padding: 2px 30rpx 2px 10.5rpx;
  line-height: 35.5rpx;
  border: 1px solid #f48f18;
  font-size: 25rpx;
  color: #f48f18;
  border-radius: 4px;
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/detailTagArrow-18bee52dab.png)
    95% center no-repeat;
  background-size: 10.75rpx 18.75rpx;
}

.section-nav {
  width: 750rpx;
  height: 108rpx;
  background: #fff;
  margin-bottom: 20rpx;
}

.section-nav .t {
  float: left;
  width: 600rpx;
  height: 108rpx;
  line-height: 108rpx;
  font-size: 29rpx;
  color: #333;
  margin-left: 31.25rpx;
}

.section-nav .icon {
  float: right;
  width: 52rpx;
  height: 52rpx;
  margin-right: 16rpx;
  margin-top: 28rpx;
}

.bottom-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 750rpx;
  height: 100rpx;
  display: flex;
  background: #fff;
}

.bottom-btn .ico_box {
  float: left;
  height: 100rpx;
  width: 162rpx;
  border: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-btn .ico_box.l-collect {
  border-right: none;
  border-left: none;
  text-align: center;
}

.bottom-btn .ico_box.l-cart .box {
  position: relative;
  height: 60rpx;
  width: 60rpx;
}

.bottom-btn .ico_box.l-cart .cart-count {
  height: 28rpx;
  width: 28rpx;
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  background: #b4282d;
  text-align: center;
  font-size: 18rpx;
  color: #fff;
  line-height: 28rpx;
  border-radius: 50%;
  padding: 5rpx;
}

.bottom-btn .ico_box.l-cart .icon {
  position: absolute;
  top: 10rpx;
  left: 0;
}

.bottom-btn .ico_box .icon {
  display: block;
  height: 44rpx;
  width: 44rpx;
}

.img-info .buy_box {
  position: absolute;
  bottom: 0;
}
.bottom-btn .buy_box {
  float: left;
  height: 100rpx;
  line-height: 96rpx;
  flex: 1;
  text-align: center;
  color: #fff;
  border-top: 1px solid #ff6434;
  border-bottom: 1px solid #f4f4f4;
  background: #ff6434;
}

.bottom-btn .addToCart_btn {
  border: 1px solid #b4282d;
  background: #b4282d;
  float: left;
  height: 100rpx;
  line-height: 96rpx;
  flex: 1;
  text-align: center;
  color: #fff;
}
.attr-pop {
  width: 100%;
  height: auto;
  padding: 31.25rpx;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 998;
  padding-bottom: 100rpx;
}
.closeBtn {
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  top: 0;
  right: 50rpx;
  z-index: 999;
}
.attr-pop .img-info {
  width: 687.5rpx;
  overflow: hidden;
  margin-bottom: 41.5rpx;
  position: relative;
}

.attr-pop .info {
  float: left;
  display: flex;
  align-items: center;
}

.attr-pop .p {
  font-size: 33rpx;
  color: #b4282d;
  height: 33rpx;
  line-height: 33rpx;
  margin-bottom: 10rpx;
  margin-top: 25rpx;
}

.attr-pop .a {
  font-size: 29rpx;
  color: #333;
  height: 40rpx;
  line-height: 40rpx;
}

.attr-pop .img {
  float: left;
  height: 177rpx;
  width: 177rpx;
  background: #f4f4f4;
  margin-right: 31.25rpx;
  border: solid 1px #ccc;
  padding: 5rpx;
}
.spec-con {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.spec-con .name {
  height: 32rpx;
  margin-bottom: 22rpx;
  font-size: 29rpx;
  color: #333;
}

.spec-con .values {
  height: auto;
  margin-bottom: 31.25rpx;
  font-size: 0;
}

.spec-con .value {
  display: inline-block;
  height: 62rpx;
  padding: 0 35rpx;
  line-height: 62rpx;
  text-align: center;
  margin-right: 25rpx;
  border: 1px solid #ccc;
  font-size: 25rpx;
  color: #333;
}

.spec-con .value.disable {
  border: 1px dashed #ccc;
  color: #ccc;
}

.spec-con .value.selected {
  border: 1px solid #b4282d;
  color: #b4282d;
}
.number-item .name {
  font-size: 29rpx;
  color: #333;
}
.number-item .selnum {
  width: 322rpx;
  height: 71rpx;
  border: 1px solid #ccc;
  display: flex;
  margin-top: 10rpx;
  margin-bottom: 70rpx;
}

.number-item .cut {
  width: 93.75rpx;
  height: 100%;
  text-align: center;
  line-height: 65rpx;
}

.number-item .number {
  flex: 1;
  height: 100%;
  text-align: center;
  line-height: 68.75rpx;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  float: left;
}

.number-item .add {
  width: 93.75rpx;
  height: 100%;
  text-align: center;
  line-height: 65rpx;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
.mark {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(57, 60, 75, 0.75);
  left: 0;
  top: 0;
  z-index: 99;
}

.paybtn {
  width: 220rpx;
  height: 62rpx;
  text-align: center;
  line-height: 62rpx;
  color: #fff;
  background: #ff7066;
  position: absolute;
  top: 15rpx;
  right: 80rpx;
  font-size: 32rpx;
  border-radius: 5rpx;
}
.detail {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.detail image {
  width: 100%;
  height: auto;
  display: block;
}
.common-problem {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.common-problem .h {
  position: relative;
  height: 145.5rpx;
  width: 750rpx;
  padding: 56.25rpx 0;
  background: #fff;
  text-align: center;
}

.common-problem .h .line {
  display: inline-block;
  position: absolute;
  top: 72rpx;
  left: 0;
  z-index: 2;
  height: 1px;
  margin-left: 225rpx;
  width: 300rpx;
  background: #ccc;
}

.common-problem .h .title {
  display: inline-block;
  position: absolute;
  top: 56.125rpx;
  left: 0;
  z-index: 3;
  height: 33rpx;
  margin-left: 285rpx;
  width: 180rpx;
  background: #fff;
}

.common-problem .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  padding: 0rpx 30rpx;
  background: #fff;
}

.common-problem .item {
  height: auto;
  overflow: hidden;
  padding-bottom: 25rpx;
}

.common-problem .question-box .spot {
  float: left;
  display: block;
  height: 8rpx;
  width: 8rpx;
  background: #b4282d;
  border-radius: 50%;
  margin-top: 11rpx;
}

.common-problem .question-box .question {
  float: left;
  line-height: 30rpx;
  padding-left: 8rpx;
  display: block;
  font-size: 26rpx;
  padding-bottom: 15rpx;
  color: #303030;
}

.common-problem .answer {
  line-height: 36rpx;
  padding-left: 16rpx;
  font-size: 26rpx;
  color: #787878;
}

.related-goods {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.related-goods .h {
  position: relative;
  height: 145.5rpx;
  width: 750rpx;
  padding: 56.25rpx 0;
  background: #fff;
  text-align: center;
  border-bottom: 1px solid #f4f4f4;
}

.related-goods .h .line {
  display: inline-block;
  position: absolute;
  top: 72rpx;
  left: 0;
  z-index: 2;
  height: 1px;
  margin-left: 225rpx;
  width: 300rpx;
  background: #ccc;
}

.related-goods .h .title {
  display: inline-block;
  position: absolute;
  top: 56.125rpx;
  left: 0;
  z-index: 3;
  height: 33rpx;
  margin-left: 285rpx;
  width: 180rpx;
  background: #fff;
}

.related-goods .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.related-goods .b .item {
  float: left;
  background: #fff;
  width: 375rpx;
  height: auto;
  overflow: hidden;
  text-align: center;
  padding: 15rpx 31.25rpx;
  border-right: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}

.related-goods .item .img {
  width: 311.45rpx;
  height: 311.45rpx;
}

.related-goods .item .name {
  display: block;
  width: 311.45rpx;
  height: 35rpx;
  margin: 11.5rpx 0 15rpx 0;
  text-align: center;
  overflow: hidden;
  font-size: 30rpx;
  color: #333;
}

.related-goods .item .price {
  display: block;
  width: 311.45rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}
</style>
