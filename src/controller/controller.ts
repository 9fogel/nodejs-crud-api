import { userList } from '../data/users-data.js';
import { IUser, IController } from '../types/types.js';
import { v4 as uuidv4 } from 'uuid';

class Controller implements IController {
  async getUsers(): Promise<IUser[]> {
    return new Promise((resolve) => resolve(userList));
  }

  async getUserById(id: string): Promise<IUser | string> {
    return new Promise((resolve, reject) => {
      const user = userList.filter((user) => user.id === id)[0];
      if (user) {
        resolve(user);
      } else {
        reject(`Sorry, user with id ${id} not found `);
      }
    });
  }

  async createUser(user: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      const newUser = {
        id: uuidv4(),
        ...user,
      };
      resolve(newUser);
      userList.push(newUser);
    });
  }

  async updateUser(id: string, newData: IUser): Promise<IUser | string> {
    return new Promise((resolve, reject) => {
      const user = userList.filter((user) => user.id === id)[0];
      const indexOfUpdatedItem = userList.indexOf(user);

      if (!user) {
        reject(`Sorry, user with id ${id} not found`);
      }
      userList[indexOfUpdatedItem] = { id, ...newData };
      resolve(userList[indexOfUpdatedItem]);
    });
  }

  async deleteUser(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const user = userList.filter((user) => user.id === id)[0];
      const indexOfItemToDelete = userList.indexOf(user);
      if (!user) {
        reject(`Sorry, user with id ${id} not found`);
      }
      userList.splice(indexOfItemToDelete, 1);
      resolve(`Deleted successfully`);
    });
  }
}

export default Controller;
