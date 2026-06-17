import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parses incoming JSON
    console.log("body", body);
    const { goal, noOfDays, equipments, weights } = body;

    // Perform database logic here...
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

    const prompt = `You are a fitness coach API. Return ONLY a valid JSON object, no markdown, no explanation.
Generate a compact workout plan based on:
- Goal: ${goal}
- Days per week: ${noOfDays[0]}
- Equipment: ${equipments.join(", ")}
- Fitness level: ${weights[0]}

Return this exact JSON structure:
{
  "planName": "string",
  "days": [
    {
      "id": number,
      "day": "string (e.g. Day 1)",
      "focus": "string (e.g. Push / Pull / Legs)",
      "exercises": [
        {
          "id": number,
          "name": "string",
          "sets": number,
          "reps": "string (e.g. 8-10)",
          "note": "string (one short tip, max 8 words)"
        }
      ]
    }
  ]
}

Rules:
- Days must have an "id" field starting from 1 (1, 2, 3, etc.) sequentially.
- Exercises must have an "id" field starting from 1 (1, 2, 3, etc.) sequentially per day.
- Maximum 5 exercises per day.
- notes must be under 8 words.
- Only include exercises possible with the given equipment.
- Return ONLY the JSON, nothing else.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    console.log(response.text);
    return NextResponse.json(
      { success: true, workoutPlan: response.text },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }
}
