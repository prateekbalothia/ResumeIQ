"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { Analysis } from "@/types/analysis";
import { useAuth } from "@/context/AuthContext";
import {
  Loader2,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  Award,
  AlertCircle,
  Sparkles,
  MessageSquare,
  History,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ClickSpark from "@/components/ui/ClickSpark";
import DotField from "@/components/ui/DotField";
import Footer from "@/components/Footer";

interface SavedAnalysis extends Analysis {
  _id: string;
  createdAt: string;
  jobDescription: string;
}

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [history, setHistory] = useState<SavedAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<SavedAnalysis | null>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/analyze/history");
        if (response.data.history) {
          setHistory(response.data.history);
          if (response.data.history.length > 0) {
            setSelectedAnalysis(response.data.history[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load history:", err);
        setError("Failed to retrieve analysis history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAtsColorClass = (score: number) => {
    if (score >= 80) return "border-success text-success bg-success/5";
    if (score >= 60) return "border-warning text-warning bg-warning/5";
    return "border-error text-error bg-error/5";
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background text-foreground">
        <Loader2 className="h-10 w-10 text-primary-blue animate-spin" />
      </div>
    );
  }

  return (
    <ClickSpark
      sparkColor="#3B82F6"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={450}
    >
      <main className="min-h-screen bg-background text-foreground pt-28 pb-12 px-6 relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 pointer-events-none">
          <DotField
            dotRadius={1.2}
            dotSpacing={16}
            bulgeStrength={55}
            glowRadius={150}
            sparkle={false}
            waveAmplitude={1}
            gradientFrom="rgba(59, 130, 246, 0.75)"
            gradientTo="rgba(139, 92, 246, 0.75)"
            glowColor="rgba(59, 130, 246, 0.08)"
          />
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2">
              <History className="h-6 w-6 sm:h-8 sm:w-8 text-primary-blue" />
              Analysis History
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Review and track your resume matching history and ATS performance.
            </p>
          </div>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12">
              <Loader2 className="h-10 w-10 text-primary-blue animate-spin" />
              <p className="text-muted-foreground mt-4 font-medium animate-pulse">
                Retrieving history...
              </p>
            </div>
          ) : error ? (
            <div className="text-center p-12 glass-card rounded-2xl border border-red-500/20 max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 text-error mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">Error</h3>
              <p className="text-muted-foreground mt-1">{error}</p>
            </div>
          ) : history.length === 0 ? (
            <Card className="glass-card border-dashed rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
              <div className="p-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-muted-foreground mb-4 inline-block">
                <FileText className="h-10 w-10 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">No History Yet</h3>
              <p className="text-sm text-muted-foreground mt-2">
                You haven't run any analysis yet. Head to the analyze page to scan your first resume.
              </p>
              <Button
                onClick={() => window.location.href = "/analyze"}
                className="mt-6 glass-button-primary rounded-xl cursor-pointer"
              >
                Analyze Resume
              </Button>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 flex-1 items-start w-full">
              
              {/* History List Side */}
              <div className={`space-y-4 lg:col-span-1 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2 custom-scrollbar ${isMobileDetailOpen ? "hidden lg:block" : "block"}`}>
                {history.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSelectedAnalysis(item);
                      setIsMobileDetailOpen(true);
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all glass-card ${
                      selectedAnalysis?._id === item._id
                        ? "border-primary-blue bg-primary-blue/5 scale-[1.01]"
                        : "border-black/5 dark:border-white/5 hover:border-primary-blue/30 hover:bg-black/5 hover:dark:bg-white/5"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1 min-w-0">
                        <div className="text-sm font-semibold truncate text-foreground">
                          {item.jobDescription.substring(0, 40)}...
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                      <div
                        className={`text-sm font-bold px-2.5 py-1 rounded-full border ${getAtsColorClass(
                          item.atsScore
                        )}`}
                      >
                        {item.atsScore}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail View Side */}
              <div className={`lg:col-span-2 space-y-6 ${isMobileDetailOpen ? "block" : "hidden lg:block"}`}>
                {selectedAnalysis ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    
                    {/* Mobile Back Button */}
                    <button
                      onClick={() => setIsMobileDetailOpen(false)}
                      className="lg:hidden cursor-pointer text-sm font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 hover:dark:bg-white/10 transition-all text-muted-foreground hover:text-foreground"
                    >
                      ← Back to History List
                    </button>
                    
                    {/* Top Stats */}
                    <div className="grid sm:grid-cols-3 gap-6">
                      <Card className="glass-card rounded-2xl flex flex-col justify-center items-center p-6 sm:col-span-1">
                        <div
                          className={`w-24 h-24 rounded-full border-8 flex items-center justify-center text-2xl font-bold ${
                            selectedAnalysis.atsScore >= 80
                              ? "border-success text-success"
                              : selectedAnalysis.atsScore >= 60
                              ? "border-warning text-warning"
                              : "border-error text-error"
                          }`}
                        >
                          {selectedAnalysis.atsScore}%
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground mt-3">
                          ATS Match Score
                        </span>
                      </Card>

                      <Card className="glass-card rounded-2xl p-6 sm:col-span-2 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground flex items-center gap-1.5">
                            <FileText className="h-4.5 w-4.5 text-primary-blue" />
                            Job Description Context
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-4 italic">
                            "{selectedAnalysis.jobDescription}"
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Analyzed on {formatDate(selectedAnalysis.createdAt)}
                        </div>
                      </Card>
                    </div>

                    {/* Skill Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="glass-card rounded-2xl">
                        <CardContent className="p-6">
                          <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                            <CheckCircle2 className="h-4.5 w-4.5 text-success" />
                            Matching Skills
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {selectedAnalysis.matchingSkills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full glass-badge-success px-3 py-1.5 text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card rounded-2xl">
                        <CardContent className="p-6">
                          <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                            <XCircle className="h-4.5 w-4.5 text-error" />
                            Missing Skills
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {selectedAnalysis.missingSkills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full glass-badge-error px-3 py-1.5 text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <Card className="glass-card rounded-2xl">
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                          <Award className="h-4.5 w-4.5 text-success" />
                          Strengths
                        </h2>
                        <ul className="space-y-2 text-sm">
                          {selectedAnalysis.strengths.map((item) => (
                            <li key={item} className="text-muted-foreground">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="glass-card rounded-2xl">
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                          <AlertCircle className="h-4.5 w-4.5 text-warning" />
                          Weaknesses
                        </h2>
                        <ul className="space-y-2 text-sm">
                          {selectedAnalysis.weaknesses.map((item) => (
                            <li key={item} className="text-muted-foreground">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Suggestions */}
                    <Card className="glass-card rounded-2xl">
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                          <Sparkles className="h-4.5 w-4.5 text-primary-blue" />
                          Suggestions
                        </h2>
                        <ul className="space-y-2 text-sm">
                          {selectedAnalysis.suggestions.map((item) => (
                            <li key={item} className="text-muted-foreground">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Interview Questions */}
                    <Card className="glass-card rounded-2xl">
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                          <MessageSquare className="h-4.5 w-4.5 text-primary-blue" />
                          Generated Interview Questions
                        </h2>
                        <div className="space-y-3">
                          {selectedAnalysis.interviewQuestions.map((question) => (
                            <div
                              key={question}
                              className="rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 backdrop-blur-sm text-foreground p-3.5 text-sm"
                            >
                              {question}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="glass-card rounded-2xl p-12 text-center flex flex-col justify-center items-center h-full min-h-[300px]">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground">
                      No Details Selected
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                      Select an analysis from the list on the left to see the full ATS scorecard.
                    </p>
                  </Card>
                )}
              </div>
            </div>
          )}
          <Footer />
        </div>
      </main>
    </ClickSpark>
  );
}
