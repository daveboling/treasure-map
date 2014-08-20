'use strict';

var Mongo = require('mongodb'),
       fs = require('fs'),
     path = require('path');

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

Treasure.prototype.found = function(treasure, cb){
  Treasure.collection.update({_id: treasure._id}, {$set: {isFound: true} }, cb);
};

Treasure.create = function(fields, files, cb){
	console.log(fields);
	var t = new Treasure(fields);
	  t.save(function(){
	  	Treasure.uploadPhotos(files, cb);
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

Treasure.uploadPhotos = function(files, cb){
  var dir = __dirname + '/../static/img' + this._id, //Set the path for destination directory
   exists = fs.existsSync(dir), //existsSync checks to see if dir exists already, returns true or false
     self = this;

  //If it doesn't exist...
  if(!exists){
  	fs.mkdirSync(dir); //..go ahead and make the directory
  }

  //files is an array of any files grabbed from type='file' fields on the HTML form
  files.photos.forEach(function(photo){
    var ext     = path.extname(photo), //Rip off the extension of the file (e.g. .jpg, .gif)
       relative = '/img/' +  self._id + '/' + self.photos.length + ext,
       absolute = __dirname + '/img/' +  self._id + '/' + self.photos.length + ext;

    fs.renameSync(photo.path, absolute); //Move old path to the new absolute path
    
    //Since we're already in our server, we only need to push the relative path to the photos array
    self.photos.push(relative);   
  });

  Treasure.collection.save(self, cb);

};


module.exports = Treasure;