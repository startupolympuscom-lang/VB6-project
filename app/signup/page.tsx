import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import SignupForm from "./SignupForm";

export const metadata: Metadata = { title: "Aurora — Create account" };

export default function SignupPage() {
  return (
    <AuthShell topLink={{ prompt: "Have an account?", label: "Sign in", href: "/login" }}>
      <SignupForm />
    </AuthShell>
  );
}
