import { readFile, stat } from 'fs/promises';
import { resolve } from 'path';
import { createServer } from 'http';
import dotenv from 'dotenv';
import {createEngine} from './autocomplit';
dotenv.config()
 
type Engine = (arg0: string) => string[];
const pathToData = resolve(__dirname, 'cities.json')

const startServer = (engine: Engine) => {
  
  const server = createServer((req, res) => {
    if (req.url) {
      const searchParams: URLSearchParams = new URLSearchParams(req.url.slice(2));
      const query: string | null = searchParams.get('complete');

      if (query !== null) {
        stat(pathToData) 
        .then(data => {
          const reqEtag: string | Date = req.headers['if-none-match'] || new Date(1970)
          const lastModified: Date = data.mtime;
          const reqEtagToDate: string = (new Date(reqEtag).toLocaleString('en-US'))
          const lastModifiedToDate: string = (new Date(lastModified).toLocaleString('en-US'))
          if (reqEtagToDate === lastModifiedToDate) {
            res.writeHead(304, {
              'Cache-Control': 'public, max-age=31557600',
              'ETag': `${lastModified}`
            });
            res.end();
          } else {
            res.writeHead(200, {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=31557600',
              'ETag': `${lastModified}`
            });
            const procesedData: string = JSON.stringify(engine(query));
            res.end(procesedData);
          }
        })

      } else {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.end('Incorrect request...');
      }
    }
  });

  server.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));
};

const fileName = 'cities.json';

readFile(resolve(__dirname, fileName), 'utf-8').then((data: string) => {
  const dataArr: string[] = JSON.parse(data);
  const engine: Engine = createEngine(dataArr);
  startServer(engine);
});
