"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClickSpark from "@/components/ui/ClickSpark";
import Aurora from "@/components/ui/Aurora";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <ClickSpark
      sparkColor="#3B82F6"
      sparkSize={15}
      sparkRadius={20}
      sparkCount={8}
      duration={450}
    >
      <main className="flex-1 flex items-center justify-center bg-background text-foreground px-6 pt-28 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-65 pointer-events-none">
          <Aurora
            colorStops={["#b067ff", "#9c97cf", "#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.2}
          />
        </div>
        <div className="max-w-3xl text-center relative z-10">
          <h1 className="text-6xl font-bold tracking-tight text-foreground">
            Resume<span className="text-primary-blue">IQ</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-8">
            Upload your resume, paste a job description,
            and receive an AI-powered ATS analysis,
            missing skills, strengths, weaknesses,
            suggestions and interview questions.
          </p>

          <div className="mt-10 flex justify-center gap-4">

            <Link href={isAuthenticated ? "/analyze" : "/login"}>
              <Button size="lg" className="cursor-pointer glass-button-primary rounded-xl px-6 py-3 font-semibold text-white border-white/10 hover:border-white/20">
                {isAuthenticated ? "Analyze Resume" : "Get Started"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl glass-card p-8">
              <FileText className="mx-auto mb-4 h-8 w-8 text-primary-blue block" />
              <h3 className="font-semibold mb-2 text-foreground">Resume Parsing</h3>
              <p className="text-sm text-muted-foreground">
                Extracts text from uploaded PDF resumes.
              </p>
            </div>

            <div className="rounded-2xl glass-card p-8">
              <BrainCircuit className="mx-auto mb-4 h-8 w-8 text-success block" />
              <h3 className="font-semibold mb-2 text-foreground">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Compares your resume with the job description using AI.
              </p>
            </div>

            <div className="rounded-2xl glass-card p-8">
              <ArrowRight className="mx-auto mb-4 h-8 w-8 text-warning block" />
              <h3 className="font-semibold mb-2 text-foreground">ATS Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get ATS score, skill gaps and interview questions instantly.
              </p>
            </div>

          </div>

        </div>
      </main>
    </ClickSpark>
  );
}