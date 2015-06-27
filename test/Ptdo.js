var assert = require("assert");

// Bookshelf mock:
var bookshelf = {
    Model: {
        extend: function( config ){
            return config;
        },
        hasMany: function( ) {
            return arguments;
        },
        belongsTo: function( ) {
            return arguments;
        }
    }
};

// Ptdo initialization:
var Ptdo = require('../Ptdo');
var ptdo = new Ptdo(bookshelf);

describe('Ptdo', function(){
  describe('default values', function(){
    it('ptdo should return "ptdo"', function(){
        assert.equal( 'ptdo' , ptdo.ptdo , 'ptdo must equal "ptdo".' );
        assert.equal( 'ptdo_object' , ptdo.table_object , 'ptdo must equal "ptdo_object".' );
        assert.equal( 'ptdo_history' , ptdo.table_history , 'ptdo must equal "ptdo_history".' );
        assert.equal( 'ptdo_data' , ptdo.table_data , 'ptdo must equal "ptdo_data".' );
    })
  })
})