import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get('url');
  if (!source) return NextResponse.json({ error: 'URL do vídeo não informada.' }, { status: 400 });

  let sourceUrl: URL;
  try { sourceUrl = new URL(source); } catch { return NextResponse.json({ error: 'URL inválida.' }, { status: 400 }); }
  if (sourceUrl.protocol !== 'https:' || sourceUrl.hostname !== 'cdn.pixabay.com') {
    return NextResponse.json({ error: 'Origem do vídeo não permitida.' }, { status: 403 });
  }

  try {
    const response = await fetch(sourceUrl);
    if (!response.ok || !response.body) return NextResponse.json({ error: 'Não foi possível baixar este vídeo.' }, { status: 502 });
    return new NextResponse(response.body, { headers: {
      'Content-Disposition': 'attachment; filename="frame-ai-video.mp4"',
      'Content-Type': response.headers.get('content-type') || 'video/mp4',
      'Cache-Control': 'no-store',
    } });
  } catch { return NextResponse.json({ error: 'Falha ao baixar o vídeo.' }, { status: 502 }); }
}
