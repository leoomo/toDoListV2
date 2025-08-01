#!/usr/bin/env python3
"""
API测试脚本
测试TodoListV2后端的所有接口
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"
API_BASE_URL = f"{BASE_URL}/api/v1"

def test_root_endpoint():
    """测试根路径"""
    print("🔍 测试根路径...")
    response = requests.get(BASE_URL)
    assert response.status_code == 200
    data = response.json()
    print(f"✅ 根路径测试通过: {data}")
    return data

def test_health_check():
    """测试健康检查"""
    print("🔍 测试健康检查...")
    response = requests.get(f"{BASE_URL}/health")
    assert response.status_code == 200
    data = response.json()
    print(f"✅ 健康检查测试通过: {data}")
    return data

def test_create_todo():
    """测试创建待办事项"""
    print("🔍 测试创建待办事项...")
    todo_data = {
        "title": "测试任务",
        "description": "这是一个测试任务"
    }
    response = requests.post(f"{API_BASE_URL}/todos", json=todo_data)
    assert response.status_code == 201
    data = response.json()
    print(f"✅ 创建待办事项测试通过: {data}")
    return data

def test_create_todo_minimal():
    """测试创建最小待办事项（只有标题）"""
    print("🔍 测试创建最小待办事项...")
    todo_data = {"title": "最小任务"}
    response = requests.post(f"{API_BASE_URL}/todos", json=todo_data)
    assert response.status_code == 201
    data = response.json()
    print(f"✅ 创建最小待办事项测试通过: {data}")
    return data

def test_get_todos():
    """测试获取待办事项列表"""
    print("🔍 测试获取待办事项列表...")
    response = requests.get(f"{API_BASE_URL}/todos")
    assert response.status_code == 200
    data = response.json()
    print(f"✅ 获取待办事项列表测试通过: 总数={data['total']}")
    return data

def test_get_todo_by_id(todo_id):
    """测试根据ID获取待办事项"""
    print(f"🔍 测试根据ID获取待办事项 (ID: {todo_id})...")
    response = requests.get(f"{API_BASE_URL}/todos/{todo_id}")
    assert response.status_code == 200
    data = response.json()
    print(f"✅ 根据ID获取待办事项测试通过: {data}")
    return data

def test_update_todo(todo_id):
    """测试更新待办事项"""
    print(f"🔍 测试更新待办事项 (ID: {todo_id})...")
    update_data = {
        "title": "更新后的任务",
        "description": "更新后的描述",
        "completed": True
    }
    response = requests.put(f"{API_BASE_URL}/todos/{todo_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    print(f"✅ 更新待办事项测试通过: {data}")
    return data

def test_update_todo_partial(todo_id):
    """测试部分更新待办事项"""
    print(f"🔍 测试部分更新待办事项 (ID: {todo_id})...")
    update_data = {"completed": False}
    response = requests.put(f"{API_BASE_URL}/todos/{todo_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    print(f"✅ 部分更新待办事项测试通过: {data}")
    return data

def test_get_todos_with_filter():
    """测试带筛选条件的待办事项列表"""
    print("🔍 测试带筛选条件的待办事项列表...")
    
    # 测试获取已完成的
    response = requests.get(f"{API_BASE_URL}/todos?completed=true")
    assert response.status_code == 200
    data = response.json()
    print(f"✅ 获取已完成待办事项测试通过: 总数={data['total']}")
    
    # 测试获取未完成的
    response = requests.get(f"{API_BASE_URL}/todos?completed=false")
    assert response.status_code == 200
    data = response.json()
    print(f"✅ 获取未完成待办事项测试通过: 总数={data['total']}")
    
    return data

def test_get_todos_with_pagination():
    """测试分页功能"""
    print("🔍 测试分页功能...")
    response = requests.get(f"{API_BASE_URL}/todos?limit=2&offset=0")
    assert response.status_code == 200
    data = response.json()
    print(f"✅ 分页功能测试通过: limit={data['limit']}, offset={data['offset']}, 总数={data['total']}")
    return data

def test_delete_todo(todo_id):
    """测试删除待办事项"""
    print(f"🔍 测试删除待办事项 (ID: {todo_id})...")
    response = requests.delete(f"{API_BASE_URL}/todos/{todo_id}")
    assert response.status_code == 204
    print(f"✅ 删除待办事项测试通过")
    
    # 验证已删除
    response = requests.get(f"{API_BASE_URL}/todos/{todo_id}")
    assert response.status_code == 404
    print(f"✅ 验证删除成功")

def test_delete_completed_todos():
    """测试批量删除已完成的待办事项"""
    print("🔍 测试批量删除已完成的待办事项...")
    response = requests.delete(f"{API_BASE_URL}/todos/completed")
    assert response.status_code == 204
    print(f"✅ 批量删除已完成待办事项测试通过")

def test_delete_all_todos():
    """测试删除所有待办事项"""
    print("🔍 测试删除所有待办事项...")
    response = requests.delete(f"{API_BASE_URL}/todos/all")
    assert response.status_code == 204
    print(f"✅ 删除所有待办事项测试通过")

def test_error_handling():
    """测试错误处理"""
    print("🔍 测试错误处理...")
    
    # 测试获取不存在的待办事项
    response = requests.get(f"{API_BASE_URL}/todos/999")
    assert response.status_code == 404
    print(f"✅ 获取不存在待办事项错误处理测试通过")
    
    # 测试创建无效待办事项（缺少标题）
    response = requests.post(f"{API_BASE_URL}/todos", json={"description": "只有描述"})
    assert response.status_code == 422
    print(f"✅ 创建无效待办事项错误处理测试通过")

def main():
    """主测试函数"""
    print("🚀 开始API测试...")
    print("=" * 50)
    
    try:
        # 基础测试
        test_root_endpoint()
        test_health_check()
        
        # 创建测试数据
        todo1 = test_create_todo()
        todo2 = test_create_todo_minimal()
        
        # 获取和更新测试
        test_get_todos()
        test_get_todo_by_id(todo1['id'])
        test_update_todo(todo1['id'])
        test_update_todo_partial(todo1['id'])
        
        # 筛选和分页测试
        test_get_todos_with_filter()
        test_get_todos_with_pagination()
        
        # 错误处理测试
        test_error_handling()
        
        # 删除测试
        test_delete_todo(todo2['id'])
        test_delete_completed_todos()
        test_delete_all_todos()
        
        print("=" * 50)
        print("🎉 所有API测试通过！")
        
    except Exception as e:
        print(f"❌ 测试失败: {e}")
        raise

if __name__ == "__main__":
    main() 