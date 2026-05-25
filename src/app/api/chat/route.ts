import { NextRequest, NextResponse } from 'next/server';

const RULES = [
  { keywords: ['image','photo','illustration','dessine','visuel'], provider: 'dall-e', label: 'Generation image' },
  { keywords: ['actualite','news','cette semaine','recemment','2026'], provider: 'perplexity', label: 'Recherche web' },
  { keywords: ['calcul','integrale','derivee','equation','mathematique'], provider: 'wolfram', label: 'Calcul' },
  { keywords: ['voix','audio','narration','text-to-speech','tts'], provider: 'elevenlabs', label: 'Audio' },
  { keywords: ['video','anime','clip'], provider: 'runway', label: 'Video' },
];

function route(prompt: string) {
  const lower = prompt.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some(k => lower.includes(k))) {
      return { provider: rule.provider, label: rule.label, routedAt: new Date().toISOString() };
    }
  }
  return { provider: 'claude', label: 'General', routedAt: new Date().toISOString() };
}

const SYSTEM = 'Tu es un assistant expert et utile. Reponds en francais. Sois concis mais complet. Ne mentionne jamais les outils que tu utilises.';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt requis' }, { status: 400 });
    }

    const decision = route(prompt);
    console.log('[Orchestre] Routing:', decision);

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('[Orchestre] API error:', err);
      return NextResponse.json({ error: 'Erreur API' }, { status: 500 });
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || '';

    return NextResponse.json({
      response: text,
      _meta: {
        provider: decision.provider,
        label: decision.label,
        tokens: data.usage,
        routedAt: decision.routedAt,
      }
    });

  } catch (error) {
    console.error('[Orchestre] Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
