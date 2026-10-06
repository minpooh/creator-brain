import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const navItems = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/contents", label: "내 콘텐츠" },
  { href: "#", label: "아이덴티티 리포트" },
  { href: "#", label: "인사이트 탐색" },
];

function displayNameFromUser(user: {
  email?: string;
  user_metadata?: Record<string, unknown>;
}) {
  const metadataName =
    (typeof user.user_metadata?.full_name === "string" &&
      user.user_metadata.full_name) ||
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name) ||
    "";
  const fallback = user.email?.split("@")[0] ?? "사용자";
  const base = metadataName.trim() || fallback;
  const label = base.endsWith("님") ? base : `${base}님`;
  const initial = Array.from(base.replace(/님$/, ""))[0]?.toUpperCase() ?? "U";

  return { label, initial };
}

export default async function Header({
  activeHref = "/dashboard",
}: {
  activeHref?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { label, initial } = displayNameFromUser(user ?? {});

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-4 md:h-[72px] md:px-10 lg:h-20 lg:px-20">
      <div className="flex items-center gap-12">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary p-2">
            <Image
              src="/logo-brain.svg"
              alt="Creator Brain logo"
              width={16}
              height={16}
            />
          </div>
          <span className="text-lg font-extrabold text-text-primary">
            Creator Brain
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[15px] transition-colors hover:text-text-primary ${
                item.href === activeHref
                  ? "font-semibold text-text-primary"
                  : "font-medium text-text-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          type="button"
          className="flex size-10 cursor-pointer items-center justify-center text-text-secondary"
          aria-label="알림"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9ZM13.73 21a2 2 0 0 1-3.46 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
            {initial}
          </div>
          <p className="hidden text-sm font-medium text-text-primary lg:block">
            {label}
          </p>
        </div>
      </div>
    </header>
  );
}
