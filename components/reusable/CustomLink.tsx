import Link from "next/link";

type ButtonProps = {
  title?: string;
  className?: string;
  onClick?: () => void;
  icon?: any;
  rightIcon?: any;
  href: string;
  sendingMsg?: string;
  type?: "button" | "submit" | "reset";
};

export default function LinkReuseable({
  title,
  className,
  onClick,
  icon,
  rightIcon,
  href,
  sendingMsg,
  type,
}: ButtonProps) {
  return (
    <Link
        href={href || "#"}
      className={`text-nowrap text-sm md:text-base justify-center flex items-center gap-2 h-full transition-all duration-200 ${className}`}
      onClick={onClick}
      type={type}
    >
      <div className=" flex h-full items-center gap-1.5">
        {icon} {title} {rightIcon}
      </div>
    </Link>
  );
}
