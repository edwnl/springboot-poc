// frontend/app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHello = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/hello");
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-4">Spring Boot + Next.js POC</h1>
          <Button
              onClick={fetchHello}
              disabled={loading}
              className="px-4 py-2"
          >
            {loading ? "Loading..." : "Fetch from Backend"}
          </Button>
          {message && (
              <div className="mt-4 p-4 border rounded bg-card text-card-foreground">
                <p>{message}</p>
              </div>
          )}
        </div>
      </main>
  );
}