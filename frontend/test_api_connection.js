// API连接测试脚本
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

async function testApiConnection() {
  console.log('🚀 开始API连接测试...');
  console.log('==================================================');

  try {
    // 测试1: 检查后端服务器是否运行
    console.log('🔍 测试1: 检查后端服务器...');
    const healthResponse = await axios.get('http://localhost:8000/health');
    console.log('✅ 后端服务器运行正常:', healthResponse.data);

    // 测试2: 获取待办事项列表
    console.log('\n🔍 测试2: 获取待办事项列表...');
    const todosResponse = await axios.get(`${API_BASE_URL}/todos/`);
    console.log('✅ 获取待办事项列表成功:', todosResponse.data);

    // 测试3: 创建待办事项
    console.log('\n🔍 测试3: 创建待办事项...');
    const createResponse = await axios.post(`${API_BASE_URL}/todos/`, {
      title: 'API测试任务',
      description: '通过API创建的测试任务'
    });
    console.log('✅ 创建待办事项成功:', createResponse.data);

    const todoId = createResponse.data.id;

    // 测试4: 更新待办事项
    console.log('\n🔍 测试4: 更新待办事项...');
    const updateResponse = await axios.put(`${API_BASE_URL}/todos/${todoId}`, {
      completed: true
    });
    console.log('✅ 更新待办事项成功:', updateResponse.data);

    // 测试5: 获取单个待办事项
    console.log('\n🔍 测试5: 获取单个待办事项...');
    const getResponse = await axios.get(`${API_BASE_URL}/todos/${todoId}`);
    console.log('✅ 获取单个待办事项成功:', getResponse.data);

    // 测试6: 筛选功能
    console.log('\n🔍 测试6: 筛选功能...');
    const filterResponse = await axios.get(`${API_BASE_URL}/todos/?completed=true`);
    console.log('✅ 筛选功能正常:', filterResponse.data);

    // 测试7: 删除待办事项
    console.log('\n🔍 测试7: 删除待办事项...');
    await axios.delete(`${API_BASE_URL}/todos/${todoId}`);
    console.log('✅ 删除待办事项成功');

    // 测试8: 批量删除
    console.log('\n🔍 测试8: 批量删除...');
    await axios.delete(`${API_BASE_URL}/todos/all`);
    console.log('✅ 批量删除成功');

    console.log('\n==================================================');
    console.log('🎉 API连接测试完成！');

  } catch (error) {
    console.error('❌ API测试失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
  }
}

// 主函数
async function main() {
  await testApiConnection();
}

main(); 