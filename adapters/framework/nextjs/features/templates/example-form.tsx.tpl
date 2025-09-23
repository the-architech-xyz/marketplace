'use client';

import React, { useState, useTransition } from 'react';
import { getCounter, incrementCounter, decrementCounter, resetCounter } from '../../lib/actions/example-actions.js';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Load initial count
  React.useEffect(() => {
    const loadCount = async () => {
      const result = await getCounter();
      if (result.success && result.data) {
        setCount(result.data.value);
      }
    };
    loadCount();
  }, []);

  const handleIncrement = () => {
    startTransition(async () => {
      setError(null);
      const result = await incrementCounter();
      
      if (result.success && result.data) {
        setCount(result.data.value);
      } else {
        setError(result.error || 'Failed to increment counter');
      }
    });
  };

  const handleDecrement = () => {
    startTransition(async () => {
      setError(null);
      const result = await decrementCounter();
      
      if (result.success && result.data) {
        setCount(result.data.value);
      } else {
        setError(result.error || 'Failed to decrement counter');
      }
    });
  };

  const handleReset = () => {
    startTransition(async () => {
      setError(null);
      const result = await resetCounter();
      
      if (result.success && result.data) {
        setCount(result.data.value);
      } else {
        setError(result.error || 'Failed to reset counter');
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Server Actions Counter</h2>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-blue-600 mb-2">{count}</div>
        <p className="text-gray-600">Current count value</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-2 justify-center">
        <button
          onClick={handleDecrement}
          disabled={isPending}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '...' : '-'}
        </button>
        
        <button
          onClick={handleReset}
          disabled={isPending}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '...' : 'Reset'}
        </button>
        
        <button
          onClick={handleIncrement}
          disabled={isPending}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '...' : '+'}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        This counter uses Server Actions to manage state
      </div>
    </div>
  );
};
    },
    // Create contact form component
    {
