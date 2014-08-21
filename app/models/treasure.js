'use strict';

var Mongo = require('mongodb'),
       fs = require('fs'),
     path = require('path');

function Treasure(o){
  this.name       = o.name[0];
  this.location   = {lat: o.lat[0], lng: o.lat[0], name: o.locationName[0]};
  this.difficulty = o.difficulty[0];
  this.tags       = o.tags[0].split(',').map(function(x){ return x.trim(); });
  this.hints      = o.hints.map(function(x){ return x;});
  this.photos     = [];
  this.order      = o.order[0];
  this.isFound    = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasure');}
});

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.prototype.found = function(treasure, cb){
  Treasure.collection.update({_id: treasure._id}, {$set: {isFound: true} }, cb);
};

Treasure.create = function(fields, files, cb){
	var t = new Treasure(fields);
	  t.save(function(){
	  	t.addPhotos(files, cb);
	  });
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

Treasure.prototype.addPhotos = function(files, cb){
  var dir    = __dirname + '/../static/img/' + this._id,
      staticRoot   = '/img/' + this._id + '/',
      exists = fs.existsSync(dir),
      self   = this;

  if(!exists){
    fs.mkdirSync(dir);
  }

  files.photos.forEach(function(photo){
    var ext = path.extname(photo.path),
        fileName = self.photos.length + ext,
        rel = staticRoot + fileName,
        abs = dir + '/' + fileName;
    fs.renameSync(photo.path, abs);

    self.photos.push(rel);

  });

  self.save(cb);
};


module.exports = Treasure;