#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 从 changelog 解析最新版本信息
 */
function parseChangelog() {
  const changelogPath = path.join(__dirname, '../../changelog/README.md');
  
  try {
    const content = fs.readFileSync(changelogPath, 'utf8');
    const lines = content.split('\n');
    
    // 查找第一个版本标题
    const versionRegex = /^## 版本 (v[\d.]+) \(([^)]+)\)$/;
    let versionInfo = null;
    let inUpdateSection = false;
    let inPendingSection = false;
    let updates = [];
    let pendingFixes = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // 匹配版本标题
      const versionMatch = line.match(versionRegex);
      if (versionMatch && !versionInfo) {
        versionInfo = {
          version: versionMatch[1],
          date: versionMatch[2],
          updates: [],
          pendingFixes: []
        };
        continue;
      }
      
      // 如果已经找到版本信息，开始解析内容
      if (versionInfo) {
        // 检查是否进入更新内容部分
        if (line.includes('### 更新内容')) {
          inUpdateSection = true;
          inPendingSection = false;
          continue;
        }
        
        // 检查是否进入待修复功能部分
        if (line.includes('### 待修复功能')) {
          inUpdateSection = false;
          inPendingSection = true;
          continue;
        }
        
        // 检查是否离开当前部分
        if (line.startsWith('### ') && !line.includes('更新内容') && !line.includes('待修复功能')) {
          inUpdateSection = false;
          inPendingSection = false;
          
          // 如果已经解析完更新内容和待修复功能，停止解析
          if (line.includes('计划上线') || line.startsWith('---') || line.startsWith('##')) {
            break;
          }
        }
        
        // 解析更新内容或待修复功能
        if (inUpdateSection || inPendingSection) {
          // 匹配主要项目 (1. **功能名称**：)
          const mainItemMatch = line.match(/^\d+\.\s*\*\*([^*]+)\*\*[：:]?\s*(.*)$/);
          if (mainItemMatch) {
            const itemTitle = mainItemMatch[1];
            const itemDesc = mainItemMatch[2];
            // 收集子项
            const subItems = [];
            let currentIndex = i + 1;
            
            // 向前查找子项
            while (currentIndex < lines.length) {
              const nextLine = lines[currentIndex];
              const subMatch = nextLine.match(/^\s*-\s*(.+?)[；;]?\s*$/);
              if (subMatch) {
                subItems.push(subMatch[1]);
                currentIndex++;
              } else if (nextLine.trim() === '') {
                currentIndex++;
              } else {
                break;
              }
            }
            
            // 构建完整的描述
            let fullItem = itemTitle;
            if (itemDesc && !itemDesc.includes('：')) {
              fullItem += ' - ' + itemDesc;
            }
            if (subItems.length > 0) {
              fullItem += '：' + subItems.join('，');
            }
            
            // 根据当前部分添加到对应数组
            if (inUpdateSection) {
              updates.push(fullItem);
            } else if (inPendingSection) {
              pendingFixes.push(fullItem);
            }
            
            i = currentIndex - 1; // 跳过已处理的行
            continue;
          }
        }
      }
    }
    
    if (versionInfo) {
      versionInfo.updates = updates;
      versionInfo.pendingFixes = pendingFixes;
    }
    
    return versionInfo;
  } catch (error) {
    console.error('解析 changelog 失败:', error);
    return null;
  }
}

/**
 * 更新 README.md 中的版本信息
 */
function updateReadmeVersion(versionInfo) {
  const readmePath = path.join(__dirname, '../../README.md');
  
  try {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // 构建新的版本信息内容
    let newVersionSection = `## 🚀 版本信息

**当前版本**：${versionInfo.version} (${versionInfo.date})

**最新更新**：
${versionInfo.updates.map(update => `- ${update}`).join('\n')}`;

    // 如果有待修复功能，添加到版本信息中
    if (versionInfo.pendingFixes && versionInfo.pendingFixes.length > 0) {
      newVersionSection += `\n\n**待修复功能**：
${versionInfo.pendingFixes.map(fix => `- ${fix}`).join('\n')}`;
    }

    newVersionSection += `\n\n查看详细更新内容请访问 [更新日志](changelog/README.md)。`;
    
    // 替换版本信息部分
    const versionRegex = /## 🚀 版本信息[\s\S]*?(?=##|$)/;
    if (versionRegex.test(content)) {
      content = content.replace(versionRegex, newVersionSection + '\n\n');
    } else {
      console.error('未找到版本信息部分');
      return false;
    }
    
    fs.writeFileSync(readmePath, content, 'utf8');
    console.log('✅ 已更新 README.md 版本信息');
    return true;
  } catch (error) {
    console.error('更新 README.md 失败:', error);
    return false;
  }
}

/**
 * 更新 index.md 中的版本信息
 */
function updateIndexVersion(versionInfo) {
  const indexPath = path.join(__dirname, '../../index.md');
  
  try {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // 构建新的版本信息内容
    let newVersionSection = `## 🚀 版本信息

**当前版本**：${versionInfo.version} (${versionInfo.date})

**最新更新**：
${versionInfo.updates.map(update => `- ${update}`).join('\n')}`;

    // 如果有待修复功能，添加到版本信息中
    if (versionInfo.pendingFixes && versionInfo.pendingFixes.length > 0) {
      newVersionSection += `\n\n**待修复功能**：
${versionInfo.pendingFixes.map(fix => `- ${fix}`).join('\n')}`;
    }

    newVersionSection += `\n\n查看详细更新内容请访问 [更新日志](changelog/)。`;
    
    // 替换版本信息部分
    const versionRegex = /## 🚀 版本信息[\s\S]*?(?=##|$)/;
    if (versionRegex.test(content)) {
      content = content.replace(versionRegex, newVersionSection + '\n\n');
    } else {
      console.error('未找到版本信息部分');
      return false;
    }
    
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('✅ 已更新 index.md 版本信息');
    return true;
  } catch (error) {
    console.error('更新 index.md 失败:', error);
    return false;
  }
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始更新版本信息...');
  
  // 解析 changelog
  const versionInfo = parseChangelog();
  if (!versionInfo) {
    console.error('❌ 解析 changelog 失败');
    process.exit(1);
  }
  
  console.log('📋 解析到版本信息:', {
    version: versionInfo.version,
    date: versionInfo.date,
    updateCount: versionInfo.updates.length
  });
  
  // 更新文件
  const readmeSuccess = updateReadmeVersion(versionInfo);
  const indexSuccess = updateIndexVersion(versionInfo);
  
  if (readmeSuccess && indexSuccess) {
    console.log('✅ 版本信息更新完成!');
  } else {
    console.error('❌ 版本信息更新失败');
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}