FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install --prefer-offline

COPY . .

RUN npx next build

EXPOSE 3000

CMD ["npm", "start"]
