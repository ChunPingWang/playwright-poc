FROM node:20-alpine

WORKDIR /app

# 只複製 package files
COPY package.json package-lock.json ./

# 只安裝 production 依賴（Express）
RUN npm ci --omit=dev

# 複製 Demo App 原始碼
COPY src/demo-app/ ./src/demo-app/

EXPOSE 3000

HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "src/demo-app/api-mock-server.js"]
