"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
const http_1 = require("http");
const autocomplit_js_1 = __importDefault(require("./autocomplit.js"));
const PORT = process.env.PORT || 3000;
const pathToData = (0, path_1.resolve)(__dirname, 'cities.json');
const startServer = (engine) => {
    const server = (0, http_1.createServer)((req, res) => {
        if (req.url) {
            const searchParams = new URLSearchParams(req.url.slice(2));
            const query = searchParams.get('complete');
            if (query !== null) {
                (0, promises_1.stat)(pathToData)
                    .then(data => {
                    const reqEtag = req.headers['if-none-match'] || new Date(1970);
                    const lastModified = data.mtime;
                    const reqEtagToDate = (new Date(reqEtag).toLocaleString('en-US'));
                    const lastModifiedToDate = (new Date(lastModified).toLocaleString('en-US'));
                    if (reqEtagToDate === lastModifiedToDate) {
                        res.writeHead(304, {
                            // 'Cache-Control': 'public, max-age=31557600',
                            'ETag': `${lastModified}`
                        });
                        res.end();
                    }
                    else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                            // 'Cache-Control': 'public, max-age=31557600',
                            'ETag': `${lastModified}`
                        });
                        const procesedData = JSON.stringify(engine(query));
                        res.end(procesedData);
                    }
                });
            }
            else {
                res.writeHead(404, {
                    'Content-Type': 'text/plain',
                });
                res.end('Incorrect request...');
            }
        }
    });
    server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};
const fileName = 'cities.json';
(0, promises_1.readFile)((0, path_1.resolve)(__dirname, fileName), 'utf-8').then((data) => {
    const dataArr = JSON.parse(data);
    const engine = (0, autocomplit_js_1.default)(dataArr);
    startServer(engine);
});
