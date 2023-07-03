import { ServerResponse } from 'http';

export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: Array<string> | [];
}

export interface IController {
  getUsers(): Promise<IUser[]>;
  getUserById(res: ServerResponse, id: string): Promise<IUser | void>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(res: ServerResponse, id: string, newData: IUser): Promise<IUser | void>;
  deleteUser(res: ServerResponse, id: string): Promise<string | void>;
}
