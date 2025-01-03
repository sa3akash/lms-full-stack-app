# Admin

---

#### Register Admin;

`POST http://{{url}}/api/v1/admin/register`

```json
{
  "name": "",
  "password": "",
  "email": "",
  "phoneNumber": ""
}
```

#### Response

```json
{
  "message": "Register user****",
  "accessToken": "jwt token",
  "user": "user object"
}
```

---

---

#### Login Admin;

`POST http://{{url}}/api/v1/admin/login`

```json
{
  "email": "",
  "password": ""
}
```

#### Response

```json
{
  "message": "Login user****",
  "accessToken": "jwt token",
  "user": "user object"
}
```

---

---

#### Forgot Admin;

`POST http://{{url}}/api/v1/admin/forgot`

```json
{
  "email": ""
}
```

#### Response

```json
{
  "message": ""
}
```

---

---

#### Reset Admin;

`PUT http://{{url}}/api/v1/admin/reset`

```json
{
  "token": "",
  "password": ""
}
```

#### Response

```json
{
  "message": ""
}
```

---

---

#### Admin - Change Password;

`PUT http://{{url}}/api/v1/admin/change`

```tsx
headers = {
  Authorization: 'Bearer jwt-token'
};
```

```json
{
  "newPassword": "123456",
  "currentPassword": "123456"
}
```

#### Response

```json
{
  "message": ""
}
```

---

---

#### Admin - Change Role;

`PUT http://{{url}}/api/v1/admin/changeRole`

```tsx
headers = {
  Authorization: 'Bearer jwt-token'
};
```

```json
{
  "role": "",
  "id": ""
}
```

#### Response

```json
{
  "message": "",
  "data": "updated user data"
}
```

---

---

#### Admin - Change Role;

`PUT http://{{url}}/api/v1/admin/update`

```tsx
headers = {
  Authorization: 'Bearer jwt-token'
};
```

```json
{
  "name": "",
  "phoneNumber": ""
}
```

#### Response

```json
{
  "message": "",
  "data": "updated user data"
}
```

---

---

#### Admin - Get all;

`GET http://{{url}}/api/v1/admin`

```tsx
headers = {
  Authorization: 'Bearer jwt-token'
};
```

#### Response

```json
{
  "message": "",
  "data": "updated user data array "
}
```
