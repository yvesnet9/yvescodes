import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'orchestre2026';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('x-admin-key');
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  try {
    const res = await fetch('https://api.resend.com/emails?limit=100', {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });
    const data = await res.json();

    const waitlist = (data.data || [])
      .filter((e: { subject: string }) => e.subject?.includes('waitlist') || e.subject?.includes('liste'))
      .map((e: { to: string[]; created_at: string }) => ({
        email: Array.isArray(e.to) ? e.to[0] : e.to,
        date: e.created_at,
      }));

    const stats = {
      total_waitlist: waitlist.length,
      last_signup: waitlist[0]?.date || null,
    };

    return NextResponse.json({ stats, waitlist });
  } catch (error) {
    console.error('[Admin] Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
