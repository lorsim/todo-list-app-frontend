'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from '../../components/TaskForm';

export default function CreateTask() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (title: string, color: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, color }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      router.push('/');
    } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`An error occurred while creating the task: ${error.message}`);
        } else {
          setError('An unexpected error occurred while creating the task.');
        }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Create Task</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}