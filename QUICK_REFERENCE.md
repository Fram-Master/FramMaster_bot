# 📋 快速参考卡片

> 🚀 **团队成员快速上手指南**

## 🎯 常用操作

### 添加新项目 (3分钟完成)

1. **创建文件**
   ```bash
   cd usage/[category]/
   touch [project-name].md
   ```

2. **复制模板** → 从 `TEAM_EDITING_GUIDE.md` 复制项目模板

3. **更新导航** → 更新 4 个文件：
   - `usage/[category]/README.md`
   - `SUMMARY.md`
   - `README.md`
   - `sitemap.md`

---

## 📁 文件位置速查

| 需要更新 | 文件位置 |
|---------|----------|
| 新项目文档 | `usage/[category]/[project].md` |
| 类别导航 | `usage/[category]/README.md` |
| GitBook目录 | `SUMMARY.md` |
| 主页导航 | `README.md` |
| 站点地图 | `sitemap.md` |
| 更新日志 | `changelog/README.md` |
| 常见问题 | `faq/README.md` |

---

## 🔗 导航链接模板

```markdown
# 项目页面顶部
[← 返回[类别]](README.md) | [← 返回使用教程](../README.md) | [← 返回主页](../../README.md)

# 类别页面顶部
[← 返回使用教程](../README.md) | [← 返回主页](../../README.md)
```

---

## 📝 项目类别

| 类别 | 目录 | 用途 |
|------|------|------|
| 项目交互 | `usage/project-interaction/` | 区块链项目 |
| 指纹浏览器 | `usage/fingerprint-browser/` | 浏览器工具 |
| 银河交互 | `usage/galxe/` | 银河功能 |
| 链上工具 | `usage/onchain-tools/` | 交易所工具 |

---

## 🚀 发布流程

```bash
# 1. 提交更改
git add .
git commit -m "docs: 添加新项目 [项目名]"
git push origin main

# 2. 检查部署
# - GitHub: 立即生效
# - GitBook: 1-2分钟
# - GitHub Pages: 3-5分钟
```

---

## 📞 遇到问题？

- **文档问题** → 查看 `TEAM_EDITING_GUIDE.md`
- **技术问题** → @1号技师
- **产品问题** → @2号牛马