"use client";

import { FaLink } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";

interface ChainIconProps {
  className?: string;
  size?: number;
  variant?: "solid" | "outline";
}

export default function ChainIcon({ className = "", size = 20, variant = "solid" }: ChainIconProps) {
  if (variant === "outline") {
    return <IoLinkOutline className={className} size={size} />;
  }
  return <FaLink className={className} size={size} />;
}
