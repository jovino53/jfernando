# Guia de Deploy - Nexus HR AI

## 1. Pré-requisitos

### 1.1 Software Necessário
- Docker 24.0+
- Docker Compose v2.20+
- Node.js 20+ (para build local)
- Git

### 1.2 Contas Necessárias
- GitHub (código fonte)
- OpenAI (API de IA)
- Provedor Cloud (AWS/GCP/Azure)

## 2. Setup Local

### 2.1 Clone o Repositório
```bash
git clone https://github.com/seu-org/nexus-hr-ai.git
cd nexus-hr-ai
```

### 2.2 Configure Variáveis de Ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### 2.3 Inicie os Serviços
```bash
docker-compose up -d
```

### 2.4 Verifique os Serviços
```bash
docker-compose ps
```

### 2.5 Acesse as Aplicações
- Frontend: http://localhost:3001
- Backend: http://localhost:3000/api
- pgAdmin: http://localhost:5050
- Swagger: http://localhost:3000/api/docs

## 3. Deploy em Produção

### 3.1 AWS

#### 3.1.1 ECS (Elastic Container Service)

1. **Crie o cluster:**
```bash
aws ecs create-cluster --cluster-name nexus-hr-ai
```

2. **Registre as imagens no ECR:**
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker tag nexus-hr-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/nexus-hr-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/nexus-hr-backend:latest
```

3. **Crie o Task Definition:**
```json
{
  "family": "nexus-hr-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/nexus-hr-backend:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000
        }
      ],
      "environment": [
        {"name": "NODE_ENV", "value": "production"},
        {"name": "DB_HOST", "value": "<rds-endpoint>"}
      ]
    }
  ]
}
```

4. **Crie o Serviço:**
```bash
aws ecs create-service \
  --cluster nexus-hr-ai \
  --service-name nexus-hr-backend \
  --task-definition nexus-hr-backend \
  --desired-count 2 \
  --launch-type FARGATE
```

#### 3.1.2 RDS (PostgreSQL)

```bash
aws rds create-db-instance \
  --db-instance-identifier nexus-hr-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 16 \
  --master-username nexus_hr \
  --master-user-password <password> \
  --allocated-storage 20 \
  --storage-type gp3
```

### 3.2 Google Cloud

#### 3.2.1 Cloud Run

1. **Build e push das imagens:**
```bash
gcloud builds submit --tag gcr.io/<project-id>/nexus-hr-backend ./backend
gcloud builds submit --tag gcr.io/<project-id>/nexus-hr-frontend ./frontend
```

2. **Deploy no Cloud Run:**
```bash
gcloud run deploy nexus-hr-backend \
  --image gcr.io/<project-id>/nexus-hr-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### 3.2.2 Cloud SQL

```bash
gcloud sql instances create nexus-hr-db \
  --database-version=POSTGRES_16 \
  --tier=db-f1-micro \
  --region=us-central1
```

### 3.3 Azure

#### 3.3.1 Container Apps

```bash
az containerapp up \
  --name nexus-hr-backend \
  --resource-group nexus-hr-rg \
  --image <registry>/nexus-hr-backend:latest \
  --target-port 3000 \
  --ingress external
```

## 4. CI/CD com GitHub Actions

### 4.1 Workflow de Deploy

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd backend && npm ci
          cd ../frontend && npm ci
          
      - name: Run tests
        run: |
          cd backend && npm test
          cd ../frontend && npm test
          
      - name: Build
        run: |
          cd backend && npm run build
          cd ../frontend && npm run build
          
      - name: Deploy to production
        if: success()
        run: echo "Deploy to production"
```

## 5. Monitoramento

### 5.1 Logs

```bash
# Ver logs em tempo real
docker-compose logs -f backend

# Ver logs do PostgreSQL
docker-compose logs -f postgres
```

### 5.2 Métricas

Configure Prometheus e Grafana para monitoramento:

```yaml
# docker-compose.additions.yml
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - '9090:9090'
      
  grafana:
    image: grafana/grafana
    ports:
      - '3003:3000'
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## 6. Backup

### 6.1 Backup do PostgreSQL

```bash
# Backup manual
docker-compose exec postgres pg_dump -U nexus_hr nexus_hr_ai > backup.sql

# Backup automático (cron)
0 2 * * * docker-compose exec postgres pg_dump -U nexus_hr nexus_hr_ai > /backups/backup_$(date +\%Y\%m\%d).sql
```

### 6.2 Restore

```bash
cat backup.sql | docker-compose exec -T postgres psql -U nexus_hr -d nexus_hr_ai
```

## 7. troubleshooting

### 7.1 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Porta já em uso | Altere a porta no docker-compose.yml |
| Database não conecta | Verifique se o PostgreSQL está rodando |
| Erro de memória | Aumente o limite no docker-compose.yml |
| Build falhou | Verifique os logs com docker-compose logs |

### 7.2 Comandos Úteis

```bash
# Reiniciar serviços
docker-compose restart

# Reconstruir imagens
docker-compose build --no-cache

# Limpar volumes
docker-compose down -v

# Verificar status
docker-compose ps
```
