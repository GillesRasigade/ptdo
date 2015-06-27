"use strict";

var assert = require('assert');

// Persisted Time-Dependent Object:
var Ptdo = function( bookshelf , ptdo ) {
    
    // Updating the Ptdo object name:
    if ( ptdo ) this.ptdo = ptdo;
    
    // Check the existence of the ptdo object name:
    assert.equal( true , (Boolean)(this.ptdo) );
    
    // Initializing Ptdo tables:
    this.table_object  = this.ptdo + '_object';
    this.table_history = this.ptdo + '_history';
    this.table_data    = this.ptdo + '_data';
    
    // TODO: add test of real bookshel instance
    // transmission:
    this.bookshelf = bookshelf;
    
    // Bookshelf models initialization:
    if ( this.bookshelf ) {
        this.initModels();
    }
}

// Class inheritance:
// REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// REF: http://phrogz.net/JS/classes/OOPinJS2.html
// Ptdo.prototype = new parent();
// Ptdo.prototype.constructor = Ptdo;
// Ptdo.prototype.parent = parent.prototype;

// Ptdo object definition: object
Ptdo.prototype.ptdo         = 'ptdo';

// Bookshelf instance
Ptdo.prototype.bookshelf    = null;

/*
 * Bookshelf models initialization:
 */

// Bookshelf Object model:
Ptdo.prototype.Object  = null;

// Bookshelf History model:
Ptdo.prototype.History = null;

// Bookshelf Data model:
Ptdo.prototype.Data    = null;

// Bookshelf Models initialization method:
Ptdo.prototype.initModels   = function() {
    this.initModelData();
    this.initModelHistory();
    this.initModelObject();
}
Ptdo.prototype.initModelObject  = function() {
    var _self = this;
    
    // Init the Object model
    this.Object = this.bookshelf.Model.extend({
        tableName: this.table_object,
        
        history: function() {
            return this.hasMany(_self.History,'object_id')
        },
    });
}
Ptdo.prototype.initModelHistory = function() {
    var _self = this;
    
    // Init the History model
    this.History = this.bookshelf.Model.extend({
        tableName: this.table_history,
        
        data: function(){
            return this.belongsTo(_self.Data,'data_id')
        }
    });
}
Ptdo.prototype.initModelData    = function() {
    var _self = this;
    
    // Init the Data model
    this.Data = this.bookshelf.Model.extend({
        tableName: this.table_data
    });
}

module.exports = Ptdo;