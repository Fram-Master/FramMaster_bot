#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 检查新项目文件并生成导航更新提醒
 */
function checkNewProjects() {
  const usageDir = path.join(__dirname, '../../usage');
  const categories = ['project-interaction', 'fingerprint-browser', 'galxe', 'onchain-tools'];
  
  let newProjects = [];
  
  categories.forEach(category => {
    const categoryDir = path.join(usageDir, category);
    if (fs.existsSync(categoryDir)) {
      const files = fs.readdirSync(categoryDir)
        .filter(file => file.endsWith('.md') && file !== 'README.md')
        .map(file => ({
          category,
          file: file.replace('.md', ''),
          path: path.join(categoryDir, file)
        }));
      
      newProjects.push(...files);
    }
  });
  
  return newProjects;
}

/**
 * 检查导航文件中是否已包含项目链接
 */
function checkNavigationLinks(projects) {
  const summaryPath = path.join(__dirname, '../../SUMMARY.md');
  const readmePath = path.join(__dirname, '../../README.md');
  
  let missingLinks = [];
  
  try {
    const summaryContent = fs.readFileSync(summaryPath, 'utf8');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    projects.forEach(project => {
      const projectLink = `usage/${project.category}/${project.file}.md`;
      
      // 检查 SUMMARY.md
      if (!summaryContent.includes(projectLink)) {
        missingLinks.push({
          ...project,
          missingFrom: 'SUMMARY.md'
        });
      }
      
      // 检查 README.md
      if (!readmeContent.includes(projectLink)) {
        missingLinks.push({
          ...project,
          missingFrom: 'README.md'
        });
      }
    });
    
    return missingLinks;
  } catch (error) {
    console.error('检查导航链接失败:', error);
    return [];
  }
}

/**
 * 生成项目统计报告
 */
function generateProjectReport(projects) {
  const categoryStats = {};
  
  projects.forEach(project => {
    if (!categoryStats[project.category]) {
      categoryStats[project.category] = [];
    }
    categoryStats[project.category].push(project.file);
  });
  
  let report = '## 📊 项目统计\n\n';
  
  Object.entries(categoryStats).forEach(([category, files]) => {
    const categoryNames = {
      'project-interaction': '项目交互',
      'fingerprint-browser': '指纹浏览器',
      'galxe': '银河交互',
      'onchain-tools': '链上工具'
    };
    
    report += `### ${categoryNames[category] || category}\n`;
    report += `**项目数量**: ${files.length}\n`;
    report += `**项目列表**: ${files.join(', ')}\n\n`;
  });
  
  return report;
}

/**
 * 主函数
 */
function main() {
  console.log('🔍 检查新项目文件...');
  
  const projects = checkNewProjects();
  console.log(`📋 发现 ${projects.length} 个项目文件`);
  
  if (projects.length === 0) {
    console.log('✅ 没有新项目需要处理');
    return;
  }
  
  // 检查导航链接
  const missingLinks = checkNavigationLinks(projects);
  
  if (missingLinks.length > 0) {
    console.log('⚠️  发现缺失的导航链接:');
    missingLinks.forEach(link => {
      console.log(`  - ${link.file} 缺失于 ${link.missingFrom}`);
    });
    
    // 生成提醒文件
    const reminderPath = path.join(__dirname, '../../PROJECT_UPDATE_REMINDER.md');
    const reminderContent = `# 🔔 项目更新提醒

**生成时间**: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

## ⚠️ 需要手动更新的导航文件

${missingLinks.map(link => `- [ ] 在 \`${link.missingFrom}\` 中添加 \`${link.file}\` 的链接`).join('\n')}

## 📋 快速操作指南

### 1. 更新 SUMMARY.md
在对应的类别下添加:
\`\`\`markdown
* [项目名称](usage/${missingLinks[0]?.category}/${missingLinks[0]?.file}.md)
\`\`\`

### 2. 更新 README.md
在对应的类别下添加:
\`\`\`markdown
- [项目名称](usage/${missingLinks[0]?.category}/${missingLinks[0]?.file}.md) - 项目描述
\`\`\`

### 3. 更新 index.md
同样在对应的类别下添加链接。

### 4. 更新 sitemap.md
在站点地图中添加新项目。

---

完成后请删除此文件。
`;
    
    fs.writeFileSync(reminderPath, reminderContent, 'utf8');
    console.log('📝 已生成提醒文件: PROJECT_UPDATE_REMINDER.md');
  } else {
    console.log('✅ 所有项目都已正确链接');
  }
  
  // 生成项目报告
  const report = generateProjectReport(projects);
  console.log('\n' + report);
}

// 运行主函数
if (require.main === module) {
  main();
}