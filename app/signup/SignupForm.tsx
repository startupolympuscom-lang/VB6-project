"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Field from "@/components/Field";
import SocialButtons from "@/components/SocialButtons";
import { ArrowRightIcon } from "@/components/icons";
import { isEmail, passwordScore, wait } from "@/components/fakeAuth";
import styles from "@/components/auth.module.css";

const strengthColors = ["var(--border)", "#ef4f64", "#f59e0b", "#3b82f6", "#10b981"];
const strengthLabels = ["Too short", "Weak", "Fair", "Good", "Strong"];

type Errors = { name?: string; email?: string; password?: string; terms?: string };

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const score = passwordScore(password);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Tell us your name.";
    if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (score < 2) next.password = "Use 8+ characters with a mix of letters and numbers.";
    if (!terms) next.terms = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    await wait(1400);
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1 className={styles.heading}>Create your account</h1>
      <p className={styles.sub}>Start free. No credit card required.</p>

      <SocialButtons />

      <div className={styles.fields}>
        <Field
          label="Full name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Field
          label="Work email"
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
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          hint={password ? `Strength: ${strengthLabels[score]}` : "At least 8 characters."}
        >
          <div className={styles.strength} aria-hidden>
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={styles.strengthBar}
                style={{ background: score >= i ? strengthColors[score] : undefined }}
              />
            ))}
          </div>
        </Field>
      </div>

      <div className={styles.row} style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
        <label className={styles.check}>
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <span>
            I agree to the <Link href="#" className={styles.textLink}>Terms</Link> and{" "}
            <Link href="#" className={styles.textLink}>Privacy Policy</Link>
          </span>
        </label>
        {errors.terms && <p className={styles.error}>{errors.terms}</p>}
      </div>

      <button type="submit" className={styles.primary} disabled={loading}>
        {loading ? (
          <>
            <span className={styles.spinner} /> Creating account…
          </>
        ) : (
          <>
            Create account <ArrowRightIcon />
          </>
        )}
      </button>
    </form>
  );
}
