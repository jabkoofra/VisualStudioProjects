const express = require('express')
const Datastore = require('nedb');
const xlsxReader = require('xlsx-style');



const app = express();
app.listen(3000,
    () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

const database = new Datastore('database.db');
database.loadDatabase();
const databaseXLSX = new Datastore('databaseXLSX.db');
databaseXLSX.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end()
            return;
        }
        response.json(data);
    })
})

app.post('/api', (request, response) => {
    console.log('I got request: ')
    // console.log(request.body);

    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);

    response.json(data);
})

app.post('/xlsx', (request, response) => {
    console.log("I got xlsx");

    const data = request.body;

    databaseXLSX.insert(data);
    const timestamp = Date.now();

    // response.send(request.body)
    // response.end();
})

app.get('/xlsx', (request, response) => {
    databaseXLSX.find({}, (err, data) => {
        if (err) {
            response.end()
            return;
        }
        response.json(data);
    })
})