import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia',
});

const PRICES: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER || '',
  projet: process.env.STRIPE_PRICE_PROJET || '',
  pro: process.env.STRIPE_PRICE_PRO || '',
};

const CREDITS: Record<string, number> = {
  starter: 20,
  projet: 100,
  pro: 500,
};

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();

    if (!PRICES[plan]) {
      return NextResponse.json({ error: 'Plan invalide' }, { status: 400 });
    }

    const isSubscription = plan === 'pro';

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? 'subscription' : 'payment',
      line_items: [{ price: PRICES[plan], quantity: 1 }],
      success_url: `https://yvescodes.com/orchestre/chat?payment=success&plan=${plan}&credits=${CREDITS[plan]}`,
      cancel_url: `https://yvescodes.com/orchestre?payment=cancelled`,
      metadata: { plan, credits: String(CREDITS[plan]) },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[Stripe] Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
