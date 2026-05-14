# Getting Started Guide

## Quick Start

### 1. Clone and Setup
```bash
git clone https://github.com/yourusername/Personal-Portfolio-Website.git
cd personal-portfolio
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment
```bash
cp .env.example .env
# Edit .env with your settings
```

#### Install MongoDB
- **Local:** Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- **Cloud:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended)

#### Start Backend
```bash
npm run dev
```
Server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Open in Browser
Navigate to `personal-portfolio/frontend/index.html` in your browser, or serve with:

```bash
cd frontend
python -m http.server 8000
```

Visit `http://localhost:8000`

### 4. Add Sample Data

```bash
cd backend
npm run seed
```

This adds sample projects to your database.

## Project Structure

```
personal-portfolio/
├── backend/              # Express.js API
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Helper functions
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env             # Environment variables
├── frontend/            # Static web app
│   ├── index.html       # Portfolio page
│   ├── admin.html       # Admin dashboard
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   └── assets/          # Images & fonts
└── README.md            # This file
```

## Available Scripts

### Backend
```bash
npm start     # Run server
npm run dev   # Run with nodemon (development)
npm run seed  # Populate database with sample data
```

## API Usage

### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### Add Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Description",
    "technologies": ["React", "Node.js"],
    "link": "https://github.com/..."
  }'
```

## Features

- ✅ Responsive portfolio website
- ✅ Project showcase with filtering
- ✅ Contact form with validation
- ✅ Admin dashboard for management
- ✅ RESTful API
- ✅ MongoDB integration
- ✅ Rate limiting
- ✅ Error handling
- ✅ Security middleware

## Customization

### Change Colors
Edit `frontend/css/style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### Add Your Information
Edit `frontend/index.html` sections to include:
- Your name and bio
- Skills list
- Project details
- Contact information
- Social media links

### Modify Database Schema
Edit files in `backend/models/` to add new fields.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify MongoDB credentials if using Atlas

### CORS Errors
- Update `CORS_ORIGIN` in `.env`
- Ensure frontend and backend URLs match

### Port Already in Use
```bash
# Change PORT in .env or:
sudo lsof -i :5000
kill -9 <PID>
```

## Next Steps

1. **Customize**: Update portfolio content with your projects
2. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Enhance**: Add authentication, comments, or other features
4. **Share**: Deploy and share your portfolio

## Support

- Read [API Documentation](./backend/API_DOCUMENTATION.md)
- Check [Deployment Guide](./DEPLOYMENT.md)
- Review code comments for detailed explanations

## License

MIT License - feel free to use and modify!

---

Happy building! 🚀
