import { NextRequest, NextResponse } from "next/server";

// This is API to claim the reward
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json() as string[];
    const claim = await fetch(`${process.env.API_URL}/api/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    return NextResponse.json(claim);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      claim: null,
      message: (error as any).message
    }, { status: 400 });
  }
}