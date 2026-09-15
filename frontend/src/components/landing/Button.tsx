interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-[color,background-color,border-color,transform] duration-300 ease-out cursor-pointer";

  const variants = {
    primary: "bg-text-primary text-white hover:bg-gray-800",
    secondary:
      "bg-white text-text-primary border border-border hover:bg-surface",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
