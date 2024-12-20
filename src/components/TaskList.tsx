'use client';

import Image from "next/image"; 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Task } from '../types';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`${process.env.API_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  };

  const toggleTask = async (id: number, completed: boolean) => {
    await fetch(`${process.env.API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await fetch(`${process.env.API_URL}/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4 text-white">
        <p className="text-sky-400 font-bold">
          Tasks:
          <span className="text-white bg-gray-700 px-2 py-1 ml-3 rounded-full">{tasks.length}</span>
        </p>
        <p className="text-indigo-500 font-bold">
          Completed:
          <span className="text-white bg-gray-700 px-2 py-1 ml-3 rounded-full">
            {completedTasks} of {tasks.length}
          </span>
        </p>
      </div>
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center text-center text-white mt-14">
          <Image
            src="/Clipboard.svg"
            alt="Clipboard icon"
            width={48}
            height={48}
            priority
            className="mb-6"
          />
          <p className="text-gray-500 font-bold">You don't have any tasks registered yet.</p>
          <p className="pt-4 text-gray-400">Create tasks to organize your to-do items.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map(task => (
            <div key={task.id} className={`bg-gray-800 rounded-lg p-4 shadow-md text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id, task.completed)}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 mr-2 border-2 border-blue-500 rounded-full flex items-center justify-center cursor-pointer ${
                      task.completed ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                    onClick={() => toggleTask(task.id, task.completed)}
                  >
                    {task.completed && <div className="w-3 h-3 bg-white rounded-full"></div>}
                  </div>
                  <Link href={`/edit/${task.id}`} className={`text-white ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                  </Link>
                </div>
                <div className="flex items-center">
                  <button onClick={() => deleteTask(task.id)} className="text-gray-500 hover:text-gray-700">
                    <Image
                        src="/trash.svg"
                        alt="Trash icon"
                        width={13}
                        height={14}
                        priority
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
