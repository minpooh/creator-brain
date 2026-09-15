"use client";

import { useRef } from "react";
import Image from "next/image";
import SectionIndex from "./SectionIndex";
import DirectionStep from "./DirectionStep";
import CheckListItem from "./CheckListItem";
import { useLandingAnimation } from "@/hooks/useLandingAnimation";
import { fadeUpSection } from "@/lib/animations";

const directionSteps = [
  {
    iconSrc: "/icons/direction-lifestyle.svg",
    iconAlt: "라이프스타일",
    label: "라이프스타일",
    tabletLabel: "라이프스타일",
  },
  {
    iconSrc: "/icons/direction-experience.svg",
    iconAlt: "개인 경험",
    label: "개인 경험",
    tabletLabel: "개인 경험",
  },
  {
    iconSrc: "/icons/direction-storytelling.svg",
    iconAlt: "시각적 스토리텔링",
    label: "시각적 스토리텔링",
    tabletLabel: "시각 스토리텔링",
  },
  {
    iconSrc: "/icons/direction-info.svg",
    iconAlt: "실용적인 정보 제공",
    label: "실용적인 정보 제공",
    tabletLabel: "실용 정보",
  },
] as const;

const desktopTopics = [
  "일상 브이로그",
  "공간 & 인테리어 리뷰",
  "실용적인 삶의 팁 정리",
  "여행 & 로컬 스팟 소개",
] as const;

const tabletTopics = desktopTopics.slice(0, 3);

const mobileTopics = [
  "일상 브이로그 최적화",
  "공간 및 인테리어 리뷰 중심",
  "실용적인 팁 중심 전달",
] as const;

function DirectionConnector() {
  return (
    <svg
      data-connector
      className="pointer-events-none absolute top-7 right-0 hidden size-4 translate-x-1/2 lg:block"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={0}
      />
    </svg>
  );
}

export default function Direction() {
  const sectionRef = useRef<HTMLElement>(null);

  useLandingAnimation(sectionRef, ({ gsap, reduced, y, root }) => {
    fadeUpSection(gsap, root, { y, reduced });
  });

  return (
    <section
      ref={sectionRef}
      data-section-anim
      className="flex w-full flex-col gap-10 bg-surface px-5 py-14 md:gap-12 md:px-10 md:py-20 lg:gap-14 lg:px-20 lg:py-[100px]"
    >
      {/* Title */}
      <div className="flex flex-col gap-4">
        <SectionIndex number="05" label="DIRECTION" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[600px] text-[28px] font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl md:leading-[48px]">
            이런 <span className="text-primary">방향으로</span>
            <br />
            나아가면 좋아요
          </h2>

          <p className="hidden max-w-[480px] text-sm leading-6 text-text-secondary lg:block lg:text-[15px]">
            정체성을 기반으로 채널 성장을 극대화하기 위한 맞춤 로드맵을
            제공합니다. 검증된 카테고리 조합을 통해 확장성을 높여보세요.
          </p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden items-center gap-10 lg:flex">
        <div className="flex flex-1 flex-col gap-8 rounded-[28px] bg-white p-10">
          <p className="text-lg font-extrabold text-text-primary">
            추천 콘텐츠 방향성
          </p>
          <div className="relative flex items-start justify-between">
            {directionSteps.map((step, index) => (
              <div
                key={step.label}
                className="relative flex flex-1 justify-center"
              >
                <DirectionStep
                  iconSrc={step.iconSrc}
                  iconAlt={step.iconAlt}
                  label={step.label}
                />
                {index < directionSteps.length - 1 ? (
                  <DirectionConnector />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-[420px] shrink-0 flex-col gap-5 rounded-[28px] border border-border bg-white p-8">
          <p className="text-base font-extrabold text-text-primary">
            추천 우선 콘텐츠 주제군
          </p>
          <div className="flex flex-col gap-5">
            {desktopTopics.map((topic) => (
              <CheckListItem key={topic}>{topic}</CheckListItem>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet layout */}
      <div className="hidden flex-col gap-4 md:flex lg:hidden">
        <div className="rounded-[28px] bg-white p-6">
          <p className="mb-4 text-base font-extrabold text-text-primary">
            추천 콘텐츠 방향성
          </p>
          <div className="flex flex-wrap gap-3">
            {directionSteps.map((step) => (
              <span
                key={step.tabletLabel}
                className="rounded-lg bg-primary-soft px-4 py-2 text-sm font-bold text-text-primary"
              >
                {step.tabletLabel}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-white p-6">
          <p className="mb-4 text-base font-extrabold text-text-primary">
            추천 우선순위 카테고리
          </p>
          <div className="flex flex-col gap-4">
            {tabletTopics.map((topic) => (
              <CheckListItem key={topic} checkSize="sm">
                {topic}
              </CheckListItem>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-3 md:hidden">
        {mobileTopics.map((topic, index) => (
          <div
            key={topic}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4"
          >
            <div className="flex size-4 shrink-0 items-center justify-center rounded bg-success-bg">
              <Image
                src="/icons/check.svg"
                alt=""
                width={10}
                height={10}
                aria-hidden="true"
              />
            </div>
            <p className="text-sm font-semibold text-text-secondary">
              {index + 1}. {topic}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
