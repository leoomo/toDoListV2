// 简单的前端测试脚本
import axios from 'axios';

async function simpleTest() {
  console.log('🚀 开始简单前端测试...');
  console.log('==================================================');
  
  const startTime = Date.now();
  
  try {
    // 测试1: 检查后端API
    console.log('🔍 测试1: 检查后端API连接...');
    const response = await axios.get('http://localhost:8000/health', {
      timeout: 3000
    });
    console.log('✅ 后端API连接正常:', response.data);
    
    // 测试2: 测试完整的API流程
    console.log('\n🔍 测试2: 测试完整API流程...');
    
    // 创建任务
    const createResp = await axios.post('http://localhost:8000/api/v1/todos/', {
      title: '前端测试任务',
      description: '通过前端测试创建'
    });
    console.log('✅ 创建任务成功:', createResp.data.title);
    
    // 获取任务列表
    const listResp = await axios.get('http://localhost:8000/api/v1/todos/');
    console.log('✅ 获取任务列表成功，共', listResp.data.total, '个任务');
    
    // 清理任务
    await axios.delete('http://localhost:8000/api/v1/todos/all');
    console.log('✅ 清理任务成功');
    
    // 测试3: 前端文件检查
    console.log('\n🔍 测试3: 检查前端文件...');
    
    // 检查主要组件文件
    const fs = await import('fs');
    const path = await import('path');
    
    const files = [
      'src/App.tsx',
      'src/components/TodoForm.tsx',
      'src/components/TodoList.tsx',
      'src/components/TodoFilter.tsx',
      'src/components/TodoItem.tsx',
      'src/services/api.ts',
      'src/types/todo.ts'
    ];
    
    for (const file of files) {
      if (fs.default.existsSync(file)) {
        console.log(`✅ ${file} 存在`);
      } else {
        console.log(`❌ ${file} 不存在`);
      }
    }
    
    const elapsed = (Date.now() - startTime) / 1000;
    console.log(`\n⏱️  测试完成，耗时: ${elapsed.toFixed(2)}秒`);
    console.log('==================================================');
    console.log('🎉 前端集成测试完成！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
    }
  }
}

simpleTest();