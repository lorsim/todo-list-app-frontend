'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from './TaskForm';
import { Task } from '../types';
import Image from 'next/image';
import Link from 'next/link';

export default function EditTaskForm({ id }: {id:string}) {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/tasks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const data: Task = await response.json();
        if (!data.title || !data.color) {
          throw new Error('Invalid task data received from server');
        }

        setTask(data);
      } catch (error: unknown) {
          if (error instanceof Error) {
            setError(`An error occurred while fetching the task: ${error.message}`);
          } else {
            setError('An unexpected error occurred while fetching the task.');
          }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (title: string, color: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, color }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update task with ID: ${id}`);
      }

      router.push('/');
    } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`An error occurred while updating the task: ${error.message}`);
        } else {
          setError('An unexpected error occurred while updating the task.');
        }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="mt-4 mb-6">
        <Link
          href="/"
          className="text-white p-2 inline-block"
          aria-label="Back to Task List"
        >
          <Image
            src="/arrow-left.svg"
            alt="Arrow left icon"
            width={24}
            height={24}
            priority
          />
        </Link>
      </div>
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
      </div>
    </div>
  );
}

if (!task) {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="mt-4 mb-6">
        <Link
          href="/"
          className="text-white p-2 inline-block"
          aria-label="Back to Task List"
        >
          <Image
            src="/arrow-left.svg"
            alt="Arrow left icon"
            width={24}
            height={24}
            priority
          />
        </Link>
      </div>
      <div className="text-center">
        <p className="mb-4">Task not found</p>
      </div>
    </div>
  );
}


  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <TaskForm onSubmit={handleSubmit} initialTitle={task.title} initialColor={task.color} />
    </div>
  );
}