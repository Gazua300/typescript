import knex from "knex"


const con = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'alfadb',
        database: 'promo_prime'
    }
})

con.raw('SELECT 1+1 AS RESULT').then(()=>{
    console.log('Connected to database')
}).catch(e=>{
    console.log(`Failed to connect to database: ${e}`)
})

module.exports = con
