import { NextRequest, NextResponse } from "next/server";

const ALLOWED_SOURCES = new Set([
  "instagram",
  "facebook",
  "threads",
  "line",
  "youtube",
  "x",
  "twitter",
]);

function normalizePath(path: string | null): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ source: string }> },
) {
  const { source } = await params;
  const normalizedSource = source.toLowerCase();
  const url = request.nextUrl;
  const targetPath = normalizePath(url.searchParams.get("to"));
  const content = url.searchParams.get("content") || "bio";
  const campaign = url.searchParams.get("campaign") || `${normalizedSource}_profile`;
  const term = url.searchParams.get("term");

  if (!ALLOWED_SOURCES.has(normalizedSource)) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  const destination = new URL(targetPath, request.url);
  destination.searchParams.set("utm_source", normalizedSource);
  destination.searchParams.set("utm_medium", "social");
  destination.searchParams.set("utm_campaign", campaign);
  destination.searchParams.set("utm_content", content);
  if (term) {
    destination.searchParams.set("utm_term", term);
  }

  return NextResponse.redirect(destination, 302);
}
