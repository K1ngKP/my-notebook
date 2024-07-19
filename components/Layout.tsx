import { FC, ReactNode } from 'react';
import Link from 'next/link';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <div>
            <Link href="/">Home</Link>
          </div>
          <div className="space-x-4">
            <Link href="/mysql">MySQL</Link>
            <Link href="/oop">OOP</Link>
            <Link href="/system-design">System Design</Link>
            <Link href="/operating-systems">Operating Systems</Link>
            <Link href="/networking">Networking</Link>
            <Link href="/api-protocols">API Protocols</Link>
            <Link href="/dsa-patterns">DSA Patterns</Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;
