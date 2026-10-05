"use client";

import { useState } from "react";
import Image from "next/image";

export interface ContentCardProps {
  variant?: "preview" | "recent";
  thumbnail?: string;
  type: string;
  date?: string;
  title: string;
  views: string;
  likes: string;
}

function EyeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19.5 12.57 12 20l-7.5-7.43A4.5 4.5 0 0 1 12 6.13a4.5 4.5 0 0 1 7.5 6.44Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThumbnailFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-surface px-2 text-center">
      <div className="flex size-8 items-center justify-center rounded-full bg-primary-soft">
        <Image
          src="/icons/camera.svg"
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
        />
      </div>
      <p className="text-[11px] font-medium text-text-muted">
        이미지가 없습니다.
      </p>
    </div>
  );
}

function ContentThumbnail({
  src,
  sizes,
}: {
  src?: string;
  sizes: string;
}) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return <ThumbnailFallback />;
  }

  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={sizes}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export default function ContentCard({
  variant = "preview",
  thumbnail,
  type,
  date,
  title,
  views,
  likes,
}: ContentCardProps) {
  if (variant === "recent") {
    return (
      <article className="flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-white md:w-auto md:flex-1">
        <div className="relative h-[180px] w-full md:h-[190px] lg:h-[180px]">
          <ContentThumbnail src={thumbnail} sizes="260px" />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between text-[11px]">
            <p className="font-semibold text-text-muted">{type}</p>
            <div className="flex gap-3 font-normal text-text-secondary">
              <p>조회 {views}</p>
              <p>좋아요 {likes}</p>
            </div>
          </div>
          <p className="truncate text-sm font-bold text-text-primary">
            {title}
          </p>
        </div>
      </article>
    );
  }

  return (
    <>
      <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 md:hidden">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
          <ContentThumbnail src={thumbnail} sizes="80px" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded bg-surface px-1.5 py-0.5 text-[11px] font-semibold text-text-secondary">
              {type}
            </span>
            {date ? (
              <p className="text-[11px] text-text-secondary">{date}</p>
            ) : null}
          </div>
          <p className="truncate text-[15px] font-bold text-text-primary">
            {title}
          </p>
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <EyeIcon />
              {views}
            </span>
            <span className="flex items-center gap-1">
              <HeartIcon />
              {likes}
            </span>
          </div>
        </div>
      </article>

      <article className="hidden flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-white p-4 md:flex">
        <div className="relative h-[120px] w-full overflow-hidden rounded-lg">
          <ContentThumbnail
            src={thumbnail}
            sizes="(max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="rounded bg-surface px-1.5 py-0.5 text-[11px] font-semibold text-text-secondary">
              {type}
            </span>
            {date ? (
              <p className="text-[11px] text-text-secondary">{date}</p>
            ) : null}
          </div>
          <p className="truncate text-[15px] font-bold text-text-primary">
            {title}
          </p>
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <EyeIcon />
              {views}
            </span>
            <span className="flex items-center gap-1">
              <HeartIcon />
              {likes}
            </span>
          </div>
        </div>
      </article>
    </>
  );
}
