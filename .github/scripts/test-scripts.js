#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

/**
 * 测试脚本运行状态
 */
function testScripts() {
  console.log('🧪 开始测试自动化脚本...\n');
  
  const scripts = [
    {
      name: '版本信息更新',
      command: 'node update-version-info.js',
      description: '解析 changelog 并更新版本信息'
    },
    {
      name: '新项目检查',
      command: 'node check-new-projects.js',
      description: '检查新项目文件并验证导航链接'
    },
    {
      name: 'FAQ 统计更新',
      command: 'node update-faq-stats.js',
      description: '统计 FAQ 数量并更新相关文件'
    }
  ];
  
  const results = [];
  
  scripts.forEach(script => {
    console.log(`📝 测试: ${script.name}`);
    console.log(`   描述: ${script.description}`);
    
    try {
      const output = execSync(script.command, { 
        cwd: __dirname,
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log('   ✅ 成功');
      console.log('   📄 输出:');
      console.log(output.split('\n').map(line => `      ${line}`).join('\n'));
      
      results.push({
        name: script.name,
        status: 'success',
        output: output
      });
      
    } catch (error) {
      console.log('   ❌ 失败');
      console.log('   📄 错误:');
      console.log(error.message.split('\n').map(line => `      ${line}`).join('\n'));
      
      results.push({
        name: script.name,
        status: 'failed',
        error: error.message
      });
    }
    
    console.log('');
  });
  
  // 生成测试报告
  console.log('📊 测试结果汇总:');
  console.log('==========================================');
  
  let successCount = 0;
  let failCount = 0;
  
  results.forEach(result => {
    if (result.status === 'success') {
      console.log(`✅ ${result.name}: 通过`);
      successCount++;
    } else {
      console.log(`❌ ${result.name}: 失败`);
      failCount++;
    }
  });
  
  console.log('==========================================');
  console.log(`总计: ${results.length} 个测试`);
  console.log(`成功: ${successCount} 个`);
  console.log(`失败: ${failCount} 个`);
  console.log(`成功率: ${(successCount / results.length * 100).toFixed(1)}%`);
  
  if (failCount === 0) {
    console.log('\n🎉 所有测试通过！自动化脚本已准备就绪。');
  } else {
    console.log('\n⚠️  部分测试失败，请检查相关脚本。');
  }
  
  return results;
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 FarmMaster 文档自动化脚本测试\n');
  
  const results = testScripts();
  
  // 根据测试结果设置退出码
  const hasFailures = results.some(result => result.status === 'failed');
  process.exit(hasFailures ? 1 : 0);
}

// 运行主函数
if (require.main === module) {
  main();
}