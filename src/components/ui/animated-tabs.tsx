"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
  autoRotateMs?: number;
}

const AnimatedTabs = ({
  tabs,
  defaultTab,
  className,
  autoRotateMs,
}: AnimatedTabsProps) => {
  const activeTabs = tabs ?? [];
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab || activeTabs[0]?.id
  );
  const [paused, setPaused] = useState(false);
  const userInteracted = useRef(false);

  useEffect(() => {
    if (!autoRotateMs || paused || userInteracted.current || activeTabs.length < 2) return;
    const id = setInterval(() => {
      setActiveTab((current) => {
        const idx = activeTabs.findIndex((t) => t.id === current);
        const next = activeTabs[(idx + 1) % activeTabs.length];
        return next.id;
      });
    }, autoRotateMs);
    return () => clearInterval(id);
  }, [autoRotateMs, paused, activeTabs]);

  if (!activeTabs.length) return null;

  return (
    <div
      className={cn("w-full flex flex-col gap-y-1", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
    >
      <div className="flex gap-2 flex-wrap bg-[#161618] p-1 rounded-xl">
        {activeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              userInteracted.current = true;
              setActiveTab(tab.id);
            }}
            className={cn(
              "relative px-3 py-1.5 text-sm font-medium rounded-lg text-white outline-none transition-colors"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white/15 !rounded-lg"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 bg-[#161618] shadow-[0_0_24px_rgba(0,0,0,0.25)] text-white rounded-xl border border-white/[0.06] min-h-60 h-full">
        {activeTabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  scale: 0.97,
                  x: -8,
                  filter: "blur(6px)",
                }}
                animate={{ scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                transition={{
                  duration: 0.5,
                  ease: "circInOut",
                  type: "spring",
                }}
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };
