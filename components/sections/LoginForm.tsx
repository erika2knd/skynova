"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function Input({
  label,
  type,
  value,
  onChange,
  placeholder,
  rightSlot,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-semibold text-white/80">{label}</div>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:bg-white/10"
        />
        {rightSlot ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
        ) : null}
      </div>
    </label>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.trim().length >= 6;
  }, [email, password]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Demo: login is not connected yet 🙂");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
    >
      <div className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />

        <Input
          label="Password"
          type={show ? "text" : "password"}
          value={password}
          onChange={setPassword}
          placeholder="Minimum 6 characters"
          rightSlot={
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75 transition hover:bg-white/10"
            >
              {show ? "Hide" : "Show"}
            </button>
          }
        />

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-[#535EFE]"
            />
            Remember me
          </label>

          <Link href="/forgot-password" className="text-sm font-semibold text-white/70 hover:text-white">
            Forgot password?
          </Link>
        </div>

        <button
  type="submit"
  disabled={!canSubmit}
  className={`
    w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white
    transition
    ${
      canSubmit
        ? "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20 hover:brightness-110"
        : "bg-gradient-to-r from-purple-500/40 to-indigo-500/40 opacity-60 cursor-not-allowed"
    }
  `}
>
  Log in
</button>


        <div className="text-center text-sm text-white/60">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold text-white/80 hover:text-white">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}
