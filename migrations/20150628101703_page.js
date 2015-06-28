
exports.up = function(knex, Promise) {
    return Promise.all([
        
        // Create the object table:
        knex.schema.createTable('page_object', function (table) {
            table.bigIncrements('id').primary().unsigned();
            table.string('name',128);
        }),
        
        // Create the data table:
        knex.schema.createTable('page_data', function (table) {
            table.bigIncrements('id').primary().unsigned();
            table.bigInteger('object_id').unsigned().index().references('id').inTable('object');
            table.string('value',64);
        }),
        
        // Create the history table:
        knex.schema.createTable('page_history', function (table) {
            table.bigIncrements('id').primary().unsigned();
            table.bigInteger('object_id').unsigned().index().references('id').inTable('object');
            table.bigInteger('data_id').unsigned().index().references('id').inTable('data');
            
            table.timestamp('created_at').defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').defaultTo(knex.raw('now()'));
            table.timestamp('applicable_at').defaultTo(knex.raw('now()'));
        }),
        
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        // Remove the object table:
        knex.schema.dropTable('page_history'),
        knex.schema.dropTable('page_data'),
        knex.schema.dropTable('page_object'),
    ]);
};
