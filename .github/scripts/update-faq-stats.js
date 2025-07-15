#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 解析 FAQ 文件并统计问题数量
 */
function parseFAQ() {
  const faqPath = path.join(process.cwd(), 'faq/README.md');
  
  try {
    const content = fs.readFileSync(faqPath, 'utf8');
    const lines = content.split('\n');
    
    let categories = {};
    let currentCategory = null;
    let questionCount = 0;
    
    for (const line of lines) {
      // 匹配类别标题 (## 类别名称)
      const categoryMatch = line.match(/^## (.+)$/);
      if (categoryMatch) {
        currentCategory = categoryMatch[1];
        categories[currentCategory] = {
          questions: [],
          count: 0
        };
        continue;
      }
      
      // 匹配问题 (**问：...** 或 **Q：...**)
      const questionMatch = line.match(/^\*\*问[：:](.+?)\?\*\*$/) || 
                           line.match(/^\*\*Q[：:](.+?)\?\*\*$/);
      if (questionMatch && currentCategory) {
        const question = questionMatch[1];
        categories[currentCategory].questions.push(question);
        categories[currentCategory].count++;
        questionCount++;
      }
    }
    
    return {
      totalQuestions: questionCount,
      categories: categories,
      lastUpdated: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    };
  } catch (error) {
    console.error('解析 FAQ 失败:', error);
    return null;
  }
}

/**
 * 更新 README.md 中的 FAQ 统计信息
 */
function updateFAQStats(faqStats) {
  const readmePath = path.join(process.cwd(), 'README.md');
  
  try {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // 在常见问题链接后添加统计信息
    const faqLinkRegex = /- \[常见问题\]\(faq\/README\.md\) - 常见问题解答/;
    const newFaqLink = `- [常见问题](faq/README.md) - 常见问题解答 (${faqStats.totalQuestions}个问题)`;
    
    if (faqLinkRegex.test(content)) {
      content = content.replace(faqLinkRegex, newFaqLink);
      fs.writeFileSync(readmePath, content, 'utf8');
      console.log('✅ 已更新 README.md 中的 FAQ 统计');
      return true;
    } else {
      console.log('⚠️  未找到 FAQ 链接位置');
      return false;
    }
  } catch (error) {
    console.error('更新 README.md 失败:', error);
    return false;
  }
}

/**
 * 更新 index.md 中的 FAQ 统计信息
 */
function updateIndexFAQStats(faqStats) {
  const indexPath = path.join(process.cwd(), 'index.md');
  
  try {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // 在常见问题链接后添加统计信息
    const faqLinkRegex = /- \[常见问题\]\(faq\/\) - 常见问题解答/;
    const newFaqLink = `- [常见问题](faq/) - 常见问题解答 (${faqStats.totalQuestions}个问题)`;
    
    if (faqLinkRegex.test(content)) {
      content = content.replace(faqLinkRegex, newFaqLink);
      fs.writeFileSync(indexPath, content, 'utf8');
      console.log('✅ 已更新 index.md 中的 FAQ 统计');
      return true;
    } else {
      console.log('⚠️  未找到 FAQ 链接位置');
      return false;
    }
  } catch (error) {
    console.error('更新 index.md 失败:', error);
    return false;
  }
}

/**
 * 生成 FAQ 统计报告
 */
function generateFAQReport(faqStats) {
  let report = '## 📊 FAQ 统计报告\n\n';
  report += `**总问题数**: ${faqStats.totalQuestions}\n`;
  report += `**更新时间**: ${faqStats.lastUpdated}\n\n`;
  
  report += '### 分类统计\n\n';
  Object.entries(faqStats.categories).forEach(([category, data]) => {
    report += `#### ${category}\n`;
    report += `- **问题数量**: ${data.count}\n`;
    if (data.questions.length > 0) {
      report += `- **问题列表**:\n`;
      data.questions.forEach((question, index) => {
        report += `  ${index + 1}. ${question}\n`;
      });
    }
    report += '\n';
  });
  
  return report;
}

/**
 * 主函数
 */
function main() {
  console.log('📊 开始更新 FAQ 统计信息...');
  
  // 解析 FAQ
  const faqStats = parseFAQ();
  if (!faqStats) {
    console.error('❌ 解析 FAQ 失败');
    process.exit(1);
  }
  
  console.log(`📋 解析到 ${faqStats.totalQuestions} 个问题，分布在 ${Object.keys(faqStats.categories).length} 个类别中`);
  
  // 更新文件
  const readmeSuccess = updateFAQStats(faqStats);
  const indexSuccess = updateIndexFAQStats(faqStats);
  
  if (readmeSuccess || indexSuccess) {
    console.log('✅ FAQ 统计信息更新完成!');
  } else {
    console.log('⚠️  FAQ 统计信息更新部分失败');
  }
  
  // 生成报告
  const report = generateFAQReport(faqStats);
  console.log('\n' + report);
}

// 运行主函数
if (require.main === module) {
  main();
}