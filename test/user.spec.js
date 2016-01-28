var chai = require('chai')
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var User = require('../models').User;

describe('User model', function() {
  describe('validation', function() {
    describe('name', function() {
      xit('is required');
      xit('must be a string');
    })

    describe('email', function() {
      xit('is required');
      xit('must be a string');
      xit('must be unique to each user');
    }) 
  });
  
  describe('statics', function() {

    describe('find or create a user', function() {
      xit('returns a promise');
      xit('promise resolves to a single user');
      xit('does not create duplicate users')
      xit('creates a new user if user doesn\'t exist');
      xit('returns the correct user')
    });

  });

});