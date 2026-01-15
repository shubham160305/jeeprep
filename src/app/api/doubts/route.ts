import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { subject, question } = await req.json();

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: 'HF API key missing' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `You are a JEE tutor.
Subject: ${subject}
Question: ${question}
Explain step by step clearly.`,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('HF error:', errText);
      return NextResponse.json(
        { error: 'AI service failed' },
        { status: 500 }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      answer:
        result?.[0]?.generated_text ||
        'No answer generated',
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}
