'use strict';

var Mongo = require('mongodb');

function Treasure(o){
  this.name       = o.name;
  this.location   = o.location;
  this.difficulty = o.difficulty;
  this.tags       = o.tags.split(',').map(function(x){ return x.trim(); });
  this.hints      = o.hints;
  this.photos     = o.photos;
  this.order      = o.order;
  this.isFound    = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasure');}
});

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.create = function(treasure, cb){
  Treasure.collection.save(treasure, cb);
};

Treasure.all = function(cb){
  Treasure.collection.find().sort({order: 1}).toArray(cb);
};

Treasure.findById = function(query, cb){
  var _id = Mongo.ObjectID(query);
  Treasure.collection.findOne({_id : _id}, function(err, obj){
  	cb(obj);
  });
};


module.exports = Treasure;