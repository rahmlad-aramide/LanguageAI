import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  variant?: "text" | "outlined" | "primary";
  onClick?: () => void;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  fullWidth = false,
  href,
  variant = "primary",
  onClick,
}) => {
  const variantStyles = {
    text: "border outline-transparent focus:outline-primary border-transparent bg-transparent",
    primary:
      "border outline-transparent focus:outline-primary border-primary bg-primary text-white",
    outlined:
      "border outline-transparent focus:outline-primary border-primary text-primary bg-transparent",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${fullWidth ? "w-full" : "w-fit"} ${
        variantStyles[variant]
      } py-2.5 px-[1.125rem] rounded-lg transition-all`}
    >
      {href ? <Link href={href}>{children}</Link> : <>{children}</>}
    </button>
  );
};
