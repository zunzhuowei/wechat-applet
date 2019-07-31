# wechat-applet
微信小程序

## NOTE
### 模板引用
1. import 只能引用 wxml 中的模板；
2. inculde 只能引用 wxml的组件标签；

### 程序生命周期
1. onLaunch
2. onShow
3. onHide
4. onError

### 页面生命周期
1. onLoad
2. onShow
3. onReady
4. onHide
5. onUnload

### footer.wxml 模板
```html
<!-- 模板 -->
<template name="footer">
    <view class="weui-footer weui-footer_fixed-bottom">
        <view class="weui-footer__links">
            <navigator url="" class="weui-footer__link">{{company}}</navigator>
        </view>
        <view class="weui-footer__text">Copyright © {{copyright}}</view>
    </view>
</template>

<!-- 组件 -->
<view class="weui-footer weui-footer_fixed-bottom">
    <view class="weui-footer__links">
        <navigator url="" class="weui-footer__link">WeUI首页</navigator>
    </view>
    <view class="weui-footer__text">Copyright © 2008-2016 weui.io</view>
</view>
```
```html
<!-- 组件引用 index.wxml -->
<include  src="../../templates/footer/footer.wxml"/>

<!-- 模板引用 register.wxml -->
<template is="footer" data="{{...footer}}"/>

```

### 跳转
* wx.switchTab(Object object)
> 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  参数
```html
{
  "tabBar": {
    "list": [{
      "pagePath": "index",
      "text": "首页"
    },{
      "pagePath": "other",
      "text": "其他"
    }]
  }
}

wx.switchTab({
  url: '/index'
})
```
* wx.reLaunch(Object object)
> 关闭所有页面，打开到应用内的某个页面
```html
wx.reLaunch({
  url: 'test?id=1'
})

// test
Page({
  onLoad (option) {
    console.log(option.query)
  }
})
```
* wx.redirectTo(Object object)
> 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
```html
wx.redirectTo({
  url: 'test?id=1'
})
```
* wx.navigateTo(Object object)
> 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
```html
wx.navigateTo({
  url: 'test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})

//test.js
Page({
  onLoad: function(option){
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
    })
  }
})
```
* wx.navigateBack(Object object)
> 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
```html

// 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码

// 此处是A页面
wx.navigateTo({
  url: 'B?id=1'
})

// 此处是B页面
wx.navigateTo({
  url: 'C?id=1'
})

// 在C页面内 navigateBack，将返回A页面
wx.navigateBack({
  delta: 2
})
```


## 列表渲染
```html
wx:for

在组件上使用 wx:for 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。

默认数组的当前项的下标变量名默认为 index，数组当前项的变量名默认为 item

<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>

Page({
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  }
})

使用 wx:for-item 可以指定数组当前元素的变量名，

使用 wx:for-index 可以指定数组当前下标的变量名：

<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>

wx:for 也可以嵌套，下边是一个九九乘法表

<view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="i">
  <view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="j">
    <view wx:if="{{i <= j}}">
      {{i}} * {{j}} = {{i * j}}
    </view>
  </view>
</view>

block wx:for

类似 block wx:if，也可以将 wx:for 用在<block/>标签上，以渲染一个包含多节点的结构块。例如：

<block wx:for="{{[1, 2, 3]}}">
  <view> {{index}}: </view>
  <view> {{item}} </view>
</block>

wx:key

如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 input 中的输入内容，switch 的选中状态），需要使用 wx:key 来指定列表中项目的唯一的标识符。

wx:key 的值以两种形式提供

    字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
    保留关键字 *this 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字，如：

当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

如不提供 wx:key，会报一个 warning， 如果明确知道该列表是静态，或者不必关注其顺序，可以选择忽略。

示例代码：

在开发者工具中预览效果

<switch wx:for="{{objectArray}}" wx:key="unique" style="display: block;"> {{item.id}} </switch>
<button bindtap="switch"> Switch </button>
<button bindtap="addToFront"> Add to the front </button>

<switch wx:for="{{numberArray}}" wx:key="*this" style="display: block;"> {{item}} </switch>
<button bindtap="addNumberToFront"> Add to the front </button>

Page({
  data: {
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
    numberArray: [1, 2, 3, 4]
  },
  switch: function(e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function(e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function(e){
    this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})

注意：

当 wx:for 的值为字符串时，会将字符串解析成字符串数组

<view wx:for="array">
  {{item}}
</view>

等同于

<view wx:for="{{['a','r','r','a','y']}}">
  {{item}}
</view>

注意： 花括号和引号之间如果有空格，将最终被解析成为字符串

<view wx:for="{{[1,2,3]}} ">
  {{item}}
</view>

等同于

<view wx:for="{{[1,2,3] + ' '}}" >
  {{item}}
</view>

```