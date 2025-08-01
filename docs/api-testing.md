# API 接口测试文档

## 测试环境

- **Base URL**: `http://localhost:8000/api/v1`
- **Content-Type**: `application/json`

## 测试用例

### 1. 获取所有待办事项

```bash
curl -X GET "http://localhost:8000/api/v1/todos"
```

### 2. 创建待办事项

```bash
curl -X POST "http://localhost:8000/api/v1/todos" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试任务",
    "description": "这是一个测试任务"
  }'
```

### 3. 更新待办事项

```bash
curl -X PUT "http://localhost:8000/api/v1/todos/1" \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### 4. 删除待办事项

```bash
curl -X DELETE "http://localhost:8000/api/v1/todos/1"
```

### 5. 批量删除已完成

```bash
curl -X DELETE "http://localhost:8000/api/v1/todos/completed"
```

## 使用Postman测试

导入以下集合到Postman：

```json
{
  "info": {
    "name": "TodoListV2 API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "获取所有待办事项",
      "request": {
        "method": "GET",
        "url": "http://localhost:8000/api/v1/todos"
      }
    },
    {
      "name": "创建待办事项",
      "request": {
        "method": "POST",
        "url": "http://localhost:8000/api/v1/todos",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"新任务\",\n  \"description\": \"任务描述\"\n}"
        }
      }
    }
  ]
}
``` 