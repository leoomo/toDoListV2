// 浏览器测试脚本
import puppeteer from 'puppeteer';

async function testBrowser() {
  console.log('🚀 开始浏览器测试...');
  console.log('==================================================');

  let browser;
  try {
    // 启动浏览器
    browser = await puppeteer.launch({ 
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // 设置视口
    await page.setViewport({ width: 1280, height: 720 });

    // 测试1: 访问前端页面
    console.log('🔍 测试1: 访问前端页面...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    // 检查页面标题
    const title = await page.title();
    console.log(`✅ 页面标题: ${title}`);

    // 检查页面内容
    const pageContent = await page.$eval('h1', el => el.textContent);
    console.log(`✅ 页面内容: ${pageContent}`);

    // 测试2: 检查表单元素
    console.log('\n🔍 测试2: 检查表单元素...');
    const titleInput = await page.$('input[placeholder="输入任务标题..."]');
    const descriptionTextarea = await page.$('textarea[placeholder="输入任务描述（可选）..."]');
    const submitButton = await page.$('button[type="submit"]');
    
    if (titleInput && descriptionTextarea && submitButton) {
      console.log('✅ 表单元素存在');
    } else {
      console.log('❌ 表单元素缺失');
    }

    // 测试3: 添加待办事项
    console.log('\n🔍 测试3: 添加待办事项...');
    
    // 填写表单
    await page.type('input[placeholder="输入任务标题..."]', '浏览器测试任务');
    await page.type('textarea[placeholder="输入任务描述（可选）..."]', '通过浏览器测试创建的任务');
    
    // 点击添加按钮
    await page.click('button[type="submit"]');
    
    // 等待新任务出现
    try {
      await page.waitForSelector('.bg-white.rounded-lg.shadow-sm', { timeout: 5000 });
      console.log('✅ 成功添加待办事项');
    } catch (error) {
      console.log('❌ 添加待办事项失败或超时');
    }

    // 测试4: 检查筛选按钮
    console.log('\n🔍 测试4: 检查筛选按钮...');
    const filterButtons = await page.$$('button');
    const hasFilterButtons = filterButtons.length > 0;
    console.log(`✅ 筛选按钮数量: ${filterButtons.length}`);

    // 测试5: 检查统计信息
    console.log('\n🔍 测试5: 检查统计信息...');
    const statsText = await page.$eval('body', el => el.textContent);
    if (statsText.includes('总计') || statsText.includes('已完成') || statsText.includes('未完成')) {
      console.log('✅ 统计信息显示正常');
    } else {
      console.log('❌ 统计信息显示异常');
    }

    console.log('\n==================================================');
    console.log('🎉 浏览器测试完成！');

  } catch (error) {
    console.error('❌ 浏览器测试失败:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 检查依赖
async function checkDependencies() {
  try {
    await import('puppeteer');
    console.log('✅ Puppeteer 已安装');
    return true;
  } catch (error) {
    console.log('❌ Puppeteer 未安装，请运行: npm install puppeteer');
    return false;
  }
}

// 主函数
async function main() {
  const hasDeps = await checkDependencies();
  if (hasDeps) {
    await testBrowser();
  }
}

main(); 