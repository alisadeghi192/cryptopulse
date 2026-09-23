import { cn } from "@/utils/cn";
import { Link } from "react-router";
import { LogoIcon } from "./LogoIcon";
interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn("flex items-center  gap-2 cursor-pointer", className)}
    >
      <LogoIcon className="text-primary" />
      {showText && (
        <span className="font-display text-lg font-bold tracking-wider text-primary">
          CryptoPulse
        </span>
      )}
    </Link>
  );
}
