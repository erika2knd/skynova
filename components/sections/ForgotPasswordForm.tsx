"use client";

import { useMemo, useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const canSubmit = useMemo(() => {
    const v = email.trim();
    return v.length > 3 && v.includes("@");
  }, [email]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Demo: reset email is not sent yet 🙂");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
    >
      <label className="block">
        <div className="mb-2 text-sm font-semibold text-white/80">Email</div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:bg-white/10"
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`
          mt-4 w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white transition
          ${
            canSubmit
              ? "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20 hover:brightness-110"
              : "bg-gradient-to-r from-purple-500/40 to-indigo-500/40 opacity-60 cursor-not-allowed"
          }
        `}
      >
        Send reset link
      </button>

      <p className="mt-4 text-xs leading-relaxed text-white/50">
        If an account exists for this email, you’ll receive instructions to reset your password.
        (Demo UI only)
      </p>
    </form>
  );
}
