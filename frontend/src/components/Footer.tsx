import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full mt-12 py-6 text-center text-xs text-muted-foreground/50 border-t border-black/5 dark:border-white/5 relative z-10">
      <div className="flex flex-wrap items-center justify-center gap-2 px-4">
        <span>Built using</span>
        <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium text-foreground/70">MongoDB</span>
        <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium text-foreground/70">Express</span>
        <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium text-foreground/70">Next.js</span>
        <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium text-foreground/70">Node.js</span>
      </div>
    </footer>
  );
}
