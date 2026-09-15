"use client";

import { useRef } from "react";
import Image from "next/image";
import SectionIndex from "./SectionIndex";
import WorkflowStep from "./WorkflowStep";
import { useLandingAnimation } from "@/hooks/useLandingAnimation";
import { fadeUpSection } from "@/lib/animations";

const workflowSteps = [
  {
    iconSrc: "/icons/edit-square.svg",
    iconAlt: "아이디어",
    title: "아이디어",
    subtitle: "메모장",
    mobileTitle: "아이디어 기획",
    mobileSubtitle: "개인 메모장",
  },
  {
    iconSrc: "/icons/feature-search.svg",
    iconAlt: "자료조사",
    title: "자료조사",
    subtitle: "인스타그램/유튜브",
    mobileTitle: "자료조사",
    mobileSubtitle: "소셜 채널 탐색",
  },
  {
    iconSrc: "/icons/description.svg",
    iconAlt: "기획안 작성",
    title: "기획안 작성",
    subtitle: "노션 / 워드",
    mobileTitle: "기획안 작성",
    mobileSubtitle: "다양한 오피스 도구",
  },
  {
    iconSrc: "/icons/camera.svg",
    iconAlt: "촬영/제작",
    title: "촬영/제작",
    subtitle: "카메라/스튜디오",
    mobileTitle: "촬영/제작",
    mobileSubtitle: "카메라/스튜디오",
  },
  {
    iconSrc: "/icons/scissors.svg",
    iconAlt: "편집",
    title: "편집",
    subtitle: "캡컷/프리미어",
    mobileTitle: "편집",
    mobileSubtitle: "캡컷/프리미어",
  },
  {
    iconSrc: "/icons/upload.svg",
    iconAlt: "업로드",
    title: "업로드",
    subtitle: "인스타그램/유튜브",
    mobileTitle: "업로드",
    mobileSubtitle: "인스타그램/유튜브",
  },
] as const;

function WorkflowConnector() {
  return (
    <svg
      data-connector
      className="pointer-events-none absolute top-1/2 right-0 hidden size-4 -translate-y-1/2 translate-x-1/2 lg:block"
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

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useLandingAnimation(sectionRef, ({ gsap, reduced, isMobile, y, q, root }) => {
    const tl = fadeUpSection(gsap, root, { y, reduced });
    const row = q("[data-workflow-row]");
    const steps = q("[data-workflow-step]");
    const caption = q("[data-workflow-caption]");

    if (reduced) {
      gsap.set(row, { opacity: 1, x: 0 });
      gsap.set(steps, { opacity: 1, x: 0, y: 0 });
      gsap.set(caption, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(caption, { opacity: 0, y: 12 });

    if (isMobile) {
      gsap.set(steps, { opacity: 0, y: 16 });
      tl.to(
        steps,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.32,
          ease: "power2.out",
        },
        "-=0.4",
      );
    } else {
      gsap.set(row, { opacity: 0, x: -64 });
      tl.to(
        row,
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.4",
      );
    }

    if (caption.length) {
      tl.to(
        caption,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        "+=0.08",
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      data-section-anim
      className="flex w-full flex-col gap-10 bg-white px-5 py-14 md:gap-12 md:px-10 md:py-20 lg:gap-14 lg:px-20 lg:py-[100px]"
    >
      {/* Title */}
      <div className="flex flex-col gap-4">
        <SectionIndex number="02" label="PROBLEM" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[600px] text-[28px] font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl md:leading-[48px]">
            콘텐츠를 만들 때마다
            <br />
            다시 처음부터{" "}
            <span className="text-primary">고민하지 않나요?</span>
          </h2>

          <p className="max-w-[480px] text-sm leading-6 text-text-secondary md:text-[15px]">
            아이디어 구상부터 업로드까지, 크리에이터는 수많은 파편화된 도구들을
            오가며 많은 시간과 비효율을 겪고 있습니다. 이제 단 하나의 흐름으로
            통합할 시간입니다.
          </p>
        </div>
      </div>

      {/* Desktop / Tablet workflow */}
      <div className="hidden flex-col gap-6 md:flex">
        <div
          data-workflow-row
          className="flex items-center justify-between"
        >
          {workflowSteps.map((step, index) => (
            <div
              key={step.title}
              data-workflow-step
              className="relative flex flex-1 justify-center"
            >
              <WorkflowStep
                iconSrc={step.iconSrc}
                iconAlt={step.iconAlt}
                title={step.title}
                subtitle={step.subtitle}
              />
              {index < workflowSteps.length - 1 ? <WorkflowConnector /> : null}
            </div>
          ))}
        </div>

        <div className="hidden justify-center pt-3 lg:flex">
          <span
            data-workflow-caption
            className="rounded-lg bg-primary-bg px-4 py-2 text-[13px] font-bold text-primary"
          >
            흩어진 여정, 반복되는 고민 →
          </span>
        </div>
      </div>

      {/* Mobile workflow list */}
      <div className="flex flex-col gap-3 md:hidden">
        {workflowSteps.map((step, index) => (
          <div
            key={step.mobileTitle}
            className="flex items-center gap-4 rounded-2xl bg-surface px-4 py-4"
            data-workflow-step
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-extrabold text-primary">
              {index + 1}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-extrabold text-text-primary">
                {step.mobileTitle}
              </p>
              <p className="text-xs text-text-secondary">{step.mobileSubtitle}</p>
            </div>
            <div className="relative ml-auto size-5 shrink-0">
              <Image
                src={step.iconSrc}
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
