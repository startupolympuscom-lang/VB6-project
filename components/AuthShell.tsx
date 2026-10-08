import Link from "next/link";
import styles from "./auth.module.css";

type Props = {
  children: React.ReactNode;
  topLink?: { prompt: string; label: string; href: string };
};

export default function AuthShell({ children, topLink }: Props) {
  return (
    <main className={styles.shell}>
      <section className={styles.formSide}>
        <header className={styles.topBar}>
          <Link href="/login" className={styles.brand}>
            <span className={styles.brandMark} aria-hidden />
            Aurora
          </Link>
          {topLink && (
            <p className={styles.topLink}>
              {topLink.prompt}
              <Link href={topLink.href}>{topLink.label}</Link>
            </p>
          )}
        </header>

        <div className={styles.formWrap}>
          <div className={styles.form}>{children}</div>
        </div>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Aurora Labs</span>
          <span>Privacy · Terms</span>
        </footer>
      </section>

      <aside className={styles.visual} aria-hidden>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
        <div className={styles.gridLines} />
        <div className={styles.grain} />

        <h2 className={styles.visualTitle}>
          Where ideas find their <em>light.</em>
        </h2>
        <blockquote className={styles.quote}>
          “Aurora replaced four tools for our team. The workspace feels calm, fast, and
          honestly a little beautiful.”
          <div className={styles.quoteAuthor}>
            <div className={styles.avatar}>MR</div>
            <div>
              Maya Rahal
              <span>Head of Product, Northwind</span>
            </div>
          </div>
        </blockquote>
      </aside>
    </main>
  );
}
