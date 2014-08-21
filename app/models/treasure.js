'use strict';

var Mongo = require('mongodb'),
       fs = require('fs'),
     path = require('path');

function Treasure(o){
  this.name       = o.name[0];
  this.location   = {lat: parseFloat(o.lat[0]), lng: parseFloat(o.lng[0]), name: o.locationName[0]};
  this.difficulty = o.difficulty[0];
  this.tags       = o.tags[0].split(',').map(function(x){ return x.trim(); });
  this.hints      = o.hints.map(function(x){ return x;});
  this.photos     = [];
  this.order      = o.order[0];
  this.isFound    = false;
  this.isLinkable = (o.order[0] === '1') ? false : true;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasure');}
});

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.found = function(treasure, cb){
  var counter = treasure.order;
  counter++;
  Treasure.collection.update({order: counter}, {$set:{isLinkable: true}}  , function(){
    Treasure.collection.update({_id: treasure._id},{$set:{isFound: true}}, cb);
  });
};

Treasure.create = function(fields, files, cb){
  var t = new Treasure(fields);
  t.save(function(){
    t.addPhotos(files, cb);
  });
};

Treasure.all = function(filter, direction, header, cb){
  filter = (filter) ? {tags: filter} : {};
  Treasure.collection.find(filter).sort({header: parseInt(direction)}).toArray(cb);
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
