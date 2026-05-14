# Personal Portfolio Website

A modern, full-stack personal portfolio website built with Node.js/Express backend and vanilla HTML/CSS/JavaScript frontend.

## Project Structure

```
personal-portfolio/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Project.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── projects.js
│   │   └── messages.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── seed.js
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   └── index.html
├── README.md
└── .gitignore
```

## Features

- **Responsive Design** - Mobile-friendly layout that works on all devices
- **Project Showcase** - Display your projects with descriptions and technologies
- **Contact Form** - Receive messages directly from your portfolio
- **Modern UI** - Clean and professional design with smooth animations
- **RESTful API** - Complete backend API for managing projects and messages
- **Database Integration** - MongoDB integration for data persistence

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **Fetch API** - For API communication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

4. (Optional) Seed the database with sample projects:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

The backend will be running at `http://localhost:5000`

### Frontend Setup

1. Open `frontend/index.html` in your web browser, or
2. Serve it with a local server:
```bash
cd frontend
python -m http.server 8000
```

Then visit `http://localhost:8000`

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PATCH /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Messages
- `GET /api/messages` - Get all messages
- `GET /api/messages/:id` - Get a specific message
- `POST /api/messages` - Create a new message
- `DELETE /api/messages/:id` - Delete a message

## Usage

### Adding Projects

1. Use the API endpoint to add projects:
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "technologies": ["React", "Node.js"],
    "link": "https://github.com/username/project"
  }'
```

2. Or use the seed.js file to add sample projects.

### Customization

- Edit `frontend/css/style.css` to customize the design
- Modify `frontend/js/main.js` to change frontend functionality
- Update `backend/models/` to add new data fields
- Edit `frontend/index.html` to change the content structure

## Environment Variables

Create a `.env` file in the backend directory:

```
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

## License

MIT License - feel free to use this project for your own portfolio!

## Support

For issues or questions, please open an issue on GitHub.

---

Happy coding! 🚀
