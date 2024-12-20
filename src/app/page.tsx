import Link from "next/link";
import Image from "next/image";
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="relative z-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link
          href="/create"
          className="bg-sky-600 text-white px-4 py-2 rounded mb-10 text-center flex items-center justify-center space-x-2"
        >
          <span>Create Task</span>
          <Image
              src="/plus.svg"
              alt="Plus logo"
              width={16}
              height={16}
              priority
          />
        </Link>
      </div>
      <TaskList />
    </main>
  );
}
