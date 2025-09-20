"use client";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center transition-colors bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-4">Handi Dev Website</h1>
      <ThemeToggle />
      <p className="text-lg mt-4">Website ini sudah pakai Next.js + Tema Toggle + Loading Screen</p>
    </main>
  );
}
