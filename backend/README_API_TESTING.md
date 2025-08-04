# TodoListV2 API 自动化测试指南

## 概述

本项目提供了完整的API自动化测试解决方案，包括Python测试脚本和详细的测试报告生成功能。

## 测试脚本

### 主要文件

- `test_api_automated.py` - 自动化API测试脚本
- `api_test_report_*.md` - 生成的测试报告文件

## 使用方法

### 1. 启动后端服务

```bash
# 在backend目录下
uv run python -m uvicorn src.todolistv2.main:app --host 0.0.0.0 --port 8000
```

### 2. 运行自动化测试

```bash
# 使用默认地址 (http://localhost:8000)
uv run python test_api_automated.py

# 使用自定义地址
uv run python test_api_automated.py http://your-api-server:8000
```

### 3. 查看测试结果

测试完成后会显示：
- 实时测试进度
- 测试结果统计
- 生成的报告文件路径

## 测试覆盖范围

### 核心功能测试 (13个测试用例)

| 测试项目 | 描述 | 预期状态码 |
|----------|------|------------|
| 健康检查 | 验证服务健康状态 | 200 |
| 根路径 | 验证API信息端点 | 200 |
| 获取待办事项列表 | 获取所有待办事项 | 200 |
| 创建待办事项 | 创建新的待办事项 | 201 |
| 获取单个待办事项 | 根据ID获取待办事项 | 200 |
| 更新待办事项 | 更新现有待办事项 | 200 |
| 筛选已完成待办事项 | 按完成状态筛选 | 200 |
| 分页功能 | 测试分页参数 | 200 |
| 错误处理（404） | 测试资源不存在 | 404 |
| 数据验证错误 | 测试无效数据 | 422 |
| 未授权访问测试 | 测试认证端点访问 | 404/401 |
| 无效认证令牌测试 | 测试无效认证令牌 | 200/401 |
| 删除待办事项 | 删除指定待办事项 | 204 |

## 测试报告

### 报告内容

生成的测试报告包含：

1. **测试概览**
   - 测试时间和目标
   - 测试统计信息
   - 成功率

2. **测试结果详情**
   - 表格形式的测试结果
   - 状态、响应码、响应时间

3. **详细测试信息**
   - 每个测试的完整信息
   - 请求和响应数据
   - 错误信息（如果有）

4. **测试总结**
   - 整体评估
   - 改进建议

### 报告文件命名

报告文件按时间戳命名：`api_test_report_YYYYMMDD_HHMMSS.md`

## 测试脚本特性

### 1. 自动化流程
- 自动创建测试数据
- 按逻辑顺序执行测试
- 自动清理测试数据

### 2. 详细记录
- 记录每个请求的响应时间
- 保存完整的请求和响应数据
- 提供详细的错误信息

### 3. 灵活配置
- 支持自定义API地址
- 可扩展的测试用例
- 可配置的测试参数

### 4. 专业报告
- Markdown格式报告
- 包含统计图表
- 易于阅读和分享

### 5. 认证测试
- 测试未授权访问场景
- 验证无效认证令牌处理
- 支持401错误状态码测试

## 持续集成

### 在CI/CD中使用

```bash
# 示例：在GitHub Actions中使用
- name: Run API Tests
  run: |
    cd backend
    uv run python test_api_automated.py
    # 检查退出码
    if [ $? -eq 0 ]; then
      echo "✅ API测试通过"
    else
      echo "❌ API测试失败"
      exit 1
    fi
```

### 退出码

- `0` - 所有测试通过
- `1` - 有测试失败或错误

## 认证测试说明

### 401未授权测试

当前API测试包含两个401相关的测试场景：

#### 1. 未授权访问测试 (`test_unauthorized_access`)
- **目的**: 测试访问需要认证的端点时的行为
- **方法**: 尝试访问 `/api/v1/auth/protected` 端点
- **预期结果**: 
  - 如果API有认证机制：返回401
  - 如果API无认证机制：返回404（端点不存在）

#### 2. 无效认证令牌测试 (`test_invalid_auth_token`)
- **目的**: 测试使用无效认证令牌时的行为
- **方法**: 使用无效的Bearer令牌访问API
- **预期结果**:
  - 如果API有认证机制：返回401
  - 如果API无认证机制：返回200（令牌被忽略）

### 认证测试的灵活性

这些测试设计为适应不同的API认证状态：
- **有认证的API**: 正确返回401错误
- **无认证的API**: 正确处理并继续提供服务

## 扩展测试

### 添加新的测试用例

1. 在`APITester`类中添加新的测试方法
2. 在`run_all_tests`方法中注册新测试
3. 确保测试方法返回`TestResult`对象

### 示例：添加性能测试

```python
def test_performance(self) -> TestResult:
    """测试API性能"""
    try:
        start_time = time.time()
        response = self.session.get(f"{self.base_url}/api/v1/todos/")
        response_time = time.time() - start_time
        
        # 性能阈值：响应时间应小于100ms
        is_performance_ok = response_time < 0.1
        
        return TestResult(
            name="性能测试",
            status=TestStatus.PASSED if is_performance_ok else TestStatus.FAILED,
            response_code=response.status_code,
            response_time=response_time,
            expected_code=200
        )
    except Exception as e:
        return TestResult(
            name="性能测试",
            status=TestStatus.ERROR,
            error_message=str(e)
        )
```

## 故障排除

### 常见问题

1. **连接失败**
   - 确保后端服务正在运行
   - 检查端口是否正确
   - 验证防火墙设置

2. **测试失败**
   - 检查API实现
   - 验证数据验证逻辑
   - 确认错误处理机制

3. **依赖问题**
   - 运行 `uv sync` 安装依赖
   - 确保requests库已安装

### 调试模式

可以修改脚本添加调试信息：

```python
# 在APITester类中添加
def __init__(self, base_url: str = "http://localhost:8000", debug: bool = False):
    self.debug = debug
    # ... 其他初始化代码

# 在测试方法中添加调试输出
if self.debug:
    print(f"请求: {method} {url}")
    print(f"数据: {data}")
```

## 最佳实践

1. **定期运行测试**
   - 在代码变更后运行测试
   - 在部署前验证API功能

2. **监控测试结果**
   - 关注响应时间变化
   - 分析失败模式

3. **维护测试数据**
   - 定期清理测试报告
   - 归档重要的测试结果

4. **团队协作**
   - 分享测试报告
   - 讨论测试覆盖范围
   - 持续改进测试策略 