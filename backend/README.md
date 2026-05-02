# Task-And-Furious (backend)

## API Endpoint

## Users Routes

### Sign Up User

**POST** `api/v1/users/sign-up`

### Login User

**POST** `api/v1/users/login`

### Logout User

**POST** `api/v1/users/logout`

### Refresh Access Token

**POST** `api/v1/users/refresh-token`

### Forgot Password

**POST** `api/v1/users/forgot-password`

### Reset Password

**POST** `api/v1/users/reset-password/:token`

### Get Current User

**GET** `api/v1/users/current-user`

### Add Profile Picture

**POST** `api/v1/users/:userId/profile-picture`

## Category Routes

### Add Category - Personal

**POST** `api/v1/categories/personal/:userId`

### Add Category - Team

**POST** `api/v1/categories/team/:workspaceId/:userId`

### Update Category

**PUT** `api/v1/categories/:categoryId`

### Delete Category

**DELETE** `api/v1/categories/:categoryId`

### Get Default Categories

**GET** `api/v1/categories/default`

### Get All Categories By UserId

**GET** `api/v1/categories/:userId`

## Task Routes

### Add Task - Personal

**POST** `api/v1/tasks/personal/:userId/:categoryId`

### Add Task - Team

**POST** `api/v1/tasks/team/:workspaceId/:userId/:categoryId`

### Update Task

**PUT** `api/v1/tasks/:taskId`

### Delete Task

**DELETE** `api/v1/tasks/:taskId`

### Complete Task

**PATCH** `api/v1/tasks/:taskId`

### Get All Task by UserId

**GET** `api/v1/tasks/user/:userId`

## Workspace Routes

### Create Workspace

**POST** `api/v1/workspace/:userId`

### Add Teammates

**POST** `api/v1/workspace/:workspaceId/members/:userId`

### Get Workspace by UserId

**POST** `api/v1/workspace/user/:userId`
