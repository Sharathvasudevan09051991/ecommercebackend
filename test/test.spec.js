// var expect = require('chai').expect;
// var sinon = require('sinon');
// var should = require('chai').should;
// var Category = require('../models/category');
// var category = require('../controllers/category');

// describe("Test suit 1", () => {
//     it("check the function is there", () => {
//         expect(category.addSum(5,5)).to.be.equal(10)
//     })

//     it("Call the callback function", () => {
//         var callback = sinon.spy();
//         category.callthecallback(callback);
//         expect(callback.calledOnce).to.be.true
//     })

//     it("Call say Hello", () => {
//     var mock = sinon.mock(category);
//     var expectation = mock.expects("sayHello");
//     expectation.exactly(1)
//     category.addSum(10,10);
//     mock.verify()

//     })


// })

// describe("Test Suit for Stub", function() {
//     it("call the stub on it", function() {
//         var stub = sinon.stub(category, "addSum");
//         stub.withArgs(10, 20).returns(100);
//         expect(category.callanotherfunction(10, 20)).to.be.equal(100);

//     })
// })

// describe("Test suite for category ", function {
//     it("Save the category", function(done) {

//             var category = new Category({
//                 name: "Mens"
//             });
            
        
//         var req = { body: {name: 'name'}};
//         var res = {
//         }
    
    
//             var categoryMock = sinon.mock(category);
//             var category = categoryMock.object;
    
//             categoryMock.expects('save').yields(null, category);
    
//             category.save({req: req, res: res}, function(err, result){
//                 categoryMock.verify();
//                 categoryMock.restore();
//                 console.log("Response", result);
//                 expect(result).to.be.equal(category);
//                 done();
//               })

//     })
//     it('note not saved and throws error');


// })