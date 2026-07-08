"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/services/api";
import { Analysis } from "@/types/analysis";
import { useAuth } from "@/context/AuthContext";
import { 
  Upload, 
  Loader2, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Award, 
  AlertCircle, 
  Sparkles, 
  MessageSquare, 
  Brain 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ClickSpark from "@/components/ui/ClickSpark";
import DotField from "@/components/ui/DotField";
import Footer from "@/components/Footer";

export default function AnalyzePage() {
    const { user, loading: authLoading } = useAuth();
    const [resume, setResume] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [error, setError] = useState("");
    
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const loadingMessages = [
        "Reading Resume...",
        "Understanding Job Description...",
        "Comparing Skills...",
        "Calculating ATS Score...",
        "Generating Interview Questions..."
    ];
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (loading) {
            setCurrentMessageIndex(0);
            interval = setInterval(() => {
                setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
            }, 1000);
        } else {
            setCurrentMessageIndex(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [loading]);

    useEffect(() => {
        if (analysis && resultRef.current) {
            resultRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, [analysis]);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type === "application/pdf") {
                setResume(droppedFile);
                setError("");
            } else {
                setError("Please upload a PDF resume.");
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResume(e.target.files[0]);
            setError("");
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleAnalyze = async () => {
        if (!resume) {
            setError("Please upload a PDF resume.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please enter a job description.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setAnalysis(null);

            const formData = new FormData();
            formData.append("resume", resume);
            formData.append("jobDescription", jobDescription);

            const response = await api.post(
                "/analyze/analyze",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setAnalysis(response.data.analysis);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze resume.");
        } finally {
            setLoading(false);
        }
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
            <main className="min-h-screen bg-background text-foreground pt-24 sm:pt-28 pb-16 px-4 sm:px-6 relative overflow-hidden">
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

                <div className="max-w-4xl mx-auto relative z-10 w-full">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground">
                        Resume<span className="text-primary-blue">IQ</span>
                    </h1>

                    <p className="text-center text-muted-foreground mt-3 text-sm sm:text-base">
                        Upload your resume and compare it against any Job Description.
                    </p>

                    <Card className="mt-6 glass-card rounded-2xl">

                        <CardContent className="space-y-4 p-4 sm:p-5">

                            <div>
                                <label className="font-medium text-foreground text-sm">
                                    Resume PDF
                                </label>

                                <div
                                    onDragEnter={handleDrag}
                                    onDragOver={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={triggerFileInput}
                                    className={`mt-1.5 flex flex-col items-center justify-center py-5 px-4 sm:px-6 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                                        dragActive
                                            ? "border-primary-blue bg-primary-blue/5"
                                            : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 hover:dark:bg-white/10 hover:border-primary-blue/40"
                                    }`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                    />
                                    {resume ? (
                                        <div className="flex flex-col items-center space-y-1.5 pointer-events-none w-full">
                                            <FileText className="h-8 w-8 text-primary-blue animate-pulse" />
                                            <span className="font-semibold text-foreground text-sm text-center max-w-[200px] sm:max-w-xs truncate">
                                                {resume.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {(resume.size / (1024 * 1024)).toFixed(2)} MB • Ready to analyze
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center space-y-2 text-center pointer-events-none">
                                            <div className="p-2 rounded-full bg-primary-blue/10 text-primary-blue">
                                                <Upload className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-foreground text-sm block">
                                                    Click to upload Resume PDF
                                                </span>
                                                <span className="text-xs text-muted-foreground block mt-0.5">
                                                    or drag & drop
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground">
                                                PDF files up to 10MB
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="font-medium text-foreground text-sm">
                                    Job Description
                                </label>

                                <Textarea
                                    className="mt-1.5 min-h-28 glass-input rounded-xl text-sm"
                                    placeholder="Paste Job Description..."
                                    value={jobDescription}
                                    onChange={(e) =>
                                        setJobDescription(e.target.value)
                                    }
                                />
                            </div>

                            {error && (
                                <p className="text-error font-medium text-sm">
                                    {error}
                                </p>
                            )}

                            <Button
                                disabled={loading}
                                onClick={handleAnalyze}
                                className="w-full cursor-pointer h-11 glass-button-primary rounded-xl font-semibold border-white/10 text-white hover:border-white/20"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {loadingMessages[currentMessageIndex]}
                                    </>
                                ) : (
                                    <>
                                        <Brain className="mr-2 h-4 w-4" />
                                        Analyze with AI
                                    </>
                                )}
                            </Button>

                        </CardContent>

                    </Card>

                    {!analysis && !loading && (
                        <Card className="mt-8 glass-card border-dashed rounded-2xl">
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="p-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-muted-foreground mb-4">
                                    <Brain className="h-10 w-10 text-primary-blue" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    Ready to Analyze
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                                    Upload your resume and paste the job description to receive deep AI-powered insights, ATS match score, and interview questions.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {analysis && (
                        <div ref={resultRef} className="mt-10 space-y-6">

                            {/* ATS Score */}
                            <Card className="glass-card rounded-2xl">
                                <CardContent className="p-8 flex flex-col items-center">

                                    <div
                                        className={`w-36 h-36 rounded-full border-10 flex items-center justify-center text-4xl font-bold ${
                                            analysis.atsScore >= 80
                                                ? "border-success text-success"
                                                : analysis.atsScore >= 60
                                                    ? "border-warning text-warning"
                                                    : "border-error text-error"
                                        }`}
                                    >
                                        {analysis.atsScore}%
                                    </div>

                                    <h2 className="mt-5 text-2xl font-semibold text-foreground">
                                        ATS Match Score
                                    </h2>

                                    <p className="text-muted-foreground mt-2">
                                        {analysis.atsScore >= 80
                                            ? "Excellent Match"
                                            : analysis.atsScore >= 60
                                                ? "Good Match"
                                                : "Needs Improvement"}
                                    </p>

                                </CardContent>
                            </Card>

                            <div className="grid lg:grid-cols-2 gap-6">

                                {/* Matching Skills */}
                                <Card className="glass-card rounded-2xl">
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-semibold mb-5 text-foreground flex items-center gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-success" />
                                            Matching Skills
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {analysis.matchingSkills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-full glass-badge-success px-4 py-2 text-sm font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Missing Skills */}
                                <Card className="glass-card rounded-2xl">
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-semibold mb-5 text-foreground flex items-center gap-2">
                                            <XCircle className="h-5 w-5 text-error" />
                                            Missing Skills
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {analysis.missingSkills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-full glass-badge-error px-4 py-2 text-sm font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                            </div>

                            {/* Strengths */}
                            <Card className="glass-card rounded-2xl">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-5 text-foreground flex items-center gap-2">
                                        <Award className="h-5 w-5 text-success" />
                                        Strengths
                                    </h2>
                                    <ul className="space-y-3">
                                        {analysis.strengths.map((item) => (
                                            <li
                                                key={item}
                                                className="text-muted-foreground"
                                            >
                                                • {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Weaknesses */}
                            <Card className="glass-card rounded-2xl">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-5 text-foreground flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-warning" />
                                        Weaknesses
                                    </h2>
                                    <ul className="space-y-3">
                                        {analysis.weaknesses.map((item) => (
                                            <li
                                                key={item}
                                                className="text-muted-foreground"
                                            >
                                                • {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Suggestions */}
                            <Card className="glass-card rounded-2xl">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-5 text-foreground flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-primary-blue" />
                                        Suggestions
                                    </h2>
                                    <ul className="space-y-3">
                                        {analysis.suggestions.map((item) => (
                                            <li
                                                key={item}
                                                className="text-muted-foreground"
                                            >
                                                • {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Interview Questions */}
                            <Card className="glass-card rounded-2xl">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-5 text-foreground flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5 text-primary-blue" />
                                        Interview Questions
                                    </h2>
                                    <div className="space-y-4">
                                        {analysis.interviewQuestions.map((question) => (
                                            <div
                                                key={question}
                                                className="rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 backdrop-blur-sm text-foreground p-4"
                                            >
                                                {question}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    )}

                    <Footer />
                </div>

            </main>
        </ClickSpark>
    );
}