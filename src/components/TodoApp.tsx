import React from 'react';
import { useTodoStore } from '../store/todoStore';
import type { Todo } from '../types/todo';

export default function TodoApp() {
  const {
    todos,
    inputText,
    editingTodo,
    selectedTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setInputText,
    setEditingTodo,
    setSelectedTodo,
  } = useTodoStore();

  // 未完了のタスク
  const activeTodos = todos.filter(todo => !todo.completed);
  // 完了済みのタスク
  const completedTodos = todos.filter(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTodo) {
      updateTodo(editingTodo.id, inputText);
    } else {
      addTodo(inputText);
    }
  };

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleAddClick = () => {
    if (inputText.trim()) {
      addTodo(inputText);
    }
  };

  const handleEditClick = () => {
    if (selectedTodo) {
      setEditingTodo(selectedTodo);
    }
  };

  const handleDeleteClick = () => {
    if (selectedTodo) {
      deleteTodo(selectedTodo.id);
    }
  };

  const handleCheckboxChange = (todo: Todo) => {
    toggleTodo(todo.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            やることリスト
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Instructions Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">使い方</h2>
          <div className="space-y-3 text-gray-700 text-[15px] leading-relaxed">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm mt-0.5">1</div>
              <p>下の入力欄にタスクを入力して「追加」ボタンをクリックすると、左側の「進行中」リストに追加されます。</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm mt-0.5">2</div>
              <p>タスクの左側にある丸いチェックボックスをクリックすると、タスクが完了状態になり、右側の「完了」リストに移動します。</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm mt-0.5">3</div>
              <p>完了したタスクのチェックボックスを再度クリックすると、未完了状態に戻り、「進行中」リストに戻ります。</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm mt-0.5">4</div>
              <p>タスクをクリックして選択し、「編集」ボタンをクリックすると、タスクの内容を変更できます。</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm mt-0.5">5</div>
              <p>タスクをクリックして選択し、「削除」ボタンをクリックすると、タスクを削除できます。</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm mt-0.5">6</div>
              <p>タスクはブラウザに自動保存されるため、ページを閉じても次回アクセス時に復元されます。</p>
            </div>
          </div>
        </div>

        {/* Task Lists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Active Tasks */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                進行中
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {activeTodos.length}
                </span>
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {activeTodos.map((todo) => (
                  <div
                    key={todo.id}
                    onClick={() => handleTodoClick(todo)}
                    className={`group flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedTodo?.id === todo.id
                        ? 'bg-blue-50 ring-2 ring-blue-500 ring-inset'
                        : 'hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(todo);
                      }}
                      className="flex-shrink-0"
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        todo.completed 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300 hover:border-blue-400'
                      }`}>
                        {todo.completed && (
                          <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="flex-1 text-gray-900 text-[15px] leading-snug">
                      {todo.text}
                    </span>
                  </div>
                ))}
                {activeTodos.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">タスクがありません</p>
                    <p className="text-gray-400 text-xs mt-1">新しいタスクを追加しましょう</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                完了
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {completedTodos.length}
                </span>
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {completedTodos.map((todo) => (
                  <div
                    key={todo.id}
                    onClick={() => handleTodoClick(todo)}
                    className={`group flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedTodo?.id === todo.id
                        ? 'bg-green-50 ring-2 ring-green-500 ring-inset'
                        : 'hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(todo);
                      }}
                      className="flex-shrink-0"
                    >
                      <div className="w-5 h-5 rounded-full border-2 bg-green-500 border-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <span className="flex-1 text-gray-500 line-through text-[15px] leading-snug">
                      {todo.text}
                    </span>
                  </div>
                ))}
                {completedTodos.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">完了したタスクがありません</p>
                    <p className="text-gray-400 text-xs mt-1">タスクを完了させましょう</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {editingTodo ? 'タスクを編集' : '新しいタスク'}
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="タスクを入力してください..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-gray-900 placeholder-gray-400 text-[15px]"
                rows={3}
              />
            </div>

            {editingTodo && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-xl">
                <svg className="w-5 h-5 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span className="text-sm text-blue-700 font-medium">
                  編集中: {editingTodo.text}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTodo(null);
                    setInputText('');
                  }}
                  className="ml-auto text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  キャンセル
                </button>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow text-sm"
              >
                {editingTodo ? '更新' : '追加'}
              </button>
              <button
                type="button"
                onClick={handleEditClick}
                disabled={!selectedTodo}
                className="flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-all duration-200 text-sm"
              >
                編集
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={!selectedTodo}
                className="flex-1 bg-red-50 hover:bg-red-100 active:bg-red-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-red-600 font-medium py-2.5 px-4 rounded-xl transition-all duration-200 text-sm"
              >
                削除
              </button>
            </div>
          </form>
        </div>

        {/* Selected Task Info */}
        {selectedTodo && (
          <div className="bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-200/60 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-700">選択中:</span>
                <span className="text-sm text-gray-700">{selectedTodo.text}</span>
              </div>
              <button
                onClick={() => setSelectedTodo(null)}
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
