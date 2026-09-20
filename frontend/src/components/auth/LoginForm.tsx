"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/landing/Badge";
import { useLandingAnimation } from "@/hooks/useLandingAnimation";
import { fadeUpSection } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";

const legalLinks = ["이용약관", "개인정보처리방침"] as const;

export default function LoginForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useLandingAnimation(sectionRef, ({ gsap, reduced, y, root }) => {
    fadeUpSection(gsap, root, {
      y,
      reduced,
      withScrollTrigger: false,
    });
  });

  async function signInWithGoogle() {
    setError(null);
    setPending(true);

    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (oauthError) {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
        setPending(false);
      }
    } catch {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white md:bg-surface">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-5 md:h-[72px] md:px-10 lg:h-20 lg:px-20">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary md:size-7 lg:size-8 lg:rounded-lg">
            <Image
              src="/logo-brain.svg"
              alt="Creator Brain logo"
              width={18}
              height={18}
              className="size-[14px] md:size-4 lg:size-[18px]"
            />
          </div>
          <span className="text-[15px] font-extrabold text-text-primary md:text-base lg:text-xl">
            Creator Brain
          </span>
        </Link>

        {/* Header nav */}
        <nav className="hidden items-center gap-6 text-[13px] font-semibold text-text-secondary md:flex lg:text-sm lg:font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-text-primary"
          >
            서비스 소개
          </Link>
          <Link
            href="/"
            className="hidden transition-colors hover:text-text-primary lg:inline"
          >
            요금제
          </Link>
        </nav>
      </header>

      <section
        ref={sectionRef}
        data-section-anim
        className="flex w-full flex-1 flex-col px-5 pb-[100px] pt-8 md:items-center md:justify-center md:gap-10 md:px-10 md:pt-[60px] lg:flex-row lg:items-center lg:gap-10 lg:px-20"
      >
        {/* Brand message — tablet / desktop */}
        <div className="hidden w-full max-w-[665px] flex-col gap-10 md:flex lg:flex-1">
          <div className="flex flex-col items-start gap-6">
            <Badge>AI 기반 크리에이터 오피스</Badge>

            <p className="text-[38px] font-extrabold leading-[1.3] text-text-primary">
              당신의 콘텐츠 정체성을
              <br />
              이해하고 방향을 제안합니다.
            </p>

            <p className="text-base leading-[1.5] text-text-secondary">
              기존 콘텐츠를 분석하여 나만의 강점과 방향성을 발견해보세요.
            </p>
          </div>

          {/* Analysis preview widget */}
          <div className="flex w-full flex-col gap-4 rounded-[20px] border border-border bg-white p-6 shadow-[0_12px_12px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-success-bg px-2 py-1 text-[11px] font-bold text-success">
                AI 실시간 분석 결과
              </span>
              <p className="text-xs text-text-secondary">@lifestyle_explorer</p>
            </div>

            <div className="border-t border-border" />

            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-1 rounded-lg bg-surface p-3">
                <p className="text-[11px] text-text-secondary">정체성 일치도</p>
                <p className="text-base font-extrabold text-primary">
                  94.8% 일치
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-1 rounded-lg bg-surface p-3">
                <p className="text-[11px] text-text-secondary">추천 포맷</p>
                <p className="text-base font-extrabold text-text-primary">
                  감성 숏폼 비주얼
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth form card */}
        <div className="flex w-full flex-col gap-6 rounded-3xl border border-border bg-white px-6 pb-12 pt-9 shadow-[0_16px_16px_rgba(15,23,42,0.05)] md:h-[402px] md:max-w-[664px] md:px-[45px] md:pb-10 md:pt-[45px] lg:w-[575px] lg:max-w-[575px] lg:shrink-0">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-xl font-extrabold leading-[1.4] text-text-primary md:text-left md:text-2xl">
              <span className="md:hidden">
                기존 콘텐츠를 분석해
                <br />
                나만의 강점과 콘텐츠 방향성을 발견해보세요.
              </span>
              <span className="hidden md:inline lg:hidden">
                기존 콘텐츠를 분석해 나만의 강점과 콘텐츠 방향성을
                발견해보세요.
              </span>
              <span className="hidden lg:inline">
                더 나은 콘텐츠를 시작해보세요.
              </span>
            </h1>
            <p className="text-center text-[13px] leading-[1.45] text-text-secondary md:text-left">
              <span className="md:hidden">
                Google로 간편하게 로그인하고
                <br />
                맞춤 전략을 바로 확인해보세요.
              </span>
              <span className="hidden md:inline">
                Google로 간편하게 로그인하고 맞춤 전략을 바로 확인해보세요.
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={pending}
            className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#d9d9d9] p-3.5 transition-colors hover:bg-surface disabled:cursor-wait disabled:opacity-70 md:h-[74px]"
          >
            <Image
              src="/icons/google-g-logo.png"
              alt=""
              width={140}
              height={124}
              className="h-8 w-8 object-contain md:h-[38px] md:w-[38px]"
              aria-hidden="true"
            />
            <span className="text-base font-bold text-text-primary md:text-lg">
              Google로 계속하기
            </span>
          </button>

          {error ? (
            <p className="text-center text-[13px] text-text-secondary" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </section>

      <footer className="shrink-0 border-t border-border px-5 py-10 md:px-10 lg:px-20">
        <div className="flex flex-col items-center gap-2 text-[13px] text-text-secondary md:flex-row md:justify-between">
          <p>© 2026 Creator Brain Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="transition-colors hover:text-text-primary"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
