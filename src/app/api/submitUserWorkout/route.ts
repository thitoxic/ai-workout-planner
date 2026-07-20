import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parses incoming JSON


    return NextResponse.json(
      { success: true, workoutPlan: response.text },
      { status: 201 },
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }
}
