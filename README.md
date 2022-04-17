# anyjs

**anyjs** 是一个微前端实现框架，帮助大家能更简单、无痛的构建一个生产可用的微前端架构系统。

微前端架构的核心价值：
- 技术栈无关
  - 主框架不限制接入应用的技术栈，子应用具备完全自主权

- 独立开发部署
  - 子应用仓库独立，前后端开发独立，部署独立

- 增量升级
  - 在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略

- 独立运行时
   - 每个子应用之间状态隔离，运行时状态不共享


##### 为什么不用iframe?
如果不考虑体验问题，iframe 几乎是最完美的微前端解决方案了。

iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但它的最大问题也在于隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。

iframe存在的问题

- URL不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
- UI不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中...
- 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
- 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。   