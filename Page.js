"use strict";

var Ptdo = require('./Ptdo');

// Persisted Time-Dependent Object:
var Page = function( bookshelf ) {
    
    // Initialize the Ptdo object name:
    this.parent.constructor.call(this,bookshelf,'page');
}

// Class inheritance:
// REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// REF: http://phrogz.net/JS/classes/OOPinJS2.html
Page.prototype = new Ptdo();
Page.prototype.constructor = Page;
Page.prototype.parent = Ptdo.prototype;

// Ptdo object definition: object
Page.prototype.test = "test";

module.exports = Page;