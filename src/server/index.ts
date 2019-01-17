import * as express from 'express';
import { admin } from 'server/db';
import * as path from 'path';

const DIST_PATH = path.join(__dirname, '../../dist');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(DIST_PATH));

// API requests here


//Send index.html when the user access the web
app.get('*', function (req, res) {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
});

// Listen
app.listen(port, () => {
    console.log(`App listening on port ${port}, connected with firebase db ${admin.app().options.databaseURL}`);
});