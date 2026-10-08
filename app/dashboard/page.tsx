import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import { CheckCircleIcon } from "@/components/icons";
import styles from "@/components/auth.module.css";

export const metadata: Metadata = { title: "Aurora — Signed in" };

export default function DashboardPage() {
  return (
    <AuthShell>
      <div className={styles.successIcon}>
        <CheckCircleIcon />
      </div>
      <h1 className={styles.heading}>You’re in.</h1>
      <p className={styles.sub}>
        This is a front-end demo, so there’s no real session here — but the flow worked.
      </p>
      <Link href="/login" className={styles.primary} style={{ textDecoration: "none" }}>
        Sign out
      </Link>
    </AuthShell>
  );
}
