import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json() as { action: string };
  const { action } = body;

  // TODO: persist to database / _bot/approvals/ file
  return NextResponse.json({
    success: true,
    id,
    action,
    message: action === 'approve' ? '✅ 승인 완료' : '❌ 반려 완료',
  });
}
