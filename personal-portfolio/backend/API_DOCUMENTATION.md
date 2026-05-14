# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Health Check
- **GET** `/health` - Check if server is running
  ```json
  {
    "status": "Server is running"
  }
  ```

### Projects

#### Get All Projects
- **GET** `/projects`
- **Response:** Array of project objects

#### Get Single Project
- **GET** `/projects/:id`
- **Response:** Single project object
- **Error:** 404 if not found

#### Create Project
- **POST** `/projects`
- **Body:**
  ```json
  {
    "title": "Project Title",
    "description": "Project description",
    "image": "https://image-url.jpg",
    "link": "https://github.com/user/project",
    "technologies": ["React", "Node.js", "MongoDB"]
  }
  ```
- **Response:** Created project object
- **Status:** 201 Created

#### Update Project
- **PATCH** `/projects/:id`
- **Body:** Any field to update (same as creation)
- **Response:** Updated project object

#### Delete Project
- **DELETE** `/projects/:id`
- **Response:** Success message
- **Status:** 200

### Messages

#### Get All Messages
- **GET** `/messages`
- **Response:** Array of message objects

#### Get Single Message
- **GET** `/messages/:id`
- **Response:** Single message object
- **Error:** 404 if not found

#### Create Message (Contact Form)
- **POST** `/messages`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Your message here"
  }
  ```
- **Response:** Created message object
- **Status:** 201 Created

#### Delete Message
- **DELETE** `/messages/:id`
- **Response:** Success message
- **Status:** 200

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error",
  "details": {
    "field_name": "Error message"
  }
}
```

### 404 Not Found
```json
{
  "message": "Project/Message not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error
