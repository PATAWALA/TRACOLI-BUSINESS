"use client";

import { useState, useRef, useEffect } from "react";
import type { LucideIcon } from "lucide-react";

interface DropdownItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export default function Dropdown({ trigger, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center">
        {trigger}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-ink-200 bg-white py-1 shadow-lg">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] font-medium transition-colors ${
                item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-ink-700 hover:bg-ink-50"
              }`}
            >
              {item.icon && <item.icon className="size-4" />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
