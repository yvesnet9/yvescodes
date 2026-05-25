import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Un Orchestre <hello@yvescodes.com>",
      to: "hello@yvescodes.com",
      subject: "Nouvelle inscription waitlist",
      html: `<p>Nouvel inscrit : <strong>${email}</strong></p>`,
    });

    await resend.emails.send({
      from: "Un Orchestre <hello@yvescodes.com>",
      to: email,
      subject: "Vous etes sur la liste",
      html: `<div style="font-family:sans-serif;padding:40px;background:#09090b;color:#fafafa"><p style="font-size:32px">🎼</p><h1 style="font-weight:500">Vous etes sur la liste.</h1><p style="color:rgba(255,255,255,0.5)">Lancement juillet 2026 - vous serez parmi les premiers.</p><p style="color:rgba(255,255,255,0.3);font-size:13px">Yves · yvescodes.com</p></div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
