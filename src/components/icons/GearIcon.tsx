"use client";

import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";

interface GearIconProps {
  className?: string;
  size?: number;
  variant?: "solid" | "outline";
}

export default function GearIcon({ className = "", size = 20, variant = "solid" }: GearIconProps) {
  if (variant === "outline") {
    return <IoSettingsOutline className={className} size={size} />;
  }
  return <IoSettingsSharp className={className} size={size} />;
}
