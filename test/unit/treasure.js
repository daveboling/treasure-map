/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasure',
    Mongo     = require('mongodb');

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var t = new Treasure({name: 'diamonds', location: {lat: 36, lng: 86, name: 'Nashville'}, difficulty: 1, tags: 'Death, Destruction', hints: ['Go to Nashville', 'Try not to perish'], photos: ['http://www.teachforamerica.org/sites/default/files/styles/region_marquee_color/public/marquee_images/regions-marquee_greater-nashville-7-14-2012_0.jpg?itok=wRNwp7iO'], order: 4});
      expect(t).to.be.instanceof(Treasure);
      expect(t.name).to.equal('diamonds');
      expect(t.location.lat).to.equal(36);
      expect(t.location.lng).to.equal(86);
      expect(t.location.name).to.equal('Nashville');
      expect(t.difficulty).to.equal(1);
      expect(t.tags[0]).to.equal('Death');
      expect(t.tags[1]).to.equal('Destruction');
      expect(t.hints[0]).to.equal('Go to Nashville');
      expect(t.hints[1]).to.equal('Try not to perish');
      expect(t.order).to.equal(4);
      expect(t.photos[0]).to.equal('http://www.teachforamerica.org/sites/default/files/styles/region_marquee_color/public/marquee_images/regions-marquee_greater-nashville-7-14-2012_0.jpg?itok=wRNwp7iO');
    });
  });

  describe('#save', function(){
    it('should save a treasure to the database', function(done){
      var t = new Treasure({name: 'diamonds', location: {lat: 36, lng: 86, name: 'Nashville'}, difficulty: 1, tags: 'Death, Destruction', hints:  ['Go to Nashville', 'Try not to perish'], photos: ['http://www.teachforamerica.org/sites/default/files/styles/region_marquee_color/public/marquee_images/regions-marquee_greater-nashville-7-14-2012_0.jpg?itok=wRNwp7iO'], order: 4});
      t.save(function(){
        expect(t._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

/*
  describe('.create', function(){
    it('should save a treasure to the database', function(done){
      var t = new Treasure({name: 'diamonds', location: {lat: 36, lng: 86, name: 'Nashville'}, difficulty: 1, tags: 'Death, Destruction', hints:  ['Go to Nashville', 'Try not to perish'], photos: ['http://www.teachforamerica.org/sites/default/files/styles/region_marquee_color/public/marquee_images/regions-marquee_greater-nashville-7-14-2012_0.jpg?itok=wRNwp7iO'], order: 4});
      Treasure.create(t, function(){
        expect(t._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
*/

  describe('.all', function(){
    it('should get all treasure', function(done){
      Treasure.all(function(err, treasure){
        expect(treasure).to.have.length(3);
        expect(treasure[0].order).to.equal(1);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a treasure based on its ID', function(done){
      Treasure.findById('000000000000000000000003', function(treasure){
        expect(treasure._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
});

