import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { KnowledgeBaseService } from './knowledge-base.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Knowledge Base')
@Controller('knowledge-base')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Post()
  @ApiOperation({ summary: 'Criar artigo' })
  create(@Body() dto: CreateArticleDto) {
    return this.knowledgeBaseService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar artigos publicados' })
  findAll() {
    return this.knowledgeBaseService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar artigos' })
  search(@Query('q') query: string) {
    return this.knowledgeBaseService.search(query);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Artigos mais populares' })
  getPopular() {
    return this.knowledgeBaseService.getPopularArticles();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Listar por categoria' })
  findByCategory(@Param('category') category: string) {
    return this.knowledgeBaseService.findByCategory(category as any);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter artigo por ID' })
  findOne(@Param('id') id: string) {
    return this.knowledgeBaseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar artigo' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateArticleDto>) {
    return this.knowledgeBaseService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover artigo' })
  remove(@Param('id') id: string) {
    return this.knowledgeBaseService.remove(id);
  }
}
