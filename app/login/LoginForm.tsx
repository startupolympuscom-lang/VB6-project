"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Field from "@/components/Field";
import SocialButtons from "@/components/SocialButtons";
import { AlertIcon, ArrowRightIcon } from "@/components/icons";
import { isEmail, wait } from "@/components/fakeAuth";
import styles from "@/components/auth.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    setLoading(true);
    await wait(1200);
    // Demo trigger for the error state.
    if (password === "wrongpass") {
      setLoading(false);
      setFormError("That email and password combination didn’t match.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1 className={styles.heading}>Welcome back</h1>
      <p className={styles.sub}>Sign in to continue to your workspace.</p>

      {formError && (
        <div role="alert" className={`${styles.banner} ${styles.bannerError}`}>
          <AlertIcon /> {formError}
        </div>
      )}

      <SocialButtons />

      <div className={styles.fields}>
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Field
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          aside={
            <Link href="/forgot-password" className={styles.textLink}>
              Forgot password?
            </Link>
          }
        />
      </div>

      <div className={styles.row}>
        <label className={styles.check}>
          <input type="checkbox" defaultChecked /> Keep me signed in
        </label>
      </div>

      <button type="submit" className={styles.primary} disabled={loading}>
        {loading ? (
          <>
            <span className={styles.spinner} /> Signing in…
          </>
        ) : (
          <>
            Sign in <ArrowRightIcon />
          </>
        )}
      </button>

      <p className={styles.legal}>
        Protected by Aurora Shield. <Link href="#">Learn more</Link>
      </p>
    </form>
  );
}
