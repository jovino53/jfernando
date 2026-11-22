import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.PIXABAY_API_KEY;
  const query = request.nextUrl.searchParams.get('q')?.trim();
  const page = request.nextUrl.searchParams.get('page') || '1';

  if (!apiKey) return NextResponse.json({ error: 'PIXABAY_API_KEY não configurada.' }, { status: 500 });
  if (!query) return NextResponse.json({ error: 'Informe um termo para buscar vídeos.' }, { status: 400 });

  const params = new URLSearchParams({ key: apiKey, q: query, page, per_page: '12', safesearch: 'true' });
  try {
    const response = await fetch(`https://pixabay.com/api/videos/?${params.toString()}`, { next: { revalidate: 300 } });
    if (!response.ok) return NextResponse.json({ error: 'Pixabay recusou a busca.' }, { status: response.status });
    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ error: 'Não foi possível conectar ao Pixabay.' }, { status: 502 });
  }
}
