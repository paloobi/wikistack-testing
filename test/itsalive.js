// console.log("A man walked into a bar. What did he say? OUCH!");

// var chai = require('chai')
// var expect = chai.expect;
// var spies = require('chai-spies');
// chai.use(spies);

// describe('2 + 2' , function() {
//   it('is equal to 4', function() {
//     expect(2+2).to.equal(4);
//   });
// });

// describe('setTimeout', function(){
//   it('takes expected amount of time', function(done) {
//     var start = new Date();
//     var end;
//     setTimeout(function testTimeout(){
//       var end = new Date();
//       expect(end - start).to.be.within(980, 1020);
//       // could be close to
//       done();
//     }, 1000);
//   });
// });

// describe('forEach', function() {
//   it('runs its callback for each item in array', function() {
//     var arr = [1,2,3,4,5]
//     function timesTwo(n) {
//       return n * 2;
//     }
    
//     var spy = chai.spy(timesTwo);

//     arr.forEach(spy);
//     expect(spy).to.have.been.called.exactly(arr.length);

//   });
// });

