require('dotenv').config();
const connectDB = require('./config/db');
const Project = require('./models/Project');

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with payment integration',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://github.com/yourusername/ecommerce'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application',
    technologies: ['React', 'Firebase', 'Material-UI'],
    link: 'https://github.com/yourusername/task-manager'
  },
  {
    title: 'Weather App',
    description: 'Real-time weather application with location-based forecasts',
    technologies: ['Vue.js', 'OpenWeather API', 'Tailwind CSS'],
    link: 'https://github.com/yourusername/weather-app'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);
    console.log('Sample projects added to database');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
