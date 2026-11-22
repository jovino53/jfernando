# API Documentation - Nexus HR AI

## Visão Geral

Base URL: `http://localhost:3000/api`

Autenticação: Bearer Token (JWT)

## Endpoints

### Auth

#### POST /auth/login
Realizar login.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "admin"
  }
}
```

#### POST /auth/register
Registrar novo usuário.

#### GET /auth/profile
Obter perfil do usuário logado.

---

### Employees

#### GET /employees
Listar todos os colaboradores.

**Query Parameters:**
- `department` - Filtrar por departamento

#### POST /employees
Criar novo colaborador.

**Request Body:**
```json
{
  "firstName": "João",
  "lastName": "Silva",
  "email": "joao@empresa.com",
  "position": "Desenvolvedor",
  "department": "TI"
}
```

#### GET /employees/:id
Obter colaborador por ID.

#### PUT /employees/:id
Atualizar colaborador.

#### DELETE /employees/:id
Remover colaborador.

#### GET /employees/stats
Obter estatísticas de colaboradores.

---

### Competencies

#### GET /competencies
Listar todas as competências.

#### POST /competencies
Criar nova competência.

**Request Body:**
```json
{
  "name": "React.js",
  "description": "Framework frontend",
  "category": "technical"
}
```

#### GET /competencies/category/:category
Listar por categoria.

#### POST /competencies/assign/:employeeId/:competencyId
Atribuir competência ao colaborador.

#### GET /competencies/employee/:employeeId
Obter competências do colaborador.

#### GET /competencies/analyze/:employeeId
Analisar competências com IA.

---

### Analytics

#### GET /analytics/dashboard
Obter dados do dashboard.

**Response:**
```json
{
  "summary": {
    "totalEmployees": 340,
    "activeEmployees": 320,
    "turnoverRate": 8.5,
    "employeeSatisfaction": 4.2
  },
  "departments": [...],
  "recentHires": [...],
  "monthlyTrends": [...]
}
```

#### GET /analytics/departments
Análise por departamento.

#### GET /analytics/turnover
Análise de turnover.

#### GET /analytics/compensation
Análise de compensação.

---

### AI Assistant

#### POST /ai-assistant/chat
Conversar com assistente IA.

**Request Body:**
```json
{
  "message": "Quais são os benefícios da empresa?"
}
```

**Response:**
```json
{
  "response": "Nossos benefícios incluem: plano de saúde, vale-refeição...",
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 100,
    "total_tokens": 150
  }
}
```

#### POST /ai-assistant/analyze-employee
Analisar perfil de colaborador com IA.

#### POST /ai-assistant/generate-report
Gerar relatório com IA.

---

### Reports

#### GET /reports
Listar todos os relatórios.

#### POST /reports
Criar novo relatório.

**Request Body:**
```json
{
  "title": "Relatório de Headcount Q1",
  "type": "headcount"
}
```

#### GET /reports/:id
Obter relatório por ID.

#### POST /reports/:id/generate
Gerar dados do relatório.

#### DELETE /reports/:id
Remover relatório.

---

### Climate

#### GET /climate/surveys
Listar pesquisas de clima.

#### POST /climate/surveys
Criar pesquisa de clima.

**Request Body:**
```json
{
  "title": "Pesquisa de Clima Q1 2024",
  "questions": [
    {
      "question": "Como você avalia o ambiente de trabalho?",
      "type": "scale"
    }
  ]
}
```

#### GET /climate/surveys/:id
Obter pesquisa por ID.

#### POST /climate/surveys/:id/responses
Enviar resposta da pesquisa.

#### GET /climate/surveys/:id/results
Obter resultados da pesquisa.

---

### Talent

#### GET /talent/positions
Listar vagas.

#### POST /talent/positions
Criar vaga.

**Request Body:**
```json
{
  "title": "Desenvolvedor Full Stack",
  "department": "TI",
  "salaryRangeMin": 6000,
  "salaryRangeMax": 10000
}
```

#### GET /talent/positions/:id
Obter vaga por ID.

#### GET /talent/candidates
Listar candidatos.

#### POST /talent/candidates
Cadastrar candidato.

#### PATCH /talent/candidates/:id/status
Atualizar status do candidato.

#### GET /talent/pipeline
Obter pipeline de talentos.

---

### Knowledge Base

#### GET /knowledge-base
Listar artigos publicados.

#### POST /knowledge-base
Criar artigo.

**Request Body:**
```json
{
  "title": "Política de Home Office",
  "content": "Conteúdo do artigo...",
  "category": "policies",
  "tags": ["home office", "trabalho remoto"]
}
```

#### GET /knowledge-base/search?q=query
Buscar artigos.

#### GET /knowledge-base/popular
Artigos mais populares.

#### GET /knowledge-base/category/:category
Listar por categoria.

#### GET /knowledge-base/:id
Obter artigo por ID.

#### PUT /knowledge-base/:id
Atualizar artigo.

#### DELETE /knowledge-base/:id
Remover artigo.

---

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado |
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 403 | Proibido |
| 404 | Não encontrado |
| 500 | Erro interno |

## Rate Limiting

- 100 requisições por minuto por IP
- 1000 requisições por hora por usuário
