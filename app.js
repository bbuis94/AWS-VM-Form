#!/usr/bin/env nodejs

/**
 * Application backend launch script
 * Will be used to implement mongodb database as well shortly
 */

//NOTE : Must fix duplicate key error in mongodb caused from attempting to save config after loading previous one

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());
var http = require('http');
Config = require('./models/config');
Cost = require ('./models/cost');
var url = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/server_request_form';
//var url = 'mongodb://' + 'localhost' + ':27017/server_request_form';
mongoose.connect(url);
var db = mongoose.connection;

app.get('/api/configs', (req, res) => {
    Config.getConfigs((err, configs) => {
        if(err){
            throw err;
        }
        res.json(configs);
    });
});

app.get('/api/configs/:_id', (req, res) => {
    Config.getConfigById(req.params._id, (err, configs) => {
        if(err){
            throw err;
        }
        res.json(configs);
    });
});

app.post('/api/configs', (req, res) => {
    var config = req.body;
    Config.addConfig(config, (err, config) => {
        if(err){
            throw err;
        }
        res.json(config);
    });
});


app.get('/api/costs', (req, res) => {
    Cost.getCosts((err, cost) => {
        if(err){
            throw err;
        }
        res.json(cost);
    });
});

app.get('/api/costs/:_id', (req, res) => {
    Cost.getCostsById(req.params._id, (err, cost) => {
        if(err){
            throw err;
        }
        res.json(cost);
    });
});

app.post('/api/costs', (req, res) => {
    var cost = req.body;
    Cost.addCost(cost, (err, cost) => {
        if(err){
            throw err;
        }
        res.json(cost);
    });
});
var server = http.createServer(app).listen(8080, function() {
    console.log('Server Request Form started');
});

