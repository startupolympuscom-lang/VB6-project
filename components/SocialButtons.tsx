"use client";

import { useRouter } from "next/navigation";
import styles from "./auth.module.css";
import { GitHubIcon, GoogleIcon } from "./icons";

export default function SocialButtons() {
  const router = useRouter();
  // Front-end only: pretend the provider succeeded.
  const go = () => router.push("/dashboard");

  return (
    <>
      <div className={styles.socials}>
        <button type="button" className={styles.socialBtn} onClick={go}>
          <GoogleIcon /> Google
        </button>
        <button type="button" className={styles.socialBtn} onClick={go}>
          <GitHubIcon /> GitHub
        </button>
      </div>
      <div className={styles.divider}>or</div>
    </>
  );
}
