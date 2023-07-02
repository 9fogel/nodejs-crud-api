// class Controller implements IController {
import { userList } from '../data/users-data.js';
import { IUser } from '../types/types.js';

class Controller {
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
      //TODO: generate uuid instead of random
      const newUser = {
        id: Math.floor(4 + Math.random() * 10).toString(),
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
