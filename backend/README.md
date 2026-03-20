# Task-And-Furious (backend)

## API Endpoint

## Users Routes

### Sign Up User

**POST** `api/v1/users/sign-up`

### Sign In User

**POST** `api/v1/users/sign-in`

### Logout User

**POST** `api/v1/users/logout`

### Forgot Password

**POST** `api/v1/users/forgot-password`

### Reset Password

**POST** `api/v1/users/reset-password/:token`

### Get Current User

**GET** `api/v1/users/current-user`

### Add Profile Picture

**POST** `api/v1/users/:userId/profile-picture`

## Category Routes

### Add Category

**POST** `api/v1/categories/:userId`

### Update Category

**PUT** `api/v1/categories/:categoryId`

### Delete Category

**DELETE** `api/v1/categories/:categoryId`

## Task Routes

### Add Task

**POST** `api/v1/tasks/:userId/:categoryId`

### Update Task

**PUT** `api/v1/tasks/:taskId`

### Delete Task

**DELETE** `api/v1/tasks/:taskId`

### Complete Task

**PATCH** `api/v1/tasks/:taskId`

### Get All Task

**GET** `api/v1/tasks/user/:userId`
