import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia',
});

const CREDITS: Record<string, number> = {
  starter: 20,
  projet: 100,
  pro: 500,
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    console.error('[Webhook] Signature invalide:', err);
    return NextResponse.json({ error: 'Webhook invalide' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const plan = session.metadata?.plan;
    const credits = parseInt(session.metadata?.credits || '0');
    const customerEmail = session.customer_details?.email;

    console.log('[Webhook] Paiement recu:', { plan, credits, customerEmail });

    if (!customerEmail || !credits) {
      return NextResponse.json({ error: 'Donnees manquantes' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Trouver l'utilisateur par email
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users?.users?.find(u => u.email === customerEmail);

    if (!user) {
      console.error('[Webhook] Utilisateur non trouve:', customerEmail);
      return NextResponse.json({ error: 'Utilisateur non trouve' }, { status: 404 });
    }

    // Crediter ou creer le compte de credits
    const { error } = await supabase
      .from('credits')
      .upsert({
        user_id: user.id,
        balance: credits,
        plan: plan,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
        ignoreDuplicates: false,
      });

    if (error) {
      // Si l'upsert echoue, on incremente le solde existant
      await supabase.rpc('increment_credits', {
        p_user_id: user.id,
        p_amount: credits,
        p_plan: plan,
      });
    }

    console.log('[Webhook] Credits ajoutes:', { user: user.id, credits, plan });
  }

  return NextResponse.json({ received: true });
}
