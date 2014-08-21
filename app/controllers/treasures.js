'use strict';

var Treasure = require('../models/treasure'),
          mp = require('multiparty');

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Treasure.create(fields, files, function(){
      res.redirect('/treasures');
    });
  });
};

exports.map = function(req, res){
  var tag       = req.query.tag;
  var direction = req.query.direction || 1;
  var header    = req.query.header;

  Treasure.all(tag, direction, header, function(err, treasures){
    res.render('treasures/map', {treasures: treasures, tag: tag, direction: direction, header: header});
  });
};

exports.objectives = function(req, res){
  Treasure.findById(req.params.id, function(treasure){
    res.render('treasures/objective', {treasure: treasure});
  });
};

exports.found = function(req, res){
  Treasure.findById(req.params.id, function(treasure){
    Treasure.found(treasure, function(){
      res.redirect('/treasures');
    });
  });
};
