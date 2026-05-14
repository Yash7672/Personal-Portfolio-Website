// Admin Dashboard JavaScript
const API_BASE_URL = 'http://localhost:5000/api';
let currentEditId = null;

// Tab switching
document.querySelectorAll('.tab-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tabName = link.dataset.tab;
    
    // Remove active class from all links and tabs
    document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked link and corresponding tab
    link.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Load content
    if (tabName === 'projects') loadProjects();
    if (tabName === 'messages') loadMessages();
  });
});

// Load projects
async function loadProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    document.getElementById('projects-list').innerHTML = '<p>Error loading projects</p>';
  }
}

function displayProjects(projects) {
  const container = document.getElementById('projects-list');
  if (projects.length === 0) {
    container.innerHTML = '<p>No projects yet. Add one to get started!</p>';
    return;
  }

  container.innerHTML = projects.map(project => `
    <div class="project-card">
      <h4>${project.title}</h4>
      <p>${project.description}</p>
      <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
      <div class="project-actions">
        <button class="btn btn-secondary" onclick="editProject('${project._id}')">Edit</button>
        <button class="btn btn-danger" onclick="deleteProject('${project._id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

// Load messages
async function loadMessages() {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`);
    const messages = await response.json();
    displayMessages(messages);
  } catch (error) {
    console.error('Error loading messages:', error);
    document.getElementById('messages-list').innerHTML = '<p>Error loading messages</p>';
  }
}

function displayMessages(messages) {
  const container = document.getElementById('messages-list');
  if (messages.length === 0) {
    container.innerHTML = '<p>No messages yet.</p>';
    return;
  }

  container.innerHTML = messages.map(message => `
    <div class="message-card">
      <h4>${message.name}</h4>
      <p><strong>Email:</strong> ${message.email}</p>
      <p><strong>Subject:</strong> ${message.subject}</p>
      <p><strong>Message:</strong> ${message.message}</p>
      <p><small>${new Date(message.createdAt).toLocaleDateString()}</small></p>
      <div class="message-actions">
        <button class="btn btn-danger" onclick="deleteMessage('${message._id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

// Project form
document.getElementById('add-project-btn').addEventListener('click', () => {
  currentEditId = null;
  document.getElementById('form-title').textContent = 'Add New Project';
  document.getElementById('project-form').reset();
  document.getElementById('project-form-modal').classList.remove('hidden');
});

document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('project-form-modal').classList.add('hidden');
});

document.getElementById('project-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const projectData = {
    title: document.getElementById('project-title').value,
    description: document.getElementById('project-description').value,
    image: document.getElementById('project-image').value,
    link: document.getElementById('project-link').value,
    technologies: document.getElementById('project-technologies').value.split(',').map(t => t.trim())
  };

  try {
    const url = currentEditId 
      ? `${API_BASE_URL}/projects/${currentEditId}`
      : `${API_BASE_URL}/projects`;
    
    const method = currentEditId ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });

    if (response.ok) {
      alert(currentEditId ? 'Project updated!' : 'Project created!');
      document.getElementById('project-form-modal').classList.add('hidden');
      loadProjects();
    } else {
      alert('Error saving project');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving project');
  }
});

async function editProject(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    const project = await response.json();
    
    currentEditId = id;
    document.getElementById('form-title').textContent = 'Edit Project';
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-description').value = project.description;
    document.getElementById('project-image').value = project.image || '';
    document.getElementById('project-link').value = project.link || '';
    document.getElementById('project-technologies').value = project.technologies.join(', ');
    
    document.getElementById('project-form-modal').classList.remove('hidden');
  } catch (error) {
    console.error('Error:', error);
    alert('Error loading project');
  }
}

async function deleteProject(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Project deleted!');
        loadProjects();
      } else {
        alert('Error deleting project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting project');
    }
  }
}

async function deleteMessage(id) {
  if (confirm('Are you sure you want to delete this message?')) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Message deleted!');
        loadMessages();
      } else {
        alert('Error deleting message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting message');
    }
  }
}

// Load projects on page load
window.addEventListener('DOMContentLoaded', loadProjects);
