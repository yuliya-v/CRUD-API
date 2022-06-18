import { User, userModel } from "../models/UsersModel";
import http from 'http';
import { validate } from 'uuid';
import { isNewDataValid } from "../utils/utils";

const headers = { 'Content-Type': 'application/json' };

class UsersController {

  async getAllUsers(res: http.ServerResponse) {
    const data = await userModel.getAll();
    res.writeHead(200, headers);
    res.end(JSON.stringify(data));
  }

  async createRecord(req: http.IncomingMessage, res: http.ServerResponse) {
    let body = '';

    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const data: Omit<User, 'id'> = JSON.parse(body);
      if (!isNewDataValid(data)) {
        await this.handleInvalidData(res);
        return;
      } 
      const newRecord = await userModel.create(data);
      res.writeHead(201, headers);
      res.end(JSON.stringify(newRecord));
    });
  }

  async findRecord(id: string, res: http.ServerResponse) {
    if (!validate(id)) {
      await this.handleInvalidId(res);
      return;
    }

    const userData = await userModel.find(id);
    if (userData) {
      res.writeHead(200, headers);
      res.end(JSON.stringify(userData));
    } else {
      await this.handleNonExistentId(res);
    }
  }

  async updateRecord(id: string, req: http.IncomingMessage, res: http.ServerResponse, ) {
    if (!validate(id)) {
      await this.handleInvalidId(res);
      return;
    }

    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const data: Omit<User, 'id'> = JSON.parse(body);
      if (!isNewDataValid(data)) {
        await this.handleInvalidData(res);
        return;
      }
      const updatedRecord = await userModel.update(data, id);
      res.writeHead(200, headers);
      res.end(JSON.stringify(updatedRecord));
    });
  }

  async deleteRecord(id: string, res: http.ServerResponse, ) {
    if (!validate(id)) {
      await this.handleInvalidId(res);
      return;
    }

    const deletedUser = await userModel.delete(id);
    if (deletedUser) {
      res.writeHead(204);
      res.end();
    } else {
      await this.handleNonExistentId(res);
    }
  }

  private async handleInvalidId(res: http.ServerResponse) {
    res.writeHead(400, headers);
    res.end(JSON.stringify({ message: 'User ID is invalid' }));
  }

  private async handleNonExistentId(res: http.ServerResponse) {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ message: 'User doesn\'t exist' }));
  }

  private async handleInvalidData(res: http.ServerResponse) {
    res.writeHead(400, headers);
    res.end(JSON.stringify({ message: "Body does not contain required fields: username (string), age(number), hobbies(array of strings or empty array)" }));
  }
}

export const usersController = new UsersController();