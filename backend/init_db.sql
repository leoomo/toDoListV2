-- TodoListV2 数据库初始化脚本
-- 文件名: init_db.sql
-- 描述: 创建待办事项应用的数据库表结构和初始数据

-- 删除已存在的表（如果存在）
DROP TABLE IF EXISTS todos;

-- 创建todos表
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提高查询性能
CREATE INDEX idx_todos_completed ON todos(completed);
CREATE INDEX idx_todos_created_at ON todos(created_at);
CREATE INDEX idx_todos_title ON todos(title);

-- 创建触发器，自动更新updated_at字段
CREATE TRIGGER update_todos_updated_at
    AFTER UPDATE ON todos
    FOR EACH ROW
BEGIN
    UPDATE todos SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- 插入示例数据
INSERT INTO todos (title, description, completed) VALUES
    ('完成项目文档', '编写技术架构文档和API说明文档', FALSE),
    ('学习React Hooks', '掌握useState、useEffect和useContext的使用方法', TRUE),
    ('部署应用', '将TodoListV2应用部署到生产环境', FALSE),
    ('代码审查', '对前端和后端代码进行全面的代码审查', FALSE),
    ('性能优化', '优化应用性能，包括数据库查询和前端渲染', TRUE),
    ('单元测试', '为所有功能模块编写单元测试', FALSE),
    ('用户界面优化', '根据用户反馈优化用户界面设计', FALSE),
    ('数据库备份', '设置自动数据库备份策略', TRUE);

-- 验证数据插入
SELECT '数据库初始化完成！' as message;
SELECT COUNT(*) as total_todos FROM todos;
SELECT COUNT(*) as completed_todos FROM todos WHERE completed = TRUE;
SELECT COUNT(*) as pending_todos FROM todos WHERE completed = FALSE; 