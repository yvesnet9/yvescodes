import { NextRequest, NextResponse } from 'next/server';

const RULES = [
  { keywords: ['image','photo','illustration','dessine','visuel','dessin','cree une image','genere une image'], provider: 'dall-e', label: 'Generation image' },
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

const SYSTEM = 'Tu es un assistant expert et utile. Reponds en francais. Sois concis mais complet. Ne mentionne jamais les outils que tu utilises. Si un fichier ou une image est fourni, analyse-le attentivement avant de repondre.';

async function callClaude(prompt: string, file?: { data: string; mediaType: string; type: 'image' | 'document' }) {
  // Build message content
  type ContentBlock =
    | { type: 'text'; text: string }
    | { type: 'image'; source: { type: 'base64'; media_type: string; data: string } }
    | { type: 'document'; source: { type: 'base64'; media_type: string; data: string } };

  const content: ContentBlock[] = [];

  if (file) {
    if (file.type === 'image') {
      content.push({
        type: 'image',
        source: { type: 'base64', media_type: file.mediaType, data: file.data },
      });
    } else {
      content.push({
        type: 'document',
        source: { type: 'base64', media_type: file.mediaType, data: file.data },
      });
    }
  }

  content.push({ type: 'text', text: prompt });

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
      messages: [{ role: 'user', content }],
    }),
  });
  const data = await res.json();
  return { text: data.content?.[0]?.text || '', usage: data.usage };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, file } = body;

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt requis' }, { status: 400 });
    }

    const decision = route(prompt);
    console.log('[Orchestre] Routing:', decision);

    // Si fichier fourni ou provider = claude, on appelle Claude
    const result = await callClaude(prompt, file || undefined);

    return NextResponse.json({
      response: result.text,
      _meta: {
        provider: file ? 'claude-vision' : decision.provider,
        label: file ? 'Analyse fichier' : decision.label,
        tokens: result.usage,
        routedAt: decision.routedAt,
      }
    });

  } catch (error) {
    console.error('[Orchestre] Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
