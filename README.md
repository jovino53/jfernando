# Nexus HR AI™

Plataforma SaaS de Inteligência Artificial aplicada a Recursos Humanos.

## Visão Geral

O Nexus HR AI é um copiloto inteligente para profissionais de RH, gestores e executivos, transformando dados de pessoas em decisões estratégicas.

## Funcionalidades MVP

### 🎯 Gestão de Pessoas
- **Cadastro de Colaboradores** - Gestão completa de dados de funcionários
- **Perfil Inteligente de Competências** - Mapeamento automático de skills com IA
- **Dashboard Executivo RH** - KPIs em tempo real (turnover, absenteísmo, engajamento)

### 🤖 Inteligência Artificial
- **Nexus AI Assistant** - Chatbot conversacional para dúvidas e processos
- **Employee Intelligence Profile** - Análise inteligente de cada colaborador
- **Agentes IA Especializados**:
  - **Nexus Recruiter Agent** - Análise de candidatos
  - **Nexus Talent Agent** - Identificação de talentos
  - **Nexus Learning Agent** - Planos de treinamento
  - **Nexus Leadership Agent** - Apoio a gestores

### 📊 Analytics & Relatórios
- **People Analytics** - Análise de turnover, performance e engajamento
- **Relatórios Automáticos** - Geração inteligente de documentos
- **Knowledge Base Corporativa** - RAG para responder perguntas sobre a empresa

### 🔒 Segurança & Compliance
- **LGPD** - Conformidade com lei de proteção de dados
- **Multi-tenant** - Separação de dados por empresa
- **Controle de Permissões** - Roles: Admin, HR, Manager, Employee

### 💼 Modelo SaaS
- **Planos**: Starter, Professional, Enterprise
- **Multiempresa** - Uma instância serve várias empresas
- **Assinatura Mensal** - Controle de limites por plano

## Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Backend | Node.js, NestJS, TypeScript |
| Banco | PostgreSQL 16 + pgVector |
| ORM | Prisma |
| Cache | Redis |
| IA | OpenAI API (GPT-4), Pinecone (Vector DB) |
| Infra | Docker, Docker Compose |
| Auth | JWT, OAuth |

## Pré-requisitos

- Docker e Docker Compose v2+
- Node.js 20+ (para desenvolvimento local)
- npm ou yarn

## Setup Rápido

### 1. Clone o repositório

```bash
git clone https://github.com/seu-org/nexus-hr-ai.git
cd nexus-hr-ai
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
# Edite .env com suas configurações
```

### 3. Inicie os serviços

```bash
docker-compose up -d
```

### 4. Execute as migrations do Prisma

```bash
docker exec -it nexus-hr-backend npx prisma migrate dev
```

### 5. Acesse as aplicações

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000/api
- **Swagger Docs:** http://localhost:3000/api/docs
- **pgAdmin:** http://localhost:5050

## Desenvolvimento Local

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Estrutura do Projeto

```
nexus-hr-ai/
├── backend/                        # API NestJS
│   ├── prisma/                     # Schema e migrations Prisma
│   │   └── schema.prisma
│   ├── src/
│   │   ├── modules/               # Módulos da aplicação
│   │   │   ├── auth/              # Autenticação JWT + OAuth
│   │   │   ├── employees/         # Gestão de colaboradores
│   │   │   ├── competencies/      # Perfis de competências
│   │   │   ├── analytics/         # People Analytics
│   │   │   ├── ai-assistant/      # Assistente IA
│   │   │   ├── ai-agents/         # Agentes especializados
│   │   │   ├── employee-intelligence/ # Perfil inteligente
│   │   │   ├── reports/           # Relatórios
│   │   │   ├── climate/           # Clima organizacional
│   │   │   ├── talent/            # Gestão de talentos
│   │   │   ├── knowledge-base/    # Base de conhecimento
│   │   │   └── subscriptions/     # Planos SaaS
│   │   ├── prisma/                # Prisma Service
│   │   ├── common/                # Guards, interceptors, decorators
│   │   └── config/                # Configurações
│   └── package.json
├── frontend/                       # Aplicação Next.js
│   ├── src/
│   │   ├── app/                   # App Router (Next.js 14+)
│   │   │   ├── dashboard/
│   │   │   ├── employees/
│   │   │   ├── intelligence/      # Perfil inteligente
│   │   │   ├── ai-assistant/
│   │   │   ├── agents/            # Agentes IA
│   │   │   ├── analytics/
│   │   │   ├── reports/
│   │   │   ├── climate/
│   │   │   ├── talent/
│   │   │   ├── knowledge-base/
│   │   │   └── settings/          # Configurações + Planos
│   │   ├── components/            # Componentes React
│   │   ├── services/              # Chamadas à API
│   │   ├── hooks/                 # Custom hooks
│   │   └── types/                 # Type definitions
│   └── package.json
├── docs/                           # Documentação
├── docker-compose.yml
└── .env.example
```

## API

A documentação completa da API está em `docs/API.md`.

### Endpoints Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/login | Autenticação |
| GET | /api/employees | Listar colaboradores |
| POST | /api/employees | Criar colaborador |
| POST | /api/intelligence/generate | Gerar perfil inteligente |
| GET | /api/intelligence/profiles | Listar perfis |
| POST | /api/ai-assistant/chat | Chat com assistente IA |
| GET | /api/agents | Listar agentes IA |
| POST | /api/agents/talent/analyze | Análise de talentos |
| GET | /api/analytics/dashboard | Dados do dashboard |
| GET | /api/reports | Listar relatórios |
| GET | /api/subscriptions/plans | Planos disponíveis |

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| NODE_ENV | Ambiente | development |
| PORT | Porta do backend | 3000 |
| DATABASE_URL | URL do PostgreSQL | - |
| REDIS_URL | URL do Redis | - |
| JWT_SECRET | Segredo JWT | - |
| OPENAI_API_KEY | Chave da OpenAI | - |
| PINECONE_API_KEY | Chave Pinecone | - |

## Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

---

**Nexus HR AI™** - Transformando dados de pessoas em decisões estratégicas.
