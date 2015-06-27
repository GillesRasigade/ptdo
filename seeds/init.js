
exports.seed = function(knex, Promise) {
    var promises = [
        // Deletes ALL existing entries
        knex('page_history').del(),
        knex('page_data').del(),
        knex('page_object').del(),
    ];
    
  
    // Inserts seed entries
    for ( var i = 0 ; i < 10 ; i++ ) {
        promises.push(knex('page_object').insert({id: i+1, name: 'test ('+(i+1)+')'}));
        
        var date = new Date();
        for ( var j = 0 ; j < 10 ; j++ ) {
        
            promises.push(knex('page_data').insert({id:1+10*i+j,object_id:i+1,value:'Hello world ('+i+','+j+') !'}));
            promises.push(knex('page_history').insert({id:1+10*i+j,object_id:i+1,data_id:1+10*i+j,applicable_at:date.toUTCString()}));
        
            // Add 1 day:
            date.setDate(date.getDate()+1);
        }
    }
    
    return Promise.all(promises);
};
