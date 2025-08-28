# Docker Development Guide

This guide explains how to run the Nasrul Portfolio using Docker for local development and containerized deployment.

## 🐳 Quick Start with Docker

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Development Setup

1. **Clone and setup environment**
   ```bash
   git clone <repository-url>
   cd nasrul-portfolio
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

2. **Build and run with Docker Compose**
   ```bash
   # Build and start the application
   docker-compose up --build

   # Or run in detached mode
   docker-compose up -d --build
   ```

3. **Access the application**
   ```
   http://localhost:3000
   ```

### Manual Docker Commands

If you prefer running Docker commands directly:

```bash
# Build the Docker image
docker build -t nasrul-portfolio .

# Run the container
docker run -p 3000:3000 --env-file .env.local nasrul-portfolio

# Run with environment variables inline
docker run -p 3000:3000 \
  -e EMAIL_SERVICE=gmail \
  -e EMAIL_USER=your-email@gmail.com \
  -e EMAIL_PASSWORD=your-app-password \
  -e HCAPTCHA_SECRET_KEY=your-secret \
  -e NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your-site-key \
  nasrul-portfolio
```

## 📁 Docker Configuration

### Dockerfile Structure

The Dockerfile uses a multi-stage build approach:

1. **deps**: Install production dependencies
2. **builder**: Build the Next.js application
3. **runner**: Production runtime with minimal image size

Key features:
- **Alpine Linux base** for smaller image size
- **Non-root user** for security
- **Standalone output** for optimal containerization
- **Layer caching** for faster rebuilds

### Docker Compose Services

#### Main Application (`portfolio`)
- **Port**: 3000
- **Health checks**: Built-in health monitoring
- **Environment**: Configurable via `.env.local`
- **Restart policy**: Unless stopped manually

#### Reverse Proxy (`nginx`) - Optional
- **Ports**: 80 (HTTP), 443 (HTTPS)
- **SSL**: Ready for SSL certificate mounting
- **Profile**: `production` (only runs with `--profile production`)

## 🔧 Configuration

### Environment Variables

Create `.env.local` with required variables:

```bash
# Required for contact form
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=contact@yourdomain.com

# Required for spam protection
HCAPTCHA_SECRET_KEY=your-secret-key
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your-site-key

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Health Check Endpoint

The application includes a health check endpoint at `/api/health`:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "environment": "production",
  "version": "1.0.0"
}
```

## 🚀 Deployment Options

### Development

```bash
# Standard development
docker-compose up --build

# With file watching (if you have mounted volumes)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### Production

```bash
# Production with Nginx reverse proxy
docker-compose --profile production up -d --build

# Or just the application
docker-compose up -d --build portfolio
```

### Cloud Deployment

The Docker image is ready for deployment on:
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**
- **Any Kubernetes cluster**

## 📊 Performance

### Image Size Optimization
- **Base image**: Node.js 20 Alpine (~5MB base)
- **Multi-stage build**: Only production files in final image
- **Standalone output**: Next.js optimized for containers
- **Layer caching**: Efficient dependency management

### Runtime Performance
- **Non-root user**: Enhanced security
- **Health checks**: Container monitoring
- **Graceful shutdown**: Proper signal handling
- **Memory efficient**: Optimized for containerized environments

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change port in docker-compose.yml or stop conflicting service
   docker-compose down
   lsof -ti:3000 | xargs kill -9
   ```

2. **Environment variables not loading**
   ```bash
   # Verify .env.local exists and is readable
   ls -la .env.local
   
   # Check environment in container
   docker-compose exec portfolio env | grep EMAIL
   ```

3. **Build failures**
   ```bash
   # Clean build without cache
   docker-compose build --no-cache
   
   # Remove all containers and rebuild
   docker-compose down --volumes --rmi all
   docker-compose up --build
   ```

4. **Health check failures**
   ```bash
   # Check health status
   docker-compose ps
   
   # View health check logs
   docker-compose logs portfolio
   
   # Test health endpoint manually
   curl http://localhost:3000/api/health
   ```

### Debugging

```bash
# View container logs
docker-compose logs -f portfolio

# Execute commands in running container
docker-compose exec portfolio sh

# Inspect container
docker-compose exec portfolio ps aux
docker-compose exec portfolio df -h
```

## 🔒 Security Considerations

### Container Security
- **Non-root user**: Application runs as `nextjs` user (UID 1001)
- **Read-only filesystem**: Consider adding `--read-only` for production
- **Resource limits**: Set memory/CPU limits in production
- **Network isolation**: Uses custom Docker network

### Environment Security
- **Secret management**: Use Docker secrets for sensitive data
- **Image scanning**: Regularly scan images for vulnerabilities
- **Updates**: Keep base images and dependencies updated

## 📝 Advanced Usage

### Custom Nginx Configuration

Create `nginx/nginx.conf` for the reverse proxy:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream portfolio {
        server portfolio:3000;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://portfolio;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

### Development with Volume Mounts

Create `docker-compose.dev.yml`:

```yaml
version: '3.8'
services:
  portfolio:
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev
    environment:
      - NODE_ENV=development
```

Run with: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`

### Monitoring and Logging

```bash
# Monitor resource usage
docker stats nasrul-portfolio

# Export logs
docker-compose logs --since="1h" > logs.txt

# Follow logs in real-time
docker-compose logs -f --tail=100
```

---

This Docker setup provides a complete containerized development and deployment solution for the portfolio application. The configuration is production-ready and can be easily adapted for various cloud platforms and orchestration systems.