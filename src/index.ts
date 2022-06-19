import 'dotenv/config';
import http from 'http';
import { usersController } from './controllers/UsersController';

const PORT = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
  try {
    const userId = req.url?.split('/')[3] || '';
    if (req.url === '/api/users' && req.method === 'GET') {
      await usersController.getAllUsers(res);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      await usersController.createRecord(req, res);
    } else if (req.url?.startsWith('/api/users/') && req.method === 'GET') {
      await usersController.findRecord(userId, res);
    } else if (req.url?.startsWith('/api/users/') && req.method === 'PUT') {
      await usersController.updateRecord(userId, req, res);
    } else if (req.url?.startsWith('/api/users/') && req.method === 'DELETE') {
      await usersController.deleteRecord(userId, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal server error" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

export default server;
