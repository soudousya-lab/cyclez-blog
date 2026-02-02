"use client";

import { MdDirectionsBike, MdPedalBike } from "react-icons/md";
import { FaBicycle } from "react-icons/fa";

interface BikeIconProps {
  className?: string;
  size?: number;
  variant?: "default" | "pedal" | "fa";
}

export default function BikeIcon({ className = "", size = 20, variant = "default" }: BikeIconProps) {
  switch (variant) {
    case "pedal":
      return <MdPedalBike className={className} size={size} />;
    case "fa":
      return <FaBicycle className={className} size={size} />;
    default:
      return <MdDirectionsBike className={className} size={size} />;
  }
}
