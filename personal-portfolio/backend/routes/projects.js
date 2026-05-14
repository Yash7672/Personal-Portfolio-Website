const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { validateProject } = require('../utils/validators');
const { errorHandler, successResponse } = require('../utils/errorHandler');

// Get all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(successResponse(projects, 'Projects retrieved successfully'));
  } catch (error) {
    next(error);
  }
});

// Get single project
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.json(successResponse(project, 'Project retrieved successfully'));
  } catch (error) {
    next(error);
  }
});

// Create project
router.post('/', async (req, res, next) => {
  try {
    // Validate input
    const errors = validateProject(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    const project = new Project(req.body);
    const newProject = await project.save();
    res.status(201).json(successResponse(newProject, 'Project created successfully', 201));
  } catch (error) {
    next(error);
  }
});

// Update project
router.patch('/:id', async (req, res, next) => {
  try {
    // Validate input if provided
    if (Object.keys(req.body).length > 0) {
      const errors = validateProject({ ...req.body });
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors
        });
      }
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    Object.assign(project, req.body);
    const updatedProject = await project.save();
    res.json(successResponse(updatedProject, 'Project updated successfully'));
  } catch (error) {
    next(error);
  }
});

// Delete project
router.delete('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.json(successResponse(null, 'Project deleted successfully'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
