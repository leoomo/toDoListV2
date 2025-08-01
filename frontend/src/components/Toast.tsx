// 通用提示组件 (Toast)
'use client';

import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string | null;
  type: ToastType;
  onDismiss: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Toast({ 
  message, 
  type, 
  onDismiss, 
  autoClose = true, 
  duration = 3000 
}: ToastProps) {
  useEffect(() => {
    if (message && autoClose) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, autoClose, duration, onDismiss]);

  if (!message) return null;

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-400',
      iconPath: (
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      ),
      closeHover: 'hover:text-green-600',
      closeFocus: 'focus:ring-green-500'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-400',
      iconPath: (
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      ),
      closeHover: 'hover:text-red-600',
      closeFocus: 'focus:ring-red-500'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-400',
      iconPath: (
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      ),
      closeHover: 'hover:text-blue-600',
      closeFocus: 'focus:ring-blue-500'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-400',
      iconPath: (
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      ),
      closeHover: 'hover:text-yellow-600',
      closeFocus: 'focus:ring-yellow-500'
    }
  };

  const currentStyle = styles[type];

  return (
    <div className={`${currentStyle.bg} ${currentStyle.border} border rounded-md p-4 mb-6 animate-in slide-in-from-top duration-300`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className={`h-5 w-5 ${currentStyle.icon}`} viewBox="0 0 20 20" fill="currentColor">
            {currentStyle.iconPath}
          </svg>
        </div>
        <div className="ml-3">
          <p className={`text-sm ${currentStyle.text}`}>{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={onDismiss}
            className={`${currentStyle.icon} ${currentStyle.closeHover} focus:outline-none focus:ring-2 ${currentStyle.closeFocus} focus:ring-offset-2 rounded-md p-1 transition-colors duration-200`}
          >
            <span className="sr-only">关闭</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}