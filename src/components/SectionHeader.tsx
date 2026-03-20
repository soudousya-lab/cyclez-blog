"use client";

import ScrollReveal from "./ScrollReveal";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
}

// チェーンリンクSVG（装飾用）
function ChainLink() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" className="text-[#c41e3a]/20">
      <ellipse cx="6" cy="6" rx="5.5" ry="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="18" cy="6" rx="5.5" ry="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="0.5" x2="18" y2="0.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="11.5" x2="18" y2="11.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function SectionHeader({ title, subtitle, description }: SectionHeaderProps) {
  return (
    <ScrollReveal>
      <div className="text-center mb-10 md:mb-14">
        {/* ギア + チェーン装飾 */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-0.5 opacity-60">
            <ChainLink />
            <ChainLink />
          </div>
          <div className="animate-spin-slow">
            <svg width="28" height="28" viewBox="0 0 32 32" className="text-[#c41e3a]">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="4" fill="currentColor" />
              {/* ギアの歯 */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                  key={angle}
                  x="14.5"
                  y="1"
                  width="3"
                  height="4"
                  rx="1"
                  fill="currentColor"
                  transform={`rotate(${angle} 16 16)`}
                />
              ))}
            </svg>
          </div>
          <div className="flex gap-0.5 opacity-60">
            <ChainLink />
            <ChainLink />
          </div>
        </div>

        <p className="text-[#c41e3a] text-sm font-bold tracking-[0.2em] uppercase mb-2">
          {subtitle}
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
