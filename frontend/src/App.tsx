import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { Todo, FilterType } from './types/todo';
import { todoApi } from './services/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取所有待办事项
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await todoApi.getTodos();
      setTodos(response.items);
    } catch (err) {
      console.error('获取待办事项失败:', err);
      setError('获取待办事项失败，请检查网络连接');
    } finally {
      setIsLoading(false);
    }
  };

  // 根据筛选条件过滤待办事项
  useEffect(() => {
    let filtered: Todo[];
    switch (currentFilter) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        filtered = todos;
    }
    setFilteredTodos(filtered);
  }, [todos, currentFilter]);

  // 组件挂载时获取数据
  useEffect(() => {
    fetchTodos();
  }, []);

  // 添加待办事项
  const handleAddTodo = async (title: string, description?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const newTodo = await todoApi.createTodo({ title, description });
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      console.error('添加待办事项失败:', err);
      setError('添加待办事项失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 切换完成状态
  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, { completed });
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      console.error('更新待办事项失败:', err);
      setError('更新待办事项失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 删除待办事项
  const handleDeleteTodo = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('删除待办事项失败:', err);
      setError('删除待办事项失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 清除已完成的待办事项
  const handleClearCompleted = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await todoApi.deleteCompleted();
      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (err) {
      console.error('清除已完成待办事项失败:', err);
      setError('清除已完成待办事项失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 清除所有待办事项
  const handleClearAll = async () => {
    if (!window.confirm('确定要删除所有待办事项吗？此操作不可撤销。')) {
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      await todoApi.deleteAll();
      setTodos([]);
    } catch (err) {
      console.error('清除所有待办事项失败:', err);
      setError('清除所有待办事项失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 计算统计信息
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TodoListV2
          </h1>
          <p className="text-gray-600">
            现代化的待办事项管理应用
          </p>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 添加表单 */}
        <TodoForm onAddTodo={handleAddTodo} isLoading={isLoading} />

        {/* 筛选和批量操作 */}
        <TodoFilter
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          onClearCompleted={handleClearCompleted}
          onClearAll={handleClearAll}
          totalCount={totalCount}
          completedCount={completedCount}
          activeCount={activeCount}
          isLoading={isLoading}
        />

        {/* 待办事项列表 */}
        <div className="mt-6">
          <TodoList
            todos={filteredTodos}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
            isLoading={isLoading}
          />
        </div>

        {/* 加载状态 */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">处理中...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
