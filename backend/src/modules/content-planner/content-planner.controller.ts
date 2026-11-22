import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentPlannerService } from './content-planner.service';
import { GenerateBriefDto } from './dto/generate-brief.dto';

@ApiTags('Content Planner')
@Controller('content-planner')
export class ContentPlannerController {
  constructor(private readonly contentPlannerService: ContentPlannerService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Gerar briefing editorial a partir de um tema' })
  generate(@Body() dto: GenerateBriefDto) {
    return this.contentPlannerService.generateBrief(dto);
  }

  @Get('trends')
  @ApiOperation({ summary: 'Listar tendências do Google Trends por mercado' })
  getTrends(@Query('market') market?: string) {
    return this.contentPlannerService.getTrendFeed(market || 'BR');
  }

  @Get('briefings')
  @ApiOperation({ summary: 'Listar briefings salvos' })
  listBriefings() {
    return this.contentPlannerService.listBriefings();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Listar artigos salvos' })
  listArticles() {
    return this.contentPlannerService.listArticles();
  }

  @Get('articles/:id')
  @ApiOperation({ summary: 'Obter artigo por ID' })
  getArticle(@Param('id') id: string) {
    return this.contentPlannerService.findArticle(id);
  }

  @Post('articles/generate')
  @ApiOperation({ summary: 'Gerar artigo completo a partir de um briefing' })
  generateArticle(@Body() body: any) {
    return this.contentPlannerService.generateArticle(body);
  }

  @Post('articles/:id')
  @ApiOperation({ summary: 'Atualizar artigo' })
  updateArticle(@Param('id') id: string, @Body() body: any) {
    return this.contentPlannerService.updateArticle(id, body);
  }
}
