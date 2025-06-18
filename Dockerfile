# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage - Nginx로 정적 파일 서빙
FROM nginx:alpine
# 빌드된 파일을 nginx 기본 디렉토리로 복사
COPY --from=builder /app/out /usr/share/nginx/html
# 컨테이너 내부 기본 nginx.conf 제거 (외부에서 마운트할 예정)
RUN rm /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]