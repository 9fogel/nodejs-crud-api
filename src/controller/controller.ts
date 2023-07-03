import { userList } from '../data/users-data.js';
import { IUser, IController } from '../types/types.js';
import { v4 as uuidv4 } from 'uuid';
import { isIdValid } from '../utils/validationHelpers.js';
import { ServerResponse } from 'http';

class Controller implements IController {
  async getUsers(): Promise<IUser[]> {
    return new Promise((resolve) => resolve(userList));
  }

  async getUserById(res: ServerResponse, id: string): Promise<IUser | void> {
    if (isIdValid(id)) {
      return new Promise((resolve) => {
        const user = userList.filter((user) => user.id === id)[0];
        if (user) {
          resolve(user);
        } else {
          this.showNoUserMessage(res, id);
        }
      });
    } else {
      this.showInvalidIdMessage(res, id);
    }
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

  async updateUser(res: ServerResponse, id: string, newData: IUser): Promise<IUser | void> {
    if (isIdValid(id)) {
      return new Promise((resolve) => {
        const user = userList.filter((user) => user.id === id)[0];

        if (user) {
          const indexOfUpdatedItem = userList.indexOf(user);
          userList[indexOfUpdatedItem] = { id, ...newData };
          resolve(userList[indexOfUpdatedItem]);
        } else {
          this.showNoUserMessage(res, id);
        }
      });
    } else {
      this.showInvalidIdMessage(res, id);
    }
  }

  async deleteUser(res: ServerResponse, id: string): Promise<string | void> {
    if (isIdValid(id)) {
      return new Promise((resolve) => {
        const user = userList.filter((user) => user.id === id)[0];

        if (user) {
          const indexOfItemToDelete = userList.indexOf(user);
          userList.splice(indexOfItemToDelete, 1);
          resolve(`Deleted successfully`);
        } else {
          this.showNoUserMessage(res, id);
        }
      });
    } else {
      this.showInvalidIdMessage(res, id);
    }
  }

  private showInvalidIdMessage(res: ServerResponse, id: string): void {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Sorry, userId ${id} is invalid (not uuid)` }));
  }

  private showNoUserMessage(res: ServerResponse, id: string): void {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Sorry, user with id ${id} not found` }));
  }
}

export default Controller;
