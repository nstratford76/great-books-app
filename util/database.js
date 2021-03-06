const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const cors = require('cors')

const express = require('express');
const app = express();

let _db;
const mongoConnect = callback => {

  MongoClient.connect(
    'mongodb+srv://nstratford_test:Brandnewrules76@cluster0-hi2mo.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};




exports.mongoConnect = mongoConnect;
exports.getDb = getDb;