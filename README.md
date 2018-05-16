# 空中研发-微信小程序

## PC授权页面

> 用来生成二维码

```bash
页面： pages/auth/loginpc
参数： options.key || options.scene  //key 为普通传递，scene 为微信自带
```

## 小程序跳转参数接收

* 在 app.vue 的 onLaunch 启动方法中调用 `that.bindUser(options.query.uid);`
* 会对接收到的 uid 做用户数据同步处理

## 通过搜索进入小程序

### 手机号填写

> 目前还没有进行细分

* 正常页面

```bash
export default class pageName extends wepy.page{}
```

* 必须录入手机号的页面结构

```bash
import auth from '../base/auth'

export default class pageName extends auth{}
```