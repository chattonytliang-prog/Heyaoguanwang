# 合耀科技官网开发知识库

更新时间：2026-06-21

## 项目概览

项目名称：合耀科技官网主页

公司定位：合耀科技专注 AI 培训与企业 AI 提效服务，面向大学生、职场转型人群、零基础学习者和企业团队，提供线上线下实战教学、真实项目训练和定制化 AI 落地方案。

当前官网主标题：

```text
让 AI 真正成为个人成长与企业提效的生产力
```

品牌口号：

```text
让智能连接未来
```

联系方式：

```text
微信号：AITony9316
```

## 本地项目

本地目录：

```text
D:\合耀科技官网主页
```

主要文件：

- `index.html`：官网首页结构
- `privacy.html`：隐私政策页面
- `styles.css`：页面样式、响应式布局和动效
- `script.js`：微信号复制、表单提交、滚动入场动画
- `functions/api/lead.js`：Cloudflare Pages Function，接收表单并转发飞书
- `assets/heyao-logo.jpg`：从品牌截图裁切的临时 Logo
- `assets/brand-source.jpg`：原始品牌截图备份
- `docs/project-knowledge-base.md`：项目上下文知识库

## GitHub

仓库地址：

```text
https://github.com/chattonytliang-prog/Heyaoguanwang
```

主分支：

```text
main
```

已推送的关键提交：

- `6faa1a7`：合并 GitHub 初始化仓库并保存官网首页
- `4c7b785`：新增飞书线索通知接口

## 线上部署

当前临时海外部署平台：

```text
Cloudflare Pages
```

线上地址：

```text
https://heyaoguanwang.pages.dev
```

部署方式：

```text
GitHub main 分支自动部署到 Cloudflare Pages
```

构建配置：

```text
Framework preset: None / 无
Build command: 留空
Build output directory: /
Root directory: /
```

## 表单与飞书通知

当前链路：

```text
官网联系表单
→ /api/lead
→ Cloudflare Pages Function
→ FEISHU_WEBHOOK 环境变量
→ 飞书自定义机器人
→ 飞书群收到官网咨询
```

前端提交代码位置：

```text
script.js
```

关键逻辑：

```js
fetch("/api/lead", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name, contact, type, message }),
});
```

后端接口代码位置：

```text
functions/api/lead.js
```

关键逻辑：

```js
const webhook = context.env.FEISHU_WEBHOOK;
```

Cloudflare 环境变量名称必须是：

```text
FEISHU_WEBHOOK
```

注意：飞书 Webhook 不应写入 GitHub、前端代码或公开文档，只能保存在 Cloudflare 环境变量中。

## 表单字段

当前官网联系表单字段：

- 姓名
- 手机号 / 微信号
- 咨询类型
- 需求描述

咨询类型：

- 个人 AI 培训
- 企业 AI 提效
- 课程合作
- 其他咨询

飞书通知关键词：

```text
官网咨询
```

如果飞书机器人启用了“自定义关键词”安全设置，关键词需要保持为“官网咨询”。

## 已完成

- 完成官网首页第一版静态页面
- 完成深色科技风视觉设计
- 完成响应式适配
- 完成 Logo 裁切和展示
- 完成微信号复制交互
- 完成联系表单 UI
- 完成 GitHub 仓库推送
- 完成 Cloudflare Pages 部署
- 完成飞书机器人通知接入
- 完成飞书表单通知测试
- 完成隐私政策页面和入口

## 后续建议

优先级较高：

- 替换高清透明 PNG 或 SVG Logo
- 添加微信二维码弹窗
- 补充 favicon 和社交分享图
- 购买并绑定正式域名
- 完成 ICP 备案后迁移到国内部署

后续可扩展：

- 课程详情页
- 企业 AI 提效服务详情页
- 学员案例页
- 企业案例页
- 文章/资讯栏目
- SEO 关键词优化
- 百度统计或 Google Analytics
- 留资数据备份到数据库或在线表格

## 安全注意事项

- 不要把 `FEISHU_WEBHOOK` 写进仓库
- 飞书机器人建议开启自定义关键词
- 表单收集姓名、手机号、微信号时，正式投放前应增加隐私政策
- 宣传文案避免“保证增收”“一定变现”等绝对化表述

## 以后继续开发时的接入方式

如果在新对话中继续这个项目，先提供以下任一信息即可恢复上下文：

```text
D:\合耀科技官网主页
```

或：

```text
https://github.com/chattonytliang-prog/Heyaoguanwang
```

然后让 Codex 读取：

```text
docs/project-knowledge-base.md
```
