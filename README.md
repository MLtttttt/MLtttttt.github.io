# MLttt 的算法笔记

内容来自 `MLttt菜鸡逆袭记` 的 Markdown 笔记。

## 本地预览

因为页面会用 `fetch` 读取 `content/*.md`，不要直接双击 `index.html`。在本目录启动一个静态服务器：

```powershell
node server.js
```

然后打开：

```text
http://127.0.0.1:8080
```

## 发布到 GitHub Pages

推荐把这个目录上传到你的 GitHub Pages 仓库，例如：

```powershell
git init
git add .
git commit -m "init lazy sheep algorithm blog"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```
