'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

import * as connect from 'connect';
import * as swaggerTools from 'swagger-tools';
import * as jsyaml from 'js-yaml';
import * as serveStatic from 'serve-static';

import { admin } from 'server/db';

const DIST_PATH = path.join(__dirname, '../../dist');
const app = connect();
var serverPort = process.env.PORT || 3000;

// swaggerRouter configuration
var options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    app.use(serveStatic(DIST_PATH));

    const defaultHandler: connect.NextHandleFunction = (req, res, next) => {
        const spa = fs.readFileSync(path.join(DIST_PATH, 'index.html'), 'utf8');
        res.writeHead(200, {"Content-Type": "text/html"});  
        res.write(spa);  
        res.end(); 
    }
    app.use(defaultHandler)

    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
        console.log(`Connected with firebase db ${admin.app().options.databaseURL}`);
    });

});
