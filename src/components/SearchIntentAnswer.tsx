import Link from "next/link";

type SearchIntentAnswerProps = {
  eyebrow: string;
  title: string;
  answer: string;
  facts: string[];
  primaryLink?: {
    href: string;
    label: string;
  };
  secondaryLink?: {
    href: string;
    label: string;
  };
};

export default function SearchIntentAnswer({
  eyebrow,
  title,
  answer,
  facts,
  primaryLink,
  secondaryLink,
}: SearchIntentAnswerProps) {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 shadow-sm">
          <p className="text-[#c41e3a] text-xs font-bold tracking-[0.18em] uppercase mb-3">
            {eyebrow}
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-4">
            {title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            {answer}
          </p>
          <ul className="grid gap-2 text-sm text-gray-700 md:grid-cols-2">
            {facts.map((fact) => (
              <li key={fact} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c41e3a]" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          {(primaryLink || secondaryLink) && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {primaryLink && (
                <Link
                  href={primaryLink.href}
                  className="inline-flex items-center justify-center rounded-full bg-[#c41e3a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#a01830]"
                >
                  {primaryLink.label}
                </Link>
              )}
              {secondaryLink && (
                <Link
                  href={secondaryLink.href}
                  className="inline-flex items-center justify-center rounded-full border border-[#c41e3a] bg-white px-6 py-3 text-sm font-bold text-[#c41e3a] transition-colors hover:bg-[#c41e3a] hover:text-white"
                >
                  {secondaryLink.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
