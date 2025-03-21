"use client";

// Import Next Studio directly
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { useEffect, useState } from "react";

// The most basic implementation that works
export default function StudioPage() {
  // This ensures the studio only renders client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="max-h-screen w-screen absolute fixed inset-0 z-100"
      suppressHydrationWarning={true}
    >
      {mounted && <NextStudio config={config} />}
    </div>
  );
}
