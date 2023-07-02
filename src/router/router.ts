import { IncomingMessage, ServerResponse } from 'http';
import Controller from '../controller/controller.js';
import { getBodyData } from '../utils/getBodyHelper.js';

export const router = async (req: IncomingMessage, res: ServerResponse) => {
  // console.log('req.url', req.url);

  let urlParams = [];
  let userId;
  if (req.url) {
    urlParams = req.url.split('/');
    // console.log(urlParams);
    if (urlParams.length > 3) {
      userId = urlParams[3].toString();
    }
    // console.log('userId', userId);
  }

  if (req.url === '/api/users' && req.method === 'GET') {
    await getAllUsers(res);
  } else if (req.url === `/api/users/${userId}` && req.method === 'GET') {
    if (userId) {
      await getUserById(res, userId);
    }
  } else if (req.url === '/api/users' && req.method === 'POST') {
    await createUser(req, res);
  } else if (req.url === `/api/users/${userId}` && req.method === 'PUT') {
    if (userId) {
      await updateUser(req, res, userId);
    }
  } else if (req.url === `/api/users/${userId}` && req.method === 'DELETE') {
    if (userId) {
      await deleteUser(res, userId);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Sorry, such route was not found' }));
  }
};

const getAllUsers = async (res: ServerResponse) => {
  const allUsers = await new Controller().getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(allUsers));
};

const getUserById = async (res: ServerResponse, id: string) => {
  const user = await new Controller().getUserById(id);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  const newUserBody = await getBodyData(req);
  // console.log(newUserBody);
  const newUser = await new Controller().createUser(JSON.parse(newUserBody));
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newUser));
};

const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const newUserBody = await getBodyData(req);
  const updatedUser = await new Controller().updateUser(id, JSON.parse(newUserBody));
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(updatedUser));
};

const deleteUser = async (res: ServerResponse, id: string) => {
  const result = await new Controller().deleteUser(id);
  res.writeHead(204, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ result }));
};
//_________________________________________
//TODO: body example for testing
// {
//   "username": "Kenga",
//   "age": 30,
//   "hobbies": "['jumping']"
// }
