import { NextResponse } from "next/server";
import { validateItems } from "@/lib/items";

export const dynamic = "force-dynamic";

function endpoint() {
  const url = process.env.GOOGLE_SHEETS_API_URL;
  if (!url) throw new Error("GOOGLE_SHEETS_API_URL is not configured on the server.");
  return url;
}

export async function GET() {
  try {
    const response = await fetch(`${endpoint()}?tab=items`, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const body = await response.text();
    if (!response.ok) {
      return NextResponse.json({ error: `The menu source responded with HTTP ${response.status}.` }, { status: 502 });
    }
    let payload: unknown;
    try {
      payload = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "The menu source returned invalid JSON." }, { status: 502 });
    }
    return NextResponse.json({ items: validateItems(payload) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The menu could not be loaded.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
