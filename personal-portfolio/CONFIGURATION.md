# Configuration Guide

## Environment Variables

### Backend Configuration (.env)

#### Database Configuration
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```
- Local: Use local MongoDB instance
- Cloud: Use MongoDB Atlas connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/database`

#### Server Configuration
```
PORT=5000
NODE_ENV=development
```
- PORT: Server port (default: 5000)
- NODE_ENV: Environment mode (development/production)

#### Security
```
JWT_SECRET=your_very_secure_secret_key_min_32_chars
CORS_ORIGIN=http://localhost:8000
```
- JWT_SECRET: Secret key for JWT tokens (change for production!)
- CORS_ORIGIN: Frontend URL for CORS

#### Email Configuration (Optional)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

#### Admin Credentials (Optional)
```
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=your_secure_password
```

---

## MongoDB Setup

### Local Installation

#### Windows
1. Download from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run installer
3. Select "Install as a Service"
4. MongoDB will start automatically

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
# Import GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repo
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start service
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and project
3. Create cluster:
   - Choose free tier
   - Select region (closest to users)
   - Configure cluster name
4. Create database user:
   - Username: your_username
   - Password: strong_password
   - Permissions: Read and write to any database
5. Whitelist IP addresses:
   - Your computer: 0.0.0.0/0 (for development)
   - Production: Specific IPs
6. Connect:
   - Copy connection string
   - Replace username and password
   - Use in MONGODB_URI

**Connection String Format:**
```
mongodb+srv://username:password@cluster-name.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Node.js & npm Setup

### Installation

#### Windows & macOS
Download from [nodejs.org](https://nodejs.org/)
- LTS version recommended
- Includes npm

#### Linux
```bash
# Using NodeSource repository (Debian/Ubuntu)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verify Installation
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 8.x.x or higher
```

### npm Configuration

#### Global Settings
```bash
# Set npm registry (optional)
npm config set registry https://registry.npmjs.org/

# View configuration
npm config list

# Set default author
npm config set init-author-name "Your Name"
npm config set init-author-email "your.email@example.com"
```

---

## Project Configuration

### Initial Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Create .env File**
```bash
cp .env.example .env
```

3. **Edit .env with Your Values**
```bash
# Development
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
JWT_SECRET=dev_secret_key_change_in_production
CORS_ORIGIN=http://localhost:8000
```

### Development Configuration

**Development .env:**
```
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
PORT=5000
JWT_SECRET=development_secret_key
CORS_ORIGIN=http://localhost:8000
DEBUG=true
```

### Production Configuration

**Production .env:**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
NODE_ENV=production
PORT=5000
JWT_SECRET=your_very_secure_production_key
CORS_ORIGIN=https://yourdomain.com
DEBUG=false
```

---

## Docker Configuration

### Environment Variables for Docker

**docker-compose.yml already includes:**
```yaml
environment:
  MONGODB_URI: mongodb://root:password@mongodb:27017/portfolio?authSource=admin
  NODE_ENV: development
  PORT: 5000
```

### Building Docker Image

```bash
# Build image
docker build -t portfolio-app .

# Run container
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb://... \
  -e JWT_SECRET=secret \
  portfolio-app

# Using docker-compose
docker-compose up
```

---

## API Configuration

### Base URL

**Development:**
```
http://localhost:5000/api
```

**Production:**
```
https://yourdomain.com/api
```

### Request Headers

**Required for all POST/PATCH requests:**
```
Content-Type: application/json
```

**Optional Authentication:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## CORS Configuration

### Allowed Origins

**Development:**
- http://localhost:8000
- http://localhost:3000
- http://127.0.0.1:8000

**Production:**
- https://yourdomain.com
- https://www.yourdomain.com

### Update CORS_ORIGIN:
```bash
# Development
CORS_ORIGIN=http://localhost:8000

# Production
CORS_ORIGIN=https://yourdomain.com
```

---

## Deployment Configuration

### Heroku

**Set Config Vars:**
```bash
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your_production_secret
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://your-app.herokuapp.com
```

### Vercel

Create `vercel.json`:
```json
{
  "buildCommand": "npm install",
  "outputDirectory": ".",
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

### AWS

Create `.env.production`:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
NODE_ENV=production
```

---

## Logging Configuration

### Log Levels

The logger middleware logs:
- **Request**: Method, URL, Timestamp
- **Response**: Status Code, Duration, Timestamp

### View Logs

**Development (Console):**
```
[2024-05-14T10:30:00Z] GET /api/projects
[2024-05-14T10:30:00Z] GET /api/projects - 200 (45ms)
```

**Production (Files):**
```bash
# Install winston or bunyan for file logging
npm install winston
```

---

## Security Configuration

### JWT Secret Generation

```bash
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### HTTPS Configuration

**Production:**
- Use HTTPS always
- Get SSL certificate (Let's Encrypt for free)
- Redirect HTTP to HTTPS

### Rate Limiting Configuration

**Current Settings:**
- General API: 100 requests per 15 minutes
- Contact Form: 5 submissions per hour

**To Change:**
Edit `middleware/rateLimiter.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // Time window
  max: 100,                   // Max requests
});
```

---

## Performance Configuration

### Caching

**Add Redis (Optional):**
```bash
npm install redis
```

### Database Indexing

MongoDB automatically creates index on `_id`. For performance:

```javascript
// In models/Project.js
projectSchema.index({ createdAt: -1 });
projectSchema.index({ technologies: 1 });
```

### Compression

Already included in Express:
```javascript
app.use(express.json());  // Built-in compression
```

---

## Development Tools Configuration

### VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Git Configuration

```bash
# Set git user (if not configured)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Create .gitignore (already included)
cat .gitignore
```

---

## Testing Configuration

### Test Environment

Create `.env.test`:
```
MONGODB_URI=mongodb://localhost:27017/portfolio_test
NODE_ENV=test
PORT=5001
```

### Run Tests
```bash
NODE_ENV=test npm test
```

---

## Troubleshooting Configuration

### Port in Use
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection
```bash
# Test connection
mongosh mongodb://localhost:27017

# Check service (macOS)
brew services list
```

### Environment Variables Not Loading
- Check `.env` file location (should be in `backend/`)
- Check `dotenv` is imported first in server.js
- Restart server after changing `.env`

---

## Summary Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB installed or Atlas account created
- [ ] .env file created and configured
- [ ] Dependencies installed (npm install)
- [ ] Database connection verified
- [ ] Server starts without errors
- [ ] API endpoints responding
- [ ] Frontend can reach API
- [ ] CORS configured correctly
- [ ] JWT secret set to secure value

---

Happy configuring! 🚀
