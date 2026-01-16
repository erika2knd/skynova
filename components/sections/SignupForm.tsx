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

function PasswordStrength({ value }: { value: string }) {
  const score =
    value.length >= 10 ? 3 : value.length >= 8 ? 2 : value.length >= 6 ? 1 : 0;

  const label = score === 3 ? "Strong" : score === 2 ? "Good" : score === 1 ? "Ok" : "Too short";

  return (
    <div className="mt-2 flex items-center justify-between text-xs">
      <span className="text-white/50">Password strength</span>
      <span className="font-semibold text-white/75">{label}</span>
    </div>
  );
}

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(true);
  const [show, setShow] = useState(false);

  const canSubmit = useMemo(() => {
    const okEmail = email.trim().includes("@");
    const okUser = username.trim().length >= 2;
    const okPass = password.trim().length >= 6;
    const same = password === confirm && confirm.length > 0;
    return okEmail && okUser && okPass && same && agree;
  }, [email, username, password, confirm, agree]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Demo: sign up is not connected yet 🙂");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
    >
      <div className="space-y-4">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
          placeholder="Your nickname"
        />

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
        <PasswordStrength value={password} />

        <Input
          label="Confirm password"
          type={show ? "text" : "password"}
          value={confirm}
          onChange={setConfirm}
          placeholder="Repeat password"
        />

        <label className="flex items-start gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[#535EFE]"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-white/80 underline decoration-white/30 hover:text-white">
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="text-white/80 underline decoration-white/30 hover:text-white"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`
            w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white transition
            ${
              canSubmit
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20 hover:brightness-110"
                : "bg-gradient-to-r from-purple-500/40 to-indigo-500/40 opacity-60 cursor-not-allowed"
            }
          `}
        >
          Create account
        </button>

        <div className="text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-white/80 hover:text-white">
            Log in
          </Link>
        </div>
      </div>
    </form>
  );
}
