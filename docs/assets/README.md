# 图片资源管理

## 文件夹结构

```
assets/
├── images/
│   ├── screenshots/     # 功能截图、界面截图
│   ├── diagrams/       # 流程图、架构图、示意图
│   ├── tutorials/      # 教程步骤图、操作指南图
│   └── icons/          # 图标、LOGO、小图标
└── videos/             # 视频教程、演示视频
```

## 使用规范

### 文件命名规范
- 使用英文小写字母和连字符
- 格式：`功能模块-具体内容-序号.扩展名`
- 示例：
  - `galxe-login-step1.png`
  - `workflow-diagram.svg`
  - `main-interface.jpg`

### 图片格式选择
- **截图**：PNG（保持清晰度）
- **图标**：SVG（矢量图，可缩放）
- **照片**：JPG（文件较小）
- **简单图形**：SVG 或 PNG

### 文件大小建议
- 截图：< 500KB
- 图标：< 50KB
- 图表：< 200KB
- 如超出建议大小，请进行压缩

## 在文档中引用图片

### 相对路径引用
```markdown
# 从 docs/ 根目录引用
![功能截图](./assets/images/screenshots/feature.png)

# 从子目录引用（如 usage/ 文件夹内）
![流程图](../assets/images/diagrams/workflow.svg)

# 添加图片说明
![银河平台操作界面](./assets/images/screenshots/galxe-interface.png)
*银河平台主要操作界面*
```

### 图片居中显示
```markdown
<div align="center">
  <img src="./assets/images/diagrams/architecture.png" alt="系统架构图" width="600">
</div>
```

## 注意事项

1. **版权问题**：确保所有图片都有使用权限
2. **隐私保护**：截图时注意遮挡敏感信息
3. **文件管理**：定期清理不再使用的图片
4. **备份策略**：重要图片建议多处备份