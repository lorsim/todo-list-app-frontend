'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TaskFormProps {
  onSubmit: (title: string, color: string) => void;
  initialTitle?: string;
  initialColor?: string;
}

const colorOptions = [
  { name: 'red', class: 'bg-red-500' },
  { name: 'orange', class: 'bg-orange-500' },
  { name: 'yellow', class: 'bg-yellow-500' },
  { name: 'green', class: 'bg-green-500' },
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'purple', class: 'bg-purple-500' },
  { name: 'pink', class: 'bg-pink-500' },
];

export default function TaskForm({ onSubmit, initialTitle = '', initialColor = 'bg-gray-700' }: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, color);
  };

  const isEditing = Boolean(initialTitle);

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="mt-4 mb-6 flex items-center"> 
        <Link
          href="/"
          className="text-white inline-block" 
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
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="space-y-4">
          <label htmlFor="title" className="block text-sm font-bold text-sky-400 mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
            className="w-full p-2 mb-4 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        
          <div className="mb-4">
            <label htmlFor="color" className="block text-sm font-bold text-sky-400 mb-2">Color</label>
            <div className="flex items-center space-x-3">
              {colorOptions.map((option) => (
                <button
                  key={option.name}
                  type="button" 
                  onClick={() => setColor(option.class)}
                  className={`w-8 h-8 rounded-full border-2 border-white ${option.class} hover:scale-110 transition ${color === option.class ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}`}
                ></button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded text-center flex items-center justify-center space-x-2 hover:bg-blue-600 transition">
              <span>{isEditing ? 'Save Task' : 'Add Task'}</span>
              <span className="flex items-center justify-center w-6 h-6">
                {isEditing
                    ?
                    <Image
                        src="/mdi_check-bold.svg"
                        alt="Check icon"
                        width={15}
                        height={15}
                        priority
                    />
                    :
                    <Image
                        src="/plus.svg"
                        alt="Plus icon"
                        width={15}
                        height={15}
                        priority
                    />
                }
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
