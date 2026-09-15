"use client";

import { useRef } from "react";
import Badge from "./Badge";
import Button from "./Button";
import { useLandingAnimation } from "@/hooks/useLandingAnimation";
import { fadeUpSection } from "@/lib/animations";

export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);

  useLandingAnimation(sectionRef, ({ gsap, reduced, y, root }) => {
    fadeUpSection(gsap, root, { y, reduced });
  });

  return (
    <section
      ref={sectionRef}
      data-section-anim
      className="flex w-full flex-col items-center gap-8 bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] px-5 py-16 md:gap-10 md:px-10 md:py-20 lg:gap-12 lg:px-20 lg:py-[120px]"
    >
      <div className="flex w-full flex-col items-center gap-5 md:gap-6">
        <div className="hidden md:block">
          <Badge>전격 오픈 - 무료 체험 가능</Badge>
        </div>

        <h2 className="max-w-[800px] text-center text-[26px] font-extrabold leading-tight text-white md:text-4xl md:leading-[56px] lg:text-[40px]">
          <span className="md:hidden">
            지금 시작하고 당신의 여정을
            <br />
            성장시켜보세요
          </span>
          <span className="hidden md:inline">
            지금 시작하고 당신의 크리에이터 여정을
            <br />
            한 단계 성장시켜보세요
          </span>
        </h2>

        <p className="hidden max-w-[600px] text-center text-base leading-[26px] text-text-muted lg:block">
          무료 플랜으로 시작하여 정체성 분석 리포트와 실시간 아이디어 추천
          기능을 받아보세요. 번거로운 가입 절차 없이 3초 만에 로그인 완료.
        </p>
      </div>

      <div className="w-full max-w-[335px] md:w-auto md:max-w-none">
        <Button
          variant="primary"
          className="group w-full max-w-[335px] rounded-xl bg-black px-9 py-4 hover:bg-gray-900 motion-safe:hover:scale-[1.03] motion-reduce:hover:scale-100 md:w-auto md:max-w-none"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <span className="md:hidden">무료로 분석 시작하기</span>
            <span className="hidden md:inline">
              무료로 크리에이터 분석 시작하기
            </span>
            <svg
              className="size-4 shrink-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4.5 12.5 8 9 11.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Button>
      </div>
    </section>
  );
}
