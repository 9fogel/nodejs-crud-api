## CRUD API

### Prerequisites
1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repository: https://github.com/9fogel/nodejs-crud-api
3. Switch to `develop` branch
4. To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)


### Program start
- The program is started by npm-script `start` in following way:

DEVELOPMENT mode:
```bash
npm run start:dev
```

PRODUCTION mode:
```bash
npm run start:prod
```

### Check
- To check the program functionality use [`Postman Agent`](https://www.postman.com/downloads/postman-agent/) or similar software.
- Use _localhost:3000/api/users_ endpoint

**The following operations are available:**

- **GET** `api/users` is used to get all persons
  - Server should answer with `status code` **200** and all users records

- **GET** `api/users/{userId}`
  - Server should answer with `status code` **200** and record with `id === userId` if it exists
  - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

- **POST** `api/users` is used to create record about new user and store it in database
   - Server should answer with `status code` **201** and newly created record
   - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

- **PUT** `api/users/{userId}` is used to update existing user
  - Server should answer with` status code` **200** and updated record
  - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist

- **DELETE** `api/users/{userId}` is used to delete existing user from database
  - Server should answer with `status code` **204** if the record is found and deleted
  - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist


**Body example for creating/updating a user (POST/PUT methods)**

```bash
{
   "username": "Kenga",
   "age": 30,
   "hobbies": "['jumping']"
 }
```