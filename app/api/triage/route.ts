import { NextRequest, NextResponse } from 'next/server'

// TODO: Wire in real Claude API
// 1. Set ANTHROPIC_API_KEY in your .env.local
// 2. npm install @anthropic-ai/sdk
// 3. Replace mock logic below with real streaming response

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { profile, symptoms, messages } = body

  // PLACEHOLDER: Replace with real Anthropic API call
  // const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  // const response = await anthropic.messages.create({
  //   model: 'claude-sonnet-4-20250514',
  //   max_tokens: 1024,
  //   system: `You are a medical triage assistant for CareCompass Kenya.
  //     Patient profile: ${JSON.stringify(profile)}
  //     Symptoms reported: ${symptoms.join(', ')}
  //     Always recommend professional care. Never diagnose.
  //     After 3-4 exchanges, provide a triage level: emergency | urgent | routine`,
  //   messages: messages,
  // })

  // Mock response for development
  const mockResponses = [
    'Thank you. Are you experiencing any difficulty breathing, chest tightness, or pain radiating to your arm or jaw?',
    'I understand. On a scale of 1–10, how would you rate the severity right now?',
    'Based on what you have described, I recommend you seek care within the next 2–4 hours. I am preparing your triage summary.',
  ]

  const msgCount = messages?.length ?? 0
  const reply = mockResponses[Math.min(msgCount, mockResponses.length - 1)]

  const urgency = msgCount >= 3 ? 'urgent' : null

  return NextResponse.json({
    reply,
    urgency,
    // When urgency is set, redirect to /results?urgency=urgent
  })
}
