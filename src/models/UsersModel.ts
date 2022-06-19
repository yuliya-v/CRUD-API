import { v4 } from 'uuid';

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type newUserData = Omit<User, 'id'>;

class UserModel {
  data: User[] = [];
  
  async getAll(): Promise<User[]> {
    return this.data;
  }

  async create(data: newUserData): Promise<User> {
    const newUser = { ...data, id: v4() };
    this.data.push(newUser);
    return newUser;
  }

  async find(id: string): Promise<User | undefined> {
    return this.data.find(user => user.id === id);
  }

  async update(newData: newUserData, id: string): Promise<User | undefined> {
    const userIndex = this.data.findIndex(user => user.id === id);
    if (userIndex > -1) {
      this.data[userIndex] = {
        id,
        ...newData
      };
      return this.data[userIndex];
    }
  }

  async delete(id: string): Promise<User | undefined> {
    const userIndex = this.data.findIndex(user => user.id === id);
    if (userIndex > -1) {
      return this.data.splice(userIndex, 1)[0];
    }
  }
}

export const userModel = new UserModel();
