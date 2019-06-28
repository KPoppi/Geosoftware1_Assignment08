/**
* @desc task 8, Geosoftware1, SoSe2019
* @author name: Katharina Poppinga, matr.: 450 146
*/

"use strict";  // JavaScript code is executed in "strict mode"

// jshint esversion: 8
// jshint node: true
// jshint maxerr: 1000



var express = require('express');
const mongodb = require('mongodb');

var router = express.Router();


/*
HTTP POST localhost:3000/item name=foo description=bar
HTTP GET localhost:3000/item?_id=<itemid>
HTTP PUT localhost:3000/item _id=<itemid> name=foo description=bar
HTTP DELETE localhost:3000/item _id=<itemid>
*/


//
router.post("/",  (req, res, next) => {
  // insert item
  console.log("insert item ");
  console.dir(req.body);

  req.db.collection('itemdb').insertOne(req.body, (error, result) => {

    let responseBody = {};

    if(error){
      console.dir(error);
      responseBody.error = "error";

    } else {
      responseBody._id = result.insertedId;
    }

    res.json(responseBody);
    //console.dir(result);
  });
});



//
router.get("/",  (req, res, next) => {
  // find item
  console.log("get item " + req.query._id);

  req.db.collection('itemdb').find({
    _id:new mongodb.ObjectID(req.query._id)
  }).toArray((error, result) => {

    let responseBody = {};

    if(error){
      console.dir(error);
      responseBody.error = "error";

    } else {
      responseBody = result[0];
    }

    res.json(responseBody);
    //console.dir(result);
  });
});


//
router.put("/",  (req, res, next) => {
  // update item
  console.log("update item " + req.body._id);

  let id = req.body._id;

  console.log(req.body);

  delete req.body._id;
  //console.log(req.body); // => { name:req.body.name, description:req.body.description }

  req.db.collection('itemdb').updateOne({
    _id:new mongodb.ObjectID(id)
  },
  {
    $set: {
      name :        req.body.name,
      description : req.body.description
    }
  }, (error, result) => {

    let responseBody = {};

    if(error){
      console.dir(error);
      responseBody.error = "error";

    } else {
      responseBody._id = id;
    }

    res.json(responseBody);
    //console.dir(result);
  });
});


//
router.delete("/", (req, res, next) => {
  // delete item

  console.log(req.query);

  let id = req.query._id;

  console.log("delete item " + id);

  let objectId = "ObjectId(" + id + ")";

  req.db.collection('itemdb').deleteOne({
    _id:new mongodb.ObjectID(id)
  }, (error, result) => {

    let responseBody = {};

    if(error){
      console.dir(error);
      responseBody.error = "error";

    } else {
      responseBody._id = id;
    }

    res.json(responseBody);
    //console.dir(result);
  });
});


module.exports = router;
