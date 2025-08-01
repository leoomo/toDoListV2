// 快速前端测试脚本 - 15秒内完成
import puppeteer from 'puppeteer';

async function quickFrontendTest() {
  console.log('🚀 开始快速前端测试 (15秒超时)...');
  console.log('==================================================');

  let browser;
  const startTime = Date.now();
  
  try {
    // 启动浏览器
    browser = await puppeteer.launch({ 
      headless: true,
      timeout: 10000,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    // 测试1: 访问前端页面 (5秒超时)
    console.log('🔍 测试1: 访问前端页面...');
    try {
      await page.goto('http://localhost:5174', { 
        waitUntil: 'domcontentloaded', 
        timeout: 5000 
      });
      
      const title = await page.title();
      console.log(`✅ 页面加载成功，标题: ${title}`);
      
      // 检查页面内容
      const hasMainContent = await page.$('h1');
      if (hasMainContent) {
        const pageContent = await page.$eval('h1', el => el.textContent);
        console.log(`✅ 主标题: ${pageContent}`);
      }
    } catch (error) {
      console.log('❌ 页面访问失败:', error.message);
      return;
    }

    // 测试2: 检查表单元素
    console.log('\n🔍 测试2: 检查表单元素...');
    try {
      const titleInput = await page.$('input[placeholder*="任务标题"]');
      const submitButton = await page.$('button[type="submit"]');
      
      if (titleInput && submitButton) {
        console.log('✅ 表单元素存在');
      } else {
        console.log('❌ 表单元素缺失');
      }
    } catch (error) {
      console.log('❌ 表单检查失败:', error.message);
    }

    // 测试3: 快速功能测试
    console.log('\n🔍 测试3: 快速功能测试...');
    try {
      // 检查是否有添加功能
      const addButton = await page.$('button:has-text("添加")');
      if (addButton) {
        console.log('✅ 添加按钮存在');
      }
      
      // 检查筛选按钮
      const filterButtons = await page.$$('button');
      console.log(`✅ 找到 ${filterButtons.length} 个按钮`);
      
    } catch (error) {
      console.log('❌ 功能检查失败:', error.message);
    }

    // 测试4: API连接测试
    console.log('\n🔍 测试4: API连接测试...');
    try {
      // 在页面中执行API测试
      const apiResult = await page.evaluate(async () => {
        try {
          const response = await fetch('http://localhost:8000/health');
          const data = await response.json();
          return { success: true, data };
        } catch (error) {
          return { success: false, error: error.message };
        }
      });
      
      if (apiResult.success) {
        console.log('✅ API连接正常:', apiResult.data);
      } else {
        console.log('❌ API连接失败:', apiResult.error);
      }
    } catch (error) {
      console.log('❌ API测试失败:', error.message);
    }

    const elapsed = (Date.now() - startTime) / 1000;
    console.log(`\n⏱️  测试完成，耗时: ${elapsed.toFixed(2)}秒`);
    console.log('==================================================');
    console.log('🎉 快速前端测试完成！');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 设置全局超时
const timeout = setTimeout(() => {
  console.log('⏰ 测试超时，强制退出');
  process.exit(1);
}, 15000);

// 运行测试
quickFrontendTest().then(() => {
  clearTimeout(timeout);
  process.exit(0);
}).catch(() => {
  clearTimeout(timeout);
  process.exit(1);
});