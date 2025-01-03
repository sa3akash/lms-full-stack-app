I understand that you want a cleaner presentation for the request formatting in the documentation. Here’s a refined version with improved formatting for the request sections, making sure they are properly aligned and structured:

---

# Admin API Documentation

This document outlines the available API endpoints for Admin functionalities, detailing request methods, formats, and expected responses.

## API Endpoints Overview

| Endpoint                         | Method | Description           | Request Format                               | Response Format                           |
|----------------------------------|--------|-----------------------|----------------------------------------------|-------------------------------------------|
| `/api/v1/admin/register`        | POST   | Register an Admin     | `json { "name": "", "password": "", "email": "", "phoneNumber": "" }` | `json { "message": "", "accessToken": "", "user": {} }` |
| `/api/v1/admin/login`           | POST   | Login an Admin        | `json { "email": "", "password": "" }` | `json { "message": "", "accessToken": "", "user": {} }` |
| `/api/v1/admin/forgot`          | POST   | Forgot Password       | `json { "email": "" }`                 | `json { "message": "" }`           |
| `/api/v1/admin/reset`           | PUT    | Reset Password        | `json { "token": "", "password": "" }` | `json { "message": "" }`           |
| `/api/v1/admin/change`          | PUT    | Change Password       | `json { "newPassword": "", "currentPassword": "" }` | `json { "message": "" }`           |
| `/api/v1/admin/changeRole`      | PUT    | Change User Role      | `json { "role": "", "id": "" }`       | `json { "message": "", "data": {} }` |
| `/api/v1/admin/update`          | PUT    | Update Admin Info     | `json { "name": "", "phoneNumber": "" }` | `json { "message": "", "data": {} }` |
| `/api/v1/admin`                 | GET    | Get All Admins        | N/A                                          | `json { "message": "", "data": [] }` |

## Detailed Endpoint Information

### Register Admin
**Request**:
- **Endpoint**:  
  `POST http://{{url}}/api/v1/admin/register`

- **Payload**:
  ```json
  {
    "name": "Admin Name",
    "password": "securePassword",
    "email": "admin@example.com",
    "phoneNumber": "1234567890"
  }
  ```

**Response**:
```json
{
  "message": "Register user successful",
  "accessToken": "jwt token",
  "user": {
    "id": "user_id",
    "name": "Admin Name",
    "email": "admin@example.com"
  }
}
```

---

### Login Admin
**Request**:
- **Endpoint**:  
  `POST http://{{url}}/api/v1/admin/login`

- **Payload**:
  ```json
  {
    "email": "admin@example.com",
    "password": "securePassword"
  }
  ```

**Response**:
```json
{
  "message": "Login user successful",
  "accessToken": "jwt token",
  "user": {
    "id": "user_id",
    "name": "Admin Name",
    "email": "admin@example.com"
  }
}
```

---

### Forgot Admin Password
**Request**:
- **Endpoint**:  
  `POST http://{{url}}/api/v1/admin/forgot`

- **Payload**:
  ```json
  {
    "email": "admin@example.com"
  }
  ```

**Response**:
```json
{
  "message": "Password reset email sent"
}
```

---

### Reset Admin Password
**Request**:
- **Endpoint**:  
  `PUT http://{{url}}/api/v1/admin/reset`

- **Payload**:
  ```json
  {
    "token": "reset_token",
    "password": "newSecurePassword"
  }
  ```

**Response**:
```json
{
  "message": "Password reset successful"
}
```

---

### Change Admin Password
**Request**:
- **Endpoint**:  
  `PUT http://{{url}}/api/v1/admin/change`

- **Headers**:
  ```javascript
  {
    "Authorization": "Bearer jwt-token"
  }
  ```

- **Payload**:
  ```json
  {
    "newPassword": "newSecurePassword",
    "currentPassword": "currentSecurePassword"
  }
  ```

**Response**:
```json
{
  "message": "Password changed successfully"
}
```

---

### Change Admin Role
**Request**:
- **Endpoint**:  
  `PUT http://{{url}}/api/v1/admin/changeRole`

- **Headers**:
  ```javascript
  {
    "Authorization": "Bearer jwt-token"
  }
  ```

- **Payload**:
  ```json
  {
    "role": "newRole",
    "id": "user_id"
  }
  ```

**Response**:
```json
{
  "message": "Role updated successfully",
  "data": {
    "id": "user_id",
    "name": "User Name",
    "role": "newRole"
  }
}
```

---

### Update Admin Information
**Request**:
- **Endpoint**:  
  `PUT http://{{url}}/api/v1/admin/update`

- **Headers**:
  ```javascript
  {
    "Authorization": "Bearer jwt-token"
  }
  ```

- **Payload**:
  ```json
  {
    "name": "Updated Admin Name",
    "phoneNumber": "0987654321"
  }
  ```

**Response**:
```json
{
  "message": "User information updated successfully",
  "data": {
    "id": "user_id",
    "name": "Updated Admin Name",
    "phoneNumber": "0987654321"
  }
}
```

---

### Get All Admins
**Request**:
- **Endpoint**:  
  `GET http://{{url}}/api/v1/admin`

- **Headers**:
  ```javascript
  {
    "Authorization": "Bearer jwt-token"
  }
  ```

**Response**:
```json
{
  "message": "Admins retrieved successfully",
  "data": [
    {
      "id": "user_id",
      "name": "Admin Name",
      "email": "admin@example.com"
    },
    ...
  ]
}
```

---

This format ensures that the request payloads are well-structured and easy to read, making the documentation clearer and more professional. Let me know if you need any further adjustments!
