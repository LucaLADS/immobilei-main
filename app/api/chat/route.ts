import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai";
import { IMMOBILEI_PROMPT } from "@/prompt/immobileiPrompt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Messaggio non valido." },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      instructions: IMMOBILEI_PROMPT,
      input: message,
    });

    return NextResponse.json({
      reply:
        response.output_text ||
        "Mi dispiace, al momento non riesco a rispondere correttamente.",
    });
  } catch (error: unknown) {
    const apiError = error as {
      message?: string;
      status?: number;
      error?: unknown;
    };

    console.error("OPENAI ERROR FULL:", error);
    console.error("OPENAI ERROR MESSAGE:", apiError?.message);
    console.error("OPENAI ERROR STATUS:", apiError?.status);
    console.error("OPENAI ERROR BODY:", apiError?.error);

    return NextResponse.json(
      {
        error:
          apiError?.message ||
          "Errore interno del server.",
      },
      { status: 500 }
    );
  }
}
