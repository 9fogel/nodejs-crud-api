export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: Array<string> | [];
}

export interface IController {
  getUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | string>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(id: string, newData: IUser): Promise<IUser | string>;
  deleteUser(id: string): Promise<string>;
}
