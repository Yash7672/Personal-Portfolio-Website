## Deployment Guide

### Deploy to Heroku

#### Prerequisites
- Heroku CLI installed
- Git repository initialized

#### Steps

1. **Create Heroku App**
```bash
heroku create your-app-name
```

2. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

3. **Deploy**
```bash
git push heroku main
```

### Deploy to Netlify (Frontend)

1. **Build & Deploy**
   - Connect your GitHub repository to Netlify
   - Set build command: None (static files)
   - Set publish directory: `frontend`

### Deploy to Vercel

1. **Frontend Deployment**
```bash
npm install -g vercel
vercel
```

2. **Backend Deployment**
   - Use serverless functions or deploy to a separate backend service

### Environment Setup

#### MongoDB Atlas
1. Create cluster on MongoDB Atlas
2. Create database user
3. Copy connection string
4. Add connection string to `.env` file

#### Local Development
```bash
cd backend
npm install
npm run dev
```

#### Production Checklist
- [ ] Change JWT_SECRET
- [ ] Update CORS_ORIGIN
- [ ] Use MongoDB Atlas (not local)
- [ ] Set NODE_ENV=production
- [ ] Implement HTTPS
- [ ] Add security headers
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging

### Docker Deployment

1. **Build Image**
```bash
docker build -t portfolio-backend .
```

2. **Run Container**
```bash
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb://... \
  -e JWT_SECRET=... \
  portfolio-backend
```

3. **Using Docker Compose**
```bash
docker-compose up
```

### GitHub Pages (Static Frontend Only)

1. Push frontend folder to `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Set source to `gh-pages` branch

### Performance Optimization

- Enable gzip compression
- Minify CSS and JavaScript
- Optimize images
- Use CDN for static assets
- Implement caching strategies
- Database indexing
- Connection pooling

### Monitoring & Logging

- Set up error tracking (Sentry, LogRocket)
- Monitor API performance
- Track user analytics
- Log all errors and warnings
- Set up alerts for critical issues

### Security Best Practices

- Always use HTTPS
- Validate and sanitize inputs
- Use environment variables for secrets
- Implement rate limiting
- Add CORS headers
- Regular security audits
- Keep dependencies updated
- Use strong JWT secrets
