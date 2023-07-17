"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
const con = (0, knex_1.default)({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'alfadb',
        database: 'promo_prime'
    }
});
con.raw('SELECT 1+1 AS RESULT').then(() => {
    console.log('Connected to database');
}).catch(e => {
    console.log(`Failed to connect to database: ${e}`);
});
module.exports = con;
