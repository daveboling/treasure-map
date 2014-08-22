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

      //console.log('----MULTIPARTY FIELDS START----');
      //console.log(fields);
      //console.log('----MULTIPARTY FIELDS END----');

      res.redirect('/treasures');
    });
  });
};

exports.map = function(req, res){
  var tag = req.query.tag;

  Treasure.all(tag, function(err, treasures){
    res.render('treasures/map', {treasures: treasures, tag: tag});
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
