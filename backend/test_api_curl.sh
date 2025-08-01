#!/bin/bash

# API测试脚本 - 使用curl
BASE_URL="http://localhost:8000"
API_BASE_URL="$BASE_URL/api/v1"

echo "🚀 开始API测试..."
echo "=================================================="

# 测试根路径
echo "🔍 测试根路径..."
curl -s "$BASE_URL/" | jq .
echo "✅ 根路径测试完成"
echo ""

# 测试健康检查
echo "🔍 测试健康检查..."
curl -s "$BASE_URL/health" | jq .
echo "✅ 健康检查测试完成"
echo ""

# 测试创建待办事项
echo "🔍 测试创建待办事项..."
CREATE_RESPONSE=$(curl -s -X POST "$API_BASE_URL/todos/" \
  -H "Content-Type: application/json" \
  -d '{"title": "测试任务", "description": "这是一个测试任务"}')
echo "$CREATE_RESPONSE" | jq .
TODO_ID=$(echo "$CREATE_RESPONSE" | jq -r '.id')
echo "✅ 创建待办事项测试完成，ID: $TODO_ID"
echo ""

# 测试获取待办事项列表
echo "🔍 测试获取待办事项列表..."
curl -s "$API_BASE_URL/todos/" | jq .
echo "✅ 获取待办事项列表测试完成"
echo ""

# 测试根据ID获取待办事项
echo "🔍 测试根据ID获取待办事项..."
curl -s "$API_BASE_URL/todos/$TODO_ID" | jq .
echo "✅ 根据ID获取待办事项测试完成"
echo ""

# 测试更新待办事项
echo "🔍 测试更新待办事项..."
curl -s -X PUT "$API_BASE_URL/todos/$TODO_ID" \
  -H "Content-Type: application/json" \
  -d '{"title": "更新后的任务", "description": "更新后的描述", "completed": true}' | jq .
echo "✅ 更新待办事项测试完成"
echo ""

# 测试部分更新待办事项
echo "🔍 测试部分更新待办事项..."
curl -s -X PUT "$API_BASE_URL/todos/$TODO_ID" \
  -H "Content-Type: application/json" \
  -d '{"completed": false}' | jq .
echo "✅ 部分更新待办事项测试完成"
echo ""

# 测试筛选功能
echo "🔍 测试筛选功能..."
echo "获取已完成的待办事项:"
curl -s "$API_BASE_URL/todos/?completed=true" | jq .
echo "获取未完成的待办事项:"
curl -s "$API_BASE_URL/todos/?completed=false" | jq .
echo "✅ 筛选功能测试完成"
echo ""

# 测试分页功能
echo "🔍 测试分页功能..."
curl -s "$API_BASE_URL/todos/?limit=1&offset=0" | jq .
echo "✅ 分页功能测试完成"
echo ""

# 测试错误处理
echo "🔍 测试错误处理..."
echo "获取不存在的待办事项:"
curl -s -w "HTTP状态码: %{http_code}\n" "$API_BASE_URL/todos/999"
echo "创建无效待办事项:"
curl -s -X POST "$API_BASE_URL/todos/" \
  -H "Content-Type: application/json" \
  -d '{"description": "只有描述"}' | jq .
echo "✅ 错误处理测试完成"
echo ""

# 测试删除待办事项
echo "🔍 测试删除待办事项..."
curl -s -X DELETE "$API_BASE_URL/todos/$TODO_ID" -w "HTTP状态码: %{http_code}\n"
echo "验证删除:"
curl -s -w "HTTP状态码: %{http_code}\n" "$API_BASE_URL/todos/$TODO_ID"
echo "✅ 删除待办事项测试完成"
echo ""

# 测试批量删除
echo "🔍 测试批量删除..."
echo "删除已完成的待办事项:"
curl -s -X DELETE "$API_BASE_URL/todos/completed" -w "HTTP状态码: %{http_code}\n"
echo "删除所有待办事项:"
curl -s -X DELETE "$API_BASE_URL/todos/all" -w "HTTP状态码: %{http_code}\n"
echo "✅ 批量删除测试完成"
echo ""

echo "=================================================="
echo "🎉 所有API测试完成！" 