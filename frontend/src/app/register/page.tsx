"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Mail, Lock, User, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ClickSpark from "@/components/ui/ClickSpark";
import Aurora from "@/components/ui/Aurora";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await register(name, email, password);
    } catch (err: any) {
      setError(err || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClickSpark
      sparkColor="#3B82F6"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={450}
    >
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-65 pointer-events-none">
          <Aurora
            colorStops={["#b067ff", "#9c97cf", "#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.2}
          />
        </div>

        <div className="w-full max-w-md relative z-10">
          <Card className="glass-card rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl">
            <CardHeader className="space-y-1 text-center pt-8">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Create Account
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Get started with your ResumeIQ analyzer account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-sm transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-error font-medium text-sm text-center animate-in fade-in duration-200">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer h-11 glass-button-primary rounded-xl font-semibold border-white/10 text-white hover:border-white/20 mt-4 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Register
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary-blue hover:underline font-medium inline-flex items-center gap-0.5"
                >
                  Login
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </ClickSpark>
  );
}
