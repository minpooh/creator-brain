"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

const platforms = ["YouTube", "Instagram", "Blog"] as const;
const contentTypes = ["영상", "이미지", "아티클"] as const;


export type ContentPlatform = (typeof platforms)[number];
export type ContentMediaType = (typeof contentTypes)[number];

export interface ContentRegistrationValues {
  platform: ContentPlatform;
  url: string;
  title: string;
  contentType: ContentMediaType;
  memo: string;
}

interface ContentRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: ContentRegistrationValues) => Promise<void>;
}

interface ContentRegistrationTriggerProps {
  className?: string;
  children: React.ReactNode;
  onSubmit?: (values: ContentRegistrationValues) => Promise<void>;
}

const emptyValues: ContentRegistrationValues = {
  platform: "YouTube",
  url: "",
  title: "",
  contentType: "영상",
  memo: "",
};

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="#475569"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ContentRegistrationTrigger({
  className,
  children,
  onSubmit,
}: ContentRegistrationTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`cursor-pointer ${className ?? ""}`}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <ContentRegistrationModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default function ContentRegistrationModal({
  open,
  onClose,
  onSubmit,
}: ContentRegistrationModalProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<ContentRegistrationValues>(emptyValues);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setValues(emptyValues);
  }, [open]);

  if (!mounted || !open) return null;

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if(submitting) return;
    setSubmitting(true);

    try {
      await onSubmit?.(values);
      onClose();
    } catch (error) {
      console.error("콘텐츠 등록실패:",error);
    } finally {
      setSubmitting(false);
    }
  }


  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0f172a]/50 p-4 sm:items-center"
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex w-full max-w-[560px] flex-col gap-7 rounded-[20px] border border-[#ece6f0] bg-white p-5 shadow-[0_12px_12px_rgba(15,23,42,0.05)] md:p-8"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <h2
              id={titleId}
              className="text-xl font-bold text-text-primary"
            >
              콘텐츠 등록
            </h2>
            <p className="text-sm text-text-secondary">
              분석할 기존 콘텐츠 정보를 입력해주세요.
            </p>
          </div>
          <button
            type="button"
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f1f5f9]"
            aria-label="닫기"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-2">
            <legend className="flex items-center gap-1 text-sm font-semibold text-[#1e293b]">
              플랫폼
              <span className="font-bold text-[#6366f1]">*</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => {
                const selected = values.platform === platform;
                return (
                  <button
                    key={platform}
                    type="button"
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-[10px] px-[18px] py-2.5 text-sm ${
                      selected
                        ? "border-[1.5px] border-[#6366f1] bg-[#eef2ff] font-semibold text-[#4f46e5]"
                        : "border border-border bg-white font-medium text-text-secondary"
                    }`}
                    onClick={() =>
                      setValues((current) => ({ ...current, platform }))
                    }
                  >
                    {selected ? (
                      <span className="size-2 rounded-full bg-[#4f46e5]" />
                    ) : null}
                    {platform}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-1 text-sm font-semibold text-[#1e293b]">
              콘텐츠 URL
              <span className="font-bold text-[#6366f1]">*</span>
            </span>
            <input
              required
              type="url"
              value={values.url}
              placeholder="https://www.youtube.com/watch?v=example"
              className="w-full rounded-lg border border-border bg-surface px-3 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
              onChange={(event) =>
                setValues((current) => ({ ...current, url: event.target.value }))
              }
            />
            <span className="text-xs font-medium text-[#6366f1]">
              링크를 입력하면 조회수와 반응 데이터를 자동으로 불러와요.
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-1 text-sm font-semibold text-[#1e293b]">
              콘텐츠 제목
              <span className="font-bold text-[#6366f1]">*</span>
            </span>
            <input
              required
              type="text"
              value={values.title}
              placeholder="등록할 콘텐츠의 제목을 입력하세요"
              className="w-full rounded-lg border border-border bg-white px-3 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
            />
          </label>

          <fieldset className="flex flex-col gap-2">
            <legend className="flex items-center gap-1 text-sm font-semibold text-[#1e293b]">
              콘텐츠 유형
              <span className="font-bold text-[#6366f1]">*</span>
            </legend>
            <div className="flex gap-0.5 rounded-[10px] bg-[#f1f5f9] p-1">
              {contentTypes.map((contentType) => {
                const selected = values.contentType === contentType;
                return (
                  <button
                    key={contentType}
                    type="button"
                    className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm ${
                      selected
                        ? "bg-white font-semibold text-text-primary shadow-[0_2px_2px_rgba(15,23,42,0.02)]"
                        : "font-medium text-text-secondary"
                    }`}
                    onClick={() =>
                      setValues((current) => ({ ...current, contentType }))
                    }
                  >
                    {contentType}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[#1e293b]">
              메모 (선택)
            </span>
            <textarea
              value={values.memo}
              placeholder="간단한 메모를 남겨주세요."
              rows={3}
              className="h-20 w-full resize-none rounded-lg border border-border bg-white px-3 py-3 text-sm leading-[1.4] text-text-primary outline-none placeholder:text-text-muted"
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  memo: event.target.value,
                }))
              }
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full border border-border text-sm font-semibold text-text-secondary"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="submit"
            className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full bg-[#4f46e5] text-sm font-semibold text-white"
            disabled={submitting}
          >
            {submitting ? "등록 중..." : "콘텐츠 등록하기"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
