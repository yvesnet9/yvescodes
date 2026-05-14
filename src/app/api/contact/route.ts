import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  // Sauvegarder dans Supabase
  const { error: dbError } = await supabase
    .from("contacts")
    .insert({ name, email, message });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // Envoyer email via Resend
  await resend.emails.send({
    from: "contact@yvescodes.com",
    to: "hello@yvescodes.com",
    subject: `Nouveau message de ${name}`,
    html: `
      <h2>Nouveau contact via yvescodes.com</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Message :</strong></p>
      <p>${message}</p>
    `,
  });

  return NextResponse.json({ success: true });
}