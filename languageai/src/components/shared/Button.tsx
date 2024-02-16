import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  variant?: "text" | "outlined" | "primary";
  type?: "button" | "submit" | "reset"; 
  ariaLabel?: string;
  onClick?: () => void;
  onBlur?: () => void;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  fullWidth = false,
  href,
  variant = "primary",
  type="button",
  ariaLabel,
  onClick,
  onBlur,
}) => {
  const variantStyles = {
    text: "border outline-transparent focus:outline-primary border-transparent bg-transparent",
    primary:
      "border outline-transparent focus:outline-primary border-primary disabled:border-disabled bg-primary disabled:bg-disabled disabled:cursor-not-allowed text-white",
    outlined:
      "border outline-transparent focus:outline-primary border-primary text-primary bg-transparent",
  };
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      onClick={onClick}
      onBlur={onBlur}
      disabled={disabled}
      className={`${className} ${fullWidth ? "w-full" : "w-fit"} ${
        variantStyles[variant]
      } py-2.5 px-[1.125rem] rounded-lg transition-all`}
    >
      {href ? <Link href={href}>{children}</Link> : <>{children}</>}
    </button>
  );
};
