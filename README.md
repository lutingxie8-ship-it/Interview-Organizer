# 面经清单助手

这是基于小红书内容采集类扩展思路制作的 MVP：当前帖子 DOM 文本提取、问题规则识别、右侧唤醒按钮、Chrome Side Panel、完成/收藏、拖拽排序和本地持久化。

## 安装
在 Chrome/Edge 打开 `chrome://extensions`，开启开发者模式，点击“加载已解压的扩展程序”，选择本目录。打开小红书帖子后点击页面右侧红色按钮或扩展图标。

## 后续二开
可将 `fancyyan/xiaohongshu-content-collector` 的 IndexedDB、动态采集和 OCR 模块替换进 `content.js`，再增加帖子分组、标签、答案生成、复习记录和 Markdown/JSON 导出。
