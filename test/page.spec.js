var chai = require('chai')
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var Page = require('../models').Page;

describe('Page model', function() {

  describe('pre-validation hooks', function(){
    xit('generates a URL title for each page');
    xit('spaces in title are replaced with _ for urlTitle');
    xit('if no title exists, random urlTitle created');
    xit('it calls next after completing');
  });

  describe('validation', function() {

    var page;
    beforeEach(function() {
      page = new Page();
    })

    afterEach(function(done) {
      page.remove().then(function(){
        done();
      }, done);
    });

    describe('page title', function() {

      it('is required', function(done){
        page.content = "abc";
        page.save().then(function() {
          done();
        }, function(err){
          expect(err).to.exist;
          done();
        });
      });

      xit('must be a string', function(){
        page.title = 25;
        page.content = "blahblah";
        page.save().then()
      });
    })
    describe('urlTitle', function() {
      xit('is required');
      xit('must be a string')
    })
    describe('content', function() {
      xit('is required')
      xit('must be a string')
    })
    describe('status', function() {
      xit('must be a string')
      xit('must be either open or closed')
      xit('defaults to open')
    })
    describe('date', function() {
      xit('defaults to the current date & time');
      xit('is a Date object');
    })
    describe('tags', function() {
      xit('must be an array if not null');
      xit('cannot contain non-strings');
    })
    describe('author', function() {
      xit('references a User document');
    })
  });

  describe('virtuals', function(){

    describe('route', function() {
      xit('returns /wiki/ concatenated with the page\'s urlTitle');
    });

    describe('render content', function() {
      xit('returns the contents in HTML format');
    });

  });


  describe('statics', function(){

    describe('find page by tag', function(){
      xit('returns a promise');
      xit('promise resolves to a list of pages');
      xit('all pages promised have the specified tag');
    });

  });

  describe('methods', function() {
    describe('find similar pages', function(){
      xit('returns a promise');
      xit('promise resolves to a list of pages');
      xit('doesn\'t return the document it was called on');
      xit('returns pages that have at least 1 tag in common with the page its called on');
    });
  });

})