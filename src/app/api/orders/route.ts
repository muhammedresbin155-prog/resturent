import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const url = process.env.GOOGLE_SHEETS_API_URL;
  if (!url) return NextResponse.json({ error: "GOOGLE_SHEETS_API_URL is not configured on the server." }, { status: 500 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The order request did not contain valid JSON." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || (body as Record<string, unknown>).tab !== "orders" || (body as Record<string, unknown>).action !== "add") {
    return NextResponse.json({ error: "The order request is invalid." }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    const text = await response.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "The order source returned invalid JSON. The result could not be confirmed." }, { status: 502 });
    }
    if (!response.ok) return NextResponse.json({ error: `The order source responded with HTTP ${response.status}.`, details: data }, { status: 502 });
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The order request could not reach the menu source.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
