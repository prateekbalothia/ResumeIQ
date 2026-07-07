"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogOut, History, Brain, LogIn, UserPlus } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 rounded-2xl border border-black/10 dark:border-white/10 glass-card shadow-lg shadow-black/5 dark:shadow-white/5">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <Link href={isAuthenticated ? "/analyze" : "/"} className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary-blue animate-pulse" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Resume<span className="text-primary-blue">IQ</span>
          </span>
        </Link>

        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/analyze"
              className={`text-sm font-medium transition-colors hover:text-primary-blue ${
                isActive("/analyze") ? "text-primary-blue" : "text-muted-foreground"
              }`}
            >
              Analyze Resume
            </Link>
            <Link
              href="/history"
              className={`text-sm font-medium transition-colors hover:text-primary-blue ${
                isActive("/history") ? "text-primary-blue" : "text-muted-foreground"
              }`}
            >
              History
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline-block">
                Hello, <span className="font-semibold text-foreground">{user?.name}</span>
              </span>
              {/* Mobile history link */}
              <Link
                href="/history"
                className="md:hidden p-2 rounded-lg hover:bg-black/5 hover:dark:bg-white/5 text-muted-foreground hover:text-primary-blue"
                title="History"
              >
                <History className="h-5 w-5" />
              </Link>
              <button
                onClick={logout}
                className="cursor-pointer text-sm font-medium flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all text-muted-foreground animate-in fade-in duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button
                  className={`cursor-pointer text-sm font-medium flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-transparent hover:border-black/10 hover:dark:border-white/10 hover:bg-black/5 hover:dark:bg-white/5 transition-all ${
                    isActive("/login") ? "text-primary-blue" : "text-muted-foreground"
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="cursor-pointer text-sm font-medium flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-blue text-white hover:bg-primary-blue/90 shadow-lg shadow-primary-blue/20 transition-all">
                  <UserPlus className="h-4 w-4" />
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
