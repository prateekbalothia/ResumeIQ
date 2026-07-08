"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogOut, History, Brain, LogIn, UserPlus, Menu, X, Home } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 rounded-2xl border border-black/10 dark:border-white/10 glass-card shadow-lg shadow-black/5 dark:shadow-white/5 transition-all duration-300 overflow-hidden">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <Link href={isAuthenticated ? "/analyze" : "/"} className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary-blue animate-pulse" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Resume<span className="text-primary-blue">IQ</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          {/* Desktop Auth State */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Hello, <span className="font-semibold text-foreground">{user?.name}</span>
                </span>
                <button
                  onClick={logout}
                  className="cursor-pointer text-sm font-medium flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all text-muted-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 hover:dark:bg-white/10 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-black/5 dark:border-white/5 px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 backdrop-blur-sm backdrop-saturate-200 overflow-hidden">
          {isAuthenticated ? (
            <>
              <div className="text-sm text-muted-foreground border-b border-black/5 dark:border-white/5 pb-2">
                Hello, <span className="font-semibold text-foreground">{user?.name}</span>
              </div>
              <Link
                href="/analyze"
                className={`text-sm font-medium py-1 transition-colors flex items-center gap-2 hover:text-primary-blue ${
                  isActive("/analyze") ? "text-primary-blue" : "text-muted-foreground"
                }`}
              >
                <Brain className="h-4.5 w-4.5" />
                Analyze Resume
              </Link>
              <Link
                href="/history"
                className={`text-sm font-medium py-1 transition-colors flex items-center gap-2 hover:text-primary-blue ${
                  isActive("/history") ? "text-primary-blue" : "text-muted-foreground"
                }`}
              >
                <History className="h-4.5 w-4.5" />
                History
              </Link>
              <button
                onClick={logout}
                className="cursor-pointer text-sm font-medium flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-red-500/10 bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-all mt-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`text-sm font-medium py-1 transition-colors flex items-center gap-2 hover:text-primary-blue ${
                  isActive("/") ? "text-primary-blue" : "text-muted-foreground"
                }`}
              >
                <Home className="h-4.5 w-4.5" />
                Home
              </Link>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Link href="/login" className="w-full">
                  <button
                    className={`cursor-pointer text-sm font-medium flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 hover:dark:bg-white/10 transition-all ${
                      isActive("/login") ? "text-primary-blue border-primary-blue/30" : "text-muted-foreground"
                    }`}
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>
                </Link>
                <Link href="/register" className="w-full">
                  <button className="cursor-pointer text-sm font-medium flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-primary-blue text-white hover:bg-primary-blue/90 shadow-lg shadow-primary-blue/20 transition-all">
                    <UserPlus className="h-4 w-4" />
                    Register
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
