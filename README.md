# 我的日常练习


此项目将会记录我日常遇到的一些有意思的东西，或者我日常学习和练习的一些东西

## vue2响应式原理
此demo模拟实现了vue的数据劫持，双向绑定，数组对象原型方法代理。使用数据劫持结合发布订阅者模式。
为对象基本类型数类型追加get和set方法。为数组设置代理。重写了数组原型对象方法。并且在重写的方法里面调用了数组
本身的方法。不会影响数组原本的操作。

## 一些炫酷的动效
此demo主要展示一些简单的动画效果

## 原生js实现图片压缩功能
此demo主要实现选择图片，压缩后下载的功能。主要使用html5的canvas标签的toDataURL和drawImage方法。首先选择图片，创建img标签。
并将其固定定位在屏幕外，创建canvas标签，大小和定位在图片上。获取到图片实例。调用canvas的drawImage()将其绘制在canvas上。
再调用canvas的toDataURL('image/jpeg', 压缩比例)生成压缩后的图片的base64编码。后调用base64转文件的方法生成文件，动态创建a标签下载
## canvas
此demo主要用canvas实现了一个简易的画板工具。包括线条绘制，橡皮擦，颜色填充，清空画板，选择画笔颜色，选择填充颜色，选择笔头粗细等等功能
**2022/10/18 -- 新增拖拽和撤销功能**

