FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/', (res) => { if (res.statusCode !== 200) process.exit(1); process.exit(0); }).on('error', () => process.exit(1));"

CMD ["npm", "start"]
