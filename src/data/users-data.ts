import { IUser } from '../types/types.js';
import { v4 as uuidv4 } from 'uuid';

export const userList: Array<IUser> = [
  {
    id: uuidv4(),
    username: 'Winnie the Pooh',
    age: 18,
    hobbies: ['eat honey', 'helping neighbors'],
  },
  {
    id: uuidv4(),
    username: 'Christopher Robin',
    age: 10,
    hobbies: ['adventures'],
  },
  {
    id: uuidv4(),
    username: 'Piglet',
    age: 15,
    hobbies: ['playing with Winnie', 'be a small animal'],
  },
  {
    id: uuidv4(),
    username: 'Rabbit',
    age: 45,
    hobbies: ['gardening'],
  },
];
