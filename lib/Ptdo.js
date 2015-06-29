var assert = require('assert');
var Promise = require("bluebird");

/*
 * Persisted Time-Dependent Object
 *
 * @constructor
 *
 * @param {object} bookshelf Bookshelf instance
 * @param {string} [ptdo=ptdo] Child Ptdo object name
 */
var Ptdo = function( bookshelf , ptdo ) {
    "use strict";
    
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
    
    // Bookshelf models initialization only once by Ptdo class definition:
    if ( undefined === Ptdo.prototype.models[this.ptdo] && this.bookshelf ) {
        this.initModels();
    }
    
    // Attach models to the instance:
    if ( Ptdo.prototype.models[this.ptdo] ) {
        this.Object = Ptdo.prototype.models[this.ptdo].Object;
        this.History = Ptdo.prototype.models[this.ptdo].History;
        this.Data = Ptdo.prototype.models[this.ptdo].Data;
    }
};

// Class inheritance:
// REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// REF: http://phrogz.net/JS/classes/OOPinJS2.html
// Ptdo.prototype = new parent();
// Ptdo.prototype.constructor = Ptdo;
// Ptdo.prototype.parent = parent.prototype;

/** @property ptdo Ptdo object definition **/
Ptdo.prototype.ptdo         = 'ptdo';

/** @property bookshelf Bookshelf instance **/
Ptdo.prototype.bookshelf    = null;

/** # Bookshelf models initialization */

// Static Bookshelfjs models definition:
Ptdo.prototype.models = {};

// Bookshelf Object model:
Ptdo.prototype.Object  = null;

// Bookshelf History model:
Ptdo.prototype.History = null;

// Bookshelf Data model:
Ptdo.prototype.Data    = null;

/**
 * Bookshelf Models initialization method
 */
Ptdo.prototype.initModels   = function() {
    var _Data = this.initModelData();
    var _History = this.initModelHistory();
    var _Object = this.initModelObject();
    
    Ptdo.prototype.models[ this.ptdo ] = {
        Object: _Object,
        History: _History,
        Data: _Data
    };
};

Ptdo.prototype.initModelObject  = function() {
    var _self = this;
    
    // Init the Object model
    return this.bookshelf.Model.extend({
        tableName: this.table_object,
        
        history: function() {
            return this.hasMany(_self.History,'object_id');
        }
    });
};

Ptdo.prototype.initModelHistory = function() {
    var _self = this;
    
    // Init the History model
    return this.bookshelf.Model.extend({
        tableName: this.table_history,
        
        data: function(){
            return this.belongsTo(_self.Data,'data_id');
        }
    });
};

Ptdo.prototype.initModelData    = function() {
    var _self = this;
    
    // Init the Data model
    return this.bookshelf.Model.extend({
        tableName: this.table_data
    });
};


/**
 * Create a new Ptdo object.
 */
Ptdo.prototype.create = function() {
    
}

/**
 * Get object by id
 *
 * @param {integer} id Object id
 */
Ptdo.prototype.get = function ( id ) {
    console.log( 116 , 'Ptdo::get(' + id + ')' );
    var _self = this;
    return new Promise(function(resolve, reject) {
        _self.Object.forge({id:id})
            // .fetch({
            //     withRelated: ['history.data']
            // })
            .fetch()
            .then(function(obj) {
                resolve(obj);
            });
    });
};

/**
 * Save object
 */
Ptdo.prototype.save = function ( id ) {
    
}

/**
 * Find objects
 *
 * @param {object} criterias Search criterias
 */
Ptdo.prototype.findSeveral = function ( criterias ) {
    
}

/**
 * Find object
 *
 * @param {object} criterias Search criterias
 */
Ptdo.prototype.findOne = function ( criterias ) {
    
}

/**
 * -----------------------------------------------
 * # Get Ptdo Data methods
 */

/**
 * Get object data on a range of date.
 *
 * @param {date} from From date
 * @param {date} to To date
 */
Ptdo.prototype.getDataOnRange = function ( from , to ) {
}

/**
 * Get object data on a specific date.
 */
Ptdo.prototype.getDataOn = function ( on ) {
    console.log( 116 , 'Ptdo::getOn(' + id + ')' , on );
    var _self = this;
    return new Promise(function(resolve, reject) {
        _self.Object.forge({id:id})
            .query(function(q){
                q
                    .select('*').from('page_object')
                    .rightJoin('page_history', function () {
                        this.on('page_object.id', '=', 'page_history.object_id');
                    })
                    .rightJoin('page_data', function () {
                        this.on('page_object.id', '=', 'page_data.object_id')
                        .andOn('page_data.id', '=', 'page_history.data_id');
                    })
                    .where( 'page_history.applicable_at', '<=', on )
                    .orderBy( 'page_history.applicable_at' , 'desc' )
                    .select()
                    .limit( 1 );
            })
            .fetch()
            .then(function(obj) {
                console.log( obj );
                resolve(obj);
            });
    });
};

/**
 * Get object data on a range of date.
 *
 * @param {date} from From date
 * @param {date} to To date
 * @param {object} data Ptdo object data to save
 */
Ptdo.prototype.setDataOnRange = function ( from , to , data ) {
}

/**
 * Get object data on a specific date.
 *
 * @param {date} date From date
 * @param {object} data Ptdo object data to save
 */
Ptdo.prototype.setDataOn = function ( on , data ) {
}

/**
 * Delete object data on a range of date.
 *
 * @param {date} from From date
 * @param {date} to To date
 */
Ptdo.prototype.deleteDataOnRange = function ( from , to ) {
}

/**
 * Delete object data on a range of date.
 *
 * @param {date} on On date
 */
Ptdo.prototype.deleteDataOn = function ( on ) {
}

/**
 * Get history for the Ptdo object.
 */
Ptdo.prototype.getHistory = function () {
}

/**
 * Get properties history for the Ptdo object.
 */
Ptdo.prototype.getPropertiesHistory = function ( properties ) {
}

/**
 * Get property history for the Ptdo object.
 */
Ptdo.prototype.getPropertyHistory = function ( property ) {
}

module.exports = Ptdo;