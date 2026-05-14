import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email manquant" }, { status: 400 });
  }

  // Sauvegarder dans Supabase
  const { error: dbError } = await supabase
    .from("waitlist")
    .insert({ email });

  if (dbError) {
    if (dbError.code === "23505") {
      return NextResponse.json({ error: "Email déjà inscrit" }, { status: 409 });
    }
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // Email de confirmation à l'utilisateur
  await resend.emails.send({
    from: "noreply@yvescodes.com",
    to: email,
    subject: "Vous êtes sur la liste d'attente ! 🚀",
    html: `
      <h2>Bienvenue sur la liste d'attente yvescodes !</h2>
      <p>Merci de votre intérêt. Vous serez parmi les premiers informés du lancement de notre plateforme.</p>
      <p>À très bientôt,</p>
      <p><strong>Yves</strong></p>
    `,
  });

  // Notification à Yves
  await resend.emails.send({
    from: "noreply@yvescodes.com",
    to: "hello@yvescodes.com",
    subject: "Nouvel inscrit sur la waitlist !",
    html: `<p>Nouvel email inscrit : <strong>${email}</strong></p>`,
  });

  return NextResponse.json({ success: true });
}