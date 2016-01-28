var chai = require('chai')
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var pageSchema = require('../models').pageSchema;
var Page = require('../models').Page;

describe('Page model', function() {

  afterEach(function(done){
    Page.remove({})
    .then(function(){
      done();
    });
  });

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
    });


    describe('page title', function() {

      it('is required', function(done){
        page.content = "abc";
        page.save().then(function() {
          var err = new Error('page Schema title is not set to require: true');
          done(err);
        }, function(err){
          expect(err).to.exist;
          done();
        });
      });

      it('must be a string', function(){
        expect(pageSchema.paths.title.instance).to.equal('String');
      });
    })

    describe('content', function() {

      it('is required', function(done) {
        page.title = "abc";
        page.save().then(function() {
          var err = new Error('page Schema content is not set to require: true');
          done(err);
        }, function(err){
          expect(err).to.exist;
          done();
        });
      });

      it('must be a string', function(){
        expect(pageSchema.paths.content.instance).to.equal('String');
      });

    });

    describe('status', function() {
      
      it('must be a string', function() {
        expect(pageSchema.paths.status.instance).to.equal('String');
      });

      it('must be either open or closed', function(done) {
        page.title = "test";
        page.content = "abcd";
        page.status = "pending";
        page.save().then(function() {
          var err = new Error('page Schema status is not properly restricted');
          done(err);
        }, function(err){
          expect(err).to.exist;
          done();
        });

      });

      it('defaults to open', function(){
        page.title = "test";
        page.content = "abcd";
        expect(page.status).to.equal('open');
      });

    });

    describe('date', function() {

      it('defaults to the current date & time', function(done) {
        setTimeout(function() {
          page = new Page();
          page.title = "test";
          page.content = "abcd";
          var pageDate = Number(page.date);
          var now = Number(Date.now());
          expect(pageDate).to.be.closeTo(now, 500);
          done();
        }, 800);
      });

      it('is a Date object', function() {
        page.title = "test";
        page.content = "abcd";
        expect(page.date).to.be.an.instanceOf(Date);
      });

    });

    describe('tags', function() {

      it('must be an array', function(){
        page.title = "test";
        page.content = "abcd";
        expect(page.tags).to.be.an.instanceOf(Array);
      });

      xit('cannot contain non-strings', function(done){
        page.title = "test";
        page.content = "abcd";
        page.tags = [1, 3];
        page.save().then(function(data){
          console.log(data)
          var err = new Error('schema is allowing non-strings in tags');
          done(err);
        }, function(err){
          expect(err).to.exist;
          done();
        });

      });

      it('cannot contain mixed types', function(done) {
        page.title = "test";
        page.content = "abcd";
        page.tags = [2, {}];
        page.save().then(function(){
          var err = new Error('schema is allowing mixed types in tags');
          done(err);
        }, function(err){
          expect(err).to.exist;
          done();
        });
      })

    });

    describe('author', function() {

      it('references a User document', function(done){
        page.title = "test";
        page.content = "abcd";
        page.author = 'Bob';
        page.save().then(function(){
          var err = new Error('schema is not restricting author to User type');
          done(err);
        }, function(err){
          expect(err).to.exist;
          done();
        });
      });

    })
  });

  describe('virtuals', function(){

    describe('route', function() {
      it('returns /wiki/ concatenated with the page\'s urlTitle', function() {
        var page = new Page({
          title: 'hello world',
          content: 'Hello!!!!'
        });

        expect(page.route).to.equal('/wiki/' + page.urlTitle);
      });

    });

    describe('render content', function() {
      xit('returns the contents in HTML format');
    });

  });


  describe('statics', function(){

    var page1;
    var page2;
    beforeEach(function(done) {
      page1 = new Page();
      page1.title = 'my title';
      page1.content = 'blah blah blah';
      page1.tags = ['tag1', 'tag2'];
      
      page1.save().then(function() {
        page2 = new Page();
        page2.title = 'hello';
        page2.content ='nonsense';
        page2.tags = ['xyz'];
        page2.save().then(function(){
          done();
        });
      }).then(null, function(err){ done(err) })
    });



    describe('find page by tag', function(){

      it('returns a promise', function() {
        expect(Page.findByTag('tag')).to.respondTo('then');
      });

      it('promise resolves to a list of pages', function(done) {
        Page.findByTag('tag1').then(function(pages) {
          expect(pages).to.be.an('array');
          done();
        }).then(null, function(err) {
          done(err);
        });
      });

      it('all pages promised have the specified tag', function(done) {
        Promise.all([Page.findByTag('tag1'), Page.findOne({title: page1.title}), Page.findOne({title: page2.title})])
        .then(function(results) {
          expect(results[0]).to.have.length(1);
          expect(results[0][0].equals(page1._id)).to.be.true;
          // var resultIds = results[0].map(function(obj) {
          //   return obj._id;
          // });
          // expect(resultIds).to.contain(results[1]._id);
          // expect(resultIds).to.not.include(results[2]._id);
          done();
        }).then(null, function(err) {
          done(err);
        });
      });
    });

  });

  describe('methods', function() {

    var page1, page2, page3;
    beforeEach(function(done) {
      page1 = new Page({
        title: 'test1',
        content: 'contents...',
        tags: ['foo', 'bar']
      });
      page2 = new Page({
        title: 'test1',
        content: 'contents...',
        tags: ['foo']
      });
      page3 = new Page({
        title: 'test1',
        content: 'contents...',
        tags: ['baz']
      });
      page1.save().then(function(){
        return page2.save();
      }).then(function(){
        return page3.save();
      }).then(function(){
        done();
      });
    });


    describe('find similar pages', function(){

      it('returns a promise', function(){
        expect(page1.findSimilar()).to.respondTo('then');
      });

      it('promise resolves to a list of pages', function(done){
        page1.findSimilar().then(function(pages) {
          expect(pages).to.be.an('array');
          done();
        }).then(null, function(err) {
          done(err);
        });
      });

      it('doesn\'t return the document it was called on', function(done){
        page1.findSimilar().then(function(pages){
          pages.forEach(function(page) {
            expect(page.equals(page1._id)).to.be.false
          })
          done();
        }).then(null, function(err){
          done(err);
        })
      });

      xit('returns pages that have at least 1 tag in common with the page its called on');
    });
  });

})