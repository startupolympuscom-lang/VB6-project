"use client";

import Link from "next/link";
import { useState } from "react";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import { ArrowLeftIcon, MailIcon } from "@/components/icons";
import { isEmail, wait } from "@/components/fakeAuth";
import styles from "@/components/auth.module.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    await wait(1100);
    setLoading(false);
    setSent(true);
  }

  return (
    <AuthShell topLink={{ prompt: "Remembered it?", label: "Sign in", href: "/login" }}>
      {sent ? (
        <div>
          <div className={styles.successIcon}>
            <MailIcon />
          </div>
          <h1 className={styles.heading}>Check your inbox</h1>
          <p className={styles.sub}>
            We sent a reset link to <strong>{email}</strong>. It expires in 30 minutes.
          </p>
          <button type="button" className={styles.primary} onClick={() => setSent(false)}>
            Use a different email
          </button>
          <Link href="/login" className={styles.back}>
            <ArrowLeftIcon /> Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <h1 className={styles.heading}>Reset your password</h1>
          <p className={styles.sub}>Enter your email and we’ll send you a reset link.</p>

          <div className={styles.fields} style={{ marginBottom: 24 }}>
            <Field
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
          </div>

          <button type="submit" className={styles.primary} disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner} /> Sending…
              </>
            ) : (
              "Send reset link"
            )}
          </button>
          <Link href="/login" className={styles.back}>
            <ArrowLeftIcon /> Back to sign in
          </Link>
        </form>
      )}
    </AuthShell>
  );
}
