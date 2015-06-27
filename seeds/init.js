
exports.seed = function(knex, Promise) {
    var promises = [
        // Deletes ALL existing entries
        knex('history').del(),
        knex('data').del(),
        knex('object').del(),
    ];
  
    // Inserts seed entries
    for ( var i = 1 ; i <= 10 ; i++ ) {
        promises.push(knex('object').insert({id: i, name: 'test ('+i+')'}));
        promises.push(knex('data').insert({id:i,object_id:i,value:'Hello world ('+i+') !'}));
        promises.push(knex('history').insert({id:i,object_id:i,data_id:i}));
    }
    
    return Promise.all(promises);
};
