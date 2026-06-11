# MLttt 的算法笔记

一个懒羊羊主题的纯静态算法笔记博客，内容来自 `MLttt菜鸡逆袭记` 的 Markdown 笔记。

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

如果你要继续使用旧仓库 `MLtttttt/MLttt-.git`，可以在 GitHub 上把仓库名改成更清晰的名字，比如 `mlttt-algorithm-blog`。如果要用 `https://你的用户名.github.io/` 这个根域名，仓库名必须是 `你的用户名.github.io`。

## 更新笔记

把新的 Markdown 文件放到 `content/`，然后在 `app.js` 的 `NOTES` 数组里加一项：

```js
{ slug: "新笔记", file: "新笔记.md", title: "新笔记", tag: "专题" }
```

四张懒羊羊图片放在 `assets/`，可以直接替换同名文件来换风格。
