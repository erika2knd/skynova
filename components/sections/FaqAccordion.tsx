"use client";

import { useMemo, useState } from "react";

type FaqItem = {
  q: string;
  a: string;
  tag?: string;
};

const FAQ: FaqItem[] = [
  {
    tag: "Payments",
    q: "How do I buy a skin?",
    a: "Choose a skin, open the product page, press “Buy now” and complete the checkout. After payment, delivery is initiated automatically.",
  },
  {
    tag: "Delivery",
    q: "How fast is delivery?",
    a: "Usually instant. In some cases it can take a few minutes depending on trade availability and verification.",
  },
  {
    tag: "Account",
    q: "Do I need an account to buy?",
    a: "For a smooth experience — yes. Later we’ll support wishlist and order history, which requires an account.",
  },
  {
    tag: "Security",
    q: "Is this marketplace secure?",
    a: "We use secure checkout and will add additional verification steps. Never share your Steam credentials with anyone.",
  },
  {
    tag: "Refunds",
    q: "Can I refund a purchase?",
    a: "Refund rules depend on delivery status and local regulations. When we ship the real product, we’ll provide full policies in the legal pages.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ;

    return FAQ.filter((it) => {
      const hay = `${it.q} ${it.a} ${it.tag ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <section>
      {/* search */}
      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
        <span className="text-white/40">⌕</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in FAQ"
          className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
        />
      </div>

      {/* list */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            No results. Try another query.
          </div>
        ) : (
          items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={`${item.q}-${idx}`}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
  <button
    type="button"
    onClick={() => setOpenIndex(isOpen ? null : idx)}
    className="w-full rounded-3xl px-5 py-4 text-left transition-colors hover:bg-white/10"
  >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {item.tag && (
                        <div className="mb-2 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                          {item.tag}
                        </div>
                      )}
                      <div className="text-base font-extrabold text-white">{item.q}</div>
                    </div>

                    <span
                      className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-white/70">{item.a}</p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
