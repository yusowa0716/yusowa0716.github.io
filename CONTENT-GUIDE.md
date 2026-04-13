# 内容更新指南

网站的所有内容都存储在 `data/` 文件夹下的 JSON 文件中。更新网站时，只需编辑对应的 JSON 文件并推送到 `main` 分支即可，无需修改任何 HTML 或 JavaScript 代码。

## 本地预览

网站使用 `fetch()` 加载 JSON 数据，因此不能直接在浏览器中打开 `index.html`。需要启动一个本地服务器：

```bash
python3 -m http.server
```

然后在浏览器中访问 http://localhost:8000。

---

## 添加新闻

编辑 `data/news.json`，在数组**最前面**添加一个新对象：

```json
[
  {
    "date": "Jan. 2025",
    "content": "新闻内容。可以包含 <a href=\"https://example.com\">链接</a>。",
    "isNew": true
  },
  ...已有条目...
]
```

| 字段      | 类型    | 说明                                              |
|-----------|---------|---------------------------------------------------|
| `date`    | string  | 显示日期（如 "Sep. 2024"）                          |
| `content` | string  | 新闻内容，支持 HTML 链接                             |
| `isNew`   | boolean | 设为 `true` 会显示红色 "New" 标签；旧条目改为 `false` |

---

## 添加论文

### 第一步：添加图片

将论文图片放入 `images/` 文件夹。如果需要鼠标悬停时切换到第二张图片的效果，请添加两张图片。

### 第二步：编辑 `data/publications.json`

在你希望的位置添加一个新对象（数组越靠前，显示越靠上）：

```json
{
  "id": "my-paper",
  "title": "论文标题",
  "authors": "**Yusong Wang***, Co-Author Name, Another Author",
  "venue": "完整会议/期刊名称",
  "venueShort": "NeurIPS 2025",
  "year": 2025,
  "tags": ["关键词1", "关键词2"],
  "highlight": false,
  "award": null,
  "image": "images/my-paper.png",
  "imageHover": null,
  "links": [
    { "label": "Paper", "url": "https://arxiv.org/abs/..." },
    { "label": "Code", "url": "https://github.com/..." }
  ]
}
```

| 字段         | 类型          | 说明                                                        |
|--------------|---------------|-------------------------------------------------------------|
| `id`         | string        | 简短的唯一标识符（内部使用）                                   |
| `title`      | string        | 论文标题，支持 `<sup>` 标签用于上标（如 P<sup>3</sup>M）       |
| `authors`    | string        | 作者列表，用 `**双星号**` 包裹自己的名字使其加粗显示            |
| `venue`      | string        | 完整的会议/期刊名称                                          |
| `venueShort` | string        | 缩写名称（显示在括号中）                                     |
| `year`       | number        | 发表年份                                                    |
| `tags`       | string[]      | 研究主题关键词（显示为彩色标签）                               |
| `highlight`  | boolean       | `true` = 高亮展示，带金色边框和黄色背景                       |
| `award`      | string\|null  | 获奖信息（如 "Best Paper"），无奖项填 `null`                  |
| `image`      | string        | 主图片路径                                                   |
| `imageHover` | string\|null  | 悬停时显示的第二张图片路径，不需要则填 `null`（默认缩放效果）    |
| `links`      | object[]      | 链接数组 `{ "label": "Paper", "url": "..." }`，常用标签：Paper、Code、Blog |

---

## 添加竞赛

编辑 `data/competitions.json`，在数组**最前面**添加一个新对象：

```json
{
  "date": "Mar. 2025",
  "name": "竞赛名称",
  "url": "https://competition-link.com",
  "result": "1st Place"
}
```

| 字段     | 类型   | 说明                                            |
|----------|--------|-------------------------------------------------|
| `date`   | string | 显示日期                                         |
| `name`   | string | 竞赛名称                                         |
| `url`    | string | 竞赛/排名页面链接                                 |
| `result` | string | 获奖名次，包含 "1st" 的会显示金色标签              |

---

## 更新个人信息

编辑 `data/profile.json`，可修改以下字段：

- `name`、`title` — 首页大标题处显示的姓名和头衔
- `bio`、`bioSecondary` — 个人简介段落（支持 HTML 链接）
- `email` — 邮箱地址
- `cvUrl` — 简历文件路径
- `photoUrl` — 头像图片路径
- `socialLinks` — 社交链接数组 `{ "label", "url", "icon" }`，支持的图标：`github`、`scholar`
- `researchInterests.summary` — 研究兴趣介绍文字
- `collaborators` — 合作者数组 `{ "name", "url" }`

---

## 修改颜色或字体

编辑 `css/style.css`，设计变量位于文件顶部：

- **主题色**：修改 `--c-accent`（浅色模式）及对应的深色模式值
- **字体**：修改 `--f-sans`
- **浅色主题颜色**：在 `:root { ... }` 中
- **深色主题颜色**：在 `[data-theme="dark"] { ... }` 中

---

## 部署

```bash
git add -A
git commit -m "update content"
git push origin main
```

GitHub Pages 会在几分钟内自动部署更新。
