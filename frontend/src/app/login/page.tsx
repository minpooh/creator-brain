import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "로그인 — Creator Brain",
  description:
    "Google로 간편하게 로그인하고 맞춤 전략을 바로 확인해보세요.",
};

export default function LoginPage() {
  return <LoginForm />;
}
