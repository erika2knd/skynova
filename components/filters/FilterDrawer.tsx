"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import type { Filters } from "./types";


type DrawerProps = {
  open: boolean;
  onClose: () => void;

  draft: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
  onApply: () => void;
};



const EXTERIOR = [
  "Factory New",
  "Minimal Wear",
  "Field-Tested",
  "Well-Worn",
  "Battle-Scarred",
];

export default function FilterDrawer({
  open,
  onClose,
  draft,
  onChange,
  onApply,
  onReset,
}: DrawerProps) {

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-[70] h-dvh w-[340px] max-w-[88vw] border-r border-white/10 bg-[#17181B]/95 backdrop-blur-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p className="text-sm font-semibold text-white/90">Filter items</p>

          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition"
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100dvh-72px)] overflow-y-auto px-5 py-5">
          <Section title="Price">
            <div className="flex items-center gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-white/40">$</span>
                <input
  type="number"
  value={draft.priceMin}
  onChange={(e) => onChange({ ...draft, priceMin: e.target.value })}
  placeholder="0"
  className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
/>

              </div>

              <span className="text-xs text-white/50">to</span>

              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-white/40">$</span>
               <input
  type="number"
  value={draft.priceMax}
  onChange={(e) => onChange({ ...draft, priceMax: e.target.value })}
  placeholder="100000"
  className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
/>

              </div>
            </div>
          </Section>

          <Section title="Exterior">
            <div className="space-y-2">
              {EXTERIOR.map((label) => {
  const checked = draft.exterior.includes(label);

  return (
    <label
      key={label}
      className="flex cursor-pointer items-center gap-3 text-sm text-white/80"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          const next = checked
            ? draft.exterior.filter((x) => x !== label)
            : [...draft.exterior, label];
          onChange({ ...draft, exterior: next });
        }}
        className="h-4 w-4 accent-[#535EFE]"
      />
      <span className="select-none">{label}</span>
    </label>
  );
})}

            </div>
          </Section>

          <Section title="StatTrak">
            <div className="space-y-2">
              {[
  { label: "Any", value: "any" },
  { label: "StatTrak only", value: "only" },
  { label: "Without StatTrak", value: "without" },
].map((item) => (
  <label
    key={item.value}
    className="flex cursor-pointer items-center gap-3 text-sm text-white/80"
  >
    <input
      type="radio"
      name="stattrak"
      checked={draft.statTrak === item.value}
      onChange={() => onChange({ ...draft, statTrak: item.value as any })}
      className="h-4 w-4 accent-[#535EFE]"
    />
    <span className="select-none">{item.label}</span>
  </label>
))}

            </div>
          </Section>

          <div className="mt-6 flex gap-3">
  <button
    onClick={onReset}
    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10 transition"
  >
    Reset
  </button>
  <button
    onClick={onApply}
    className="flex-1 rounded-xl bg-[#535EFE] px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
  >
    Apply
  </button>
</div>

        </div>
      </aside>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}


