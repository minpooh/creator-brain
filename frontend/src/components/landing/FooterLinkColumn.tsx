interface FooterLinkColumnProps {
  title: string;
  links: readonly string[];
}

export default function FooterLinkColumn({
  title,
  links,
}: FooterLinkColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-extrabold text-text-primary">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-[13px] text-text-secondary transition-colors hover:text-text-primary"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
