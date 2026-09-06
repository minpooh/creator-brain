import BrandMark from "./BrandMark";
import FooterLinkColumn from "./FooterLinkColumn";

const footerColumns = [
  {
    title: "제품 기능",
    links: ["채널 분석", "기획안 빌더", "아이디어 제안", "로드맵"],
  },
  {
    title: "회사 정보",
    links: ["브랜드 비전", "소개", "채용", "파트너십"],
  },
  {
    title: "고객 지원",
    links: ["도움말 센터", "문의하기", "요금제 안내", "이용약관"],
  },
] as const;

const legalLinks = ["이용약관", "개인정보처리방침"] as const;

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-8 border-t border-border bg-white px-5 py-8 md:gap-10 md:px-10 md:py-12 lg:gap-10 lg:px-20 lg:py-16">
      {/* Desktop: brand + link columns */}
      <div className="hidden items-start justify-between lg:flex">
        <div className="flex w-[360px] flex-col gap-4">
          <BrandMark />
          <p className="text-[13px] leading-5 text-text-secondary">
            데이터와 인공지능을 통해 1인 크리에이터의 독창적인 가치를 발견하고
            지속 가능한 채널의 미래 성장 전략을 설계합니다.
          </p>
        </div>

        <div className="flex gap-16">
          {footerColumns.map((column) => (
            <FooterLinkColumn
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
      </div>

      {/* Desktop bottom bar */}
      <div className="hidden flex-col gap-10 lg:flex">
        <div className="border-t border-border" />
        <div className="flex items-center justify-between text-xs">
          <p className="text-text-muted">
            © 2026 Creator Brain Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-bold text-text-secondary transition-colors hover:text-text-primary"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet: brand + copyright */}
      <div className="hidden items-center justify-between md:flex lg:hidden">
        <BrandMark />
        <p className="text-xs text-text-muted">© 2026 Creator Brain Inc.</p>
      </div>

      {/* Mobile: brand + copyright stacked */}
      <div className="flex flex-col gap-5 md:hidden">
        <BrandMark size="sm" />
        <p className="text-xs text-text-muted">© 2026 Creator Brain Inc.</p>
      </div>
    </footer>
  );
}
