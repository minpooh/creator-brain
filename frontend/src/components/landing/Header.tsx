"use client";

import { useState } from "react";
import Image from "next/image";

const navItems = ["서비스 소개", "분석 데모", "성장 여정", "요금제"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border bg-white px-5 md:px-10 lg:px-20">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <Image
            src="/logo-brain.svg"
            alt="Creator Brain logo"
            width={18}
            height={18}
          />
        </div>
        <span className="text-xl font-extrabold text-text-primary">
          Creator Brain
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden gap-8 md:flex">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            className="text-[15px] font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Desktop CTAs */}
      <div className="hidden items-center gap-3 md:flex">
        <a
          href="#"
          className="text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
        >
          로그인
        </a>
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-lg bg-text-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-800"
        >
          무료로 시작하기
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        type="button"
        className="flex size-10 items-center justify-center md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="메뉴 열기"
      >
        <svg
          className="size-6 text-text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {mobileOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute inset-x-0 top-20 z-40 border-b border-border bg-white px-5 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#"
              className="text-center text-sm font-semibold text-text-secondary"
            >
              로그인
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-text-primary px-5 py-2.5 text-sm font-bold text-white"
            >
              무료로 시작하기
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
