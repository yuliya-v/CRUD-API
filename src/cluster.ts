import 'dotenv/config';
import server from './server';
import cluster from 'cluster';
import os from 'os';

const PORT = process.env.PORT || 4000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log(`child ${process.pid} is running`);

  server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}