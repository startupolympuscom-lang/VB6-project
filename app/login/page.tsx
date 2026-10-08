import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Aurora — Sign in" };

export default function LoginPage() {
  return (
    <AuthShell topLink={{ prompt: "New here?", label: "Create an account", href: "/signup" }}>
      <LoginForm />
    </AuthShell>
  );
}
