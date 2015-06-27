var assert = require("assert");

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})

var object = require('../object');

describe('Object', function(){
  describe('test()', function(){
    it('should return "test"', function(){
        
        assert.equal( 'test' , object.test() , 'test() return value must be "test".' );
        
    })
  })
})