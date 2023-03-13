//create express server

//publish online

//call db for update

'use strict';
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const open = require('open')
const {MongoClient} = require('mongodb');

const PORT = 8080;
const HOST = 'localhost';

//connect to db
async function dbconnection() {
    const uri = "mongodb+srv://mypiso:<i1tmMjT1HFDutT7o@pisoplannercluster0.bap6afz.mongodb.net/?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri);
    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
	// we'll add code here soon
}
//App
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.send("Hello, server is running ...")
});

app.get('/getindexes', (req, res) => {
    //connect to dabase extract all indexes
    dbconnection().catch(console.error);
})

app.post('/setindexes', (req, res) => {
    //update indexes in database
})
//app.listen(PORT, HOST);
app.listen(PORT, function () {
    console.log("server listening on port "+PORT+ "...");
});
console.log(`Running on http://${HOST}:${PORT}`);

//exports.app = app;
exports.app = app;