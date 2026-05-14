# Personal Portfolio Website - Testing Guide

## API Testing

### Prerequisites
- Backend running on `http://localhost:5000`
- MongoDB connected
- Postman or cURL

### Test Endpoints

#### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-05-14T10:30:00.000Z",
  "environment": "development"
}
```

---

## Projects API Tests

### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Project",
    "description": "This is a comprehensive description of my first project that demonstrates full-stack development",
    "image": "https://via.placeholder.com/300x200",
    "link": "https://github.com/username/project",
    "technologies": ["React", "Node.js", "MongoDB"]
  }'
```

### Get Single Project
```bash
curl http://localhost:5000/api/projects/{PROJECT_ID}
```

### Update Project
```bash
curl -X PATCH http://localhost:5000/api/projects/{PROJECT_ID} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title",
    "description": "Updated description"
  }'
```

### Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/{PROJECT_ID}
```

---

## Messages API Tests

### Get All Messages
```bash
curl http://localhost:5000/api/messages
```

### Create Message (Contact Form)
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Website Inquiry",
    "message": "This is a detailed message from a visitor who wants to discuss potential collaboration opportunities"
  }'
```

### Get Single Message
```bash
curl http://localhost:5000/api/messages/{MESSAGE_ID}
```

### Delete Message
```bash
curl -X DELETE http://localhost:5000/api/messages/{MESSAGE_ID}
```

---

## Validation Testing

### Test Invalid Project (Missing Title)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "description": "No title provided",
    "technologies": ["React"]
  }'
```

**Expected Error:**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "title": "Title is required"
  }
}
```

### Test Invalid Email
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "subject": "Test",
    "message": "This is a test message for validation"
  }'
```

### Test Short Message
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "subject": "Hi",
    "message": "Short"
  }'
```

---

## Rate Limiting Tests

### Test Rate Limit (General API)
```bash
# Make multiple requests rapidly to trigger rate limit
for i in {1..101}; do
  curl http://localhost:5000/api/projects
done
```

### Test Contact Form Rate Limit
```bash
# Make 6 contact form submissions within 1 hour to trigger limit
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "subject": "Test",
    "message": "This is test message number 1"
  }'
```

---

## Postman Collection

### Import Steps
1. Create a new Postman collection
2. Add these requests

### Sample Requests

**Create Project**
- Method: POST
- URL: `{{baseUrl}}/api/projects`
- Body (JSON):
```json
{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce platform with Stripe integration and user authentication",
  "image": "https://via.placeholder.com/400x300",
  "link": "https://github.com/user/ecommerce",
  "technologies": ["React", "Express", "MongoDB", "Stripe"]
}
```

---

## Frontend Testing

### Test Contact Form
1. Open `frontend/index.html` in browser
2. Navigate to Contact section
3. Fill in the form:
   - Name: Your Name
   - Email: your.email@example.com
   - Subject: Test Message
   - Message: This is a test message from the portfolio contact form
4. Click "Send Message"
5. Verify success message appears

### Test Admin Dashboard
1. Open `frontend/admin.html` in browser
2. Test adding a project via the form
3. Test editing a project
4. Test deleting a project
5. Test viewing all messages

### Responsive Design Testing
1. Open frontend in browser
2. Press F12 (Developer Tools)
3. Toggle device toolbar (Ctrl+Shift+M)
4. Test on different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

---

## Performance Testing

### Load Testing with Apache Bench
```bash
# Test 1000 requests
ab -n 1000 -c 10 http://localhost:5000/api/health

# Test with different concurrency
ab -n 1000 -c 50 http://localhost:5000/api/projects
```

### Response Time Monitoring
Check server logs for response times:
```bash
# From backend logs
[2024-05-14T10:30:00Z] GET /api/projects - 200 (45ms)
```

---

## Security Testing

### Test CORS Headers
```bash
curl -i -X OPTIONS http://localhost:5000/api/projects \
  -H "Origin: http://localhost:8000" \
  -H "Access-Control-Request-Method: GET"
```

### Test Invalid Routes
```bash
curl http://localhost:5000/api/invalid-route
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Route not found"
}
```

---

## Environment Setup for Testing

Create a `.env.test` file:
```
MONGODB_URI=mongodb://localhost:27017/portfolio_test
NODE_ENV=test
PORT=5001
```

---

## CI/CD Testing (GitHub Actions)

Create `.github/workflows/test.yml`:
```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:6
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

---

## Troubleshooting Tests

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongo --eval "db.adminCommand('ping')"
```

### CORS Errors in Frontend Tests
- Ensure `CORS_ORIGIN` in `.env` matches frontend URL
- Check browser console for specific CORS errors

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

---

## Test Checklist

- [ ] Health check endpoint returns correct status
- [ ] All projects can be created
- [ ] All projects can be retrieved
- [ ] Projects can be updated
- [ ] Projects can be deleted
- [ ] Contact form submissions work
- [ ] Messages can be deleted
- [ ] Validation errors are returned correctly
- [ ] Rate limiting is enforced
- [ ] CORS headers are present
- [ ] 404 errors for non-existent routes
- [ ] Error handling middleware works
- [ ] Frontend displays data correctly
- [ ] Admin dashboard functions properly
- [ ] Responsive design works on all screen sizes

---

## Notes

- Use `localhost` for local testing
- Use actual URLs for production testing
- Clear database between test runs if needed: `npm run seed`
- Check logs for debugging: See backend console output

Happy testing! 🧪
