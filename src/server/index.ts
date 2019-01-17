import * as express from 'express';
import { admin } from 'server/db';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));

app.listen(port, () => {
    console.log(`App listening on port ${port}, connected with firebase db ${admin.app().options.databaseURL}`);
});