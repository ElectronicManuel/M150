import * as express from 'express';
import { admin } from './db';


const app = express();

const port = process.env.PORT || 3000;

app.get('*', (req, res) => {
    res.send('Working');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}, connected with firebase db ${admin.app().options.databaseURL}`);
});