import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "secondary-inverse" | "solid-teal";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold whitespace-nowrap transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white px-7 py-4 hover:bg-primary-hover",
  "solid-teal": "bg-primary text-paper px-7 py-4 hover:bg-primary-dark",
  secondary: "bg-transparent text-primary border-[1.5px] border-primary px-6.5 py-3.5 hover:bg-tint",
  "secondary-inverse":
    "bg-transparent text-paper border-[1.5px] border-paper/70 px-6.5 py-3.5 hover:bg-white/10",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
};

type ActionButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: LinkButtonProps | ActionButtonProps) {
  const { variant = "primary", children, className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href: _href, variant: _v, children: _c, className: _cl, ...rest } =
    props as ActionButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
