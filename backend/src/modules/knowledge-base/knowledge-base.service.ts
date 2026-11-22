import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class KnowledgeBaseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateArticleDto) {
    return this.prisma.knowledgeBaseArticle.create({
      data: {
        title: dto.title,
        content: dto.content,
        category: dto.category,
        tags: dto.tags || [],
        isPublished: dto.isPublished ?? true,
        authorId: dto.authorId,
      },
    });
  }

  async findAll() {
    return this.prisma.knowledgeBaseArticle.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.knowledgeBaseArticle.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Artigo com ID ${id} não encontrado`);
    }
    await this.prisma.knowledgeBaseArticle.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    return { ...article, views: article.views + 1 };
  }

  async findByCategory(category: string) {
    return this.prisma.knowledgeBaseArticle.findMany({
      where: { category, isPublished: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async search(query: string) {
    return this.prisma.knowledgeBaseArticle.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { views: 'desc' },
    });
  }

  async update(id: string, dto: Partial<CreateArticleDto>) {
    await this.findOne(id);
    return this.prisma.knowledgeBaseArticle.update({
      where: { id },
      data: dto as any,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.knowledgeBaseArticle.delete({ where: { id } });
  }

  async getPopularArticles() {
    return this.prisma.knowledgeBaseArticle.findMany({
      where: { isPublished: true },
      orderBy: { views: 'desc' },
      take: 10,
    });
  }
}
