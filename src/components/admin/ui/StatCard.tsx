"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">
          {label}
        </p>
        <div
          className={`grid size-10 place-items-center rounded-xl ${color}`}
        >
          <Icon className="size-[18px]" />
        </div>
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900">
        {value}
      </p>
    </motion.div>
  );
}
