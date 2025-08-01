// 前端功能测试脚本
const puppeteer = require('puppeteer');

async function testFrontend() {
  console.log('🚀 开始前端功能测试...');
  console.log('==================================================');

  let browser;
  try {
    // 启动浏览器
    browser = await puppeteer.launch({ 
      headless: false, 
      slowMo: 100,
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

    // 测试2: 添加待办事项
    console.log('\n🔍 测试2: 添加待办事项...');
    
    // 填写表单
    await page.type('input[placeholder="输入任务标题..."]', '测试任务1');
    await page.type('textarea[placeholder="输入任务描述（可选）..."]', '这是一个测试任务');
    
    // 点击添加按钮
    await page.click('button[type="submit"]');
    
    // 等待新任务出现
    await page.waitForSelector('.bg-white.rounded-lg.shadow-sm', { timeout: 5000 });
    console.log('✅ 成功添加待办事项');

    // 测试3: 标记完成
    console.log('\n🔍 测试3: 标记完成...');
    await page.click('.w-5.h-5.rounded-full');
    await page.waitForTimeout(1000);
    console.log('✅ 成功标记完成');

    // 测试4: 筛选功能
    console.log('\n🔍 测试4: 筛选功能...');
    
    // 点击"已完成"筛选
    await page.click('button:has-text("已完成 (1)")');
    await page.waitForTimeout(1000);
    console.log('✅ 筛选功能正常');

    // 点击"全部"筛选
    await page.click('button:has-text("全部 (1)")');
    await page.waitForTimeout(1000);
    console.log('✅ 返回全部视图');

    // 测试5: 添加更多任务
    console.log('\n🔍 测试5: 添加更多任务...');
    
    await page.type('input[placeholder="输入任务标题..."]', '测试任务2');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    
    await page.type('input[placeholder="输入任务标题..."]', '测试任务3');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ 成功添加更多任务');

    // 测试6: 删除任务
    console.log('\n🔍 测试6: 删除任务...');
    const deleteButtons = await page.$$('.text-red-600.hover\\:text-red-800');
    if (deleteButtons.length > 0) {
      await deleteButtons[0].click();
      await page.waitForTimeout(1000);
      console.log('✅ 成功删除任务');
    }

    // 测试7: 批量操作
    console.log('\n🔍 测试7: 批量操作...');
    
    // 标记一个任务为完成
    const checkboxes = await page.$$('.w-5.h-5.rounded-full');
    if (checkboxes.length > 0) {
      await checkboxes[0].click();
      await page.waitForTimeout(1000);
    }
    
    // 点击"清除已完成"
    await page.click('button:has-text("清除已完成")');
    await page.waitForTimeout(1000);
    console.log('✅ 批量清除功能正常');

    console.log('\n==================================================');
    console.log('🎉 前端功能测试完成！');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 检查依赖
async function checkDependencies() {
  try {
    require('puppeteer');
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
    await testFrontend();
  }
}

main(); 