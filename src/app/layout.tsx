import Image from "next/image"; 
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo List App",
  description: "Todo List App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-md mx-auto bg-gray-900 rounded-lg shadow-lg p-4 md:max-w-2xl pt-60">
        <header className="bg-black fixed top-0 left-0 w-full text-center h-60 z-10 flex items-center justify-center">
        <div className="flex items-center space-x-2">
            <Image
                src="/rocket.svg"
                alt="Todo App Logo"
                width={22}
                height={36}
                priority
            />
          <h1 className="text-3xl font-bold flex space-x-1 w-[192px] h-[48px]">
            <span className="text-sky-400">Todo</span>
            <span className="text-indigo-500">App</span>
          </h1>
        </div>
      </header>
        {children}
      </body>
    </html>
  );
}
