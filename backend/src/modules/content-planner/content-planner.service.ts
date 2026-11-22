import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenerateBriefDto } from './dto/generate-brief.dto';

@Injectable()
export class ContentPlannerService {
  constructor(private readonly prisma: PrismaService) {}

  async generateBrief(dto: GenerateBriefDto) {
    const topic = this.normalize(dto.topic);
    const market = (dto.market || 'BR').toUpperCase();
    const period = dto.period || '7d';
    const audience = dto.audience || 'criadores de conteúdo';
    const objective = dto.objective || 'trafego';
    const tone = dto.tone || 'estrategico';
    const trendFeed = await this.fetchTrendFeed(market);
    const matchedTrend = this.findMatchedTrend(topic, trendFeed);
    const score = matchedTrend?.score ?? this.scoreTopic(topic, market, period, trendFeed.length);
    const signal = matchedTrend?.signal ?? (score > 80 ? 'Em alta' : score > 68 ? 'Em crescimento' : 'Oportunidade emergente');
    const focusWords = this.extractKeywords(topic, matchedTrend?.title);
    const rootWord = focusWords[0] || 'conteudo';

    const payload = {
      topic,
      market,
      period,
      audience,
      objective,
      tone,
      trendScore: score,
      trendSignal: signal,
      trendSource: trendFeed.length ? 'Google Trends' : 'Fallback local',
      trendMatches: trendFeed.slice(0, 5),
      rationale: matchedTrend
        ? `O termo ${topic} apareceu próximo de ${matchedTrend.title} no Google Trends para ${market}.`
        : `O tema ${topic} está com boa aderencia para o mercado ${market} e pode ser explorado em formatos de topo e meio de funil.`,
      risingQueries: [
        `${topic} como funciona`,
        `${topic} vale a pena`,
        `${topic} exemplos práticos`,
      ],
      keywords: [topic, ...focusWords, 'seo', 'blog'],
      articleIdeas: this.buildIdeas(topic, objective, tone),
      outline: this.buildOutline(topic, audience, objective),
      faqs: [
        {
          question: `O que e ${topic}?`,
          answer: `Uma explicacao simples de ${topic} para ${audience}.`,
        },
        {
          question: `Como usar ${topic} em um blog?`,
          answer: `Escolha a intenção de busca, conecte com uma dor real e entregue um passo a passo.`,
        },
      ],
      metaDescription: `Veja como transformar ${topic} em um artigo otimizado para SEO com foco em ${objective}.`,
      cta: `Baixe o briefing e publique um artigo sobre ${rootWord} hoje mesmo.`,
      generatedAt: new Date().toISOString(),
    };

    const savedBriefing = await this.saveBriefing(payload);
    return {
      ...payload,
      id: savedBriefing?.id,
    };
  }

  async getTrendFeed(market = 'BR') {
    const items = await this.fetchTrendFeed(market.toUpperCase());
    return {
      market: market.toUpperCase(),
      source: items.length ? 'Google Trends' : 'Fallback local',
      items,
      generatedAt: new Date().toISOString(),
    };
  }

  async listBriefings() {
    return this.prisma.contentBriefing.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async listArticles() {
    return this.prisma.contentArticle.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async generateArticle(payload: any) {
    const title = payload?.title || payload?.articleTitle || this.buildDefaultArticleTitle(payload?.topic || 'artigo');
    const slug = this.slug(payload?.slug || title);
    const content = this.buildArticleMarkdown(payload, title);

    return this.prisma.contentArticle.create({
      data: {
        briefingId: payload?.briefingId,
        title,
        slug,
        status: 'DRAFT',
        content,
        seoTitle: payload?.seoTitle || title,
        metaDescription: payload?.metaDescription || payload?.rationale || '',
        keywords: Array.isArray(payload?.keywords) ? payload.keywords : [],
        outline: payload?.outline || [],
        cta: payload?.cta || null,
      },
    });
  }

  async updateArticle(id: string, dto: any) {
    const article = await this.prisma.contentArticle.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Artigo com ID ${id} não encontrado`);
    }

    return this.prisma.contentArticle.update({
      where: { id },
      data: {
        title: dto.title ?? article.title,
        slug: dto.slug ? this.slug(dto.slug) : article.slug,
        content: dto.content ?? article.content,
        seoTitle: dto.seoTitle ?? article.seoTitle,
        metaDescription: dto.metaDescription ?? article.metaDescription,
        keywords: Array.isArray(dto.keywords) ? dto.keywords : article.keywords,
        outline: dto.outline ?? article.outline,
        cta: dto.cta ?? article.cta,
        status: dto.status ?? article.status,
        publishedAt: dto.status === 'PUBLISHED' && !article.publishedAt ? new Date() : article.publishedAt,
      },
    });
  }

  async findArticle(id: string) {
    const article = await this.prisma.contentArticle.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Artigo com ID ${id} não encontrado`);
    }

    return article;
  }

  private async saveBriefing(payload: {
    topic: string;
    market: string;
    period: string;
    audience: string;
    tone: string;
    objective: string;
    trendScore: number;
    trendSignal: string;
    trendSource?: string;
    trendMatches?: Array<{ rank: number; title: string; traffic: string; articles: number; queries: string[]; signal: string }>;
    risingQueries: string[];
    keywords: string[];
    articleIdeas: Array<{ title: string; angle: string; slug: string }>;
    outline: Array<{ section: string; bullets: string[] }>;
    faqs: Array<{ question: string; answer: string }>;
    rationale: string;
    metaDescription: string;
    cta: string;
    generatedAt: string;
  }) {
    try {
      return await this.prisma.contentBriefing.create({
        data: {
          topic: payload.topic,
          market: payload.market,
          period: payload.period,
          audience: payload.audience,
          tone: payload.tone,
          objective: payload.objective,
          trendScore: payload.trendScore,
          trendSignal: payload.trendSignal,
          trendSource: payload.trendSource,
          trendMatches: payload.trendMatches || [],
          risingQueries: payload.risingQueries,
          keywords: payload.keywords,
          articleIdeas: payload.articleIdeas,
          outline: payload.outline,
          faqs: payload.faqs,
          rationale: payload.rationale,
          metaDescription: payload.metaDescription,
          cta: payload.cta,
          generatedAt: new Date(payload.generatedAt),
        },
      });
    } catch {
      return null;
    }
  }

  private buildArticleMarkdown(payload: any, title: string) {
    const sections = Array.isArray(payload?.outline) ? payload.outline : [];
    const faqs = Array.isArray(payload?.faqs) ? payload.faqs : [];
    const intro = `## Introdução\n\n${payload?.rationale || 'Conteúdo guiado por tendência de busca.'}`;

    const sectionMarkdown = sections.map((section: any) => {
      const bullets = Array.isArray(section?.bullets) ? section.bullets : [];
      return `## ${section?.section || 'Seção'}\n\n${bullets.map((bullet: string) => `- ${bullet}`).join('\n')}`;
    }).join('\n\n');

    const faqMarkdown = faqs.length
      ? `## FAQ\n\n${faqs.map((faq: any) => `### ${faq.question}\n\n${faq.answer}`).join('\n\n')}`
      : '';

    const cta = payload?.cta ? `## CTA\n\n${payload.cta}` : '';

    return [
      `# ${title}`,
      '',
      intro,
      '',
      sectionMarkdown,
      '',
      faqMarkdown,
      '',
      cta,
    ].filter(Boolean).join('\n\n');
  }

  private buildDefaultArticleTitle(topic: string) {
    return `Guia completo de ${topic}`;
  }

  private buildIdeas(topic: string, objective: string, tone: string) {
    const angle = tone === 'didatico' ? 'educacional' : tone === 'direto' ? 'pratico' : 'estrategico';

    return [
      { title: `Guia completo de ${topic}`, angle, slug: this.slug(topic) },
      { title: `Como aplicar ${topic} para ganhar ${objective}`, angle: 'conversao', slug: `${this.slug(topic)}-${objective}` },
      { title: `${topic}: erros que travam resultados`, angle: 'comparativo', slug: `${this.slug(topic)}-erros` },
    ];
  }

  private buildOutline(topic: string, audience: string, objective: string) {
    return [
      {
        section: 'Introducao',
        bullets: [`Contexto do tema ${topic}`, `Por que importa para ${audience}`],
      },
      {
        section: 'Desenvolvimento',
        bullets: [`Passo a passo de aplicação`, `Exemplos práticos`, `Como conectar com ${objective}`],
      },
      {
        section: 'Conclusao',
        bullets: ['Resumo dos pontos-chave', 'Próximo passo e CTA'],
      },
    ];
  }

  private scoreTopic(topic: string, market: string, period: string, feedSize = 0) {
    const chars = `${topic}:${market}:${period}:${feedSize}`;
    const total = chars.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return 60 + (total % 35);
  }

  private async fetchTrendFeed(market: string) {
    try {
      const response = await fetch(
        `https://trends.google.com/trends/api/dailytrends?hl=pt-BR&tz=-180&geo=${encodeURIComponent(market)}&ns=15`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0',
            Accept: 'application/json, text/plain, */*',
          },
        },
      );

      if (!response.ok) {
        return [];
      }

      const text = await response.text();
      const jsonText = text.replace(/^\)\]\}'?,?\s*/, '');
      const data = JSON.parse(jsonText);
      const searches = data?.default?.trendingSearchesDays?.flatMap((day: any) => day.trendingSearches || []) || [];

      return searches.slice(0, 10).map((item: any, index: number) => ({
        rank: index + 1,
        title: item?.title?.query || item?.title || 'Tópico sem título',
        traffic: item?.formattedTraffic || 'N/D',
        articles: Array.isArray(item?.articles) ? item.articles.length : 0,
        queries: Array.isArray(item?.relatedQueries) ? item.relatedQueries.slice(0, 3).map((query: any) => query?.query || query) : [],
        signal: index < 3 ? 'Em alta' : 'Em crescimento',
      }));
    } catch {
      return [];
    }
  }

  private findMatchedTrend(topic: string, feed: Array<{ title: string; traffic: string; articles: number; queries: string[]; signal: string }>) {
    const normalizedTopic = this.normalize(topic).toLowerCase();
    const match = feed.find((item) => {
      const haystack = `${item.title} ${item.queries.join(' ')}`.toLowerCase();
      return normalizedTopic.split(' ').some((part) => part.length > 2 && haystack.includes(part));
    });

    if (!match) {
      return null;
    }

    return {
      ...match,
      score: Math.min(95, 72 + match.articles * 2 + match.queries.length * 3),
      signal: match.signal,
    };
  }

  private extractKeywords(topic: string, matchedTitle?: string) {
    const source = `${topic} ${matchedTitle || ''}`;
    const tokens = source
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2);

    return Array.from(new Set(tokens)).slice(0, 8);
  }

  private normalize(value: string) {
    return value.trim().replace(/\s+/g, ' ');
  }

  private slug(value: string) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
