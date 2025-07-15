#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 从 changelog 解析最新版本信息
 */
function parseChangelog() {
  const changelogPath = path.join(process.cwd(), '../../changelog/README.md');
  
  try {
    const content = fs.readFileSync(changelogPath, 'utf8');
    const lines = content.split('\n');
    
    // 查找第一个版本标题
    const versionRegex = /^## 版本 (v[\d.]+) \(([^)]+)\)$/;
    let versionInfo = null;
    let inUpdateSection = false;
    let updates = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // 匹配版本标题
      const versionMatch = line.match(versionRegex);
      if (versionMatch && !versionInfo) {
        versionInfo = {
          version: versionMatch[1],
          date: versionMatch[2],
          updates: []
        };
        continue;
      }
      
      // 如果已经找到版本信息，开始解析更新内容
      if (versionInfo) {
        // 检查是否进入更新内容部分
        if (line.includes('### 更新内容')) {
          inUpdateSection = true;
          continue;
        }
        
        // 检查是否离开更新内容部分
        if (line.startsWith('### ') && !line.includes('更新内容')) {
          inUpdateSection = false;
          break;
        }
        
        // 解析更新内容
        if (inUpdateSection) {
          // 匹配主要更新项 (1. **功能名称**：)
          const mainUpdateMatch = line.match(/^\d+\.\s*\*\*([^*]+)\*\*[：:]?\s*(.*)$/);
          if (mainUpdateMatch) {
            const updateTitle = mainUpdateMatch[1];
            const updateDesc = mainUpdateMatch[2];
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
            
            // 构建完整的更新描述
            let fullUpdate = updateTitle;
            if (updateDesc && !updateDesc.includes('：')) {
              fullUpdate += ' - ' + updateDesc;
            }
            if (subItems.length > 0) {
              fullUpdate += '：' + subItems.join('，');
            }
            
            updates.push(fullUpdate);
            i = currentIndex - 1; // 跳过已处理的行
            continue;
          }
        }
      }
    }
    
    if (versionInfo) {
      versionInfo.updates = updates;
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
  const readmePath = path.join(process.cwd(), '../../README.md');
  
  try {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // 构建新的版本信息内容
    const newVersionSection = `## 🚀 版本信息

**当前版本**：${versionInfo.version} (${versionInfo.date})

**最新更新**：
${versionInfo.updates.map(update => `- ${update}`).join('\n')}

查看详细更新内容请访问 [更新日志](changelog/README.md)。`;
    
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
  const indexPath = path.join(process.cwd(), '../../index.md');
  
  try {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // 构建新的版本信息内容
    const newVersionSection = `## 🚀 版本信息

**当前版本**：${versionInfo.version} (${versionInfo.date})

**最新更新**：
${versionInfo.updates.map(update => `- ${update}`).join('\n')}

查看详细更新内容请访问 [更新日志](changelog/)。`;
    
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