import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiAssistantService {
  private apiKey: string;
  private model: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get('OPENAI_API_KEY', '');
    this.model = this.configService.get('OPENAI_MODEL', 'gpt-4');
  }

  async chat(message: string, context?: any) {
    const systemPrompt = `Você é o assistente de RH da empresa Nexus HR AI.
    Você ajuda com dúvidas sobre políticas da empresa, processos de RH,
    benefícios, treinamentos e desenvolvimento profissional.
    Responda sempre em português brasileiro de forma profissional e amigável.`;

    try {
      if (!this.apiKey) {
        return this.getMockResponse(message);
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            ...(context || []),
            { role: 'user', content: message },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      return {
        response: data.choices[0].message.content,
        usage: data.usage,
      };
    } catch (error) {
      return this.getMockResponse(message);
    }
  }

  async generateReport(type: string, data: any) {
    const prompt = `Gere um relatório de ${type} baseado nos seguintes dados: ${JSON.stringify(data)}`;
    const result = await this.chat(prompt);
    return result;
  }

  async analyzeEmployee(employeeData: any) {
    const prompt = `Analise o perfil deste colaborador e forneça insights sobre desenvolvimento:
    ${JSON.stringify(employeeData)}`;
    const result = await this.chat(prompt);
    return result;
  }

  private getMockResponse(message: string) {
    const responses: Record<string, string> = {
      default:
        'Sou o assistente de IA do Nexus HR AI. Como posso ajudá-lo hoje?',
      benefícios:
        'Nossos benefícios incluem: plano de saúde, vale-refeição, vale-transporte, plano de odontologia, gympass e day-off no aniversário.',
      férias:
        'O colaborador tem direito a 30 dias de férias por ano trabalhado. O agendamento deve ser feito com 30 dias de antecedência.',
      treinamentos:
        'Temos programas de treinamento em liderança, soft skills, technical skills e desenvolvimento de carreira.',
    };

    const lowerMessage = message.toLowerCase();
    let response = responses.default;

    if (lowerMessage.includes('benefício') || lowerMessage.includes('beneficio')) {
      response = responses.benefícios;
    } else if (lowerMessage.includes('férias') || lowerMessage.includes('ferias')) {
      response = responses.férias;
    } else if (lowerMessage.includes('treinamento') || lowerMessage.includes('curso')) {
      response = responses.treinamentos;
    }

    return {
      response,
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    };
  }
}
