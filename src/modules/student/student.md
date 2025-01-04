I understand that you want a cleaner presentation for the request formatting in the documentation. Here’s a refined version with improved formatting for the request sections, making sure they are properly aligned and structured:

---

# Student API Documentation

This document outlines the available API endpoints for Admin functionalities, detailing request methods, formats, and expected responses.


## Detailed Endpoint Information Only Admin can create, update and delete Student

### Add Student
**Request**:
- **Endpoint**:  
  `POST http://{{url}}/api/v1/student/create`
- **Headers**:
  ```javascript
  {
    "Authorization" : "Bearer jwt-token"
  }
  ```
- **Payload**:
  ```json
  {
  "studentName":"Admin",
  "dateOfBirth":"123456",
  "bloodGroup":"",
  "religion":"",
  "fatherName":"",
  "motherName":"",
  "parentPhoneNumber":"",
  "parentAddress":"",
  "fatherProfession":"",
  "motherProfession":"",
  "class": ""
  }
  ```

**Response**:
```json
{
  "message": "Add Student",
  "user": {
    "_id": "user_id",
    "name": "Admin Name",
    "email": "admin@example.com",
    "...": "..."
  }
}
```

---

### Update Student
**Request**:
- **Endpoint**:  
  `PUT http://{{url}}/api/v1/update/:id`
- **Headers**:
  ```javascript
  {
    "Authorization": "Bearer jwt-token"
  }
  ```
- **Payload**:
  ```json
  {
  "studentName":"Admin",
  "dateOfBirth":"123456",
  "bloodGroup":"",
  "religion":"",
  "fatherName":"",
  "motherName":"",
  "parentPhoneNumber":"",
  "parentAddress":"",
  "fatherProfession":"",
  "motherProfession":"",
  "class": ""
  }
  ```

**Response**:
```json
{
  "message": "Updated Student",
  "user": {
    "_id": "user_id",
    "name": "Admin Name",
    "email": "admin@example.com",
    "...": "..."
  }
}
```

---

### Delete Student
**Request**:
- **Endpoint**:  
  `DELETE http://{{url}}/api/v1/delete/:id`
- 
- **Headers**:
  ```javascript
  {
    "Authorization": "Bearer jwt-token"
  }
  ```
- **Payload**:
  ```json
  {}
  ```

**Response**:
```json
{
  "message": ""
}
```

---

### Get Single Student Details
**Request**:
- **Endpoint**:  
  `GET http://{{url}}/api/v1/single/:id`
- **Headers**:
  ```javascript
  {
    "Authorization": "Bearer jwt-token"
  }
  ```

**Response**:
```json
{
  "message": "",
  "data": {
    "_id": "user_id",
    "name": "Admin Name",
    "email": "admin@example.com",
    "...": "..."
  }
}
```

---

### Get All Student
**Request**:
- **Endpoint**:  
  `GET http://{{url}}/api/v1/student`
- **Headers**:
  ```javascript
  {
    "Authorization": "Bearer jwt-token"
  }
  ```

**Response**:
```json
{
  "message": "",
  "data": []
}
```



---

This format ensures that the request payloads are well-structured and easy to read, making the documentation clearer and more professional. Let me know if you need any further adjustments!
