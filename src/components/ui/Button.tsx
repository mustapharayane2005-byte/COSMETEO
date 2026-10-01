import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./Button.module.css";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

type Props = {
  variant?: Variant;
  size?: "md" | "sm";
  block?: boolean;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export default function Button({
  variant = "primary",
  size = "md",
  block,
  href,
  children,
  className,
  ...rest
}: Props) {
  const cls = [s.btn, s[variant], size === "sm" ? s.sm : "", block ? s.block : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
