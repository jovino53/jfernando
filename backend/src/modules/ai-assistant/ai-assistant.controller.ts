import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiAssistantService } from './ai-assistant.service';
import { ChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('AI Assistant')
@Controller('ai-assistant')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Conversar com assistente IA' })
  chat(@Body() chatDto: ChatDto) {
    return this.aiAssistantService.chat(chatDto.message, chatDto.context);
  }

  @Post('analyze-employee')
  @ApiOperation({ summary: 'Analisar perfil de colaborador com IA' })
  analyzeEmployee(@Body() employeeData: any) {
    return this.aiAssistantService.analyzeEmployee(employeeData);
  }

  @Post('generate-report')
  @ApiOperation({ summary: 'Gerar relatório com IA' })
  generateReport(@Body() body: { type: string; data: any }) {
    return this.aiAssistantService.generateReport(body.type, body.data);
  }
}
